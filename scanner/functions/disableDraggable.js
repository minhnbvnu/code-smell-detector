function disableDraggable() {
        if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
        events('off');
      }