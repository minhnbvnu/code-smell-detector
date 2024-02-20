function PercentCompleteBarFormatter(row, cell, value, columnDef, dataContext) {
        if (value == null || value === "") {
            return "";
        }
        var color;
        if (value < 30) {
            color = "red";
        }
        else if (value < 70) {
            color = "silver";
        }
        else {
            color = "green";
        }
        return "<span class='percent-complete-bar' style='background:" + color + ";width:" + value + "%'></span>";
    }