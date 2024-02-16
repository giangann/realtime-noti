import { Response } from "express";

export class ServerResponse {
  static error(res: Response, errorMessage: string, status: number = 400) {
    res.status(status);
    res.json({
      success: false,
      error: { name: "Backend Error", message: errorMessage },
    });
  }

  static response(
    res: Response,
    data: any,
    status: number = 200,
    cookie?: { key: string; value: any }
  ) {
    res.status(status);
    if (cookie) {
      const { key, value } = cookie;
      res.cookie(key, value);
    }
    res.json({ data, success: true });
  }
}
