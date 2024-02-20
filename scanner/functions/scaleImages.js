function scaleImages($container, toWidth) {
      // because it's wrong
      if (toWidth <= 0) return;

      // walked through all images
      jQuery('div.group_img div.image', $container).each(function () {
        // resize
        proportionalResize(
          jQuery(this).find('img'),
          jQuery(this),
          toWidth,
          toWidth
        )

      });

    }