function postqueue(variable) {
    if (--variable._indegree === 0) {
      queue.push(variable);
    }
  }