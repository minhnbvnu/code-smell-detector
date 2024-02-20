function staticImageTransform(context, request, callback) {
  if (/^image!/.test(request)) {
    callback(null, JSON.stringify({
      uri: request.replace('image!', ''),
      isStatic: true,
    }));
    return;
  }
  callback();
}