function getRecords(consumer, format) {
    var url = env.KAFKA_REST().trim() + '/consumers/' + consumer.group + '/instances/' + consumer.instance + '/records?timeout=' + env.RECORD_POLL_TIMEOUT() + '&max_bytes=' + env.MAX_BYTES().trim();
    var ACCEPT_HEADER = 'application/vnd.kafka.' + format + '.v2+json';
    return HttpFactory.req('GET', url, '', CONTENT_TYPE_JSON, ACCEPT_HEADER, false, env.DEBUG_LOGS_ENABLED());
  }