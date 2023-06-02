import { NourChatServer } from "./setupServer";
import express, { Express } from "express";

class Application{
    public initialize(): void{
        const app: Express = express();
        const server: NourChatServer = new NourChatServer(app);
        server.start();
    }
}

const application: Application = new Application();
application.initialize();