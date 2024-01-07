constructor(node, name, value) {
    this[_parent] = node;
    this[$nodeName] = name;
    this[$content] = value;
    this[$consumed] = false;
  }