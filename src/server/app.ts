import * as express from 'express';
import * as bodyParser from 'body-parser';
import { App } from 'electron';

const PORT: number = parseInt(process.env.PORT) || 3000;

export function createServer(app: App) {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello, Evia!');
  });

  server.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
  });
}



