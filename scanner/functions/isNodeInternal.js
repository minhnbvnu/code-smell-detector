function isNodeInternal (line) {
    return (~line.indexOf('(timers.js:')) ||
      (~line.indexOf('(events.js:'))      ||
      (~line.indexOf('(node.js:'))        ||
      (~line.indexOf('(module.js:'))      ||
      (~line.indexOf('GeneratorFunctionPrototype.next (native)')) ||
      false
  }