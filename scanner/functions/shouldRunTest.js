function shouldRunTest(t) {
  if (!testWorker) {
    t.comment('Worker test is browser only');
    t.end();
    return false;
  }

  return true;
}