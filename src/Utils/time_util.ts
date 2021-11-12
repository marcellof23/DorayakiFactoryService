import {Op} from "sequelize";

export const currentTime = () => {
	const offsetFromUTC = 0 * 3600 * 1000;
	return new Date(new Date().getTime() + offsetFromUTC);
};

export const dateFilter = (data: string) => {
	const {day, month, year} = breakDate(data);

	const defaultTime = currentTime();
	const defaultDay = new Date(
		`${defaultTime.getFullYear()}-${
			defaultTime.getMonth() + 1
		}-${defaultTime.getDate()}`
	);

	const date =
		day && month && year ? new Date(`${year}-${month}-${day}`) : defaultDay;

	return {
		[Op.gt]: date,
		[Op.lt]: new Date(date.getTime() + 24 * 60 * 60 * 1000),
	};
};

export const breakDate = (date) => {
	if (!date) return null;

	const data = new Date(date);
	const second = data.getSeconds();
	const minute = data.getMinutes();
	const hour = data.getHours();
	const day = data.getDate();
	const month = data.getMonth() + 1;
	const year = data.getFullYear();

	return {second, minute, hour, day, month, year};
};
