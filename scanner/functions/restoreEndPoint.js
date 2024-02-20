function restoreEndPoint(start) {
        var container, offset, node;
        var nodeIndex = function (container) {
          var node = container.parentNode.firstChild, idx = 0;
          while (node) {
            if (node === container) {
              return idx;
            }
            if (node.nodeType !== 1 || node.getAttribute('data-mce-type') !== 'bookmark') {
              idx++;
            }
            node = node.nextSibling;
          }
          return -1;
        };
        container = node = bookmark[start ? 'startContainer' : 'endContainer'];
        offset = bookmark[start ? 'startOffset' : 'endOffset'];
        if (!container) {
          return;
        }
        if (container.nodeType === 1) {
          offset = nodeIndex(container);
          container = container.parentNode;
          DOM$1.remove(node);
          if (!container.hasChildNodes() && DOM$1.isBlock(container)) {
            container.appendChild(DOM$1.create('br'));
          }
        }
        bookmark[start ? 'startContainer' : 'endContainer'] = container;
        bookmark[start ? 'startOffset' : 'endOffset'] = offset;
      }