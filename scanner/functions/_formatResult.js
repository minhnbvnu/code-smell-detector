function _formatResult(result) {
  var position = result.GeoObject.Point.pos.split(' ');
  result = result.GeoObject.metaDataProperty.GeocoderMetaData.AddressDetails;

  return {
    'latitude' : parseFloat(position[1]),
    'longitude' : parseFloat(position[0]),
    'city' : _findKey(result, 'LocalityName'),
    'state' : _findKey(result, 'AdministrativeAreaName'),
    'streetName': _findKey(result, 'ThoroughfareName'),
    'streetNumber' : _findKey(result, 'PremiseNumber'),
    'countryCode' : _findKey(result, 'CountryNameCode'),
    'country' : _findKey(result, 'CountryName'),
    'formattedAddress' : _findKey(result, 'AddressLine')
  };
}