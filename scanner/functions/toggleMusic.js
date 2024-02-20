function toggleMusic() {
    kontra.audioAssets.kick_shock.muted = !kontra.audioAssets.kick_shock.muted;
    kontra.audioAssets.game_over.muted = !kontra.audioAssets.game_over.muted;
    laserPool.toggleVolume();
    explosionPool.toggleVolume();
  }