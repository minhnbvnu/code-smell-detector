function changeList(element, itemName, add, remove) {
    var s = element.className || '';
    var list = s.split(/\s+/g);
    if (list[0] === '') {
      list.shift();
    }
    var index = list.indexOf(itemName);
    if (index < 0 && add) {
      list.push(itemName);
    }
    if (index >= 0 && remove) {
      list.splice(index, 1);
    }
    element.className = list.join(' ');
    return (index >= 0);
  }