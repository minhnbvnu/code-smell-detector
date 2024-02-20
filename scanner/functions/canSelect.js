function canSelect(el) {
            return /INPUT|TEXTAREA|BUTTON/.test(el.tagName) && global$2.get(e.id) && el.tabIndex !== -1 && canSelectRecursive(el);
          }