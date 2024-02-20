function youtube (match, p1, p2) {
      var embed =
        "<object width=\"425\" height=\"344\">" +
        "<param name=\"movie\" value=\"https://www.youtube.com/v/$2&hl=en&fs=1&\"></param>" +
        "<param name=\"allowFullScreen\" value=\"true\"></param>" +
        "<param name=\"allowscriptaccess\" value=\"always\"></param>" +
        "<embed src=\"https://www.youtube.com/v/" + p2 + "&hl=en&fs=1&\" type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" width=\"425\" height=\"344\"></embed>" +
        "</object>"
      return stash(embed)
    }