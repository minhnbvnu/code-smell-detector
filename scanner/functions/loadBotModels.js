function loadBotModels(bot_id) {
    Model.query({ bot_id: bot_id }, function (data) {
      data = $scope.cleanResponse(data);
      for (var i = 0; i < data.length; i++) {
        if (data[i].local_path != "Manually added") {
          data[i].server_path = $scope.selectedBot.output_folder + "/" + data[i].server_path
        }
      }
      $scope.modelList = data;
    });
    checkRasaStatus();
  }