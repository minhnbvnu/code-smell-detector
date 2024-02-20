function TestImageHandler() {
  let loadCount = 0;
  let deleteCount = 0;

  return {
    imageLoader: x => {
      loadCount++;
      return Promise.resolve(x);
    },
    imageDeleter: x => {
      deleteCount++;
    },
    loadCount: () => loadCount,
    deleteCount: () => deleteCount
  };
}