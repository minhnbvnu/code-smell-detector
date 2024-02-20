function newCellPropertiesObject(rowIndex, dataModel) {
    var metadata = (dataModel || this.dataModel).getRowMetadata(rowIndex, null),
        props = this.properties;

    switch (this.index) {
        case this.behavior.treeColumnIndex:
            props = props.treeHeader;
            break;
        case this.behavior.rowColumnIndex:
            props = props.rowHeader;
            break;
        default:
            if (dataModel && dataModel.type === 'filter') {
                props = this.properties.filterProperties;
            }
    }

    return (metadata[this.name] = Object.create(props));
}