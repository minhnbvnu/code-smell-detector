function afterRenderActions(){
            var section = $(SECTION_ACTIVE_SEL);

            //to solve a bug with slimScroll vendor #1037, #553
            section.find('.fp-scrollable').mouseover();

            $.isFunction( options.afterLoad ) && options.afterLoad.call(section, section.data('anchor'), (section.index(SECTION_SEL) + 1));
            $.isFunction( options.afterRender ) && options.afterRender.call( this);
        }