function getTitle(item) {
  var title = item.title;
  if(item.parent.title){
    return getTitle(item.parent) + ' :: ' + title;
  }

  return title;
}