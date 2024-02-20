function GetCoords(self) {
  var _self$playerInfo = self.playerInfo;
  var latitude = _self$playerInfo.latitude;
  var longitude = _self$playerInfo.longitude;

  return [latitude, longitude];
}