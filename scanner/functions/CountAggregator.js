function CountAggregator(field) {
        this.field_ = field;
        this.init = function () {
        };
        this.storeResult = function (groupTotals) {
            if (!groupTotals.count) {
                groupTotals.count = {};
            }
            groupTotals.count[this.field_] = groupTotals.group.rows.length;
        };
    }