function exportWAV(type){
  var buffers = [];
  for (var channel = 0; channel < numChannels; channel++){
    buffers.push(mergeBuffers(recBuffers[channel], recLength));
  }
  if (numChannels === 2){
    var interleaved = interleave(buffers[0], buffers[1]);
  } else {
    var interleaved = buffers[0];
  }
  var dataview = encodeWAV(interleaved);
  var audioBlob = new Blob([dataview], { type: type });

  this.postMessage(audioBlob);
}