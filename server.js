// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const { getUserWithEmail, getProduct, createListing, featuredProductsList, getUserById, getProductsBySellerId, deleteProductBySellerId, updateToSoldByProductId, updateToNotSoldByProductId, getAllProducts, getProductsBetweenPrice, getProductsByMaxPrice, getProductsByMinPrice, getProductsByName, getUserEmailByProductId, getUserEmailByUserId} = require("./database");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();


//BCrypt
const bcrypt = require("bcryptjs");


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const { user } = require("pg/lib/defaults");
// const registerRoutes = require("./routes/register");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/api/users", usersRoutes(db));
app.use("/api/widgets", widgetsRoutes(db));
// app.use("/api/register", registerRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

const cart = {}
const favorites = {}
const msg = {}

app.get("/", (req, res) => {
  getUserById(req.session.user_id)
  .then(userData => {
    return userData;
  })

  .then (userData => {
    featuredProductsList()
      .then(products => {
      const templateVars = {
        products: products,
        user: userData,
        seller: req.session.seller_id
      }

      res.render("index", templateVars)
    })
  })
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

app.get("/register", (req, res) => {
  getUserById(req.session.user_id)
  .then(userData => {
    const templateVars = {
      user: userData,
      seller: req.session.seller_id

    }
    res.render("register_view", templateVars);
  })
});

app.post("/register", (req, res) => {
  const userName = req.body.name;
  const userEmail = req.body.email;
  const userPassword = req.body.password;
  const userAddress = req.body.address;
  const userCountry = req.body.country;
  const userProvince = req.body.province;
  const userCity = req.body.city;
  const userPostal = req.body.postal;
  const userPasswordHashed = bcrypt.hashSync(userPassword, 10);
  const queryUserParams = [userName, userEmail, userPasswordHashed, userCountry, userAddress, userCity, userProvince, userPostal];

  const sellerAccount = req.body.account;
  const sellerRouting = req.body.routing;
  const querySellerParams = [sellerAccount, sellerRouting]


  return db.query(`
  INSERT INTO users (name, email, password, country, street, city, province, postal)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `, queryUserParams)
  .then(data => {
    req.session.user_id = data.rows[0].id; //cookie
    console.log(req.session.user_id)

    if (sellerAccount && sellerRouting) {
      return db.query (`
      INSERT INTO sellers (user_id, bank_account, routing)
      VALUES ($1, $2, $3)
      RETURNING *;
      `, [data.rows[0].id, sellerAccount, sellerRouting])
      .then (data => {
        console.log(data.rows[0])
        req.session.seller_id = data.rows[0].id
        console.log("register req.session", req.session)
        res.redirect("/");
      })
    }

    res.redirect("/");
    // console.log("data.rows[0] is: ", data.rows[0])
    return data.rows[0];
  })
  .catch(error => {
    console.log(error.message);
  })


});

app.get("/error1", (req, res) => {

  getUserById(req.session.user_id)
  .then(userData => {
    const templateVars = {
      user: userData,
      seller: req.session.seller_id
    }
    res.render("error1", templateVars);
  })

})

app.get("/error2", (req, res) => {

  getUserById(req.session.user_id)
  .then(userData => {
    const templateVars = {
      user: userData,
      seller: req.session.seller_id
    }
    res.render("error2", templateVars);
  })


})



app.get("/login", (req, res) => {
  getUserById(req.session.user_id)
  .then(userData => {
    const templateVars = {
      user: userData,
      seller: req.session.seller_id
    }
    res.render("login_view", templateVars);
  })
});

app.post("/login", (req, res) => {
  const loginEmail = req.body.email;
  const loginPassword = req.body.password;
  const login =  function(email, password) {
    return getUserWithEmail(email)
    .then(user => {
      console.log(user)
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }

  login(loginEmail, loginPassword)
      .then(user => {
        if (!user) {
          res.send({error: "error"});
          return;
        }
        req.session.user_id = user.id;
        req.session.seller_id = user.seller_id
        // res.send({user: {name: user.name, email: user.email, id: user.id}});
        return res.redirect("/");
      })
      .catch(e =>  {
        console.error(e)
      });


})

app.get("/newlisting", (req, res) => {
  if (req.session.seller_id) {
  getUserById(req.session.user_id)
  .then(userData => {
    const templateVars = {
      user: userData,
      seller: req.session.seller_id

    }
    res.render("newlisting", templateVars);
  })
  } else {
    res.redirect("error2")
  }
});

app.post("/newlisting", (req,res) => {
  const valueArray = [req.session.seller_id,      //FIRST VALUE WHICH IS SELLER ID, TO BE REPLACED WITH REQ.SESSION
  req.body.product_name,
  req.body.description,
  req.body.price,
  req.body.starting_quantity,
  req.body.hiddenImgUrl]

  createListing(valueArray)
  .catch(error => {
    console.log(error.message)
  })
  .then(res.redirect(`/newlisting`))
})

app.get("/products/:product_id", (req, res) => {
  getUserById(req.session.user_id)
  .then(userData => {
    return userData;
  })

  .then (userData => {
    getProduct(req.params.product_id)
    .then(product => {
      const templateVars = {
        seller: req.session.seller_id,
        user: userData,
        name: product[0].name,
        price: product[0].price / 100,
        stock: product[0].stock,
        description: product[0].description,
        image: product[0].image,
        product_id: req.params.product_id,
        sold: product[0].sold
      }
      // console.log(product[0].name)
      res.render("product", templateVars)
    })
  })
});

app.post('/products/:product_id', (req, res) => {

  getProduct(req.params.product_id)
  .then(data => {
    return cart[Object.keys(cart).length + 1] = data[0]
  })
  .then(data => {
    updateToSoldByProductId(req.params.product_id)
    return data
  })
  .then(data => {

    res.redirect(`/products/${req.params.product_id}`)
  })

})

app.get("/cart", (req, res) => {

  if (req.session.user_id) {

  getUserById(req.session.user_id)
  .then(userData => {
    const templateVars = {
      user: userData,
      cartItem: cart,
      total: 0,
      seller: req.session.seller_id

    }
    console.log(templateVars['cartItem'])
      res.render("cart", templateVars)
  })
} else {
  res.redirect("error1")
}
})




app.get("/cart.json", (req, res) => {
  res.json(cart)
})

app.get("/products", (req, res) => {
  getUserById(req.session.user_id)
  .then(userData => {
    return userData
  })
  .then(userData => {
    getAllProducts()
    .then(data => {
      const templateVars = {
        user: userData,
        seller: req.session.seller_id,
        product: data
      }
      console.log(templateVars['product'])
      res.render("browse", templateVars);

    })
  })
})


app.get("/logout", (req, res) => {
  req.session = null
  res.redirect("/")
})

app.get("/favorites", (req, res) => {
  getUserById(req.session.user_id)
  .then(userData => {
    if(req.session.user_id) {
      const templateVars = {
        user: userData,
        favorites: favorites,
        seller: req.session.seller_id

      }

      res.render("favorites", templateVars)

    } else {
      res.redirect("error1")
    }

  })
})

app.post("/favorites/:product_id", (req, res) => { //I still don't change the WELCOME (name) on navbar here

if (req.session.user_id) {
  getProduct(req.params.product_id)
  .then(data => {
    favorites[Object.keys(favorites).length + 1] = data[0]
  })

  res.redirect(`/products/${req.params.product_id}`)
} else {

  res.redirect("/error1")
}

})
app.get("/sellerlistings", (req,res) => {
if (req.session.seller_id) {
  getUserById(req.session.user_id)
  .then(userData => {
    return userData
  })
  .then(userData => {
    getProductsBySellerId(req.session.seller_id)
    .then(data => {
      const templateVars = {
        products: data,
        seller: req.session.seller_id,
        user:userData
      }
      res.render("sellerlistings", templateVars)

    })
  })
} else {
  res.redirect("error2")
}
})

app.post("/sellerlistings/:product_id", (req,res) => {

if (req.session.seller_id) {
   deleteProductBySellerId(req.session.seller_id, req.params.product_id)
  .then(data => {
    res.redirect("/sellerlistings")
  })
} else {
  res.redirect("error2")
}
})

app.post("/cart/:product_id", (req, res) => {

  if (req.session.user_id) {

    updateToNotSoldByProductId(req.params.product_id)
    .then(data => {
      for (let key in cart) {
        if (cart[key].id == req.params.product_id)
        delete cart[key]
      }
      res.redirect("/cart")
    })
  } else {
    res.redirect("/error1")
  }
})

app.post("/favorites/:product_id/remove", (req, res) => {

  if (req.session.user_id) {

    for (let key in favorites) {
      if (favorites[key].id == req.params.product_id)
      delete favorites[key]
    }
    res.redirect("/favorites")
  } else {
    res.redirect("/error1")
  }
  })

app.post("/search", (req,res) => {
  getUserById(req.session.user_id)
  .then(userData => {
    return userData
  })
  .then(userData => {
    getProductsByName(req.body.search)
    .then(data => {
      const templateVars = {
        user: userData,
        seller: req.session.seller_id,
        product: data
      }
      console.log(templateVars['product'])
      res.render("browse", templateVars);

    })
  })

})


app.post("/filter", (req, res) => {

  if (req.body.min && req.body.max) {

    getUserById(req.session.user_id)
    .then(userData => {
      return userData
    })
    .then(userData => {
     getProductsBetweenPrice(req.body.min * 100, req.body.max * 100)
      .then(data => {
        const templateVars = {
          user: userData,
          seller: req.session.seller_id,
          product: data
        }
        console.log(templateVars['product'])
        res.render("browse", templateVars);

      })
    })

  } else if (req.body.min && !req.body.max) {

    getUserById(req.session.user_id)
    .then(userData => {
      return userData
    })
    .then(userData => {
     getProductsByMinPrice(req.body.min * 100)
      .then(data => {
        const templateVars = {
          user: userData,
          seller: req.session.seller_id,
          product: data
        }
        console.log(templateVars['product'])
        res.render("browse", templateVars);

      })
    })
  } else if (!req.body.min && req.body.max) {

    getUserById(req.session.user_id)
    .then(userData => {
      return userData
    })
    .then(userData => {
     getProductsByMaxPrice(req.body.max * 100)
      .then(data => {
        const templateVars = {
          user: userData,
          seller: req.session.seller_id,
          product: data
        }
        console.log(templateVars['product'])
        res.render("browse", templateVars);

      })
    })

  }

})


app.post("/send/:product_id", (req,res) => {

  if (req.session.user_id) {

    getUserEmailByProductId(req.params.product_id)
    .then(result => {
      console.log(result)
      msg['to'] = result[0].email
      msg['from'] = 'petstoremidterm@gmail.com'
      msg['subject'] = result[0].subject
      msg['html'] = `${req.body.msg_box} <br>Click <a href="http://localhost:8080/sendmessage/${req.session.user_id}">Here</a> To Respond`
      sgMail.send(msg)
      .then(() => {
        console.log('Email Sent')
      })
      .catch((error) => {
        console.error(error)
      })
    })
    res.redirect(`/products/${req.params.product_id}`)
  } else {
    res.redirect("/error1")
  }
})


app.get("/sendmessage", (req,res) => {

  if (req.session.user_id) {

    getUserById(req.session.user_id)
    .then(userData => {
      const templateVars = {
        user: userData,
        seller: req.session.seller_id,
        value: req.params.userid
      }
      res.render("send", templateVars)
    })
  } else {
    res.redirect("error1")
  }
})

app.post("/sendmessage", (req,res) => {
  if (req.session.user_id) {

    getUserEmailByUserId(req.body.userid)
    .then(result => {
      console.log(result)
      console.log(req.body.message)

      msg['to'] = result[0].email
      msg['from'] = 'petstoremidterm@gmail.com'
      msg['subject'] = req.body.subject
      msg['html'] = `${req.body.message} <br>Click <a href="http://localhost:8080/sendmessage/${req.session.user_id}">Here</a> To Respond`

      sgMail.send(msg)
      .then(res => {
        console.log('Email Sent')
      })
      .catch(error => {
        console.error(error)
      })
      res.redirect("/sendmessage")
    })

  } else {
    res.redirect("error1")
  }

  })

app.get("/sendmessage/:userid", (req,res) => {

  if (req.session.user_id) {

    getUserById(req.session.user_id)
    .then(userData => {
      const templateVars = {
        user: userData,
        seller: req.session.seller_id,
        value: req.params.userid
      }
      res.render("send", templateVars)
    })
  } else {
    res.redirect("/error1")
  }
})
