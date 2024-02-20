function external (url) {
      if (url.match(/\.(gif|jpg|jpeg|png)$/)) {
        return stash("<img src=\"" + url.replace(/^https:\/wiki\//,'https://c2.com/wiki/') + "\">")
      } else {
        return stash("<a href=\"" + url + "\" rel=\"nofollow\" target=\"_blank\">" + url + "</a>")
      }
    }