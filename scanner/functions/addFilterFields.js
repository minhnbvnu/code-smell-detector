function addFilterFields(tableId){
    $('#' + tableId + ' thead tr')
        .clone(true)
        .addClass('filters')
        .appendTo('#' + tableId + ' thead');
}