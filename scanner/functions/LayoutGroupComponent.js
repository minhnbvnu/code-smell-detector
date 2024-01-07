constructor(system, entity) {
        super(system, entity);

        /** @private */
        this._orientation = ORIENTATION_HORIZONTAL;
        /** @private */
        this._reverseX = false;
        /** @private */
        this._reverseY = true;
        /** @private */
        this._alignment = new Vec2(0, 1);
        /** @private */
        this._padding = new Vec4();
        /** @private */
        this._spacing = new Vec2();
        /** @private */
        this._widthFitting = FITTING_NONE;
        /** @private */
        this._heightFitting = FITTING_NONE;
        /** @private */
        this._wrap = false;
        /** @private */
        this._layoutCalculator = new LayoutCalculator();

        // Listen for the group container being resized
        this._listenForReflowEvents(this.entity, 'on');

        // Listen to existing children being resized
        this.entity.children.forEach((child) => {
            this._listenForReflowEvents(child, 'on');
        });

        // Listen to newly added children being resized
        this.entity.on('childinsert', this._onChildInsert, this);
        this.entity.on('childremove', this._onChildRemove, this);

        // Listen for ElementComponents and LayoutChildComponents being added
        // to self or to children - covers cases where they are not already
        // present at the point when this component is constructed.
        Debug.assert(system.app.systems.element, `System 'element' doesn't exist`);
        system.app.systems.element.on('add', this._onElementOrLayoutComponentAdd, this);
        system.app.systems.element.on('beforeremove', this._onElementOrLayoutComponentRemove, this);

        Debug.assert(system.app.systems.layoutchild, `System 'layoutchild' doesn't exist`);
        system.app.systems.layoutchild.on('add', this._onElementOrLayoutComponentAdd, this);
        system.app.systems.layoutchild.on('beforeremove', this._onElementOrLayoutComponentRemove, this);
    }