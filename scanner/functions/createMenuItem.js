function createMenuItem({ type, text, value, checked }) {
  const item = document.createElement('media-chrome-menu-item');

  item.type = type ?? '';

  item.part.add('menu-item');
  if (type) item.part.add(type);

  item.value = value;
  item.checked = checked;

  const label = document.createElement('span');
  label.textContent = text;
  item.append(label);

  return item;
}