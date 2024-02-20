function getBlockStyle(block) {
  var type = block.getType();
  var data = block.getData();
  var text = block.getText();

  var mergedStyle = "";
  switch (type) {
    case 'blockquote':
      mergedStyle = 'RichEditor-blockquote';
      break;
  }

  if (!data.has("textAlignment")) {
    return mergedStyle;
  }
  switch (data.get("textAlignment")) {
    case 'left':
      mergedStyle += ' RichEditor-alignment-left';
      break;
    case 'center':
      mergedStyle += ' RichEditor-alignment-center';
      break;
    case 'right':
      mergedStyle += ' RichEditor-alignment-right';
      break;
    case 'justify':
      mergedStyle += ' RichEditor-alignment-justify';
      break;
  }

  return mergedStyle;
}