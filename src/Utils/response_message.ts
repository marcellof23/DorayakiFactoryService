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
};

export const DORAYAKIREQUEST_LOG = {
	GET: {
		404: "Request tidak ditemukan",
	},
	POST: {
		CREATE: {
			200: "Request berhasil dibuat",
			400: "Request gagal dibuat, pastikan anda memasukan resep dan kuantitas dengan benar",
		},
		ACCEPT: {
			200: "Request berhasil diterima",
			400: "Request gagal diterima, pastikan request tersebut belum diterima/ditolak sebelumnya",
		},
	},
};