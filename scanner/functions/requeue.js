function requeue(pathToQueue = this) {
  if (pathToQueue.removed) return;
  const contexts = this.contexts;

  for (const context of contexts) {
    context.maybeQueue(pathToQueue);
  }
}