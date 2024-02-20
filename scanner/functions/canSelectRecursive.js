function canSelectRecursive(e) {
            return e.nodeName === 'BODY' || e.type !== 'hidden' && e.style.display !== 'none' && e.style.visibility !== 'hidden' && canSelectRecursive(e.parentNode);
          }