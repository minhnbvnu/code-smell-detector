function mergeParam(parent, child) {
  child.param.forEach(param => {
    let rootParam = parent.param.find(p => p.name === param.name);
    if (rootParam && rootParam.children && param.children) {
      rootParam.children = rootParam.children
        .slice()
        .concat(param.children)
        // unique set
        .filter((p, index, array) => {
          let item = array.find(pa => pa.name === p.name);
          return array.indexOf(item) === index;
        });
    }
  });
}