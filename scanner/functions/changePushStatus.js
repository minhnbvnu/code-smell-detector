function changePushStatus(status) {
    fabPushElement.dataset.checked = status;
    fabPushElement.checked = status;
    if (status) {
      fabPushElement.classList.add('active');
      fabPushImgElement.src = '../images/push-on.png';
    }
    else {
     fabPushElement.classList.remove('active');
     fabPushImgElement.src = '../images/push-off.png';
    }
  }