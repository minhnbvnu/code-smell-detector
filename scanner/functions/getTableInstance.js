function getTableInstance(head) {
  return new Table({
    head,
    style: {
      head: ['green'],
      border: [] //disable colors for the border
    }
  });
}