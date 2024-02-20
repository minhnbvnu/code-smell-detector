function setStyles(ctrl, opacity) {
      if (!ctrl) return;
      var css = {};
      css.opacity = opacity === 1 ? '' : opacity;

      ctrl.setCss('buttons-left', css);
      ctrl.setCss('buttons-right', css);
      ctrl.setCss('back-button', css);
      ctrl.setCss('back-text', css);
      ctrl.setCss('title', css);
    }