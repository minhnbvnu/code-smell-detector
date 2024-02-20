function _adjustTooltip(bStart, context, x, y, tooltipText) {
    const $$ = Vue.prototype.$$;
    const isResizable = context.resizable === true;
    const isRow = context.resizeDirection === 'row';

    // default enabled
    if (context.tooltip === false) return;

    // element
    if (bStart) {
      if (!_tooltipElement) {
        _tooltipElement = $$('<div class="eb-dragdrop-tooltip"></div>');
        $$('body').append(_tooltipElement);
      }
      _tooltipElement.show();
    }
    // text
    if (bStart) {
      _tooltipElement.text(tooltipText);
      _tooltipDrag = tooltipText;
      _tooltipText = tooltipText;
    } else {
      let tooltipTextNew;
      if (!isResizable) {
        tooltipTextNew = tooltipText ? `${_tooltipDrag} -> ${tooltipText || ''}` : _tooltipDrag;
      } else {
        tooltipTextNew = tooltipText || _tooltipText;
      }
      if (tooltipTextNew !== _tooltipText) {
        _tooltipElement.text(tooltipTextNew);
        _tooltipText = tooltipTextNew;
      }
    }
    const _tooltipSize = {
      width: _tooltipElement.width(),
      height: _tooltipElement.height(),
    };
    // position
    if (!isResizable) {
      _tooltipElement.css({
        left: `${x + tooltipOffset}px`,
        top: `${y + tooltipOffset}px`,
      });
    } else {
      _tooltipElement.css({
        left: `${isRow ? x + tooltipResizeOffset : x - _tooltipSize.width / 2}px`,
        top: `${isRow ? y - _tooltipSize.height / 2 : y + tooltipResizeOffset}px`,
      });
    }
  }