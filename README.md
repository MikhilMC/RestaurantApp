# RestaurantApp

This is a MEAN stack app for online food ordering from a restaurant. Also a user can select appropriate time period to go and collect their order at the shop. A single time frame is 15 minutes. Whenever a timeframe contains 15 orders, that timeframe is closed. Also when a time frame is exceeded, that timeframe also gets closed. Please note that this app is not for ~~online ordering along with delivery option.~~ **At least, not yet**. This web app is for the normal users only. The users with admin privilages can use another web app [RestaurantAppAdmin](https://github.com/MikhilMC/RestaurantAppAdmin)

## Used Technologies

1. **MongoDB** as database
2. **Express.js** as server-side framework package for Node.js
3. **Angular** as front-end framework
4. **Node.js** as the run-time environment for server side

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

## Database Used

The database used here is **Restaurant**. The collections used are:

* __userdatas__ for storing user information.

* __fooditems__ for storing the information about the whole food items. (_This collection is not used for normal users_). This collection is completely managed by the admin users.

* __todaymenuitems__ for storing information about today's menu. (_This collection is also managed by admin users._) When a normal user places an order, the server can add that quantity to the sold quantity field of this collection.

* __cartdatas__ store all the food items which are stored in the cart. The users can access their cart items by user id.

* __timetable__ for storing the time frame data. This database is manually created now. I am hoping that in near future, I can automate that process too, by creating the time frames by admins. Whenever a user places the order, that order id is pushed to the order field array of this collection.

* __orderdata__ for storing data about whole orders.

## Todo List

- [x] Login and Signup process along authentication and authorization.

- [x] Displaying different types categories of food items. (i.e.) _complete menu_, _items with discounts_, _today's special items_, _veg items_.

- [x] Displaying a single food item.

- [x] Add an item to the cart

- [x] Update the quantity of an item in the cart and remove that item from the cart.

- [x] Clear the cart completely.

- [x] Checkout the cart and select a suitable time frame for the user.

- [ ] Implementing payment interface

- [ ] Storing the images of the food items in the Mongo db using *GridFS*, and displaying those images  straight from the database.

- [ ] If the ordering process have exceeded the shop closing time, then alert the user to continue order for the next available day.

- [ ] If the item in the cart is not present in today's menu, then it should informed the user, and give the option for user to remove that item.

- [ ] Displaying, cancelling and editing the orders.