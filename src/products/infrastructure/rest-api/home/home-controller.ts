import { Request, Response } from "express";

export class HomeController {
  constructor() {}

  run(_: Request, res: Response) {
    return res.status(200).json({
      success: true,
      message: "Welcome Edge Bound API",
      data: null,
    });
  }
}
