function trackFormatting(selectionTree) {
        for (var i = 0; i < selectionTree.length; i++) {
          var formatTag = jQuery('<' + actionTag + '>'),
            insertNode,
            deleteNode;

          var el = selectionTree[i];

          if (el.children.length > 0) {
            trackFormatting(el.children);
          } else {

            // skip empty text nodes
            if (el.domobj && el.domobj.nodeType === 3 && jQuery.trim(el.domobj.nodeValue).length === 0)
              continue;

            // also skip nodes with selection as none
            if (el.domobj && el.selection === 'none')
              continue;

            // convert domobj into jquery object to be reused
            var $node = jQuery(el.domobj);
            if (el.domobj && el.selection === 'full' && !($node.is('span.del, span.ins') || $node.parents().is('span.del, span.ins'))) {

              // check if current el can be wrapped by tracking tag
              if ((el.domobj.nodeType === 3 || Selection.canTag1WrapTag2('span', el.domobj.tagName)) && jQuery.trim(el.domobj.nodeValue).length > 0) {
                if (actionState) { // means applying format
                  insertNode = formatTag.html($node.clone())[0];
                  deleteNode = $node.clone()[0];
                } else { // means removing format
                  insertNode = $node.clone()[0];
                  deleteNode = formatTag.html($node.clone())[0];
                }

                var insertNode = booktype.tracker.createIceNode('insertType', insertNode);
                $node.after(insertNode);

                var deleteNode = booktype.tracker.createIceNode('deleteType', deleteNode);
                $node.before(deleteNode);

                if ($node.parent().is(actionTag)) $node.unwrap();
                $node.remove();
              } else if (el.domobj.nodeType === 1) {
                // nothing to do here. has no children, also no content i guess
                continue;
              } else {
                // console.log('weird elem? ', el.domobj.nodeValue);
              }
            } else if (el.domobj && el.selection === 'partial') {
              var formatTag = jQuery('<' + actionTag + '>'),
                preText = el.domobj.data.substr(0, el.startOffset),
                middleText = el.domobj.data.substr(el.startOffset, el.endOffset - el.startOffset),
                postText = el.domobj.data.substr(el.endOffset, el.domobj.data.length - el.endOffset);

              if (actionState) {
                insertNode = formatTag.html(middleText)[0];
                deleteNode = document.createTextNode(middleText);
              } else {
                insertNode = document.createTextNode(middleText);
                deleteNode = formatTag.html(middleText)[0];
              }

              var insertNode = booktype.tracker.createIceNode('insertType', insertNode);
              var deleteNode = booktype.tracker.createIceNode('deleteType', deleteNode);
              $.each([postText, insertNode, deleteNode, preText], function (id, domNode) {
                $node.after(domNode);
              });
              $node.remove();
            }
          }
        }
      }