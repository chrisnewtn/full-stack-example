'use strict';

const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Hello World!');
});

server.listen(process.env.APP_PORT, () => {
  const {address, port, family} = server.address();
  console.log(`Server running at http://${address}:${port}/ (${family})`);
});

// Without listening to this signal, our app will ignore Docker's requests
// to shutdown. This means it would always take 10 seconds to close our app.
// By listening to SIGTERM, shutting down takes milliseconds.
process.on('SIGTERM', () => {
  server.close(() => {
    console.warn('Process quitting gracefully...');
    process.exit(0);
  });

  setTimeout(() => {
    console.warn('Process quitting forcefully...');
    process.exit(1);
  }, 5000);
});
