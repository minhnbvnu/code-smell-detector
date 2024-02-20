function loadSchemas(){
    var uuid=consumerFactory.genUUID();
    consumerFactory.createConsumer('json', '_schemas', uuid).then( function (response) {
      if (response.status == 409 || response.status == 200) {

        var consumer = {group :'kafka_topics_ui_json_' + uuid, instance: 'kafka-topics-ui-json' };
           consumerFactory.getDataFromBeginning(consumer,'json', '_schemas').then(function (allSchemas) {
             $rootScope.schemas = allSchemas;
             schemas = allSchemas
             return schemas
           })
        if (response.status == 409) {
            var msg = response.data.message;
            msg = "Conflict 409. " + msg;
            $log.warn(msg)
         }
       } else {
        $log.warn(response.data.message)
       }
    })
  }