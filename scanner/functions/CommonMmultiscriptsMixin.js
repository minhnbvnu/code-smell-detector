function CommonMmultiscriptsMixin(Base) {
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var _this = _super.apply(this, __spreadArray([], __read(args), false)) || this;
                _this.scriptData = null;
                _this.firstPrescript = 0;
                _this.getScriptData();
                return _this;
            }
            class_1.prototype.combinePrePost = function (pre, post) {
                var bbox = new BBox_js_1.BBox(pre);
                bbox.combine(post, 0, 0);
                return bbox;
            };
            class_1.prototype.computeBBox = function (bbox, recompute) {
                if (recompute === void 0) {
                    recompute = false;
                }
                var scriptspace = this.font.params.scriptspace;
                var data = this.scriptData;
                var sub = this.combinePrePost(data.sub, data.psub);
                var sup = this.combinePrePost(data.sup, data.psup);
                var _a = __read(this.getUVQ(sub, sup), 2), u = _a[0], v = _a[1];
                bbox.empty();
                if (data.numPrescripts) {
                    bbox.combine(data.psup, scriptspace, u);
                    bbox.combine(data.psub, scriptspace, v);
                }
                bbox.append(data.base);
                if (data.numScripts) {
                    var w = bbox.w;
                    bbox.combine(data.sup, w, u);
                    bbox.combine(data.sub, w, v);
                    bbox.w += scriptspace;
                }
                bbox.clean();
                this.setChildPWidths(recompute);
            };
            class_1.prototype.getScriptData = function () {
                var data = this.scriptData = {
                    base: null, sub: BBox_js_1.BBox.empty(), sup: BBox_js_1.BBox.empty(), psub: BBox_js_1.BBox.empty(), psup: BBox_js_1.BBox.empty(),
                    numPrescripts: 0, numScripts: 0
                };
                var lists = this.getScriptBBoxLists();
                this.combineBBoxLists(data.sub, data.sup, lists.subList, lists.supList);
                this.combineBBoxLists(data.psub, data.psup, lists.psubList, lists.psupList);
                data.base = lists.base[0];
                data.numPrescripts = lists.psubList.length;
                data.numScripts = lists.subList.length;
            };
            class_1.prototype.getScriptBBoxLists = function () {
                var e_1, _a;
                var lists = {
                    base: [], subList: [], supList: [], psubList: [], psupList: []
                };
                var script = 'base';
                try {
                    for (var _b = __values(this.childNodes), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var child = _c.value;
                        if (child.node.isKind('mprescripts')) {
                            script = 'psubList';
                        }
                        else {
                            lists[script].push(child.getOuterBBox());
                            script = exports.NextScript[script];
                        }
                    }
                }
                catch (e_1_1) {
                    e_1 = { error: e_1_1 };
                }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return))
                            _a.call(_b);
                    }
                    finally {
                        if (e_1)
                            throw e_1.error;
                    }
                }
                this.firstPrescript = lists.subList.length + lists.supList.length + 2;
                this.padLists(lists.subList, lists.supList);
                this.padLists(lists.psubList, lists.psupList);
                return lists;
            };
            class_1.prototype.padLists = function (list1, list2) {
                if (list1.length > list2.length) {
                    list2.push(BBox_js_1.BBox.empty());
                }
            };
            class_1.prototype.combineBBoxLists = function (bbox1, bbox2, list1, list2) {
                for (var i = 0; i < list1.length; i++) {
                    var _a = __read(this.getScaledWHD(list1[i]), 3), w1 = _a[0], h1 = _a[1], d1 = _a[2];
                    var _b = __read(this.getScaledWHD(list2[i]), 3), w2 = _b[0], h2 = _b[1], d2 = _b[2];
                    var w = Math.max(w1, w2);
                    bbox1.w += w;
                    bbox2.w += w;
                    if (h1 > bbox1.h)
                        bbox1.h = h1;
                    if (d1 > bbox1.d)
                        bbox1.d = d1;
                    if (h2 > bbox2.h)
                        bbox2.h = h2;
                    if (d2 > bbox2.d)
                        bbox2.d = d2;
                }
            };
            class_1.prototype.getScaledWHD = function (bbox) {
                var w = bbox.w, h = bbox.h, d = bbox.d, rscale = bbox.rscale;
                return [w * rscale, h * rscale, d * rscale];
            };
            class_1.prototype.getUVQ = function (subbox, supbox) {
                var _a;
                if (!this.UVQ) {
                    var _b = __read([0, 0, 0], 3), u = _b[0], v = _b[1], q = _b[2];
                    if (subbox.h === 0 && subbox.d === 0) {
                        u = this.getU();
                    }
                    else if (supbox.h === 0 && supbox.d === 0) {
                        u = -this.getV();
                    }
                    else {
                        _a = __read(_super.prototype.getUVQ.call(this, subbox, supbox), 3), u = _a[0], v = _a[1], q = _a[2];
                    }
                    this.UVQ = [u, v, q];
                }
                return this.UVQ;
            };
            return class_1;
        }(Base));
    }