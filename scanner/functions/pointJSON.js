function pointJSON(lineItem, type, optionObj) {
  var lowercaseType = type.toLowerCase()
  var pointFeature = {
        type: "Feature",
        "geometry": {
          "type": type,
          "coordinates": [+lineItem.long, +lineItem.lat]
        },
        "properties": {
          "marker-size": "small",
          "marker-color": lineItem.hexcolor
        },
        "opts": optionObj
      }
  return pointFeature
}