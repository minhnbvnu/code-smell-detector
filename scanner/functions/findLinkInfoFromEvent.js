function findLinkInfoFromEvent(e) {
    const id = e.target && e.target.id;
    let linkInfo = linkAnimator.getLinkInfo(id);
    if (!linkInfo) {
      let linkId = getNearestLink(e.clientX, e.clientY);
      linkInfo = linkAnimator.getLinkInfo(linkId);
    }
    return linkInfo;
  }