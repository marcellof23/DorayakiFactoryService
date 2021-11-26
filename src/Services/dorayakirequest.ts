import { Request, Response } from "express";
import Joi from "joi";

import db from "Loaders/sequelize";
import {
  DorayakiRequest as DorayakiRequestModel,
  Recipe as RecipeModel,
  RecipeIngredient,
  Ingredient,
} from "Models/";
import { sendRes } from "Utils/api_util/";
import { DorayakiRequestStatus } from "Utils/enum/";
import {
  RECIPE_LOG,
  DORAYAKIREQUEST_LOG,
  SERVER_LOG,
} from "Utils/response_message/";

const Recipe = db.Recipe;
const DorayakiRequest = db.DorayakiRequest;

export const create_request = async (req: Request, res: Response) => {
  try {
    const { recipe_id, qty = 1 } = req.body;

    //validate request body
    const createSchema = Joi.object().keys({
      recipe_id: Joi.number().integer().required(),
      qty: Joi.number().integer().required().min(1),
    });
    const { error } = createSchema.validate({
      ...req.body,
      recipe_id,
      qty,
    });
    if (error)
      return sendRes(
        res,
        400,
        DORAYAKIREQUEST_LOG.POST.CREATE[400],
        error.details[0].message
      );

    //validate related recipe
    const recipe = await Recipe.findByPk(recipe_id);
    if (!recipe) return sendRes(res, 404, RECIPE_LOG.GET[404]);

    const dorayakirequest = await DorayakiRequest.create({ recipe_id, qty });

    return sendRes(
      res,
      200,
      DORAYAKIREQUEST_LOG.POST.CREATE[200],
      dorayakirequest
    );
  } catch (err) {
    return sendRes(res, 500, SERVER_LOG[500], err.message);
  }
};

export const get_all_request = async (req: Request, res: Response) => {
  try {
    const dorayakirequest = await DorayakiRequest.findAll();

    return sendRes(res, 200, DORAYAKIREQUEST_LOG.GET[200], dorayakirequest);
  } catch (err) {
    return sendRes(res, 500, SERVER_LOG[500], err.message);
  }
};

export const get_request = async (req: Request, res: Response) => {
  try {
    const dorayakirequest = await DorayakiRequest.findByPk(
      req.params.dorayakirequest_id
    );

    return sendRes(res, 200, DORAYAKIREQUEST_LOG.GET[200], dorayakirequest);
  } catch (err) {
    return sendRes(res, 500, SERVER_LOG[500], err.message);
  }
};

export const update_request = async (req: Request, res: Response) => {
  try {
    const { dorayakirequest_id } = req.params;

    // validate dorayaki request
    const dr: DorayakiRequestModel = await DorayakiRequest.findByPk(
      dorayakirequest_id
    );
    if (!dr) return sendRes(res, 404, DORAYAKIREQUEST_LOG.GET[404]);

    // validate status change in body
    const updateRequestSchema = Joi.object().keys({
      status: Joi.string()
        .valid(...Object.values(DorayakiRequestStatus))
        .required(),
    });
    const { error } = updateRequestSchema.validate(req.body);
    if (error)
      return sendRes(
        res,
        400,
        DORAYAKIREQUEST_LOG.PUT[400][0],
        error.details[0].message
      );

    const { status }: { status: DorayakiRequestStatus } = req.body;

    // validate status
    if (dr.status !== DorayakiRequestStatus.pending)
      return sendRes(res, 400, DORAYAKIREQUEST_LOG.PUT[400][1]);

    if (status === DorayakiRequestStatus.accepted && !(await dr.isAcceptable()))
      return sendRes(res, 400, DORAYAKIREQUEST_LOG.PUT[400][2]);

    // update dorayaki requests
    await dr.update({
      status,
    });

    // update stock in ingredients
    if (status === DorayakiRequestStatus.accepted) {
      const recipe: RecipeModel = await Recipe.findByPk(dr.recipe_id, {
        include: Ingredient,
      });
      const ingredients = recipe.Ingredients as [
        Ingredient & { RecipeIngredient: RecipeIngredient }
      ];
      for (const ingredient of ingredients) {
        await ingredient.update({
          stock:
            ingredient.stock -
            ingredient.RecipeIngredient.qty_required * dr.qty,
        });
      }
    }

    sendRes(res, 200, DORAYAKIREQUEST_LOG.PUT[200], dr);
  } catch (err) {
    return sendRes(res, 500, SERVER_LOG[500], err.message);
  }
};
