function formatSpeed (v) {
        if (v == 0) return '0 KB';
        else if (v < 1024 * 1024) return (v / 1024).toFixed() + ' KB';
        else return (v / (1024 * 1024)).toFixed(2) + ' MB';
      }