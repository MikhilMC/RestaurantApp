# RestaurantApp

This is a MEAN stack app for online food ordering from a restaurant. Also a user can select appropriate time period to go and collect their order at the shop. Please note that this app is not for ~~online ordering along with delivery option.~~ **Not yet**.

## Used Technologies

1. MongoDB as database
2. Express.js as server-side framework package for Node.js
3. Angular as front-end framework
4. Node.js as the run-time environment for server side

## Usage

In this repository, Backend folder contains code for the server side, and Client folder have the code for Client side.

To run backend server, type
```bash
cd Backend
nodemon server.js
```
or
```bash
cd Backend
node server.js
```

To run the client side, type
```bash
cd Client
ng serve
```
Please note that, the file **timetable.json** is JSON file for a database, which I have created manually.
It is used for selecting an appropriate time frame for a user to come and pickup their orders. So you also need to import that file to the Mongo db as well, to run this project.

## Todo List

[x] Login and Signup process along authentication and authorization.
[x] Displaying different types categories of food items. (i.e.) _complete menu_, _items with discounts_, _today's special items_, _veg items_.
[x] Displaying a single food item.
[x] Add an item to the cart
[x] Update the quantity of an item in the cart and remove that item from the cart.
[x] Clear the cart completely.
[x] Checkout the cart and select a suitable time frame for the user.
[ ] Implementing payment interface
[ ] Storing the images of the food items in the Mongo db using *GridFS*, and displaying those images from database.
[ ] If the ordering process have exceeded the shop closing time, then alert the user to continue order for the next available day.
[ ] If the item in the cart is not present in today's menu, then it should informed the user, and give the user to remove that item.