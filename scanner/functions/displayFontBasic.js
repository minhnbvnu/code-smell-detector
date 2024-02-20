function displayFontBasic() {
    var container = document.getElementById('font-data');

    var html = '<div><dt>family</dt><dd>' + font.names.fontFamily.en + '</dd></div>';
    html += '<div><dt>style</dt><dd>' + font.names.fontSubfamily.en + '</dd></div>';
    html += '<div><dt>format</dt><dd>' + font.outlinesFormat + '</dd></div>';
    html += '<div><dt>version</dt><dd>' + font.names.version.en + '</dd></div>';

    container.innerHTML = html;
}