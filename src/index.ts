import * as http from 'http';
import * as fs from 'fs';
import { nnrs } from './nnrs';

let _port = parseInt(process.env.PORT) || 3000;
let _status_path = process.env.STATUS_PATH || '';

if (_status_path.length == 0 || !fs.existsSync(_status_path)) {
  console.log('Nagios status file not found:', _status_path);
  process.exit(1);
}

console.log('Status file path:', _status_path);
let _nnrs = new nnrs(_status_path);

const server = http.createServer(_nnrs.express);
server.listen(_port);
server.on('listening', onListening);

function onListening(): void {
  console.log('Delivering nagios status on:', server.address());
}
