function _package_init () {
  ScripterX.Log.Info('Vertex Push Service Package Initialised.');
  VERTEX_OPENAPI_URL = ScripterX.Config.Get('VERTEX_OPENAPI_URL').StringValue();
  ScripterX.Log.Info('Vertex Push Service: VERTEX OPENAPI URL = ' + VERTEX_OPENAPI_URL);
}