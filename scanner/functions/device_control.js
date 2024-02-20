function device_control(cmd) {
    switch (cmd) {
    case "start_GIF_recording":     startGIFRecording(); break;
    case "stop_GIF_recording":      stopGIFRecording(); break;
    case "take_screenshot":         downloadScreenshot(); break;
    case "take_label_image":        if (editableProject) { takeLabelImage(); } break;
    case "start_preview_recording": if (editableProject) { startPreviewRecording(); } break;
    case "set_debug_flag":
        {
            let value = (arguments[2] ? true : false);
            switch (arguments[1]) {
            case "entity_bounds":
                QRuntime.$showEntityBoundsEnabled = document.getElementById('showEntityBoundsEnabled').checked = value;
                break;
            case "physics":
                QRuntime.$showPhysicsEnabled = document.getElementById('showPhysicsEnabled').checked = value;
                break;
            case "debug_print":
                QRuntime.$debugPrintEnabled = document.getElementById('debugPrintEnabled').checked = value;
                break;
            case "assert":
                QRuntime.$assertEnabled = document.getElementById('assertEnabled').checked = value;
                break;
            case "debug_watch":
                QRuntime.$debugWatchEnabled = document.getElementById('debugWatchEnabled').checked = value;
                break;
            default:
                throw new Error('Unsupported flagname passed to device_control("setDebugFlag", flagname, value): "' + arguments[1] + '"');
            }
        }
        break;
        
    case "get_debug_flag":
        {
            switch (arguments[1]) {
            case "entity_bounds":
                return QRuntime.$showEntityBoundsEnabled;
                break;
            case "physics":
                return QRuntime.$showPhysicsEnabled;
                break;
            case "debug_print":
                return QRuntime.$debugPrintEnabled;
                break;
            case "assert":
                return QRuntime.$assertEnabled;
                break;
            case "debug_watch":
                return QRuntime.$debugWatchEnabled;
                break;
            default:
                throw new Error('Unsupported flagname passed to device_control("get_debug_flag", flagname): "' + arguments[1] + '"');
            }
        }
        break;
        
    case "get_analog_axes":
        {
            const player = clamp(parseInt(arguments[1] || 0), 0, 3);
            const stick = clamp(parseInt(arguments[2] || 0), 0, 1);
            const pad = QRuntime.gamepad_array[player];
            return Object.freeze({x: pad.$analog[2 * stick] * QRuntime.$scaleX, y: pad.$analog[2 * stick + 1] * QRuntime.$scaleY});
            break;
        }

    case "set_mouse_cursor":
        {
            runtime_cursor = QRuntime.unparse(arguments[1]).replace(/[^_a-z]/g, '');
            emulatorScreen.style.cursor = overlayScreen.style.cursor = runtime_cursor;
            break;
        }
        
    case "set_mouse_lock":
        // The state will be remembered and applied by pause and play buttons
        usePointerLock = arguments[1] !== false;
        if (usePointerLock) {
            maybeGrabPointerLock();
        } else {
            releasePointerLock();
        }
        break;
        
    case "get_mouse_state":
        {
            const mask = mouse.buttons;
            const xy = Object.freeze({
                x: (mouse.screen_x - QRuntime.$offsetX) / QRuntime.$scaleX,
                y: (mouse.screen_y - QRuntime.$offsetY) / QRuntime.$scaleY});

            const dxy = Object.freeze({
                x: ((mouse.movement_x === undefined) ? (mouse.screen_x - mouse.screen_x_prev) : mouse.movement_x) * QRuntime.$scaleX,
                y: ((mouse.movement_y === undefined) ? (mouse.screen_y - mouse.screen_y_prev) : mouse.movement_y) * QRuntime.$scaleY});

            return Object.freeze({
                x: xy.x,
                y: xy.y,
                dx: dxy.x,
                dy: dxy.y,
                xy: xy,
                dxy: dxy,
                lock: usePointerLock,
                cursor: overlayScreen.style.cursor,
                button_array: Object.freeze([
                    (mask & 1),
                    (mask & 2) >> 1,
                    (mask & 4) >> 2,
                    (mask & 8) >> 3,
                    (mask & 16) >> 4,
                    (mask & 32) >> 5])});
            break;
        }

    case "set_pad_type":
        {
            const i = arguments[1];
            const type = arguments[2];
            setPadType(i, type);
            break;
        }

    case "multitouch":
        {
            const xGetter = {
                enumerable: true,
                get: function () {
                    return (this.screen_x - QRuntime.$offsetX) / QRuntime.$scaleX;
                }
            };
            
            const yGetter = {
                enumerable: true,
                get: function () {
                    return (this.screen_y - QRuntime.$offsetY) / QRuntime.$scaleY;
                }
            };
        
            const xyGetter = {
                enumerable: true,
                get: function () {
                    return {x: this.x, y: this.y}
                }
            };
            

            const array = [];
            for (const k in activeTouchTracker) {
                const tracker = activeTouchTracker[k];
                if (tracker.screen_x == undefined) { continue; }
            
                const touch = {id: tracker.identifier,
                               screen_x: tracker.screen_x, screen_y: tracker.screen_y,
                               screen_xy: Object.freeze({x: tracker.screen_x, y: tracker.screen_y})};

                Object.defineProperty(touch, 'x', xGetter);
                Object.defineProperty(touch, 'y', yGetter);
                Object.defineProperty(touch, 'xy', xyGetter);

                array.push(Object.freeze(touch));
            }
            
            return array;
            break;
        }
        
    case "console.dir":
        console.dir(...Array.prototype.slice.call(arguments, 1));
        break;

    case "save":
        if (useIDE && isQuadserver) {
            const filename = arguments[1];
            const value = arguments[2];
            const callback = arguments[3];
            if (typeof filename === 'string' && filename.indexOf('/') === -1 && filename.indexOf('\\') === -1 && filename.endsWith('.json')) {
                try {
                    const jsonString = WorkJSON.stringify(value);
                    serverWriteFile(makeURLRelativeToGame(filename), 'utf8', jsonString, callback ? function() { callback(value, filename); } : undefined);
                } catch (e) {
                    // Fail silently
                    console.log(e);
                }
            }
        }
        break;

    case "load":
        if (useIDE && isQuadserver) {
            const filename = arguments[1];
            const callback = arguments[2];
            if (typeof filename === 'string' && filename.indexOf('/') === -1 && filename.indexOf('\\') === -1 && filename.endsWith('.json') && callback) {
                LoadManager.fetchOne({forceReload: true}, makeURLRelativeToGame(filename), 'json', null, function (json) {
                    try {
                        callback(json, filename);
                    } catch (e) {
                        // Fail silently
                        console.log(e);
                    }
                });
            } // if legal filename
        }
        break;

    case "enable_feature":
        {
            switch (arguments[1]) {
            case '768x448,private_views':
                QRuntime.$feature_768x448 = true;
                break;
                
            case 'steinbach':
                QRuntime.$feature_custom_resolution = true;
                break;
                
            default:
                throw new Error('Unknown feature to device_control("enable_feature", feature): "' + arguments[1] + '"');
            }
            break;
        } // enable_feature
    }
}