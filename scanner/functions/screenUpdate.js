function screenUpdate() {
  if (checkForTrackers) {
    for (let item of facebookDetectedElementsArr) {
      positionFacebookBadge(item);
    }
  }
}