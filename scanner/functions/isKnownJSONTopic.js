function isKnownJSONTopic(topicName) {
    var a = false;
    angular.forEach(KNOWN_TOPICS.JSON_TOPICS, function (t) {  //todo filter
      if (t == topicName) {
        a = true;
      }
    });
    return a;
  }