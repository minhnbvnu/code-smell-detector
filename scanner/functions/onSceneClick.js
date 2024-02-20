function onSceneClick(e) {
    let info = findLinkInfoFromEvent(e);
    if (info)  {
      bus.fire('show-details', info.link);
    }
  }