function hasSelectionCapabilities(elem) {
  const nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return (
    nodeName &&
    ((nodeName === 'input' &&
      (elem.type === 'text' ||
        elem.type === 'search' ||
        elem.type === 'tel' ||
        elem.type === 'url' ||
        elem.type === 'password')) ||
      nodeName === 'textarea' ||
      elem.contentEditable === 'true')
  );
}