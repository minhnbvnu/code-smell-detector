function breakLeftOf(limit, copy) {
            // Clone shallowly if this node needs to be on both sides of the break.
            var rightSide = copy ? limit.cloneNode(false) : limit;
            var parent = limit.parentNode;
            if (parent) {
              // We clone the parent chain.
              // This helps us resurrect important styling elements that cross lines.
              // E.g. in <i>Foo<br>Bar</i>
              // should be rewritten to <li><i>Foo</i></li><li><i>Bar</i></li>.
              var parentClone = breakLeftOf(parent, 1);
              // Move the clone and everything to the right of the original
              // onto the cloned parent.
              var next = limit.nextSibling;
              parentClone.appendChild(rightSide);
              for (var sibling = next; sibling; sibling = next) {
                next = sibling.nextSibling;
                parentClone.appendChild(sibling);
              }
            }
            return rightSide;
          }