function humaniseLocation(loc) {
      const relative = path.relative(path.join(config.cwd, 'node_modules'), loc);
      const normalized = path.normalize(relative).split(path.sep);
      return normalized.filter(p => p !== 'node_modules').reduce((result, part) => {
        const length = result.length;
        if (length && result[length - 1].startsWith('@') && result[length - 1].indexOf(path.sep) === -1) {
          result[length - 1] += path.sep + part;
        } else {
          result.push(part);
        }
        return result;
      }, []);
    }