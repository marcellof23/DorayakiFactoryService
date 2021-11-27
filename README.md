# Dorayaki Service (REST)

Web service untuk melayani kebutuhan pabrik yoshiyaki :D

## Skema Basis Data yang Digunakan

Terdapat 6 buah models yang didaftarkan pada web service ini untuk melayani kebutuhan pabrik yoshiyaki. Keenam model tersebut adalah sebagai berikut :

- DorayakiRequest:

  - dorayakirequest_id: number
  - recipe_id: number
  - qty: number
  - status: ENUM("pending", "accepted", "denied")

- Ingredient:

  - ingredient_id: number
  - name: string
  - stock: number
  - unit: ENUM("gram", "ml", "tbsp", "tsp", "pcs")

- LogRequest:

  - logrequest_id : number
  - ip: string
  - endpoint: string

- Recipe:

  - recipe_id : number
  - name: string

- RecipeIngredient:

  - recipe_id : number
  - ingredient_id: number
  - qty_required : number

- User:
  - user_id : number
  - username: string
  - name: string
  - password: string

Service yang terdaftar pada web service ini adalah sebagai berikut

#### - Auth Service

Service ini berfungsi untuk menghandle semua yang berkaitan dengan autentikasi user dalam menggunakan aplikasi pabrik ini. Terdapat dua endpoint utama yaitu :

- [POST] /auth/login : melayani fitur login
- [GET] /auth : mengambil data dari token yang dikirim

#### - Recipe Service

Service ini berfungsi untuk menghandle semua yang berkaitan dengan recipe yang terdaftar dalam pabrik ini. Terdapat empatendpoint utama yaitu :

- [GET] /recipe : mengambil seluruh recipe yang terdaftar
- [GET] /recipe/:recipe_id : mengambil recipe dengan id tertentu
- [POST] /recipe : menambahkan/mendaftarkan recipe baru
- [PUT] /recipe/:recipe_id : mengubah recipe yang sudah ada

#### - Dorayaki Request Service

Service ini berfungsi untuk menghandle semua yang berkaitan dengan recipe yang terdaftar dalam pabrik ini. Terdapat empatendpoint utama yaitu :

- [GET] /dorayaki-request: mengambil seluruh request yang terdaftar
- [GET] /dorayaki-request/:dorayakirequest_id: mengambil request dengan id tertentu
- [POST] /dorayaki-request: menambahkan/mendaftarkan request baru
- [PUT] /dorayaki-request/:dorayakirequest_id: mengubah request yang sudah ada

#### - Ingredient Service

Service ini berfungsi untuk menghandle semua yang berkaitan dengan recipe yang terdaftar dalam pabrik ini. Terdapat empatendpoint utama yaitu :

- [GET] /ingredient: mengambil seluruh ingredient yang terdaftar
- [GET] /ingredient/:ingredient_id: mengambil ingredient dengan id tertentu
- [POST] /ingredient: menambahkan/mendaftarkan ingredient baru
- [PUT] /ingredient/:ingredient_id: mengubah ingredient yang sudah ada

## Pembagian Tugas

- Setup Express : 13519121
- Models: 13519086, 13519121, 13519134
- Auth : 13519134
- Recipe : 13519086
- Dorayaki Request: 13519134
- Mailer : 13519134
- Ingredient: 13519121
