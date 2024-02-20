function cargo(worker, payload) {
  return queue(worker, 1, payload);
}