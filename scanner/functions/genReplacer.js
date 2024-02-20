function genReplacer(callback) {
        function makeReplacementNode(fill, matchIndex) {
          var match = matches[matchIndex];
          if (!match.stencil) {
            match.stencil = callback(match);
          }
          var clone = match.stencil.cloneNode(false);
          clone.setAttribute('data-mce-index', matchIndex);
          if (fill) {
            clone.appendChild(dom.doc.createTextNode(fill));
          }
          return clone;
        }
        return function (range) {
          var before;
          var after;
          var parentNode;
          var startNode = range.startNode;
          var endNode = range.endNode;
          var matchIndex = range.matchIndex;
          var doc = dom.doc;
          if (startNode === endNode) {
            var node_1 = startNode;
            parentNode = node_1.parentNode;
            if (range.startNodeIndex > 0) {
              before = doc.createTextNode(node_1.data.substring(0, range.startNodeIndex));
              parentNode.insertBefore(before, node_1);
            }
            var el = makeReplacementNode(range.match, matchIndex);
            parentNode.insertBefore(el, node_1);
            if (range.endNodeIndex < node_1.length) {
              after = doc.createTextNode(node_1.data.substring(range.endNodeIndex));
              parentNode.insertBefore(after, node_1);
            }
            node_1.parentNode.removeChild(node_1);
            return el;
          }
          before = doc.createTextNode(startNode.data.substring(0, range.startNodeIndex));
          after = doc.createTextNode(endNode.data.substring(range.endNodeIndex));
          var elA = makeReplacementNode(startNode.data.substring(range.startNodeIndex), matchIndex);
          for (var i = 0, l = range.innerNodes.length; i < l; ++i) {
            var innerNode = range.innerNodes[i];
            var innerEl = makeReplacementNode(innerNode.data, matchIndex);
            innerNode.parentNode.replaceChild(innerEl, innerNode);
          }
          var elB = makeReplacementNode(endNode.data.substring(0, range.endNodeIndex), matchIndex);
          parentNode = startNode.parentNode;
          parentNode.insertBefore(before, startNode);
          parentNode.insertBefore(elA, startNode);
          parentNode.removeChild(startNode);
          parentNode = endNode.parentNode;
          parentNode.insertBefore(elB, endNode);
          parentNode.insertBefore(after, endNode);
          parentNode.removeChild(endNode);
          return elB;
        };
      }