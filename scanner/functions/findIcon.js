function findIcon(iconName, prefix) {
    return new picked(function (resolve, reject) {
      var val = {
        found: false,
        width: 512,
        height: 512,
        icon: missing
      };

      if (iconName && prefix && styles$2[prefix] && styles$2[prefix][iconName]) {
        var icon = styles$2[prefix][iconName];
        return resolve(asFoundIcon(icon));
      }

      if (iconName && prefix && !config.showMissingIcons) {
        reject(new MissingIcon("Icon is missing for prefix ".concat(prefix, " with icon name ").concat(iconName)));
      } else {
        resolve(val);
      }
    });
  }