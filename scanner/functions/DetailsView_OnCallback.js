function DetailsView_OnCallback (result, context) {
    var value = new String(result);
    var valsArray = value.split("|");
    var innerHtml = valsArray[2];
    for (var i = 3; i < valsArray.length; i++) {
        innerHtml += "|" + valsArray[i];
    }
    context.panelElement.innerHTML = innerHtml;
    context.stateField.value = createPropertyStringFromValues_DetailsView(valsArray[0], valsArray[1]);
}