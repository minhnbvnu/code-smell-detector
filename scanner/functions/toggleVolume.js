function toggleVolume() {
    for (let i = 0, obj; (obj = this.objects[i]); i++) {
      obj.audio.muted = !obj.audio.muted;
    }
  }