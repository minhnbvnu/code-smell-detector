function OffsetTracker(el) {
            this.origRect = core.computeRect(el);
            // will work fine for divs that have overflow:hidden
            this.scrollCaches = core.getClippingParents(el).map(function (el) {
                return new ElementScrollGeomCache(el, true); // listen=true
            });
        }