function tabularize(json) {
        // Turns a JSON object of picked info into HTML for a tooltip
        const dataTable = getDiv();
        // Creates rows of two columns for the tooltip
        for (const key in json) {
            if (EXCLUDES.has(key)) {
                continue; // eslint-disable-line
            }
            const header = getDiv();
            header.className = 'header';
            header.textContent = key;
            const valueElement = getDiv();
            valueElement.className = 'value';
            valueElement.textContent = toText(json[key]);
            const row = getDiv();
            setStyles(row, header, valueElement);
            row.appendChild(header);
            row.appendChild(valueElement);
            dataTable.appendChild(row);
        }
        return dataTable.innerHTML;
    }