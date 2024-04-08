import http from "node:http";
import { AddressInfo } from "node:net";
import bodyParser from "body-parser";
import express, { Express } from "express";

import { config } from "@shared/infrastructure/config";
import { productRouter } from "@infrastructure/rest-api/product/product-router";
import { homeRouter } from "@infrastructure/rest-api/home/home-router";

export class Server {
  private readonly app: Express;
  private httpServer?: http.Server;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use("/", homeRouter);
    this.app.use("/products", productRouter);
  }

  async start(): Promise<void> {
    return new Promise((resolve) => {
      this.httpServer = this.app.listen(config.server.port, () => {
        const { port } = this.httpServer?.address() as AddressInfo;
        console.log(`App is ready and listening on port ${port} 🚀`);
        resolve();
      });
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close((error) => {
          if (error) {
            return reject(error);
          }
          return resolve();
        });
      }

      return resolve();
    });
  }

  getHttpServer(): http.Server | undefined {
    return this.httpServer;
  }
}
