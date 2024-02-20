function computeDefaultHeights() {
                    var el = $element[0];
                    tabs = el.closest('ion-tabs');
                    hasBottomTabs = tabs && tabs.classList.contains('tabs-bottom');
                    header = document.querySelector('ion-nav-bar .nav-bar-block[nav-bar=entering] > .bar-header');
                    tabsHeight = tabs ? tabs.querySelector('.tabs').offsetHeight : 0;
                    headerHeight = header ? header.offsetHeight : 0;
                }