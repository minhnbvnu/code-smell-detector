function scrollFilters() {
            if (!scrollAreaWidth) {
                $.each(filtersBtns, function (i, e) {
                    scrollAreaWidth += $(e).outerWidth(true);
                });
                filterWidth = filtersBtns.eq(0).outerWidth(true);
            }
            if (scrollAreaWidth > filtersWidth) {
                filtersArrowRight.addClass("active");
                filtersArrowLeft.addClass("active");

                if (scrollLeft + scrollAreaWidth <= filtersWidth) {
                    scrollLeft = filtersWidth - scrollAreaWidth;
                    filtersArrowRight.removeClass("active");
                    clearMousedownInterval();
                } else if (scrollLeft >= 0) {
                    scrollLeft = 0;
                    filtersArrowLeft.removeClass("active");
                    clearMousedownInterval();
                }
                scrollArea.css("left", scrollLeft);
            } else {
                clearMousedownInterval();
                if (scrollLeft !== 0) {
                    scrollLeft = 0;
                    scrollArea.css("left", scrollLeft);
                }
                filtersArrowRight.removeClass("active");
                filtersArrowLeft.removeClass("active");
            }
        }