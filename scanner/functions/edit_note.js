function edit_note(event) {

    var nval = $(event).find('iris_note').attr('id');
    collaborator = null;
    note_detail(nval);

}