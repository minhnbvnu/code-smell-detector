function addStep(queue, f, t, c, p) {
    var stack = Error().stack.split(/\n/);
    // keep first line, skip 3, keep rest, recombine
    stack = stack.slice(0, 1).concat(stack.slice(4)).join('\n');
    queue.push(partial(f, t, {stack: stack}, c, p));
  }