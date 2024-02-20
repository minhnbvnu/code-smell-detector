function createDecoy(args) {
        var UrlPropNameOf = function (UrlPropNameOf) {
          UrlPropNameOf["Object"] = "data";
          UrlPropNameOf["Iframe"] = "src";
          return UrlPropNameOf;
        }({});
        var replacement = args.replacement,
          url = args.url,
          delay = args.delay;
        var tag;
        if (replacement === "obj") {
          tag = "object";
        } else {
          tag = "iframe";
        }
        var decoy = document.createElement(tag);
        if (decoy instanceof HTMLObjectElement) {
          decoy[UrlPropNameOf.Object] = url;
        } else if (decoy instanceof HTMLIFrameElement) {
          decoy[UrlPropNameOf.Iframe] = url;
        }
        decoy.style.setProperty("height", "1px", "important");
        decoy.style.setProperty("position", "fixed", "important");
        decoy.style.setProperty("top", "-1px", "important");
        decoy.style.setProperty("width", "1px", "important");
        document.body.appendChild(decoy);
        setTimeout(function () {
          return decoy.remove();
        }, delay * 1e3);
        return decoy;
      }