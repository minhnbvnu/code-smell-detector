function delegateHandler(evt, selector, handler) {
  const scopeSelector = `[${randomID}="${randomID}"] `;
  const splittedSelector = selector.split(',');

  let matching = '';

  for (let i = 0; i < splittedSelector.length; i++) {
    const sel = splittedSelector[i];
    matching += `${i === 0 ? '' : ','}${scopeSelector}${sel},${scopeSelector}${sel} *`;
  }


  this.setAttribute(randomID, randomID);

  if (is(evt.target, matching)) {
    handler.call(this, evt);
  }

  this.removeAttribute(randomID);
}