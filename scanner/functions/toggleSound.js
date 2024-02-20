function toggleSound()
{
  audioCtx.resume();
  gainNode.gain.value = IsPlayingSound ? 0.00 : 0.05;
  IsPlayingSound = !IsPlayingSound;
  soundToggle.text(IsPlayingSound ? "Mute Sound" : "Play Sound");
}