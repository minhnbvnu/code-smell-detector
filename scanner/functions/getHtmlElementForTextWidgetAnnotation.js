function getHtmlElementForTextWidgetAnnotation(item, commonObjs) {
    var element = document.createElement('div');
    var width = item.rect[2] - item.rect[0];
    var height = item.rect[3] - item.rect[1];
    element.style.width = width + 'px';
    element.style.height = height + 'px';
    element.style.display = 'table';

    var content = document.createElement('div');
    content.textContent = item.fieldValue;
    var textAlignment = item.textAlignment;
    content.style.textAlign = ['left', 'center', 'right'][textAlignment];
    content.style.verticalAlign = 'middle';
    content.style.display = 'table-cell';

    var fontObj = item.fontRefName ?
      commonObjs.getData(item.fontRefName) : null;
    setTextStyles(content, item, fontObj);

    element.appendChild(content);

    return element;
  }