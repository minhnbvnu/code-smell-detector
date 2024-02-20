function ensureInitialHTMLIsCleared(container) {
      if (container._hasInitialHTMLBeenCleared) {
        return;
      }

      container.innerHTML = '';
      container._hasInitialHTMLBeenCleared = true;
    }