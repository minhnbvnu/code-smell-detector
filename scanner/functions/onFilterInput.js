function onFilterInput() {
        const searchValue = document.getElementById('fileSearch').value;
        const rows = document.getElementsByTagName('tbody')[0].children;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (
                row.textContent
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            ) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        }
    }