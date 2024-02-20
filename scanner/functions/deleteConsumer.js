function deleteConsumer(consumer, topicName) {
    HttpFactory.req('DELETE', env.KAFKA_REST().trim() + '/consumers/' + consumer.group + '/instances/' + consumer.instance, '', CONTENT_TYPE_JSON, '', false, false)
      .then(function (res) {
        $log.debug(topicName, "8) CONSUMER DELETED", consumer);
        $cookies.remove('uuid')
      })
  }