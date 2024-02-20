function processResize() {
            var innerWidth = window.innerWidth,
                innerHeight = window.innerHeight,
                screenWidth = window.screen.width,
                screenHeight = window.screen.height,
                width = innerWidth, height,
                offsetLeft, offsetRight, offsetTop, offsetBottom,
                fn, scope, options;

            if (supporter.isSafari && supporter.isBelowIos7) { // 计算高度，收起 iOS6 顶部导航条
                height = navigator.standalone ? innerHeight : (window.orientation === 0 ? screenHeight - 44 : screenWidth - 32) - 20;
                height = height < innerHeight ? innerHeight : height;
            } else {
                height = innerHeight;
            }

            if (width != pub.width || height != pub.height) {
                pub.width = width;
                pub.height = height;
                callbacks.forEach(function(o) {
                    fn = o.fn;
                    if (fn) {
                        scope = o.scope;
                        options = o.options || {};
                        offsetLeft = result(options.offsetLeft, 0, scope);
                        offsetRight = result(options.offsetRight, 0, scope);
                        offsetTop = result(options.offsetTop, 0, scope);
                        offsetBottom = result(options.offsetBottom, 0, scope);
                        fn.call(scope || window, width - offsetLeft - offsetRight, height - offsetTop - offsetBottom);
                    }
                });
            }
        }