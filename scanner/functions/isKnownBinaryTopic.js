function isKnownBinaryTopic(topicName) {
    var a = false;
    angular.forEach(KNOWN_TOPICS.BINARY_TOPICS, function (t) {  //todo filter
      if (t == topicName) a = true;
    });
    return a;
  }