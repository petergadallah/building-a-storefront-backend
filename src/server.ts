import express, { Request, Response } from "express";
import cors from  "cors"
import userRoute from "./handlers/usershandlers";
import orderRoute from "./handlers/ordershandlers";
import productRoute from "./handlers/productshandlers";
import dashboardRoutes from "./handlers/dashboardhandler";
const app: express.Application = express();
const port = process.env.port;

app.use(cors());
app.use(express.json());

function listeneing() {
  console.log(`Works at port ${port}`);
}
app.listen(port, listeneing);

userRoute(app);
orderRoute(app);
productRoute(app);
dashboardRoutes(app);
export default app;
