function findAllCurrentHostFibers(id) {
    const fibers = [];
    const fiber = findCurrentFiberUsingSlowPathById(id);

    if (!fiber) {
      return fibers;
    } // Next we'll drill down this component to find all HostComponent/Text.


    let node = fiber;

    while (true) {
      if (node.tag === HostComponent || node.tag === HostText) {
        fibers.push(node);
      } else if (node.child) {
        node.child.return = node;
        node = node.child;
        continue;
      }

      if (node === fiber) {
        return fibers;
      }

      while (!node.sibling) {
        if (!node.return || node.return === fiber) {
          return fibers;
        }

        node = node.return;
      }

      node.sibling.return = node.return;
      node = node.sibling;
    } // Flow needs the return here, but ESLint complains about it.
    // eslint-disable-next-line no-unreachable


    return fibers;
  }