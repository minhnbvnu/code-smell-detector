function extractData(resp) {
  Rest.extractData(resp);

  var parser;
  var req = resp.request;
  var body = resp.httpResponse.body;
  var operation = req.service.api.operations[req.operation];
  var output = operation.output;

  var payload = output.payload;
  if (payload) {
    var payloadMember = output.members[payload];
    if (payloadMember.isStreaming) {
      resp.data[payload] = body;
    } else if (payloadMember.type === 'structure') {
      parser = new AWS.XML.Parser();
      resp.data[payload] = parser.parse(body.toString(), payloadMember);
    } else {
      resp.data[payload] = body.toString();
    }
  } else if (body.length > 0) {
    parser = new AWS.XML.Parser();
    var data = parser.parse(body.toString(), output);
    util.update(resp.data, data);
  }
}