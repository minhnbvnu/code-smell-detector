function renderSlide(slide, index) {
        const params = swiper.params.virtual;

        if (params.cache && swiper.virtual.cache[index]) {
          return swiper.virtual.cache[index];
        }

        const $slideEl = params.renderSlide ? $(params.renderSlide.call(swiper, slide, index)) : $(`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`);
        if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
        if (params.cache) swiper.virtual.cache[index] = $slideEl;
        return $slideEl;
      }