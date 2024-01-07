function doSearch(searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    const lastSearchTerm = search.lastSearchTerm;
    if (searchTerm === lastSearchTerm) {
      return;
    }

    // Avoid layout reflow by scrolling to top first.
    search.$navList.scrollTop(0);
    search.lastSearchTerm = searchTerm;
    search.clearManualToggles();

    if (searchTerm.length < minInputForSearch) {
      const state = searchTerm.length && expandAllOnInputWithoutSearch ? 'search-started' : 'search-empty';
      search.changeStateClass(state);
      if (lastSearchTerm !== undefined && lastSearchTerm.length >= minInputForSearch) {
        // Restore the original, sorted order
        search.$navList.append(search.getClassList());
      }
      if (state === 'search-empty' && search.$currentItem) {
        search.manualToggle(search.$currentItem, true);
      }
      search.lastClasses = undefined;
    } else {
      search.changeStateClass('searching');
      const beginOnly = searchTerm.length < minInputForFullText;
      const getSearchWeight = getWeightFunction(searchTerm, allowRegex);
      const re = constructRegex(searchTerm, function (searchTerm) {
        return new RegExp((beginOnly ? '\\b' : '') + searchTerm);
      }, allowRegex);
      const navList = search.$navList.get(0);
      const classes = [];
      const searchState = {};
      search.getClassList().each(function (i, classEntry) {
        const className = classEntry.dataset.longname;
        if (!(className in searchState) && re.test(classEntry.dataset.name)) {
          const cls = searchState[className] = {
            item: classEntry,
            // Do the weight thing
            weight: getSearchWeight(classEntry, beginOnly) * 100000,
            subItems: {}
          };
          classes.push(cls);
          classEntry.classList.add('match');
        }
      });
      search.getMembers().each(function (i, li) {
        const name = li.dataset.name;
        if (re.test(name)) {
          const itemMember = li.parentElement.parentElement;
          const classEntry = itemMember.parentElement;
          const className = classEntry.dataset.longname;
          let cls = searchState[className];
          if (!cls) {
            cls = searchState[className] = {
              item: classEntry,
              weight: 0,
              subItems: {}
            };
            classes.push(cls);
            classEntry.classList.add('match');
          }
          cls.weight += getSearchWeight(li, true);
          const memberType = itemMember.dataset.type;
          let members = cls.subItems[memberType];
          if (!members) {
            members = cls.subItems[memberType] = {
              item: itemMember,
              subItems: {}
            };
            itemMember.classList.add('match');
          }
          members.subItems[name] = { item: li };
          li.classList.add('match');
        }
      });
      classes.sort(function (a, b) {
        return b.weight - a.weight;
      });
      clearOldMatches(search.lastState, searchState);
      search.lastState = searchState;
      search.lastClasses = classes;

      for (let i = 0, ii = classes.length; i < ii; ++i) {
        navList.appendChild(classes[i].item);
      }
    }
  }