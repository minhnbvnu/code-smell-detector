function mediateItem(mediator) {
  const def = initSeemple(this);
  const { length } = this;

  // store itemMediator in object definition
  const itemMediator = def.itemMediator = createItemMediator({
    arr: this,
    mediator
  });

  // convert existing items
  for (let i = 0; i < length; i++) {
    this[i] = itemMediator(this[i], i);
  }

  return this;
}