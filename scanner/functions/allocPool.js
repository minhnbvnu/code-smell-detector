function allocPool() {
  pool = new SlowBuffer(Buffer.poolSize);
  pool.used = 0;
}