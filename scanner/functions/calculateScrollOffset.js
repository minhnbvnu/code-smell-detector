function calculateScrollOffset(scrollSource, position) {
      // TODO(flackr): Optimize this to not do string parsing every time it's
      // queried.
      if (position.endsWith('px')) {
        return parseFloat(position.substring(0, position.length - 2));
      } else if (position.endsWith('%')) {
        var viewHeight = scrollSource == document.scrollingElement ? window.innerHeight : scrollSource.clientHeight;
        return (scrollSource.scrollHeight - viewHeight) * (parseFloat(position.substring(0, position.length - 1)) / 100);
      } else {
        throw new Error('Unhandled scroll position: ' + position);
      }
    }