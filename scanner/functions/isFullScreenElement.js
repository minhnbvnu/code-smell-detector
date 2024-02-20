function isFullScreenElement(el) {
  if (el && el.current) {
    return Boolean(
      document.fullscreenElement === el.current ||
        document.mozFullScreenElement === el.current ||
        document.webkitFullscreenElement === el.current ||
        document.msFullscreenElement === el.current,
    );
  }

  return Boolean(
    document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement ||
      document.fullscreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen ||
      document.fullScreenMode,
  );
}