function renderTabs(params, delay, currentTab) {
  if (params === null) {
    return;
  }

  pageTimer.log("start rendering tab template");

  wins = [];
  var allTabs = (params.allTabs || []).reduce(function(result, obj) {
    if (currentTab && obj.id === currentTab.id) {
      log(obj.id, currentTab.id, obj.id !== currentTab.id, obj, currentTab);
    }
    if (bg.includeTab(obj) && (!currentTab || obj.id !== currentTab.id)) {
      obj.templateTabImage = tabImage(obj);
      obj.templateTitle = encodeHTMLSource(obj.title);
      obj.templateTooltip = stripTitle(obj.title);
      obj.templateUrl = encodeHTMLSource(obj.displayUrl || obj.url);
      index = wins.indexOf(obj.windowId);
      if(index == -1){
        index = wins.length;
        wins.push(obj.windowId)
      }
      obj.winInfo = 'window-' + index;
      result.push(obj);
    }
    return result;
  }, []);

  var closedTabs = (params.closedTabs || []).map(function(obj) {
    obj.templateTabImage = tabImage(obj);
    obj.templateTitle = encodeHTMLSource(obj.title);
    obj.templateTooltip = stripTitle(obj.title);
    obj.templateUrl = encodeHTMLSource(obj.displayUrl || obj.url);
    obj.templateUrlPath = encodeHTMLSource(obj.url);
    return obj;
  });

  let toSearchableObj = function(obj) {
    obj.templateTitle = encodeHTMLSource(obj.title);
    obj.templateTooltip = stripTitle(obj.title);
    obj.templateUrlPath = encodeHTMLSource(obj.url);
    obj.templateUrl = encodeHTMLSource(obj.displayUrl);
    obj.templateId = encodeHTMLSource(obj.id);
    return obj;
  };

  var bookmarks = (params.bookmarks || []).map(toSearchableObj);
  var history = (params.history || []).map(toSearchableObj);

  var actions = (params.actions || []).map(function(obj, index) {
    obj.id = index;
    return obj
  });

  var context = {
    'type': params.type || "all",
    'actions': actions,
    'tabs': allTabs,
    'closedTabs': closedTabs,
    'bookmarks': bookmarks,
    'history': history,
    'closeTitle': "close tab (" + bg.getCloseTabKey().pattern() + ")",
    'tabImageStyle': bg.showFavicons() ? "tabimage" : "tabimage hideicon",
    'urlStyle': bg.showUrls() ? "" : "nourl",
    'urls': bg.showUrls(),
    'tips': bg.showTooltips(),
    'noResults': allTabs.length === 0 && closedTabs.length === 0 && bookmarks.length === 0 && history.length === 0,
    'hasClosedTabs': closedTabs.length > 0,
    'hasBookmarks': bookmarks.length > 0,
    'hasHistory': history.length > 0,
    'hasActions': actions.length > 0
  };

  /**
   * render the templates, the timeout is required to work around issues with Chromes extension rendering on the Mac, refs #91, #168
   */
  setTimeout(function() {
    document.getElementById("content-list").innerHTML = Mustache.to_html(
        document.getElementById('template').text, context
    );

    focusFirst();

    // create a new tab for the window
    let fOpenNewTab = function(e) {
      e.stopPropagation();
      openInNewTab(this.getAttribute('data-path'));

      if (this.classList.contains('closed')) {
        bg.removeClosedTab(this.getAttribute('data-path'));
      }
    };

    $('.closed').on('click', fOpenNewTab);
    $('.bookmark').on('click', fOpenNewTab);
    $('.history').on('click', fOpenNewTab);

    $('.open').on('click', function(e) {
      e.stopPropagation();
      closeWindow();
      bg.switchTabsWithoutDelay(parseInt(this.id));
    });

    $('.close').on('click', function(e) {
      e.stopPropagation();
      closeTabs([parseInt(this.id.substring(1))]);
    });

    $('.remove').on('click', function(e) {
      e.stopPropagation();
      removeBookmark(this.parentNode.parentNode.id);
    });

    /**
     * Since it's unlikely that a user will want to repeat an action we will
     * trigger it and clear the last search string before closing the popup.
     */
    $('.action').on('click', function() {
      actions[parseInt(this.getAttribute('data-action'))].exec();
      bg.setLastSearchedStr("");
      closeWindow();
    });

    pageTimer.log("tab template rendered");
  }, delay || 1);
}