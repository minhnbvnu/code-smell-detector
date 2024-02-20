function getDataForPartition(topicName, consumer, format, partition, offset, position) {
    return postConsumerAssignments(consumer, topicName, partition).then(function (responseAssign) {
      return postConsumerPositions(consumer, topicName, partition[0], offset, position).then(function (responseOffset) {
        $log.debug(topicName, '4) SEEK TO OFFSET FOR PARTITION DONE');
        $log.debug(topicName, "5) START POLLING WITH CONSUMER:", consumer);
        return getRecords(consumer, format).then(function (r) {
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
    });
  }