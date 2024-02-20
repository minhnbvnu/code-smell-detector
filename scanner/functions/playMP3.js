function playMP3() {
    var mp3URL = getMediaURL("sounds/button-1.mp3");
    var media = new Media(mp3URL, null, mediaError);
    media.play();
}