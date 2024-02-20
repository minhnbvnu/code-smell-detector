function convertParagraphToLi(paragraphNode, listName, start) {
        var level = paragraphNode._listLevel || lastLevel;
        if (level !== lastLevel) {
          if (level < lastLevel) {
            if (currentListNode) {
              currentListNode = currentListNode.parent.parent;
            }
          } else {
            prevListNode = currentListNode;
            currentListNode = null;
          }
        }
        if (!currentListNode || currentListNode.name !== listName) {
          prevListNode = prevListNode || currentListNode;
          currentListNode = new global$9(listName, 1);
          if (start > 1) {
            currentListNode.attr('start', '' + start);
          }
          paragraphNode.wrap(currentListNode);
        } else {
          currentListNode.append(paragraphNode);
        }
        paragraphNode.name = 'li';
        if (level > lastLevel && prevListNode) {
          prevListNode.lastChild.append(currentListNode);
        }
        lastLevel = level;
        removeIgnoredNodes(paragraphNode);
        trimListStart(paragraphNode, /^\u00a0+/);
        trimListStart(paragraphNode, /^\s*([\u2022\u00b7\u00a7\u25CF]|\w+\.)/);
        trimListStart(paragraphNode, /^\u00a0+/);
      }