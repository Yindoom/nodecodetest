import Router from "express";
import express, {Request, Response, json, urlencoded } from "express";
import cors from "cors";
import {getNameCount}  from "./repo";

class App {
  public express: express.Application;

  public constructor() {
    const router = Router();

    router.get("/name-count/:name", this.getNameCount);
    this.express = express();
    this.express.use(router);
  }

  private getNameCount(req: Request, res: Response) {
    res.send(getNameCount(req.params.name));
  }
}

export default new App().express;
