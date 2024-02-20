function getConsumerOffsets(consumer, topicName, partition) {
        var url = env.KAFKA_REST().trim() + '/consumers/' + consumer.group + '/instances/' + consumer.instance + '/offsets';
        var data = {"partitions": [{"topic": topicName,"partition": parseInt(partition[0].partition)}]}
        return HttpFactory.req('GET', url, data, '', CONTENT_TYPE_JSON, false,  true);
      }