function createAndFetchFromEnd(format, topicName) {
    $scope.showInnerSpinner = true;
    $log.debug("... DATA FOR PARTITION [ ALL ]...");
    $scope.uuid = consumerFactory.genUUID();
    consumerFactory
        .createConsumer(format, topicName, $scope.uuid)
        .then(function(res){
            return consumerFactory.getConsumer(format, $scope.uuid);
        })
        .then(function(consumer) {
            consumerFactory.getDataFromEnd(consumer, format, topicName).then(function (allData) {
                if(allData === -1) {
                    $log.debug(topicName, "FAILED TO GET DATA, NEED TO RETRY", allData, consumer, topicName);
                    createAndFetchFromEnd(consumerFactory.getConsumerTypeRetry(format, topicName), topicName);
                    $scope.showInnerSpinner = false;
                } else {
                    $log.debug(topicName, "GOT DATA, WILL RENDER", " [", allData.data.length, "] [", format, "] MESSAGES");
                    setTopicMessages(allData.data, format, false)
                    $scope.showInnerSpinner = false;
                    $scope.seekToEnd = true;
                }
            });
        });
  }