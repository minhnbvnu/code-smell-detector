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