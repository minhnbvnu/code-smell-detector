function fillInTopicDetails(topic) {
    TopicsListFactory.getTopicDetails(topic.topicName, $scope.cluster.KAFKA_REST.trim()).then(function(res){
        var configsCounter = 0;
        angular.forEach(res.data.configs, function(value, key) { configsCounter++;});
        topic.partitions = res.data.partitions.length;
        topic.replication = res.data.partitions[0].replicas.length;
        topic.customConfig = configsCounter;
    });
  }