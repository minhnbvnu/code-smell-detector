function getBeforeChangeFunction(table) {
    return function beforeChange(changes, source) {
        for(var counter = 0; counter < changes.length; counter++) {
            // use 0 for the row because the latest row might not have been rendered yet
            var cell = table.handsontable('getCell', 0, changes[counter][1]);

            // if this is a checkbox column
            if($(cell).find('[type=\'checkbox\']').length > 0)
            {
                var value = changes[counter][3];
                // we need to normalize strings for checkbox values
                if(typeof value === 'string') {
                    if(value.toLowerCase() === 'true') {
                        changes[counter][3] = true;
                    }
                    else {
                        changes[counter][3] = false;
                    }
                }
            }

            addClass(table.handsontable("getCellMeta", changes[counter][0], changes[counter][1]), "modified");
            addClass(table.handsontable("getCellMeta", changes[counter][0], 0), "modified");
        }
    };
}