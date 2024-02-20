function setupNameState(transaction) {
  transaction.baseSegment = transaction.trace.root.add('basesegment')
  transaction.nameState.setPrefix('Restify')
  transaction.nameState.setVerb('COOL')
  transaction.nameState.setDelimiter('/')
  transaction.nameState.appendPath('/foo/:foo', { 'request.parameters.foo': 'biz' })
  transaction.nameState.appendPath('/bar/:bar', { 'request.parameters.bar': 'bang' })
}