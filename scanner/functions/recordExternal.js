function recordExternal(segment, scope) {
  return generateRecorder('test.example.com', 'http')(segment, scope)
}