import database from "../utils/database.js";
import { Cart } from "./cart.js";

export class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    return database.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUE (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static deleteById(id) {
    return database.execute("DELETE FROM products WHERE id = ?", [id]);
  }

  static fetchAll() {
    return database.execute("SELECT * FROM products");
  }

  static findById(id) {
    return database.execute("SELECT * FROM products WHERE id = ?", [id]);
  }
}
