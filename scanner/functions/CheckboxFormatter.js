function CheckboxFormatter(row, cell, value, columnDef, dataContext) {
        return '<img class="slick-edit-preclick" src="../images/' + (value ? "CheckboxY" : "CheckboxN") + '.png">';
    }