function useFckeditor2(url) {
    if (!usingFckeditor2()) { return; }

    var p = url;
    var w = data['Properties']['Width'];
    var h = data['Properties']['Height'];
    window.opener.SetUrl(p,w,h);
  }