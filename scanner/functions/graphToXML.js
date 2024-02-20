function graphToXML(graph) {
  var encoder = new mxCodec();
  var result = encoder.encode(graph.getModel());
  return `<mxfile host="" modified="2020-05-24T15:21:41.060Z" agent="5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Code/1.45.0 Chrome/78.0.3904.130 Electron/7.2.4 Safari/537.36" version="13.1.3" etag="lrwgP8mNOWNbAz78NI_h" pages="2">
            <diagram id="diagramid" name="Diagram">
              ${mxUtils.getXml(result)}
            </diagram>
          </mxfile>`;
}