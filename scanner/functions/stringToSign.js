function stringToSign (options) {
  var headers = options.amazonHeaders || ''
  if (headers) headers += '\n'
  var r = 
    [ options.verb
    , options.md5
    , options.contentType
    , options.date ? options.date.toUTCString() : ''
    , headers + options.resource
    ]
  return r.join('\n')
}