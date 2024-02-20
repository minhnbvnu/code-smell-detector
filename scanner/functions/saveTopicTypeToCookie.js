function saveTopicTypeToCookie(topicName, format) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 1);
    $cookies.put(topicName, format, {'expires': expireDate});
  }