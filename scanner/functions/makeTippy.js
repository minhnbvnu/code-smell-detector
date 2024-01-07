function makeTippy(node, html){
    removeTippy();

    shownTippy = tippy( node.popperRef(), {
      html: html,
      trigger: 'manual',
      arrow: true,
      placement: 'bottom',
      hideOnClick: false,
      duration: [250, 0],
      theme: 'light',
      interactive: true,
      onHidden: function(tip){
        if(tip != null){
          tip.destroy();
        }
      }
    } ).tooltips[0];

    shownTippy.show();

    return shownTippy;
  }