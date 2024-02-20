function BBox(def) {
            if (def === void 0) {
                def = { w: 0, h: -lengths_js_1.BIGDIMEN, d: -lengths_js_1.BIGDIMEN };
            }
            this.w = def.w || 0;
            this.h = ('h' in def ? def.h : -lengths_js_1.BIGDIMEN);
            this.d = ('d' in def ? def.d : -lengths_js_1.BIGDIMEN);
            this.L = this.R = this.ic = this.sk = this.dx = 0;
            this.scale = this.rscale = 1;
            this.pwidth = '';
        }