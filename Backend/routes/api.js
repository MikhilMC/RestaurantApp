const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const ObjectId = require('mongoose').Types.ObjectId

const MenuData = require('../models/MenuData');
const UserData = require('../models/UserData');
const CartData = require('../models/CartData');
const TimeTable = require('../models/TimeTable');
const OrderData = require('../models/OrderData');

const router = express.Router();
const mongoURI = "mongodb://127.0.0.1:27017/Restaurant";

mongoose.connect(mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log('Connected to DB');
    }
  }
);

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    res.status(401).send("Unauthorized request");
  }
  let token = req.headers.authorization.split(' ')[1];
  if (token === 'null') {
    res.status(401).send("Unauthorized request");
  }
  try {
    let payload = jwt.verify(token, "secretKey");
    req.userId = payload.subject;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized request");
  }
}

router.post("/signup", (req, res) => {
  UserData.findOne({email: req.body.email}, (error, user) => {
    if (error) {
      res.status(401).send(error);
    } else {
      if (user) {
        res.send({msg: "Email is already used by another user"});
      } else {
        let userData = req.body;
        let user = new UserData(userData);
        user.save((err, signedupUser) => {
          if (err) {
            res.status(401).send(err);
          } else {
            console.log(signedupUser);
            let payload = { subject: signedupUser._id };
            let token = jwt.sign(payload, "secretKey");
            res.status(200).send({token});
          }
        });
      }
    }
  })
});

router.post("/login", (req, res) => {
  UserData.findOne({email: req.body.email}, (error, user) => {
    if (error) {
      res.status(401).send(error);
    } else {
      if (!user) {
        res.send({msg: "Invalid Email"});
      } else if (user.password !== req.body.password) {
        res.send({msg: "invalid Password"});
      } else {
        console.log(user);
        let payload = { subject: user._id };
        let token = jwt.sign(payload, "secretKey");
        res.status(200).send({token});
      }
    }
  });
});

router.get("/get-id", verifyToken, (req, res) => {
  let token = req.headers.authorization.split(' ')[1];
  let payload = jwt.verify(token, "secretKey");
  let userId = payload.subject;
  res.status(200).send({userId});
});

router.get("/cart/:id", verifyToken, (req, res) => {
  let id = new ObjectId(req.params.id)
  CartData.find({userId: id}, (err, cart) => {
    if (err) {
      res.status(401).send(err);
    } else {
      if (cart.length === 0) {
        res.send({msg: "No items in the cart"});
      } else {
        console.log(cart)
        res.status(200).send(cart);
      }
    }
  });
});

router.delete("/cart/:id", verifyToken, (req, res) => {
  let id = new ObjectId(req.params.id);
  console.log(id)
  CartData.find({userId: id}, (err, items) => {
    if(err) {
      res.status(401).send(err)
    } else {
      CartData.deleteMany({userId:id}, (err2, data) => {
        if (err2) {
          res.status(401).send(err)
        } else {
          console.log(data);
          res.status(200).send(items)
        }
      })
    }
  })
});

router.get("/get-timetable", (req, res) => {
  TimeTable.find({}, (err, timeTable) => {
    if (err) {
      res.status(401).send(err)
    } else {
      let date = new Date(Date.now());
      let hours = date.getHours();
      let minutes = date.getMinutes();
      // console.log(hours, minutes);
      timeTable.forEach((timeSlot) => {
        if (timeSlot.orders.length === 15) {
          TimeTable.findOneAndUpdate({_id :timeSlot._id}, {hasClosed: true}, (err, tt) => {
            if (err) {
              res.status(401).send(err);
            } else {
              // res.status(200).send(tt);
            }
          })
        } else {
          if (timeSlot.start.hour <= hours) {
            if (hours <= timeSlot.end.hour) {
              if (timeSlot.start.minute <= minutes) {
                if (minutes <= timeSlot.end.minute) {
                  TimeTable.findOneAndUpdate({_id :timeSlot._id}, {hasClosed: false}, (err, tt) => {
                    if (err) {
                      res.status(401).send(err);
                    } else {
                      // res.status(200).send(tt);
                    }
                  })
                } else {
                  TimeTable.findOneAndUpdate({_id :timeSlot._id}, {hasClosed: true}, (err, tt) => {
                    if (err) {
                      res.status(401).send(err);
                    } else {
                      // res.status(200).send(tt);
                    }
                  })
                }
              } else {
                TimeTable.findOneAndUpdate({_id :timeSlot._id}, {hasClosed: false}, (err, tt) => {
                  if (err) {
                    res.status(401).send(err);
                  } else {
                    // res.status(200).send(tt);
                  }
                })
              }
            } else {
              TimeTable.findOneAndUpdate({_id :timeSlot._id}, {hasClosed: true}, (err, tt) => {
                if (err) {
                  res.status(401).send(err);
                } else {
                  // res.status(200).send(tt);
                }
              })
            }
          } else {
            TimeTable.findOneAndUpdate({_id :timeSlot._id}, {hasClosed: false}, (err, tt) => {
              if (err) {
                res.status(401).send(err);
              } else {
                // res.status(200).send(tt);
              }
            })
          }
        }
      })
      res.status(200).send(timeTable);
    }
  });
});

router.post("/add-to-cart", verifyToken, (req, res) => {
  console.log(req.body);
  let cartData = {};
  cartData.userId = new ObjectId(req.body.userId);
  cartData.name = req.body.name;
  cartData.basicQuantity = req.body.basicQuantity;
  cartData.basicUnit = req.body.basicUnit;
  cartData.basicPrice = req.body.basicPrice;
  cartData.hasDiscount = req.body.hasDiscount;
  cartData.discountPercentage = req.body.discountPercentage;
  cartData.quantity = req.body.quantity;
  cartData.price = req.body.price;
  let searchField = {
    userId: cartData.userId,
    name: cartData.name
  };
  CartData.findOne(searchField, (err, cartItem) => {
    if (err) {
      res.status(401).send(err);
    } else {
      if (cartItem) {
        let replace = {
          quantity: cartItem.quantity + cartData.quantity,
          price: cartItem.price + cartData.price
        }
        CartData.findOneAndUpdate(searchField, replace, (err2, oldCartItem) => {
          if (err2) {
            res.status(401).send(err2);
          } else {
            console.log(oldCartItem);
            res.status(200).send(oldCartItem)
          }
        });
      } else {
        let newCart = new CartData(cartData);
        newCart.save((err3, newCartItem) => {
          if (err3) {
            res.status(401).send(err3);
          } else {
            console.log(newCartItem);
            res.status(200).send(newCartItem);
          }
        });
      }
    }
  });
});

router.get("/cart-item/:id", verifyToken, (req, res) => {
  let id = new ObjectId(req.params.id)
  CartData.findById(id, (err, cartItem) => {
    if (err) {
      res.status(401).send(err);
    } else {
      console.log(cartItem)
      res.status(200).send(cartItem);
    }
  });
})

router.patch("/cart-item/:id", verifyToken, (req, res) => {
  let id = new ObjectId(req.params.id);
  let newItem = {};
  if(req.body.quantity !== 0) {
    newItem.quantity = req.body.quantity;
    newItem.price = req.body.price;
    console.log(id, newItem);
    CartData.findByIdAndUpdate(id, newItem, (err, newCartItem) => {
      if (err) {
        res.status(401).send(err);
      } else {
        console.log(newCartItem);
        res.status(200).send(newCartItem);
      }
    });
  } else {
    res.send("Noting updated")
  }
});

router.delete("/cart-item/:id", verifyToken, (req, res) => {
  let id = new ObjectId(req.params.id);
  CartData.findByIdAndDelete(id, (err, oldCartItem) => {
    if (err) {
      res.status(401).send(err);
    } else {
      console.log(oldCartItem);
      res.status(200).send(oldCartItem);
    }
  });
});

router.post("/checkout/:id", (req, res) => {
  let userId = new ObjectId(req.params.id);
  let timeFrame = new ObjectId(req.body.timeFrameId);
  let items = req.body.cartItems;
  let totalCash = 0;
  items.forEach((item) => {
    totalCash += item.price
  });
  console.log(userId, timeFrame, items, totalCash)
  let orderData = {
    userId,
    items,
    totalCash,
    timeFrame
  }
  let order = new OrderData(orderData);
  order.save((err, orderDetails) => {
    if (err) {
      res.status(401).send(err)
    } else {
      CartData.deleteMany({userId:orderDetails.userId}, (err, data) => {
        if (err) {
          res.status(401).send(err)
        } else {
          console.log(data);
        }
      })
      TimeTable.findByIdAndUpdate(orderDetails.timeFrame, {$push : {orders: orderDetails._id}}, (err, data)=> {
        if (err) {
          res.status(401).send(err)
        } else {
          console.log(data);
        }
      });
      orderDetails.items.forEach((item)=>{
        MenuData.findOne({name: item.name}, (err, menuItem) => {
          if (err) {
            res.status(401).send(err)
          } else {
            let newSoldQunatity = menuItem.soldQunatity + item.quantity
            MenuData.findOneAndUpdate({name: item.name}, 
              {soldQunatity: newSoldQunatity}, 
              (err2, item1) => {
                if (err2) {
                  res.status(401).send(err2)
                } else {
                  console.log(item1);
                }
              }
            );
          }
        });
      });
      res.status(200).send(orderDetails);
    }
  })
});

router.get("/todays-menu", verifyToken, (req, res) => {
  MenuData.find({}, (error, foodItems) => {
    if (error) {
      res.status(401).send(error);
    } else {
      res.status(200).send(foodItems);
    }
  });
});

router.get("/discounts-today", verifyToken, (req, res) => {
  MenuData.find({hasDiscount: true}, (error, discountItems) => {
    if (error) {
      res.status(401).send(error);
    } else {
      res.status(200).send(discountItems);
    }
  })
});

router.get("/todays-special", verifyToken, (req, res) => {
  MenuData.find({isSpecialToday: true}, (error, specialItems) => {
    if (error) {
      res.status(401).send(error);
    } else {
      res.status(200).send(specialItems);
    }
  });
});

router.get("/veg-items", verifyToken, (req, res) => {
  MenuData.find({isItVeg: true}, (error, vegItems) => {
    if (error) {
      res.status(401).send(error);
    } else {
      res.status(200).send(vegItems);
    }
  });
});

router.get("/food-item/:id", verifyToken, (req, res) => {
  let id = req.params.id;
  MenuData.findById(id, (error, foodItem) => {
    if (error) {
      res.status(401).send(error);
    } else {
      res.status(200).send(foodItem);
    }
  })
});

router.get("/", (req, res) => {
  res.send("From api");
})

module.exports = router;
