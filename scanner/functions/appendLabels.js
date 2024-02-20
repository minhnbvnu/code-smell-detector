function appendLabels(list, items, itemType) {
    items.forEach((item) => {
        const label = $('<label></label>').addClass('d-block');
        const input = $('<input>').attr({
            type: 'checkbox',
            name: itemType,
            value: filterXSS(item[itemType + '_name'] || item[itemType + '_value']),
            id: item[itemType + '_uuid'],
            checked: true,
        });
        label.append(input);
        label.append(`${filterXSS(item[itemType + '_name'] || item[itemType + '_value'])}`);
        list.append(label);
    });
}