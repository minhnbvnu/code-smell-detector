function CommonTeXAtomMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            class_1.prototype.computeBBox = function (bbox, recompute) {
                if (recompute === void 0) {
                    recompute = false;
                }
                _super.prototype.computeBBox.call(this, bbox, recompute);
                if (this.childNodes[0] && this.childNodes[0].bbox.ic) {
                    bbox.ic = this.childNodes[0].bbox.ic;
                }
                if (this.node.texClass === MmlNode_js_1.TEXCLASS.VCENTER) {
                    var h = bbox.h, d = bbox.d;
                    var a = this.font.params.axis_height;
                    var dh = ((h + d) / 2 + a) - h;
                    bbox.h += dh;
                    bbox.d -= dh;
                }
            };
            return class_1;
        }(Base));
    }