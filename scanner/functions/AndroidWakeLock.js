function AndroidWakeLock() {
  var video = document.createElement('video');

  video.addEventListener('ended', function() {
    video.play();
  });

  this.request = function() {
    if (video.paused) {
      // Base64 version of videos_src/no-sleep-60s.webm.
      video.src = Util.base64('video/webm', 'GkXfowEAAAAAAAAfQoaBAUL3gQFC8oEEQvOBCEKChHdlYm1Ch4ECQoWBAhhTgGcBAAAAAAAH4xFNm3RALE27i1OrhBVJqWZTrIHfTbuMU6uEFlSua1OsggEwTbuMU6uEHFO7a1OsggfG7AEAAAAAAACkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVSalmAQAAAAAAAEUq17GDD0JATYCNTGF2ZjU2LjQwLjEwMVdBjUxhdmY1Ni40MC4xMDFzpJAGSJTMbsLpDt/ySkipgX1fRImIQO1MAAAAAAAWVK5rAQAAAAAAADuuAQAAAAAAADLXgQFzxYEBnIEAIrWcg3VuZIaFVl9WUDmDgQEj44OEO5rKAOABAAAAAAAABrCBsLqBkB9DtnUBAAAAAAAAo+eBAKOmgQAAgKJJg0IAAV4BHsAHBIODCoAACmH2MAAAZxgz4dPSTFi5JACjloED6ACmAECSnABMQAADYAAAWi0quoCjloEH0ACmAECSnABNwAADYAAAWi0quoCjloELuACmAECSnABNgAADYAAAWi0quoCjloEPoACmAECSnABNYAADYAAAWi0quoCjloETiACmAECSnABNIAADYAAAWi0quoAfQ7Z1AQAAAAAAAJTnghdwo5aBAAAApgBAkpwATOAAA2AAAFotKrqAo5aBA+gApgBAkpwATMAAA2AAAFotKrqAo5aBB9AApgBAkpwATIAAA2AAAFotKrqAo5aBC7gApgBAkpwATEAAA2AAAFotKrqAo5aBD6AApgDAkpwAQ2AAA2AAAFotKrqAo5aBE4gApgBAkpwATCAAA2AAAFotKrqAH0O2dQEAAAAAAACU54Iu4KOWgQAAAKYAQJKcAEvAAANgAABaLSq6gKOWgQPoAKYAQJKcAEtgAANgAABaLSq6gKOWgQfQAKYAQJKcAEsAAANgAABaLSq6gKOWgQu4AKYAQJKcAEqAAANgAABaLSq6gKOWgQ+gAKYAQJKcAEogAANgAABaLSq6gKOWgROIAKYAQJKcAEnAAANgAABaLSq6gB9DtnUBAAAAAAAAlOeCRlCjloEAAACmAECSnABJgAADYAAAWi0quoCjloED6ACmAECSnABJIAADYAAAWi0quoCjloEH0ACmAMCSnABDYAADYAAAWi0quoCjloELuACmAECSnABI4AADYAAAWi0quoCjloEPoACmAECSnABIoAADYAAAWi0quoCjloETiACmAECSnABIYAADYAAAWi0quoAfQ7Z1AQAAAAAAAJTngl3Ao5aBAAAApgBAkpwASCAAA2AAAFotKrqAo5aBA+gApgBAkpwASAAAA2AAAFotKrqAo5aBB9AApgBAkpwAR8AAA2AAAFotKrqAo5aBC7gApgBAkpwAR4AAA2AAAFotKrqAo5aBD6AApgBAkpwAR2AAA2AAAFotKrqAo5aBE4gApgBAkpwARyAAA2AAAFotKrqAH0O2dQEAAAAAAACU54J1MKOWgQAAAKYAwJKcAENgAANgAABaLSq6gKOWgQPoAKYAQJKcAEbgAANgAABaLSq6gKOWgQfQAKYAQJKcAEagAANgAABaLSq6gKOWgQu4AKYAQJKcAEaAAANgAABaLSq6gKOWgQ+gAKYAQJKcAEZAAANgAABaLSq6gKOWgROIAKYAQJKcAEYAAANgAABaLSq6gB9DtnUBAAAAAAAAlOeCjKCjloEAAACmAECSnABF4AADYAAAWi0quoCjloED6ACmAECSnABFwAADYAAAWi0quoCjloEH0ACmAECSnABFoAADYAAAWi0quoCjloELuACmAECSnABFgAADYAAAWi0quoCjloEPoACmAMCSnABDYAADYAAAWi0quoCjloETiACmAECSnABFYAADYAAAWi0quoAfQ7Z1AQAAAAAAAJTngqQQo5aBAAAApgBAkpwARUAAA2AAAFotKrqAo5aBA+gApgBAkpwARSAAA2AAAFotKrqAo5aBB9AApgBAkpwARQAAA2AAAFotKrqAo5aBC7gApgBAkpwARQAAA2AAAFotKrqAo5aBD6AApgBAkpwAROAAA2AAAFotKrqAo5aBE4gApgBAkpwARMAAA2AAAFotKrqAH0O2dQEAAAAAAACU54K7gKOWgQAAAKYAQJKcAESgAANgAABaLSq6gKOWgQPoAKYAQJKcAESAAANgAABaLSq6gKOWgQfQAKYAwJKcAENgAANgAABaLSq6gKOWgQu4AKYAQJKcAERgAANgAABaLSq6gKOWgQ+gAKYAQJKcAERAAANgAABaLSq6gKOWgROIAKYAQJKcAEQgAANgAABaLSq6gB9DtnUBAAAAAAAAlOeC0vCjloEAAACmAECSnABEIAADYAAAWi0quoCjloED6ACmAECSnABEAAADYAAAWi0quoCjloEH0ACmAECSnABD4AADYAAAWi0quoCjloELuACmAECSnABDwAADYAAAWi0quoCjloEPoACmAECSnABDoAADYAAAWi0quoCjloETiACmAECSnABDgAADYAAAWi0quoAcU7trAQAAAAAAABG7j7OBALeK94EB8YIBd/CBAw==');
      video.play();
    }
  };

  this.release = function() {
    video.pause();
    video.src = '';
  };
}