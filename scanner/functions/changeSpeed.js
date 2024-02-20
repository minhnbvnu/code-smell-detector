function changeSpeed()
{
  currentPlaybackSpeedIndex++;
  if (currentPlaybackSpeedIndex == 3)
  {
    currentPlaybackSpeedIndex = 0;
  }
  playbackSpeedFactor = playbackSpeedFactors[currentPlaybackSpeedIndex];
  speedButton.text(playbackSpeeds[currentPlaybackSpeedIndex] + " Speed");
}