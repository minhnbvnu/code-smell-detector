function getSelectedItems() {
  return selected.reduce(function (arr_objects, id) {
    arr_objects.push(getOneSelectedElement(id));
    return arr_objects
  }, []);
}