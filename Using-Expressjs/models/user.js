import { ObjectId } from "mongodb";

export class User {
  constructor(userName, email, cart, id) {
    this.userName = userName;
    this.email = email;
    this.cart = cart;
    this._id = id;
  }

  static findById(userId) {
    const db = getDb();
    return db.collection("users").findOne({ _id: new ObjectId(userId) });
  }

  save() {
    const db = getDb();
    return db.collection("users").insertOne(this);
  }

  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map(
      (cartProduct) => cartProduct.productId
    );

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((product) => ({
          ...product,
          quantity: this.cart.items.find(
            (cartProduct) =>
              cartProduct.productId.toString() === product._id.toString()
          ).quantity,
        }));
      })
      .then((cartProducts) => cartProducts)
      .catch((err) => {
        console.log(err);
      });
  }

  addToCart(product) {
    const db = getDb();
    const cartProductIndex = this.cart.items.findIndex(
      (cartProduct) =>
        cartProduct.productId.toString() === product._id.toString()
    );
    const updatedCartItems = [...this.cart.items];
    const updatedCart = {
      items: updatedCartItems,
    };

    if (cartProductIndex >= 0) {
      updatedCartItems[cartProductIndex].quantity += 1;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: 1,
      });
    }

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }

  removeFromCart(product) {
    const db = getDb();

    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $pull: { "cart.items": { productId: product._id } } }
      );
  }

  getOrders() {
    const db = getDb();

    return db
      .collection("orders")
      .find({ "user._id": new ObjectId(this._id) })
      .toArray();
  }

  addOrder() {
    const db = getDb();

    return this.getCart()
      .then((products) => {
        const order = {
          items: products,
          user: { _id: new ObjectId(this._id), name: this.userName },
        };
        return db.collection("orders").insertOne(order);
      })
      .then(() => {
        this.cart = { items: [] };
        return db
          .collection("users")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
