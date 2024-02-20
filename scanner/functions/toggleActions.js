function toggleActions() {
  var one_selected = selected.length === 1;
  var many_selected = selected.length >= 1;
  var only_image = getSelectedItems()
    .filter(function (item) { return !item.is_image; })
    .length === 0;
  var only_file = getSelectedItems()
    .filter(function (item) { return !item.is_file; })
    .length === 0;

  $('[data-action=use]').toggleClass('d-none', !(many_selected && only_file));
  $('[data-action=rename]').toggleClass('d-none', !one_selected);
  $('[data-action=preview]').toggleClass('d-none', !(many_selected && only_file));
  $('[data-action=move]').toggleClass('d-none', !many_selected);
  $('[data-action=download]').toggleClass('d-none', !(many_selected && only_file));
  $('[data-action=resize]').toggleClass('d-none', !(one_selected && only_image));
  $('[data-action=crop]').toggleClass('d-none', !(one_selected && only_image));
  $('[data-action=trash]').toggleClass('d-none', !many_selected);
  $('[data-action=open]').toggleClass('d-none', !one_selected || only_file);
  $('#multi_selection_toggle').toggleClass('d-none', usingWysiwygEditor() || !many_selected);
  $('#actions').toggleClass('d-none', selected.length === 0);
  $('#fab').toggleClass('d-none', selected.length !== 0);
}