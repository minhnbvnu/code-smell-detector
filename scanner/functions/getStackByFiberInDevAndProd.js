function getStackByFiberInDevAndProd(workTagMap, workInProgress, currentDispatcherRef) {
  try {
    let info = '';
    let node = workInProgress;

    do {
      info += describeFiber(workTagMap, node, currentDispatcherRef); // $FlowFixMe[incompatible-type] we bail out when we get a null

      node = node.return;
    } while (node);

    return info;
  } catch (x) {
    return '\nError generating stack: ' + x.message + '\n' + x.stack;
  }
}