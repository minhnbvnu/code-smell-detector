function checkIsControlTopic(topicName) {
      var isControlTopic = false;
      angular.forEach(KNOWN_TOPICS.CONTROL_TOPICS, function (controlTopicPrefix) {
        if (topicName.lastIndexOf(controlTopicPrefix, 0) === 0)
          isControlTopic = true;
      });
      return isControlTopic;
    }