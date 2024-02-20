function _processOptionsToParams(params, options){

  //language (language_region, ex: `ru_RU`, `uk_UA`)
  if (options.language) {
    params.lang = options.language;
  }

  //results count (default 10)
  if (options.results) {
    params.results = options.results;
  }

  //skip count (default 0)
  if (options.skip) {
    params.skip = options.skip;
  }

  //Type of toponym (only for reverse geocoding)
  //could be `house`, `street`, `metro`, `district`, `locality`
  if (options.kind) {
    params.kind = options.kind;
  }

  //BBox (ex: `[[lat: 1.0, lng:2.0],[lat: 1.1, lng:2.2]]`)
  if (options.bbox) {
    if (options.bbox.length === 2){
      params.bbox = options.bbox[0].lng + ',' + options.bbox[0].lat;
      params.bbox = params.bbox + '~';
      params.bbox = params.bbox + options.bbox[1].lng + ',' + options.bbox[1].lat;
    }
  }

  //Limit search in bbox (1) or not limit (0)
  if (options.rspn) {
    params.rspn = options.rspn;
  }

  if(options.apiKey) {
    params.apikey = options.apiKey;
  }
}