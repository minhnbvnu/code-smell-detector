function addDeprecationWarnings() {
    var grid = this.grid;

    Object.defineProperties(this.dataModel, {

        grid: {
            configurable: true,
            enumerable: false,
            get: function() {
                if (!warned.grid) {
                    console.warn('dataModel.grid has been deprecated as of v3.0.0. (Will be removed in a future release.) Data models should have no direct knowledge of or access to the grid. (If your data model needs to call grid methods, add a data event to your grid with `grid.addEventListener(\'fin-hypergrid-data-my-event\', myHandler)` and trigger it from your data model with `this.dispatchEvent(\'fin-hypergrid-data-my-event\')` or `this.dispatchEvent({ type: \'fin-hypergrid-data-my-event\' })`. If you need access to the grid object from within a `getCell` or `getCellEditAt` override, define `grid` in the same closure as the override.)');
                    warned.grid = true;
                }
                return grid;
            }
        },

        dataSource: {
            configurable: true,
            enumerable: false,
            get: function() {
                if (!warned.dataSource) {
                    console.warn('dataModel.dataSource has been deprecated as of 3.0.0 in favor of `dataModel`. (Will be removed in a future release.) The _external_ data model, formerly `grid.behavior.dataModel.dataSource`, is now `grid.behavior.dataModel`.');
                    warned.dataSource = true;
                }
                return this.dataModel;
            }
        }

    });
}