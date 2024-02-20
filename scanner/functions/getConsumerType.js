function getConsumerType(topicName) {
    if (isKnownBinaryTopic(topicName)) {
      $log.debug(topicName, "DETECTING TYPE.. IT'S A KNOWN [ BINARY ] TOPIC [topics.config.js]");
      return 'binary';
    }
    if (isKnownJSONTopic(topicName)) {
      $log.debug(topicName, "DETECTING TYPE.. IT'S A KNOWN [ JSON ] TOPIC [topics.config.js]");
      return 'json';
    } else if (hasCookieType(topicName)) {
      var a = $cookies.getAll();
      $log.debug(topicName, "DETECTING TYPE.. HAVE CONSUMED THIS TOPIC BEFORE, IT'S IN COOKIE. TYPE IS [" + a[topicName] + "]");
      return a[topicName];
    } else {
      $log.debug(topicName, "DETECTING TYPE.. DON'T KNOW THE TYPE I WILL TRY WITH [ AVRO ] FIRST");
      return 'avro';
    }
  }