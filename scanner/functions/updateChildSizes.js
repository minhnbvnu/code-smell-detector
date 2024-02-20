function updateChildSizes(element, width, height) {
          var expandChild = getExpandChildElement(element);
          var expandWidth = getExpandWidth(width);
          var expandHeight = getExpandHeight(height);
          expandChild.style.width = expandWidth + 'px';
          expandChild.style.height = expandHeight + 'px';
        }