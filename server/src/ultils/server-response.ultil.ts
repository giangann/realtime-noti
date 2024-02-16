import { Response } from "express";

export class ServerResponse {
  static error(res: Response, error: string, status: number = 400) {
    res.status(status);
    res.json({
      success: false,
      error: { name: "Backend Error", message: error },
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
