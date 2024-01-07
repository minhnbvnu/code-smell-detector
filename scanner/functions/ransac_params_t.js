function ransac_params_t(size, thresh, eps, prob) {
            if (typeof size === "undefined") { size=0; }
            if (typeof thresh === "undefined") { thresh=0.5; }
            if (typeof eps === "undefined") { eps=0.5; }
            if (typeof prob === "undefined") { prob=0.99; }

            this.size = size;
            this.thresh = thresh;
            this.eps = eps;
            this.prob = prob;
        }