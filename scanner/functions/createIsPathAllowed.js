function createIsPathAllowed(key, secondaryCategory) {
    // This function helps prevent previously-inspected paths from being dehydrated in updates.
    // This is important to avoid a bad user experience where expanded toggles collapse on update.
    return function isPathAllowed(path) {
      switch (secondaryCategory) {
        case 'hooks':
          if (path.length === 1) {
            // Never dehydrate the "hooks" object at the top levels.
            return true;
          }

          if (path[path.length - 2] === 'hookSource' && path[path.length - 1] === 'fileName') {
            // It's important to preserve the full file name (URL) for hook sources
            // in case the user has enabled the named hooks feature.
            // Otherwise the frontend may end up with a partial URL which it can't load.
            return true;
          }

          if (path[path.length - 1] === 'subHooks' || path[path.length - 2] === 'subHooks') {
            // Dehydrating the 'subHooks' property makes the HooksTree UI a lot more complicated,
            // so it's easiest for now if we just don't break on this boundary.
            // We can always dehydrate a level deeper (in the value object).
            return true;
          }

          break;

        default:
          break;
      }

      let current = key === null ? currentlyInspectedPaths : currentlyInspectedPaths[key];

      if (!current) {
        return false;
      }

      for (let i = 0; i < path.length; i++) {
        current = current[path[i]];

        if (!current) {
          return false;
        }
      }

      return true;
    };
  }