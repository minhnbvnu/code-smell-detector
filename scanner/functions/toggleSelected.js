function toggleSelected (e) {
  if (!multi_selection_enabled) {
    selected = [];
  }

  var sequence = $(e.target).closest('a').data('id');
  var element_index = selected.indexOf(sequence);
  if (element_index === -1) {
    selected.push(sequence);
  } else {
    selected.splice(element_index, 1);
  }

  updateSelectedStyle();
}