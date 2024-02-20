function getDataFromEnd(consumer, format, topicName) {
    return $q.all([seekAll('end', consumer, topicName)]).then(function (res1) {
      $log.debug(topicName, '4) SEEK TO BEGGINING FOR ALL PARTITIONS DONE');
      $log.debug(topicName, "5) START POLLING WITH CONSUMER:", consumer);
    }).then(function (res2) {
      return getRecords(consumer, format).then(function (r) {
        if (r.data.length !== 0) saveTopicTypeToCookie(topicName, format);
        $log.debug(topicName, '6) DONE: GOT RECORDS', r.data.length);
        $log.debug(topicName, '7) SAVING TYPE TO COOKIE', format);
        deleteConsumer(consumer, topicName);
        return r;
      }, function (er) {
        $log.error("CANNOT GET RECORDS WITH FORMAT", format);
        deleteConsumer(consumer, topicName);
        return -1;
      });
    });
  }