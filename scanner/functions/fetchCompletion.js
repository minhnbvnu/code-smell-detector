function fetchCompletion(gc, fetchError) {
    if (!fetchError) {
        // STEP 1: Render the grid immediately (before next refresh) just to get column widths
        // (for better performance this could be done off-screen but this works fine as is)
        this.gridRenderer.paintCells.call(this, gc);
        // STEP 2: Re-render upon next refresh with proper column widths
        this.grid.repaint();
    }
}