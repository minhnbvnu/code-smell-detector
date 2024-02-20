function getConsumer(format, uuid) {
    return {group: 'kafka_topics_ui_' + format + '_' + uuid, instance: CONSUMER_NAME_PREFIX + format};
  }