function _loadDefaultFilename() {
      var home = process.env.HOME ||
           process.env.USERPROFILE ||
           (process.env.HOMEPATH ? ((process.env.HOMEDRIVE || 'C:/') + process.env.HOMEPATH) : null);
      return path.join(home, '.aws', 'credentials');

   }