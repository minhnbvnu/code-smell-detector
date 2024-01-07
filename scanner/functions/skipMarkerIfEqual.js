function skipMarkerIfEqual(value) {
      if (data[offset + position - 1] === 0xff && data[offset + position] === value) {
        skipBytes(1);
        return true;
      } else if (data[offset + position] === 0xff && data[offset + position + 1] === value) {
        skipBytes(2);
        return true;
      }

      return false;
    }