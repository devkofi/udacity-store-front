# UDACITY STOREFRONT BACKEND

---
## PROJECT OVERVIEW

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm install` in your terminal at the project root.
<br/><br/>

---

## PROJECT TASKS

The main goal is to build an API for a shopping application. In this project you will:
* Draft a database schema that covers all the data requirements.
* Draft a map of endpoints to expose for the frontend.

#### _Database Setup_
* Create a connection to a Postgres database from the provided Node application.
* Add tables and columns according to the database schema doc from step 1.

#### _Create Models_
* Create models that facilitate CRUD operations on the database tables.
* Create a test suite for each model in Jasmine.

#### _Create API Endpoints_
* Create handler files for each model.
* In each handler file, create RESTful endpoints for each model method.
* Create a test suite that covers each endpoint with Jasmine.

# REQUIRED TECHNOLOGIES
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

Find [project rubric, here](https://review.udacity.com/#!/rubrics/3061/view).

**The final implementation of the project showcases my abilities to build a backend API for an online store.**
<br/><br/>

---
## FOLDERS AND FILES
* build :  `build`
* spec : `spec`
* src : `src`
* package : `package.json`
* tsconfig : `tsconfig.json`
<br/><br/>

---
## INSTALL NODE PACKAGES

### _Install Dependencies_. 
<br/>

```bash
npm install
```
<br/>

---

## SET ENVIRONMENT VARIABLES

* Convert `.env-example` to `.env`
* Set the following environment variables
<br/>

```bash
POSTGRES_HOST=
POSTGRES_PORT=
POSTGRES_DB=
POSTGRES_TEST_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
BCRYPT_PEPPER=
SALT_ROUNDS=
TOKEN_SECRET=
JASMINE_TEST_PASSWORD=
```
<br/>

---

## POSTGRES DATABASE SETUP

#### INSTALL POSTGRES
Download at https://www.postgresql.org/download/windows/

#### CREATE DATABASES 

* `storedb`
* `testdb` for unit testing

#### DATABASE PORT 

```bash
5432
```
#### CREATE DATABASE MIGRATION 

```bash
npm run migrate-up
```
<br/>

---
## START PROJECT

### _Build_:  
```bash
npm run build
```

### _Start Server_:  
```bash
npm run start
```

### _Watch_:  
```bash
npm run watch
```

Start server at http://localhost:3000

<br/>

---


# FORMATTING

### _Run Linter_:  
```bash
npm run lint
```
<br/>

### _Run Prettier_:  
```bash
npm run prettier
```
<br/>

---

# TESTING

### _Jasmine_:  
```bash
npm install -g jasmine
npm run test
```
<br/>

---

# ENVIRONMENT

#### _Production_:  
```bash
ENV=dev
```
#### _Test_:  
```bash
ENV=test
```
<br/><br/>