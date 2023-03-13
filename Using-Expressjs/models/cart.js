import fs from "fs";
import path from "path";
import { __dirname } from "../utils/path.js";

const p = path.join(__dirname, "..", "data", "cart.json");
export const writeFile = (data) => {
  fs.writeFile(p, JSON.stringify(data), (err) => console.log(err));
};

export class Cart {
  static addProduct(id, productPrice) {
    //Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //Analsye the cart, find existing products
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      // Add new product, increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;
      writeFile(cart);
    });
  }

  static deleteById(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const cart = JSON.parse(fileContent);
      const product = cart.products.find((product) => product.id === id);
      if (!product) {
        return;
      }
      const productQuantity = product.qty;
      const updatedCartProduct = cart.products.filter(
        (product) => product.id !== id
      );
      const updatedCart = { ...cart, products: updatedCartProduct };
      updatedCart.totalPrice -= productPrice * productQuantity;
      writeFile(updatedCart);
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
}
