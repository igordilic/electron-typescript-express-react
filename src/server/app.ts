import * as express from 'express';
import * as bodyParser from 'body-parser';
import { App, IpcRenderer } from 'electron';
import { printOut } from '../lib/print';


const PORT: number = parseInt(process.env.PORT) || 3000;

export function createServer(app: App) {
  const docPath: string = app.getPath('documents');
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello, Evia!');
  });

  server.get('/print', (req: express.Request, res: express.Response) => {
    const text = req.query.text;
    console.log('sebt to print ' + text);
    printOut(docPath, text);
  });

  server.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
  });
}
