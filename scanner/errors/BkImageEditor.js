      this._interactResizableListener = function (event) {

        var isXpermitted = true;
        var isYpermitted = true;

        // limit width X
        if (event.edges.right === true) {
          if (imEd.FRAME_MAX_WIDTH && event.rect.width >= imEd.FRAME_MAX_WIDTH) {
            // if we want to decrease size
            if (event.rect.width >= imEd.frameWidth) {
              isXpermitted = false;
            }
          }
          if (imEd.FRAME_MIN_WIDTH && event.rect.width < imEd.FRAME_MIN_WIDTH) {
            // if we want to increase size
            if (event.rect.width < imEd.frameWidth) {
              isXpermitted = false;
            }
          }
        }
        // limit height
        if (event.edges.bottom === true) {
          if (imEd.FRAME_MAX_HEIGHT && event.rect.height >= imEd.FRAME_MAX_HEIGHT) {
            // if we want to decrease size
            if (event.rect.height >= imEd.frameHeight) {
              isYpermitted = false;
            }
          }
          if (imEd.FRAME_MIN_HEIGHT && event.rect.height < imEd.FRAME_MIN_HEIGHT) {
            // if we want to increase size
            if (event.rect.height < imEd.frameHeight) {
               isYpermitted = false;
            }
          }
        }

        // move right (X)
        if (event.edges.right === true && event.edges.top === false && event.edges.bottom === false) {
          if (isXpermitted) {
            imEd.frameWidth = event.rect.width;
          }
        }
        // move bottom (Y)
        else if (event.edges.left === false && event.edges.right === false && event.edges.bottom === true) {
          if (isYpermitted) {
            imEd.frameHeight = event.rect.height;
          }
        }
        // move right-bottom corner (X && Y)
        else if (event.edges.right === true && event.edges.bottom === true) {
          if (isXpermitted) {
            imEd.frameWidth = event.rect.width;
          }
          if (isYpermitted) {
            imEd.frameHeight = event.rect.height;
          }
        }

        imEd._transformFrame();

      };