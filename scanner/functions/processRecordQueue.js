function processRecordQueue() {
  onMutate(recordQueue);
  recordQueue.length = 0;
}