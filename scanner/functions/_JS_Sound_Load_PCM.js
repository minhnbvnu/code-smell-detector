function _JS_Sound_Load_PCM(channels,length,sampleRate,ptr){if(WEBAudio.audioWebEnabled==0)return 0;var sound=jsAudioCreateUncompressedSoundClipFromPCM(channels,length,sampleRate,ptr);WEBAudio.audioInstances[++WEBAudio.audioInstanceIdCounter]=sound;return WEBAudio.audioInstanceIdCounter}