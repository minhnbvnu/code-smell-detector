function showIt() {
      if (opts.anchor && opts.position === 'top') {
        this.anchorTooltipTop(opts.anchor)
      } else if (opts.anchor && opts.position === 'left') {
        this.anchorTooltipLeft(opts.anchor)
      } else if (opts.anchor && opts.position === 'bottom') {
        this.anchorTooltipBottom(opts.anchor)
      } else {
        this.anchorTooltipAbsolute()
      }
      L.DomUtil.addClass(this.parent, 'umap-tooltip')
      this._tooltip.innerHTML = opts.content
    }