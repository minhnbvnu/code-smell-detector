function getHeaderAttribute(header, attributeName) {
    const attributeRow = header[header.indexOf(header.find(element => element.includes(attributeName)))].split(' ')
        .filter(value => value !== '');
    return parseFloat(attributeRow[attributeRow.length - 1]);
}