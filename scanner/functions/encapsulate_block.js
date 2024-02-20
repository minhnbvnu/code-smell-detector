function encapsulate_block(block, attr2) {
        for (const selector of block.selectors) {
          if (selector.type === "PseudoClassSelector" && selector.name === "global") {
            remove_global_pseudo_class(selector);
          }
        }
        let i = block.selectors.length;
        while (i--) {
          const selector = block.selectors[i];
          if (selector.type === "PseudoElementSelector" || selector.type === "PseudoClassSelector") {
            if (selector.name !== "root" && selector.name !== "host") {
              if (i === 0)
                code.prependRight(selector.start, attr2);
            }
            continue;
          }
          if (selector.type === "TypeSelector" && selector.name === "*") {
            code.update(selector.start, selector.end, attr2);
          } else {
            code.appendLeft(selector.end, attr2);
          }
          break;
        }
      }