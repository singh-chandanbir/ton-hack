import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  credentials: true,
};
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});
const port = 3000;

let idx = 1;

app.get('/hello', (req, res) => {
  res.send('Hello World!');
});

io.on('connection', (socket) => {
  console.log('a user connected', socket.id);

  socket.on('playerCoordinates', (data) => {
    console.log('Received coordinates:', data);
    // Process or store the data as needed
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', idx);
  });
});

app.listen(port, () => {
  io.listen(4000);
  console.log(`Server is running on http://localhost:${port}`);
});
