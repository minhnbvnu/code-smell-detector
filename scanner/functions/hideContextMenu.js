function hideContextMenu(e) {
        if (contextMenu)
            contextMenu.style.display = "none";
        editor.off("input", hideContextMenu);
    }