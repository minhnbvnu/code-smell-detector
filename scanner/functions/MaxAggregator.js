function MaxAggregator(field) {
        this.field_ = field;
        this.init = function () {
            this.max_ = null;
        };
        this.accumulate = function (item) {
            var val = item[this.field_];
            if (val != null && val !== "" && !isNaN(val)) {
                if (this.max_ == null || val > this.max_) {
                    this.max_ = val;
                }
            }
        };
        this.storeResult = function (groupTotals) {
            if (!groupTotals.max) {
                groupTotals.max = {};
            }
            groupTotals.max[this.field_] = this.max_;
        };
    }