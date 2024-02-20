function onPostCommitFiberRoot(rendererID, root) {
    const rendererInterface = rendererInterfaces.get(rendererID);

    if (rendererInterface != null) {
      rendererInterface.handlePostCommitFiberRoot(root);
    }
  }