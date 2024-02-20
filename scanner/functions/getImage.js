function getImage(theme, cb) {

    if (!theme.backgroundImage) {
      return cb(null, theme);
    }

    theme.backgroundImageFile = new Image();
    theme.backgroundImageFile.onload = function(){
      return cb(null, theme);
    };
    theme.backgroundImageFile.onerror = function(e){
      console.warn(e);
      return cb(null, theme);
    };

    theme.backgroundImageFile.src = "/settings/backgrounds/" + theme.backgroundImage;

  }