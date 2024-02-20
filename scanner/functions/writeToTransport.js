function writeToTransport(board, data) {
  board.pending++;
  board.transport.write(Buffer.from(data), () => board.pending--);
}