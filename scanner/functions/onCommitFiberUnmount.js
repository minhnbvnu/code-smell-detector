function onCommitFiberUnmount(rendererID, fiber) {
    const rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      rendererInterface.handleCommitFiberUnmount(fiber);
    }
  }