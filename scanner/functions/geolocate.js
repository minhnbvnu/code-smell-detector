function geolocate() {
      const position = coordinates.shift();
      if (!position) {
        return;
      }
      const newDate = position.timestamp;
      simulatePositionChange(position);
      window.setTimeout(
        function () {
          prevDate = newDate;
          geolocate();
        },
        (newDate - prevDate) / 0.5,
      );
    }