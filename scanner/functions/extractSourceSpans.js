function extractSourceSpans(node, isPreformatted) {
        var nocode = /(?:^|\s)nocode(?:\s|$)/;

        var chunks = [];
        var length = 0;
        var spans = [];
        var k = 0;

        function walk(node) {
          var type = node.nodeType;
          if (type == 1) {  // Element
            if (nocode.test(node.className)) { return; }
            for (var child = node.firstChild; child; child = child.nextSibling) {
              walk(child);
            }
            var nodeName = node.nodeName.toLowerCase();
            if ('br' === nodeName || 'li' === nodeName) {
              chunks[k] = '\n';
              spans[k << 1] = length++;
              spans[(k++ << 1) | 1] = node;
            }
          } else if (type == 3 || type == 4) {  // Text
            var text = node.nodeValue;
            if (text.length) {
              if (!isPreformatted) {
                text = text.replace(/[ \t\r\n]+/g, ' ');
              } else {
                text = text.replace(/\r\n?/g, '\n');  // Normalize newlines.
              }
              // TODO: handle tabs here?
              chunks[k] = text;
              spans[k << 1] = length;
              length += text.length;
              spans[(k++ << 1) | 1] = node;
            }
          }
        }

        walk(node);

        return {
          sourceCode: chunks.join('').replace(/\n$/, ''),
          spans: spans
        };
      }