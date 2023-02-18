import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import { expressCspHeader, INLINE, NONE, SELF } from "express-csp-header";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import path from "path";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "http://localhost:5001/"], // scripts from example.com are now trusted
    objectSrc: ["'none'"],
    upgradeInsecureRequests: [],
  },
});
/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((error) => console.log(`${error} did not connect`));
app.listen(PORT, () =>
  // Product.insertMany(dataProduct),
  // ProductStat.insertMany(dataProductStat)
  // User.insertMany(dataUser);
  // Transaction.insertMany(dataTransaction)
  // OverallStat.insertMany(dataOverallStat)
  // AffiliateStat.insertMany(dataAffiliateStat)
  console.log(`Server Port: ${PORT}`)
);

const dirname = path.resolve();
app.use(express.static(path.join(dirname, "./client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(dirname, "./client/build/index.html"))
);
