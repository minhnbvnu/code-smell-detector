function PopOut_Scroll(panel, offsetDelta) {
    var table = WebForm_GetElementByTagName(panel, "TABLE");
    if (!table) return;
    table.style.position = "relative";
    var tableY = (table.style.top ? parseInt(table.style.top) : 0);
    panel.offset += offsetDelta;
    WebForm_SetElementY(table, tableY - offsetDelta);
}