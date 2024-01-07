function clearOldMatches(lastState, searchState) {
    for (let itemName in lastState) {
      const lastItem = lastState[itemName];
      const item = searchState[itemName];
      if (!item) {
        lastItem.item.classList.remove('match');
      }
      if (lastItem.subItems) {
        clearOldMatches(lastItem.subItems, (item || dummy).subItems);
      }
    }
  }