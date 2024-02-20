function isSendMethod(type) {
  if (sendTypeToMethod[type]) {
    return true;
  } else {
    return false;
  }
}