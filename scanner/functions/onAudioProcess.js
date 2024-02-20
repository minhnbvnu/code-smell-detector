function onAudioProcess(e) {
    const parameters = {};
    let index = -1;
    this.parameters.forEach((value, key) => {
      const arr = PARAMS[++index] || (PARAMS[index] = new Float32Array(this.bufferSize)); // @TODO proper values here if possible

      arr.fill(value.value);
      parameters[key] = arr;
    });
    this.processor.realm.exec('self.sampleRate=sampleRate=' + this.context.sampleRate + ';' + 'self.currentTime=currentTime=' + this.context.currentTime);
    const inputs = channelToArray(e.inputBuffer);
    const outputs = channelToArray(e.outputBuffer);
    this.instance.process([inputs], [outputs], parameters);
  }