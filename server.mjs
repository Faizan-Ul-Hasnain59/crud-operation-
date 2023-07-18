import express from "express";
import { customAlphabet } from "nanoid";
const nanoid = customAlphabet("1234567890", 20);

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world!");
});

let products = [
  {
    id: nanoid(),
    name: "abc product",
    description: "abc product description",
  },
];
app.get("/", (req, res) => {
  res.send({
    message: "all products",
    data: products,
  });
});

app.get("/product/:id", (req, res) => {
  console.log(typeof req.params.id);
  if (isNan(req.params.id)) {
    res.status(404).send("invalid product id");
  }
  let isFound = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === req.params.id) {
      isFound = i;
      break;
    }
  }
  if (isFound === false) {
    res.status(404);
    res.send({
      message: "product not found",
    });
  } else {
    res.send({
      message: "product found with id: " + products[isFound].id,
      data: products[isFound],
    });
  }
});
app.post("/product", (req, res) => {
  if (!req.body.name || !req.body.price || !req.body.description) {
    res.status(404).send(`
    required parameter missing. example json request body; 
    {
    name: "abc product",
    price: "$23.12",
    description: "abc product description"       
  }`);
  }
  products.push({
    id: nanoid(),
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  });
  res.send(201).send({ meesage: "created product" });
});
app.put("/product:id", (req, res) => {
  if (!req.body.name && !req.body.price && !req.body.description) {
    res.status(403).send(`
    required parameter missing 
    atleast one paramter is required: name, price or description to complete update 
    example json request body: 
    `);
  }
  let isFound = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i] === req.params.id) {
      isFound = i;
      break;
    }
  }
  if (isFound === false) {
    res.status(404);
    res.send({
      message: "product not found",
    });
  } else {
    if (req.body.name) products[isFound].name = req.body.name;
    if (req.body.price) products[isFound].price = req.body.price;
    if (req.body.description)
      products[isFound].description = req.body.description;
    {
      res.send({
        message: "product is updated with " + products[isFound].id,
        data: products[isFound],
      });
    }
    {
    }
  }
  app.delete("/product/:id", (req, res) => {
    let isFound = false;

    for (let i = 0; i < products.length; i++) {
      if (products[i].id === req.params.id) {
        isFound = i;
        break;
      }
    }
    if (isFound === false) {
      res.status(404);
      res.send({
        message: "product not found",
      });
    } else {
      products.splice(isFound, 1);

      res.send({
        message: "product is deleted",
      });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
