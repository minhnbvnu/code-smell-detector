function importCSV(hotTableComponent) {
    const cur_instance = hotTableComponent.current.hotInstance;

    let input = document.getElementById('dealCsv');
    input.addEventListener('change', async function (e) {
        let reader = new FileReader();

        reader.addEventListener('load', function (e) {
            let csvData = e.target.result;
            parseCSV(cur_instance, csvData);
        });

        reader.readAsText(e.target.files[0]);
    });
}