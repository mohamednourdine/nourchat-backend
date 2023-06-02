import compression from "compression";
import cookierSession from "cookie-session";
import cors from "cors";
import { Application, json, urlencoded, Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import helmet from "helmet";
import hpp from "hpp";
import http from "http";

const SERVER_PORT = 6000;

export class NourChatServer {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        this.securityMiddleware(this.app);
        this.standarMiddleware(this.app);
        this.routesMiddleware(this.app);
        this.globalErrorHandler(this.app);

        this.startServer(this.app);

    }

    private securityMiddleware(app: Application): void {
        app.use(
            cookierSession({
                name: 'session',
                keys: ['test1', 'test2'],
                maxAge: 24 * 7 * 3600000,
                secure: false
            })
        );

        app.use(hpp());
        app.use(helmet());

        app.use(
            cors({
                origin: '*',
                credentials: true,
                optionsSuccessStatus: 200,
                methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
            })
        )
    }

    private standarMiddleware(app: Application): void {
        app.use(compression());
        app.use(json({
            limit: '50mb'
        }));
        app.use(urlencoded({
            extended: true,
            limit: '50mb'
        }));
    }

    private routesMiddleware(app: Application): void {}

    private globalErrorHandler(app: Application): void {}

    private async startServer(app: Application): Promise <void> {
        try {
            const httpServer: http.Server = new http.Server(app);
            this.startHttpServer(httpServer);
        } catch (error) {
            console.log(error);
        }        
    }

    private createSocketIO(httpServer: http.Server): void {}

    private startHttpServer(httpServer: http.Server): void {
        httpServer.listen(SERVER_PORT, () => {
            console.log(`Server Running on port ${SERVER_PORT}`);
        });
    }

}