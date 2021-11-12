# How To Run & Deploy

1. Make A Directory on VPS
```sh
mkdir apps/backend
```

2. CD to that directory
```sh
cd apps/backend
```

3. Clone the repository
```sh
git clone https://github.com/michaelpege/express-ts-sequelize-boilerplate .
```

4. Copy the .env.copy to .env and configure the domain on .env
```sh
cp .env.copy .env
```

4. Change the domain and email on docker-compose.yaml
```sh
nano docker-compose.yaml
```

5. Change the domain and email on scripts/init-letsencrypt.sh
```sh
nano scripts/init-letsencrypt.sh
```

6. Change the domain and port on data/nginx/app.conf.sh
```sh
nano scripts/init-letsencrypt.sh
```

7. Allow init-letsencrypt.sh to write file
```sh
chmod +x scripts/init-letsencrypt.sh
```

8. Run init-letsencrypt.sh
```sh
sudo scripts/init-letsencrypt.sh
```

9. All done!