  const listener = e => {
    if (e.target instanceof Element && IGNORE_EVENTS_FROM_TAGS.has(e.target.tagName.toLowerCase())) {
      return;
    }

    if (e.ctrlKey) {
      switch (e.keyCode) {
        case 68:
          // CTRL+D
          dispatch(windows_toggleDoubleSizeMode());
          e.preventDefault(); // Supress the "Bookmark" action on windows.

          break;

        case 76:
          // CTRL+L FIXME
          break;

        case 82:
          // CTRL+R
          dispatch(playlist_reverseList());
          break;

        case 84:
          // CTRL+T
          dispatch({
            type: TOGGLE_TIME_MODE
          });
          break;
      }
    } else if (e.altKey) {
      switch (e.keyCode) {
        case 87:
          // ALT+W
          dispatch(windows_toggleWindow("main"));
          break;

        case 69:
          // ALT+E
          dispatch(windows_toggleWindow("playlist"));
          break;

        case 71:
          // ALT+G
          dispatch(windows_toggleWindow("equalizer"));
          break;
      }
    } else {
      switch (e.keyCode) {
        case 37:
          // left arrow
          dispatch(media_seekBackward(5));
          break;

        case 38:
          // up arrow
          dispatch(adjustVolume(1));
          break;

        case 39:
          // right arrow
          dispatch(media_seekForward(5));
          break;

        case 40:
          // down arrow
          dispatch(adjustVolume(-1));
          break;

        case 66:
          // B
          dispatch(media_next());
          break;

        case 67:
          // C
          dispatch(media_pause());
          break;

        case 76:
          // L
          dispatch(files_openMediaFileDialog());
          break;

        case 82:
          // R
          dispatch(media_toggleRepeat());
          break;

        case 83:
          // S
          dispatch(media_toggleShuffle());
          break;

        case 86:
          // V
          dispatch(media_stop());
          break;

        case 88:
          // X
          dispatch(media_play());
          break;

        case 90:
          // Z
          dispatch(media_previous());
          break;

        case 96:
          // numpad 0
          dispatch(files_openMediaFileDialog());
          break;

        case 97:
          // numpad 1
          dispatch(media_nextN(-10));
          break;

        case 98:
          // numpad 2
          dispatch(adjustVolume(-1));
          break;

        case 99:
          // numpad 3
          dispatch(media_nextN(10));
          break;

        case 100:
          // numpad 4
          dispatch(media_previous());
          break;

        case 101:
          // numpad 5
          dispatch(media_play());
          break;

        case 102:
          // numpad 6
          dispatch(media_next());
          break;

        case 103:
          // numpad 7
          dispatch(media_seekBackward(5));
          break;

        case 104:
          // numpad 8
          dispatch(adjustVolume(1));
          break;

        case 105:
          // numpad 9
          dispatch(media_seekForward(5));
          break;
      }
    } // Easter Egg
    // Ignore escape. Usually this gets swallowed by the browser, but not always.


    if (e.keyCode !== 27) {
      currentPos = e.keyCode === trigger[currentPos] ? currentPos + 1 : 0;

      if (currentPos === trigger.length) {
        dispatch({
          type: TOGGLE_LLAMA_MODE
        });
      }
    }
  };