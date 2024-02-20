function toggleIcons(state, behavior) {
                if (!iconExpand || !iconCollapse) return;

                //remove any icons
                $element.find('i').removeClass([iconExpand, iconCollapse].join(' '));

                if (state == FooterState.COLLAPSED) {
                    if (behavior == FooterBehavior.HIDE) {
                        $element.find('i').addClass(iconCollapse);
                    } else {
                        $element.find('i').addClass(iconExpand);
                    }
                } else {
                    if (state == FooterState.MINIMIZED) {
                        if (behavior == FooterBehavior.HIDE)
                            $element.find('i').addClass(iconExpand);
                        else
                            $element.find('i').addClass(iconExpand);
                    } else {
                        // footer is expanded
                        $element.find('i').addClass(iconCollapse);
                    }
                }
            }