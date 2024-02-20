function GridView_OnCallback (result, context) {
    var value = new String(result);
    var valsArray = value.split("|");
    var innerHtml = valsArray[4];
    for (var i = 5; i < valsArray.length; i++) {
        innerHtml += "|" + valsArray[i];
    }
    context.panelElement.innerHTML = innerHtml;
    context.stateField.value = createPropertyStringFromValues_GridView(valsArray[0], valsArray[1], valsArray[2], valsArray[3]);
}