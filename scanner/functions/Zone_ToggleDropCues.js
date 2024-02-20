function Zone_ToggleDropCues(show, index, ignoreOutline) {
    if (ignoreOutline == false) {
        this.webPartTable.style.borderColor = (show ? this.highlightColor : this.savedBorderColor);
    }
    if (index == -1) {
        return;
    }
    var dropCue = this.dropCueElements[index];
    if (dropCue && dropCue.style) {
        if (dropCue.style.height == "100%" && !dropCue.webPartZoneHorizontalCueResized) {
            var oldParentHeight = dropCue.parentElement.clientHeight;
            var realHeight = oldParentHeight - 10;
            dropCue.style.height = realHeight + "px";
            var dropCueVerticalBar = dropCue.getElementsByTagName("DIV")[0];
            if (dropCueVerticalBar && dropCueVerticalBar.style) {
                dropCueVerticalBar.style.height = dropCue.style.height;
                var heightDiff = (dropCue.parentElement.clientHeight - oldParentHeight);
                if (heightDiff) {
                    dropCue.style.height = (realHeight - heightDiff) + "px";
                    dropCueVerticalBar.style.height = dropCue.style.height;
                }
            }
            dropCue.webPartZoneHorizontalCueResized = true;
        }
        dropCue.style.visibility = (show ? "visible" : "hidden");
    }
}