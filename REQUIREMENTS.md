# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### Product
- id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- email
- password

#### Orders
- id
- product_id
- product_quantity
- user_id
- order_status (active or complete)

<br/>

---




# END POINTS

## USER ENDPOINT
#### _Get Request_
* Index :  `http://localhost:3000/users`
* Show _(Authentication Required)_ : `http://localhost:3000/users/:id`

#### _Post Request_
* Sign Up :  `http://localhost:3000/users/signup`
* Login :  `http://localhost:3000/users/login`

#### _Delete Request_
* Delete _(Authentication Required)_:  `http://localhost:3000/users/:id`

<br/>

## PRODUCT ENDPOINT
#### _Get Request_
* Index :  `http://localhost:3000/products`
* Show :  `http://localhost:3000/products/:id`
* Popular Products : `http://localhost:3000/products/popular/:limit`
* Products By Category : `http://localhost:3000/products/category/:category`

#### _Post Request_
* Create _(Authentication Required)_  :  `http://localhost:3000/products/`

#### _Put Request_
* Update _(Authentication Required)_  :  `http://localhost:3000/products/update`


#### _Delete Request_
* Delete _(Authentication Required)_ :  `http://localhost:3000/products/:id`

<br/>

## ORDER ENDPOINT

#### _Get Request_
* Index _(Authentication Required)_ :  `http://localhost:3000/orders`
* Show _(Authentication Required)_ :  `http://localhost:3000/orders/:id`
* Completed Orders _(Authentication Required)_ :  `http://localhost:3000/:user_id/:order_status`
    
#### _Post Request_
* Create _(Authentication Required)_ :  `http://localhost:3000/orders`

#### _Delete Request_
* Delete _(Authentication Required)_ :  `http://localhost:3000/orders/:id`
  