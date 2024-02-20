function getConsumerAssignments(consumer) {
    var url_tmp = env.KAFKA_REST().trim() + '/consumers/' + consumer.group + '/instances/' + consumer.instance + '/assignments';
    return HttpFactory.req('GET', url_tmp, '', '', '', false, false).then(function (res) {
    })
  }