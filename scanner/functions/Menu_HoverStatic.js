function Menu_HoverStatic(item) {
    var node = Menu_HoverRoot(item);
    var data = Menu_GetData(item);
    if (!data) return;
    __disappearAfter = data.disappearAfter;
    Menu_Expand(node, data.horizontalOffset, data.verticalOffset); 
}