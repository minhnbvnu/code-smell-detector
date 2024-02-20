function __removeClassLike(classList, classNameLike) {
  for (let i = classList.length - 1; i >= 0; i--) {
    const item = classList.item(i);
    if (item.indexOf(classNameLike) > -1) classList.remove(item);
  }
}