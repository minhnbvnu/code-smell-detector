function delete_cache(key) {
        return localforage.removeItem(key);
      }