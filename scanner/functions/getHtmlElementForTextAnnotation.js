function getHtmlElementForTextAnnotation(item) {
    var rect = item.rect;

    // sanity check because of OOo-generated PDFs
    if ((rect[3] - rect[1]) < ANNOT_MIN_SIZE) {
      rect[3] = rect[1] + ANNOT_MIN_SIZE;
    }
    if ((rect[2] - rect[0]) < ANNOT_MIN_SIZE) {
      rect[2] = rect[0] + (rect[3] - rect[1]); // make it square
    }

    var container = initContainer(item, false);
    container.className = 'annotText';

    var image  = document.createElement('img');
    image.style.height = container.style.height;
    image.style.width = container.style.width;
    var iconName = item.name;
    image.src = PDFJS.imageResourcesPath + 'annotation-' +
      iconName.toLowerCase() + '.svg';
    image.alt = '[{{type}} Annotation]';
    image.dataset.l10nId = 'text_annotation_type';
    image.dataset.l10nArgs = JSON.stringify({type: iconName});

    var contentWrapper = document.createElement('div');
    contentWrapper.className = 'annotTextContentWrapper';
    contentWrapper.style.left = Math.floor(rect[2] - rect[0] + 5) + 'px';
    contentWrapper.style.top = '-10px';

    var content = document.createElement('div');
    content.className = 'annotTextContent';
    content.setAttribute('hidden', true);

    var i, ii;
    if (item.hasBgColor) {
      var color = item.color;

      // Enlighten the color (70%)
      var BACKGROUND_ENLIGHT = 0.7;
      var r = BACKGROUND_ENLIGHT * (1.0 - color[0]) + color[0];
      var g = BACKGROUND_ENLIGHT * (1.0 - color[1]) + color[1];
      var b = BACKGROUND_ENLIGHT * (1.0 - color[2]) + color[2];
      content.style.backgroundColor = Util.makeCssRgb((r * 255) | 0,
                                                      (g * 255) | 0,
                                                      (b * 255) | 0);
    }

    var title = document.createElement('h1');
    var text = document.createElement('p');
    title.textContent = item.title;

    if (!item.content && !item.title) {
      content.setAttribute('hidden', true);
    } else {
      var e = document.createElement('span');
      var lines = item.content.split(/(?:\r\n?|\n)/);
      for (i = 0, ii = lines.length; i < ii; ++i) {
        var line = lines[i];
        e.appendChild(document.createTextNode(line));
        if (i < (ii - 1)) {
          e.appendChild(document.createElement('br'));
        }
      }
      text.appendChild(e);

      var pinned = false;

      var showAnnotation = function showAnnotation(pin) {
        if (pin) {
          pinned = true;
        }
        if (content.hasAttribute('hidden')) {
          container.style.zIndex += 1;
          content.removeAttribute('hidden');
        }
      };

      var hideAnnotation = function hideAnnotation(unpin) {
        if (unpin) {
          pinned = false;
        }
        if (!content.hasAttribute('hidden') && !pinned) {
          container.style.zIndex -= 1;
          content.setAttribute('hidden', true);
        }
      };

      var toggleAnnotation = function toggleAnnotation() {
        if (pinned) {
          hideAnnotation(true);
        } else {
          showAnnotation(true);
        }
      };

      image.addEventListener('click', function image_clickHandler() {
        toggleAnnotation();
      }, false);
      image.addEventListener('mouseover', function image_mouseOverHandler() {
        showAnnotation();
      }, false);
      image.addEventListener('mouseout', function image_mouseOutHandler() {
        hideAnnotation();
      }, false);

      content.addEventListener('click', function content_clickHandler() {
        hideAnnotation(true);
      }, false);
    }

    content.appendChild(title);
    content.appendChild(text);
    contentWrapper.appendChild(content);
    container.appendChild(image);
    container.appendChild(contentWrapper);

    return container;
  }