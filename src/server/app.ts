import * as express from 'express';
import * as bodyParser from 'body-parser';
import { App } from 'electron';
import * as print from '../lib/print';
import * as fs from 'fs';
import { format } from 'url';
import { join } from 'path';
const PORT: number = parseInt(process.env.PORT) || 3000;

export function createServer(app: App) {
  const server = express();
  const router = express.Router();
  const documentsPath = app.getAppPath(); // app.getPath('documents');

  server.use(bodyParser.text({ type: 'text/html'}));
  server.use(bodyParser.urlencoded({ extended: true }));

  router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    // logging
    console.log(`[Request]: ${req.header} ${req.body}`);
    next();
  });

  router.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello, Evia!');
  });

  server.use('/api', router);

  router.route('/print')
    .post((req: express.Request, res: express.Response) => {
      console.log(print);
      console.log('Printing via express api');
      const pathFile = format({
        pathname: join(documentsPath, 'print.html'),
      });
      fs.writeFile(pathFile, req.body, () => print.printOut(documentsPath));
    });

  server.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
  });
}
