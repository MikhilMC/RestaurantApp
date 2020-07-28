const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const MenuData = require('../models/MenuData');
const UserData = require('../models/UserData');

const router = express.Router();
const mongoURI = "mongodb://127.0.0.1:27017/Restaurant";

mongoose.connect(mongoURI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
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
