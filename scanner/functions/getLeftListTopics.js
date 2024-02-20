function getLeftListTopics() {
    $scope.selectedTopics = [];
    $scope.topics = [];
    TopicsListFactory.getTopics($scope.cluster.KAFKA_REST.trim()).then(function (allData){
        var topics = [];
        angular.forEach(allData.data, function(topic, key) {
            var topicImproved = {
                topicName : topic,
                partitions : "Unknown",
                replication : "Unknown",
                customConfig : null,
                isControlTopic : checkIsControlTopic(topic)
            }
            if (!$scope.cluster.LAZY_LOAD_TOPIC_META) {
                fillInTopicDetails(topicImproved);
            }
            topics.push(topicImproved);
            if (topics.length == allData.data.length) {
                $scope.topics = topics;
                $scope.selectedTopics = topics.filter(function(el) {return el.isControlTopic == $scope.displayingControlTopics});
                console.log('Total topics fetched:', allData.data.length)
                console.log('Length of improved topic array:', topics.length)
                console.log('Selected topics(listed):', $scope.selectedTopics.length)

                $scope.topicsIndex = arrayObjectIndexOf($scope.selectedTopics, $routeParams.topicName, 'topicName' ) + 1;
                $scope.topicsPage = Math.ceil($scope.topicsIndex / $scope.topicsPerPage);

                if ($scope.topicsPage < 1) {
                  $scope.topicsPage = 1
                }
            }
        })

        //$scope.selectTopicList(true);

    })
  }