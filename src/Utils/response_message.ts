export const SERVER_LOG = {
  400: "Bad request! Terdapat data yang tidak valid",
  403: "Anda tidak memiliki akses untuk tindakan ini.",
  404: "Not found!",
  500: "Terjadi kesalahan pada server",
};

export const RECIPE_LOG = {
  GET: {
    200: "List of recipes",
    404: "Recipe not found!",
  },
  POST: {
    CREATE: {
      400: "Recipe gagal dibuat",
    },
  },
  PUT: {
    200: "Recipe berhasil diperbaharui!",
    400: {
      BAD_REQUEST: "Ada perubahan yang tidak valid!",
    },
  },
};

export const DORAYAKIREQUEST_LOG = {
  GET: {
    200: "List of dorayaki requests",
    404: "Request tidak ditemukan",
  },
  POST: {
    CREATE: {
      200: "Request berhasil dibuat",
      400: "Request gagal dibuat, pastikan anda memasukan resep dan kuantitas dengan benar",
    },
  },
  PUT: {
    200: "Request berhasil diterima",
    400: "Request gagal diterima, pastikan request tersebut belum diterima/ditolak sebelumnya",
  },
};

export const INGREDIENT_LOG = {
  GET: {
    200: "Data ingredient",
    404: "Ingredient tidak ditemukan!",
  },
  POST: {
    200: "Ingredient berhasil dibuat",
    400: {
      BAD_REQUEST:
        "Pastikan ingredient memiliki nama, stock dan satuan yang digunakan!",
      BAD_ENUM: "Pastikan satuan yang digunakan benar!",
    },
  },
  PUT: {
    200: "Ingredient berhasil diperbaharui!",
    400: {
      BAD_REQUEST: "Ada perubahan yang tidak valid!",
    },
  },
};

export const USER_LOG = {
  GET: {
    200: "Data User",
    404: "User tidak ditemukan!",
  },
  POST: {
    200: "User berhasil login",
    400: {
      BAD_REQUEST: "Terdapat kesalahan pada username atau password!",
      FAIL: "User gagal dibuat",
      BAD_ENUM: "Pastikan satuan yang digunakan benar!",
    },
  },
  PUT: {
    200: "User berhasil diperbaharui!",
    400: {
      BAD_REQUEST: "Ada perubahan yang tidak valid!",
    },
  },
};
