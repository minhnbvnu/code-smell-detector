function swapDataSrc(element) {
        var avatarImg = element.getElementsByTagName('img')[0];
        if (avatarImg) {
          avatarImg.src = avatarImg.getAttribute('data-src-2x');
        } else {
          var screenName = element.getElementsByTagName('a')[0]
              .getAttribute('href').split('twitter.com/')[1];
          var img = document.createElement('img');
          img.setAttribute('src', 'https://twitter.com/' + screenName + 
              '/profile_image?size=bigger');
          element.prepend(img);
        }
        return element;
      }