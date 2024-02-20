function typeIsInterpolation(type, stream) {
      return type == "{" && stream.match(/^\s*\$?[\w-]+/i, false);
    }