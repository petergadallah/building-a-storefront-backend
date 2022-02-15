import request from "supertest";
import app from "../server";
import user from "../models/users";
import Product from "../models/products";
import Order from "../models/orders";

const userstore = new user();
const productstore = new Product();
const orderstore = new Order();

describe("testing user models.", () => {
  it("create a new user", async () => {
    const person = await userstore.create({
      username: "peter",
      password: "15135",
    });
    expect(person.username).toEqual("peter");
  });

  it("anthenticate a user", async () => {
    const newperson = await userstore.authenticate("grbsrv", "6d18e");
    expect(newperson).toEqual(null);
  });

  it("listing all users", async () => {
    const list = await userstore.index();
    expect(list.length).toBeGreaterThanOrEqual(0);
  });

  it("showing user", async () => {
    const newuser = await userstore.create({
      username: "andrew",
      password: 'eefwvax',
    });
    const x = newuser.id;
    const thenewuser = await userstore.show(`${x}`);
    expect(thenewuser.username).toEqual("andrew");
  });

});

describe("testing product models.", () => {
  it("listing products", async () => {
    const list = await productstore.index();
    expect(list.length).toBeGreaterThanOrEqual(0);
  });

  it("creating products", async () => {
    const newproduct = await productstore.create({
      name: "tested product",
      price: 20,
    });
    expect(newproduct.name).toEqual("tested product");
    expect(newproduct.price).toEqual(20);
  });

  it("updating products", async () => {
    const newproduct = await productstore.create({
      name: "tested product",
      price: 20,
    });
    const x = newproduct.id;
    const updatedProduct = await productstore.update(
      {
        name: "updated product",
        price: 151,
      },
      `${x}`
    );
    expect(updatedProduct.name).toEqual("updated product");
    expect(updatedProduct.price).toEqual(151);
  });

  it("showing product", async () => {
    const newproduct = await productstore.create({
      name: "tested product",
      price: 20,
    });
    const x = newproduct.id;
    const newproductt = await productstore.show(`${x}`);
    expect(newproductt.price).toBeGreaterThan(0);
  });

  it("deleting product", async () => {
    const newproduct = await productstore.delete("1");
    expect(newproduct).toBe(`product 1 deleted`);
  });
});

describe("testing order models.", () => {
  it("listing orders", async () => {
    const list = await orderstore.index();
    expect(list.length).toBeGreaterThanOrEqual(0);
  });
  it("creating order", async () => {
    const neworder = await orderstore.create({
      status: "tested order",
      user_id: "1",
    });
    expect(neworder.status).toEqual("tested order");
    expect(neworder.user_id).toEqual("1");
  });

  it("showing order", async () => {
    const neworder = await orderstore.create({
      status: "tested order",
      user_id: "1",
    });
    const x = neworder.id;
    const showedorder = await orderstore.show(`${x}`);
    expect(showedorder.status).toEqual("tested order");
  });

  it("updating orders", async () => {
    await userstore.create({
      username: "peter",
      password: "15135",
    });
    const newproduct = await orderstore.create({
      status: "tested order",
      user_id: "1",
    });
    const x = newproduct.id;

    const updatedProduct = await orderstore.update(
      {
        status: "updated order",
        user_id: "2",
      },
      `${x}`
    );
    expect(updatedProduct.status).toEqual("updated order");
    expect(updatedProduct.user_id).toEqual("2");
  });

  it("deleting order", async () => {
    const neworder = await orderstore.delete("1");
    expect(neworder).toBe(`order 1 deleted`);
  });
});

describe("testing routes.", () => {
  it("index order", (done) => {
    request(app)
      .get("/indexorder")
      .expect(200)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("create order", (done) => {
    request(app)
      .post("/createorder")
      .send({
        status: "new status",
        user_id: "1",
      })
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("update order", (done) => {
    request(app)
      .post("/updateorder/1")
      .send({
        name: "updated order",
        price: "10",
      })
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("show order", (done) => {
    request(app)
      .get("/showorder/1")
      .expect(200)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("delete order", (done) => {
    request(app)
      .delete("/deleteorder/1")
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("join: /", (done) => {
    request(app)
      .post("/orders/1/products")
      .send({
        quantity: "115",
        productId: "1",
      })
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("index product", (done) => {
    request(app)
      .get("/indexproduct")
      .expect(200)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("show product", (done) => {
    request(app)
      .get("/showproduct/1")
      .expect(200)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("create product", (done) => {
    request(app)
      .post("/createproduct")
      .send({
        name: "adsfasdf",
        price: "20",
      })
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("update product", (done) => {
    request(app)
      .post("/updateproduct/1")
      .send({
        name: "updated product",
        price: "10",
      })
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("delete product", (done) => {
    request(app)
      .delete("/deleteproduct/1")
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("create user", (done) => {
    request(app)
      .post("/createuser")
      .send({
        username: "peter",
        password: "15727",
      })
      .expect(200)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("auth user", (done) => {
    request(app)
      .post("/authuser")
      .send({
        username: "peter",
        password: "15727",
      })
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("index users", (done) => {
    request(app)
      .get("/indexuser")
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("show a specific user", (done) => {
    request(app)
      .get("/showuser/1")
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("join", (done) => {
    request(app)
      .get("/join")
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("mostexpensive", (done) => {
    request(app)
      .get("/mostexpensive")
      .send({
        username: "peter",
        password: "15727",
      })
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });

  it("userswithorders", (done) => {
    request(app)
      .get("/userswithorders")
      .expect(401)
      .end((err) => (err ? done.fail(err) : done()));
  });
});
