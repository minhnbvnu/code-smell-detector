function precacheFiberNode(hostInst, node) {
  node[internalInstanceKey] = hostInst;
}