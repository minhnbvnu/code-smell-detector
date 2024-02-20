function responsive(){
            if(options.responsive){
                var isResponsive = container.hasClass(RESPONSIVE);
                if ($window.width() < options.responsive ){
                    if(!isResponsive){
                        FP.setAutoScrolling(false, 'internal');
                        FP.setFitToSection(false, 'internal');
                        $(SECTION_NAV_SEL).hide();
                        container.addClass(RESPONSIVE);
                    }
                }else if(isResponsive){
                    FP.setAutoScrolling(originals.autoScrolling, 'internal');
                    FP.setFitToSection(originals.autoScrolling, 'internal');
                    $(SECTION_NAV_SEL).show();
                    container.removeClass(RESPONSIVE);
                }
            }
        }