import Router from "express";
import express, {Request, Response} from "express";
import {getNameCount}  from "./repo";

class App {
  public express: express.Application;

  public constructor() {
    /**
     * Sets up express and router
     */
    const router = Router();

    router.get("/name-count/:name", this.getNameCount);
    this.express = express();
    this.express.use(router);
  }

  /**
   * used in router to call repo. Repo acts as core and repository (in a CLEAN architecture)
   * @param req 
   * @param res 
   */
  private getNameCount(req: Request, res: Response) {
    res.send(getNameCount(req.params.name));
  }
}

export default new App().express;
