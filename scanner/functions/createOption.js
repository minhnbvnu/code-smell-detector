function createOption(text, value, selected) {
  const option = document.createElement('media-chrome-option');
  option.part.add('option');
  option.value = value;
  option.selected = selected;

  const label = document.createElement('span');
  label.textContent = text;
  option.append(label);

  return option;
}