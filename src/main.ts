// import { Handler, Context } from 'aws-lambda';
// import { Server } from 'http';
// import { createServer, proxy } from 'aws-serverless-express';
// import { eventContext } from 'aws-serverless-express/middleware';

// import { ExpressAdapter } from '@nestjs/platform-express';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// import * as express from 'express';

// // NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// // due to a compressed response (e.g. gzip) which has not been handled correctly
// // by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// // binaryMimeTypes below
// const binaryMimeTypes: string[] = [];

// let cachedServer: Server;

// process.on('unhandledRejection', (reason) => {
//   // tslint:disable-next-line:no-console
//   console.error(reason);
// });

// process.on('uncaughtException', (reason) => {
//   // tslint:disable-next-line:no-console
//   console.error(reason);
// });

// async function bootstrapServer(): Promise<Server> {
//   if (!cachedServer) {
//     try {
//       const expressApp = express();
//       const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
//       nestApp.enableCors();
//       nestApp.use(eventContext());
//       await nestApp.init();
//       cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
//     }
//     catch (error) {
//       return Promise.reject(error);
//     }
//   }
//   return Promise.resolve(cachedServer);
// }

// export const handler: Handler = async (event: any, context: Context) => {
//   cachedServer = await bootstrapServer();
//   return proxy(cachedServer, event, context, 'PROMISE').promise;
// }
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { INestApplication } from '@nestjs/common';
import { Express } from 'express';
import { Server } from 'http';
import { Context } from 'aws-lambda';
import { createServer, proxy, Response } from 'aws-serverless-express';
import * as express from 'express';
import { AppModule } from './app.module';

let cachedServer: Server;
async function createExpressApp(
  expressApp: Express,
): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  return app;
}
async function bootstrap(): Promise<Server> {
  const expressApp = express();
  const app = await createExpressApp(expressApp);
  await app.init();
  return createServer(expressApp);
}
export async function handler(event: any, context: Context): Promise<Response> {
  if (!cachedServer) {
    const server = await bootstrap();
    cachedServer = server;
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
}