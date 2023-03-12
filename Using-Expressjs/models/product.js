import fs from "fs";
import path from "path";
import { Cart, writeFile } from "./cart.js";
import { __dirname } from "../utils/path.js";

const p = path.join(__dirname, "..", "data", "products.json");

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

export class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        products[existingProductIndex].price === this.price
          ? fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
              if (err) {
                console.log(err);
              }
            })
          : Cart.getCart((cart) => {
              const productInCart = cart.products.find(
                (product) => product.id === this.id
              );

              if (productInCart) {
                const substractOldPrice =
                  cart.totalPrice -
                  products[existingProductIndex].price * productInCart.qty;
                const addNewPrice =
                  +substractOldPrice + +this.price * productInCart.qty;
                const updatedCart = { ...cart, totalPrice: addNewPrice };
                writeFile(updatedCart);
              }

              fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if (err) {
                  console.log(err);
                }
              });
            });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    });
  }

  static deleteById(id) {
    getProductFromFile((products) => {
      const updatedProducts = products.filter((product) => product.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          const deletedProduct = products.find((product) => product.id === id);
          Cart.deleteById(id, deletedProduct.price);
        }
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }

  static findById(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
}
