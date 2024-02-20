function preparePartitionData(topicName, partitions) {
    var data = {'partitions': []};
    angular.forEach(partitions, function (partition) {
      data.partitions.push({'topic': topicName, 'partition': partition.partition})
    });
    return data;
  }