# Blog Service API

## Setup and Run

### Step 1: Install Docker 
- Following this [stite](https://docs.docker.com/get-docker)

### Step 2: Run command
**Need admin permission**
- Update ormconfig.ts file
```
{
    "type": "mysql",
    "host": "mysqlDb",
    "port": 3306,
    "username":Get <your dbuser>,
    "password": <your password>,
    "database": "blog",
    "entities": [
        "dist/entities/**/*.js"
    ],  
    "cli": {
        "entitiesDir": "src/entities"
    },
    "synchronize": true
}
```

- Update dock-compose.yml file
```
...
services:
    ...
    mysqlDb:
        ...
        environment:
            MYSQL_ROOT_PASSWORD: <your password>
            MYSQL_DATABASE: blog
```
- Then run command:

```
docker-compose up
```
- If you meet Error: "Client does not support authentication protocol requested by server; consider upgrading MySQL client"
- Open 1 more command line and excute following commands:

```
docker ps
```

- Copy CONTAINER ID of the container which image's name is mysql:8 or mysql:lastest
- Run command:

```
docker exec -it <CONTAINER ID> /bin/bash
```

- You will get inside terminal of container
- Excute:

```
mysql -u root -p
```

* Input "root" as password

```
mysql> ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '<your password>';
mysql> FLUSH PRIVILEGES;
mysql> exit
```

- Run again
```
docker-compose up
```

## API

### /user/signup
- Method POST

**body**
```
{
	"fullname": string,
	"username": string,
	"password": string,
	"email": string,
	"phone": string
}
```

### /user/signin
- Method POST
- Return Token

**body**
```
{	
	"username": string,
	"password": string,
}
```

### /user
**Token required**
- Method GET

- Method PUT

**body**
```
    "id": string
    "fullname": string,
    "password": string,
    "email": string,
    "DoB": string,
    "phone": string, 
```

### /blog
**Token required**
- Method Get

- Method POST

**body**
```
{
	"title": string,
	"content": string
}
```

- Method PUT

**body**
```
{
    "id": string,
	"title": string,
	"content": string
}
```

### /blog/:id
**Token requried**
- Method GET

- Method DELTE

### /comment
**Token requried**
- Method POST

**body**
```
{
	"content": string,
	"idBlog": string
}
```
- Method PUT

**body**
```
{
	"id": string,
	"content": string
}
```

### /comment/:id
**Token requried**
- Method GET

- Method DELETE

### /comment/sub
**Token required**
- Method POST

**body**
```
{
	"content": string,
	"idComment": string
}
```
### /rate
**Token requried**
- Method POST

**body**
```
{
	"rating": number,
	"idBlog": string,
    "idUser": string
}
```
- Method PUT

**body**
```
{
	"id": string,
	"rating": string
}
```

### /rate/:id
**Token requried**
- Method GET

- Method DELETE


## Stop running image

```
docker-compose down
```