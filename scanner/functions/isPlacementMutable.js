function isPlacementMutable() {
        return options.placement === 'bottom-right-inside' || options.placement === 'top-right-inside' || typeof options.placement === 'function' || (options.message && typeof options.message === 'function');
      }