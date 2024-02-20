function registerHandlebarsFilterLoopHelper(name, predicate) {
  Handlebars.registerHelper(name, (list, block) => {
    const filteredList = R.filter(predicate, list);
    const lastIndex = filteredList.length - 1;

    return filteredList
      .map((node, index) =>
        block.fn(node, {
          data: { index, first: index === 0, last: index === lastIndex },
        })
      )
      .join('');
  });
}