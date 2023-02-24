"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const aws_serverless_express_1 = require("aws-serverless-express");
const express = require("express");
let cachedServer;
function createExpressApp(expressApp) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressApp));
        return app;
    });
}
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        const expressApp = express();
        const app = yield createExpressApp(expressApp);
        yield app.init();
        return (0, aws_serverless_express_1.createServer)(expressApp);
    });
}
function handler(event, context) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!cachedServer) {
            const server = yield bootstrap();
            cachedServer = server;
        }
        return (0, aws_serverless_express_1.proxy)(cachedServer, event, context, 'PROMISE').promise;
    });
}
exports.handler = handler;
//# sourceMappingURL=main.js.map