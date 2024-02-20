function CommonMrootMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(class_1.prototype, "surd", {
                get: function () {
                    return 2;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(class_1.prototype, "root", {
                get: function () {
                    return 1;
                },
                enumerable: false,
                configurable: true
            });
            class_1.prototype.combineRootBBox = function (BBOX, sbox, H) {
                var bbox = this.childNodes[this.root].getOuterBBox();
                var h = this.getRootDimens(sbox, H)[1];
                BBOX.combine(bbox, 0, h);
            };
            class_1.prototype.getRootDimens = function (sbox, H) {
                var surd = this.childNodes[this.surd];
                var bbox = this.childNodes[this.root].getOuterBBox();
                var offset = (surd.size < 0 ? .5 : .6) * sbox.w;
                var w = bbox.w, rscale = bbox.rscale;
                var W = Math.max(w, offset / rscale);
                var dx = Math.max(0, W - w);
                var h = this.rootHeight(bbox, sbox, surd.size, H);
                var x = W * rscale - offset;
                return [x, h, dx];
            };
            class_1.prototype.rootHeight = function (rbox, sbox, size, H) {
                var h = sbox.h + sbox.d;
                var b = (size < 0 ? 1.9 : .55 * h) - (h - H);
                return b + Math.max(0, rbox.d * rbox.rscale);
            };
            return class_1;
        }(Base));
    }