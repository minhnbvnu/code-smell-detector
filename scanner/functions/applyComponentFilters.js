function applyComponentFilters(componentFilters) {
    hideElementsWithTypes.clear();
    hideElementsWithDisplayNames.clear();
    hideElementsWithPaths.clear();
    componentFilters.forEach(componentFilter => {
      if (!componentFilter.isEnabled) {
        return;
      }

      switch (componentFilter.type) {
        case types["a" /* ComponentFilterDisplayName */]:
          if (componentFilter.isValid && componentFilter.value !== '') {
            hideElementsWithDisplayNames.add(new RegExp(componentFilter.value, 'i'));
          }

          break;

        case types["b" /* ComponentFilterElementType */]:
          hideElementsWithTypes.add(componentFilter.value);
          break;

        case types["d" /* ComponentFilterLocation */]:
          if (componentFilter.isValid && componentFilter.value !== '') {
            hideElementsWithPaths.add(new RegExp(componentFilter.value, 'i'));
          }

          break;

        case types["c" /* ComponentFilterHOC */]:
          hideElementsWithDisplayNames.add(new RegExp('\\('));
          break;

        default:
          console.warn(`Invalid component filter type "${componentFilter.type}"`);
          break;
      }
    });
  }