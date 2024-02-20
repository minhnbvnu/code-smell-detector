function addClickBlock() {
    if (pendingShow) {
      if (cbEle) {
        cbEle.classList.remove(CSS_HIDE);
      } else {
        cbEle = $document[0].createElement('div');
        cbEle.className = 'click-block';
        $ionicBody.append(cbEle);
        cbEle.addEventListener('touchstart', preventClick);
        cbEle.addEventListener('mousedown', preventClick);
      }
      pendingShow = false;
    }
  }