function exportBtnSetup(hotTableComponent) {
    let btn = document.getElementById('export-file');
    const cur_instance = hotTableComponent.current.hotInstance;
    btn.addEventListener('click', function () {
        let exportPlugin = cur_instance.getPlugin('exportFile');
        exportPlugin.downloadFile('csv', {
            bom: false,
            columnDelimiter: columnDelimiter,
            exportHiddenColumns: true,
            exportHiddenRows: true,
            fileExtension: 'csv',
            filename: 'internships_[YYYY]-[MM]-[DD]',
            mimeType: 'text/csv',
            columnHeaders: true,
            rowHeaders: true,
        });
    });
}