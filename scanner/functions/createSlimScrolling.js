function createSlimScrolling(element){
            //needed to make `scrollHeight` work under Opera 12
            element.css('overflow', 'hidden');

            //in case element is a slide
            var section = element.closest(SECTION_SEL);
            var scrollable = element.find(SCROLLABLE_SEL);
            var contentHeight;

            //if there was scroll, the contentHeight will be the one in the scrollable section
            if(scrollable.length){
                contentHeight = scrollable.get(0).scrollHeight;
            }else{
                contentHeight = element.get(0).scrollHeight;
                if(options.verticalCentered){
                    contentHeight = element.find(TABLE_CELL_SEL).get(0).scrollHeight;
                }
            }

            var scrollHeight = windowsHeight - parseInt(section.css('padding-bottom')) - parseInt(section.css('padding-top'));

            //needs scroll?
            if ( contentHeight > scrollHeight) {
                //was there already an scroll ? Updating it
                if(scrollable.length){
                    scrollable.css('height', scrollHeight + 'px').parent().css('height', scrollHeight + 'px');
                }
                //creating the scrolling
                else{
                    if(options.verticalCentered){
                        element.find(TABLE_CELL_SEL).wrapInner('<div class="' + SCROLLABLE + '" />');
                    }else{
                        element.wrapInner('<div class="' + SCROLLABLE + '" />');
                    }

                    element.find(SCROLLABLE_SEL).slimScroll({
                        allowPageScroll: true,
                        height: scrollHeight + 'px',
                        size: '10px',
                        alwaysVisible: true
                    });
                }
            }

            //removing the scrolling when it is not necessary anymore
            else{
                removeSlimScroll(element);
            }

            //undo
            element.css('overflow', '');
        }