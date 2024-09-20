const http = require('node:http');

const handlers = require('./handlers');

const PORT = 3000;

http.createServer((req, res) => {
    for (let handler of handlers) {
        if (!handler(req, res)) {
            break;
        }
    }
}).listen(PORT);

console.log(`Server started. Listening on port: ${PORT}`);
