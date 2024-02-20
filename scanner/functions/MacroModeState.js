function MacroModeState() {
      this.latestRegister = undefined;
      this.isPlaying = false;
      this.isRecording = false;
      this.replaySearchQueries = [];
      this.onRecordingDone = undefined;
      this.lastInsertModeChanges = createInsertModeChanges();
    }