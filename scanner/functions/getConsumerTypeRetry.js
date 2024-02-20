function getConsumerTypeRetry(previousFormatTried, topicName) {
    switch (previousFormatTried) {
      case 'avro':
        $log.debug(topicName, "DETECTING TYPE.. FAILED WITH AVRO, WILL TRY [ JSON ]");
        return 'json';
        break;
      case 'json':
        $log.debug(topicName, "DETECTING TYPE.. FAILED WITH JSON, WILL TRY [ BINARY ]");
        return 'binary';
        break;
      default:
        $log.debug(topicName, "DETECTING TYPE.. FAILED WITH AVRO & JSON, WILL TRY [ BINARY ]");
        return 'binary';
    }
  }