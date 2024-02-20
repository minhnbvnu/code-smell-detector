function Notebook(selector, options) {
        this.config = options.config;
        this.config.loaded.then(this.validate_config.bind(this));
        this.class_config = new configmod.ConfigWithDefaults(this.config, 
                                        Notebook.options_default, 'Notebook');
        this.nbclassic_path = options.nbclassic_path;
        this.base_url = options.base_url;
        this.notebook_path = options.notebook_path;
        this.notebook_name = options.notebook_name;
        this.events = options.events;
        this.keyboard_manager = options.keyboard_manager;
        this.contents = options.contents;
        this.save_widget = options.save_widget;
        this.tooltip = new tooltip.Tooltip(this.events);
        this.ws_url = options.ws_url;
        this._session_starting = false;
        this.last_modified = null;
        // debug 484
        this._last_modified = 'init';
        // Firefox workaround
        this._ff_beforeunload_fired = false;

        //  Create default scroll manager.
        this.scroll_manager = new scrollmanager.ScrollManager(this);

        // TODO: This code smells (and the other `= this` line a couple lines down)
        // We need a better way to deal with circular instance references.
        this.keyboard_manager.notebook = this;
        this.save_widget.notebook = this;
        
        mathjaxutils.init();

        this.element = $(selector);
        this.element.scroll();
        this.element.data("notebook", this);
        this.session = null;
        this.kernel = null;
        this.kernel_busy = false;
        this.clipboard = null;
        this.clipboard_attachments = null;
        this.undelete_backup_stack = [];
        this.paste_enabled = false;
        this.paste_attachments_enabled = false;
        this.writable = false;
        // It is important to start out in command mode to match the initial mode
        // of the KeyboardManager.
        this.mode = 'command';
        this.set_dirty(false);
        this.metadata = {};
        this._checkpoint_after_save = false;
        this.last_checkpoint = null;
        this.checkpoints = [];
        this.autosave_interval = 0;
        this.autosave_timer = null;
        // autosave *at most* every two minutes
        this.minimum_autosave_interval = 120000;
        this.notebook_name_blacklist_re = /[\/\\:]/;
        this.nbformat = 4; // Increment this when changing the nbformat
        this.nbformat_minor = this.current_nbformat_minor = 1; // Increment this when changing the nbformat
        this.codemirror_mode = 'text';
        this.create_elements();
        this.bind_events();
        this.kernel_selector = null;
        this.dirty = null;
        this.trusted = null;
        this._changed_on_disk_dialog = null;
        this._fully_loaded = false;

        // Trigger cell toolbar registration.
        default_celltoolbar.register(this);
        rawcell_celltoolbar.register(this);
        slideshow_celltoolbar.register(this);
        attachments_celltoolbar.register(this);
        tags_celltoolbar.register(this);

        var that = this;

        Object.defineProperty(this, 'line_numbers', {
            get: function() {
                var d = that.config.data || {};
                var cmc =  (d['Cell'] || {}) ['cm_config'] || {};
                return cmc['lineNumbers'] || false;
            },
            set: function(value) {
                that.config.update({
                    'Cell': {
                        'cm_config': {
                            'lineNumbers':value
                        }
                    }
                });
            }
        });
        
        Object.defineProperty(this, 'header', {
            get: function() {
                return that.class_config.get_sync('Header');
            },
            set: function(value) {
                that.class_config.set('Header', value);
            }
        });
                
        Object.defineProperty(this, 'toolbar', {
            get: function() {
                return that.class_config.get_sync('Toolbar');
            },
            set: function(value) {
                that.class_config.set('Toolbar', value);
            }
        });
        
        this.class_config.get('Header').then(function(header) {
            if (header === false) {
                that.keyboard_manager.actions.call('jupyter-notebook:hide-header');
            }
        });
        
        this.class_config.get('Toolbar').then(function(toolbar) {
          if (toolbar === false) {
              that.keyboard_manager.actions.call('jupyter-notebook:hide-toolbar');
          }
        });
        
        // prevent assign to miss-typed properties.
        Object.seal(this);
    }