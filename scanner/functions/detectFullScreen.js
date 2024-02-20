function detectFullScreen() {
      if (onChange) {
        onChange(fscreen_lib_default.a.fullscreenElement === ref.current);
      }
    }