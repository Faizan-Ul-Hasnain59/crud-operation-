import express from "express";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 20);
const PORT = process.env.PORT || 3000;
const app = express(); //in js parenthesis are used to call the function ()

app.use(express.json()); //midleware function

//Making Get Request

// a route path is used to define the URL pattern that a particular route should match
app.get("/", (req, res) => {
  res.send("Hello world by express js");
});

console.log("testing nanoid: " + nanoid());

const products = [
  {
    id: 16, //always a number
    name: "abc product",
    price: "$12.12",
    description: "abc product description",
  },
];

const myObj = {
  message: "all products are found",
  data: products,
};
app.get("/products", (req, res) => {
  res.send(myObj);
});

app.get("/product/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("id", id);
  console.log("type of id", id);

  let isFound = false;

  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      console.log("product mil gya");
      isFound = i;
    }
    break;
  }
  if (isFound === false) {
    res.status(404);
    res.send({
      message: "product not found",
    });
  } else {
    res.send({
      message: "product found with id: " + isFound,
      data: products[isFound],
    });
  }
});
app.post("/product", (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.description) {
    //Both are correct way res.send(`ad`) or .send (`dd`)
    res.status(403).send(`
    required parameter missing. example JSON request body:
    {
      id: 1234, 
      name: "abc product",
      price: "$23.12",
      description: "abc product description" 
    }
    `);
    return;
  }
  products.push({
    id: 17,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  res.status(201).send({ message: "created product" });
});

app.put("/product/:id", (req, res) => {
  if (!req.body.name && !req.body.price && !req.body.description) {
    res.status(403).send(`
      required parameter missing  
      atleast one parameter is required: name, price or description to complete update 
      example JSON body:
      {
        "name": "abc product",
        "price": "$23.12",
        "description": "abc product description" 
      }
    `);
    return;
  }

  let isFound = -1;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === -1) {
    res.status(404).send({
      message: "product not found",
    });
  } else {
    if (req.body.name) products[isFound].name = req.body.name;
    if (req.body.price) products[isFound].price = req.body.price;
    if (req.body.description)
      products[isFound].description = req.body.description;

    res.send({
      message: "product is updated with id: " + products[isFound].id,
      data: products[isFound],
    });
  }
});

app.delete("/product/:id", (req, res) => {
  let isFound = -1;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }

  if (isFound === -1) {
    res.status(404).send({
      message: "product not found",
    });
  } else {
    products.splice(isFound, 1);
    res.send({
      message: "product is deleted",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
