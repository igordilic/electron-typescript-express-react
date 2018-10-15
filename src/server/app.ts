import * as express from 'express';
import * as bodyParser from 'body-parser';
import { App } from 'electron';
import * as print from '../lib/print';
const PORT: number = parseInt(process.env.PORT) || 3000;

export function createServer(app: App) {
  const server = express();
  const router = express.Router();
  const documentsPath = app.getPath('documents');

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // router.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  //   // logging
  //   console.log(`[Request]: ${req.header} ${req.body}`);
  //   next();
  // });

  router.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello, Evia!');
  });

  server.use('/api', router);

  router.route('/print')
    .post((req: express.Request, res: express.Response) => {
      console.log(print);
      console.log('Printing via express api');
      print.printOut(documentsPath, req.body.text);
    });

  server.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
  });
}
