function downloadCaseTemplateDefinition() {
    event.preventDefault();
    let editor = ace.edit("editor_detail");
    let data = editor.getSession().getValue();

    let filename = "case_template.json";
    download_file(filename, 'text/json' , data);
}