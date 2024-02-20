function CommonMtdMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(class_1.prototype, "fixesPWidth", {
                get: function () {
                    return false;
                },
                enumerable: false,
                configurable: true
            });
            class_1.prototype.invalidateBBox = function () {
                this.bboxComputed = false;
            };
            class_1.prototype.getWrapWidth = function (_j) {
                var table = this.parent.parent;
                var row = this.parent;
                var i = this.node.childPosition() - (row.labeled ? 1 : 0);
                return (typeof (table.cWidths[i]) === 'number' ? table.cWidths[i] : table.getTableData().W[i]);
            };
            class_1.prototype.getChildAlign = function (_i) {
                return this.node.attributes.get('columnalign');
            };
            return class_1;
        }(Base));
    }