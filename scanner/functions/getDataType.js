function getDataType (topicName) {
    var dataType = "...";
    var dataType_key;
    var dataType_value;
    // Check if we know the topic data type a priory
    if (KNOWN_TOPICS.JSON_TOPICS && KNOWN_TOPICS.JSON_TOPICS.indexOf(topicName) > -1) {
      dataType = "json";
    } else if (KNOWN_TOPICS.BINARY_TOPICS && KNOWN_TOPICS.BINARY_TOPICS.indexOf(topicName.substring(0, 24)) > -1) {
      dataType = "binary";
    } else {
      // If topicDetails are not available wait
          if (schemas) {
          angular.forEach(angular.fromJson(schemas.data), function (schema) {
            if ((schema.value != null) && (schema.value.subject != null) && (schema.value.subject == topicName + "-value")) {
              //$log.info("FOUND YOU !! " + topicName);
              dataType_value = "avro";
            }
            if ((schema.value != null) && (schema.value.subject != null) && (schema.value.subject == topicName + "-key")) {
              //$log.info("FOUND YOU !! " + topicName);
              dataType_key = "avro";
            }
          });
          if (dataType_value=="avro" && dataType_key=="avro") {
            dataType="avro";
          }
}
    }
    if (dataType == "") {
      $log.warn("Could not find the message type of topic [" + topicName + "]");
    }
    return dataType;
  }