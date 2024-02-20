function reloadRuntime(oncomplete) {
    runtime_cursor = 'crosshair';
    QRuntime.document.open();
    
    let src = `<!DOCTYPE html><script>var $THREADED_GPU = ${$THREADED_GPU};</script>\n`;
    for (const script of ['cpu', $THREADED_GPU ? false : 'gpu', 'physics', 'ai', 'common']) {
        if (script) {
            src += `<script src='quadplay-runtime-${script}.js'></script>\n`;
        }
    }
    QRuntime.document.write(src);
    
    QRuntime.onload = function () {
        QRuntime.$resize_framebuffer(SCREEN_WIDTH, SCREEN_HEIGHT);
        QRuntime.reset_clip();

        // Initialize the virtual GPU memory
        QRuntime.$set_texture(spritesheetArray, fontArray);
        QRuntime.$quit_action = quitAction;

        // Remove any base URL that appears to include the quadplay URL
        QRuntime.$window = window;
        QRuntime.$gameURL = gameSource ? (gameSource.jsonURL || '').replace(location.href.replace(/\?.*/, ''), '') : '';
        QRuntime.$debugPrintEnabled  = document.getElementById('debugPrintEnabled').checked && useIDE;
        QRuntime.$assertEnabled      = document.getElementById('assertEnabled').checked && useIDE;
        QRuntime.$todoEnabled        = document.getElementById('todoEnabled').checked && useIDE;
        QRuntime.$debugWatchEnabled  = document.getElementById('debugWatchEnabled').checked && useIDE;
        QRuntime.$showEntityBoundsEnabled = document.getElementById('showEntityBoundsEnabled').checked && useIDE;
        QRuntime.$showPhysicsEnabled = document.getElementById('showPhysicsEnabled').checked && useIDE;
        QRuntime.$onScreenHUDEnabled = document.getElementById('onScreenHUDEnabled').checked && useIDE;
        QRuntime.$debug_watch        = debug_watch;
        QRuntime.$debug_print        = debug_print;
        QRuntime.assert              = assert;
        QRuntime.$parse              = $parse;
        QRuntime.$submitFrame        = submitFrame;
        QRuntime.$requestInput       = requestInput;
        QRuntime.$updateInput        = updateInput;
        QRuntime.$resetTouchInput    = resetTouchInput;
        QRuntime.$systemPrint        = $systemPrint;
        QRuntime.$parseHexColor      = parseHexColor;
        QRuntime.$Physics            = Matter;
        QRuntime.$updateHostCodeCopyRuntimeDialogVisiblity = updateHostCodeCopyRuntimeDialogVisiblity;
        QRuntime.$fontMap            = fontMap;
        QRuntime.$onScreenHUDDisplay = onScreenHUDDisplay;

        QRuntime.$pauseAllSounds     = pauseAllSounds;
        QRuntime.$resumeAllSounds    = resumeAllSounds;
        QRuntime.makeEuroSmoothValue = makeEuroSmoothValue;
        QRuntime.$navigator          = navigator;
        QRuntime.$version            = version;
        QRuntime.$prompt             = prompt;
        QRuntime.$setFramebufferSize = setFramebufferSize;
        QRuntime.$escapeHTMLEntities = escapeHTMLEntities;
        QRuntime.$sleep              = useIDE ? null : sleep;
        QRuntime.disconnect_guest    = disconnectGuest;
        QRuntime.$notifyGuestsOfPostEffects = notifyGuestsOfPostEffects;
        QRuntime.$resetEmulatorKeyState = resetEmulatorKeyState;
        QRuntime.$Object.prototype.toString = function () {
            return (this && this.$name) || QRuntime.unparse(this);
        };

        if (isQuadserver) {
            // Persist to disk
            // TODO: implement persistence
            QRuntime.$getLocalStorage    = function (key) { return localStorage.getItem(key); };
            QRuntime.$setLocalStorage    = function (key, value) { return localStorage.setItem(key, value); };
        } else {
            QRuntime.$getLocalStorage    = function (key) { return localStorage.getItem(key); };
            QRuntime.$setLocalStorage    = function (key, value) { return localStorage.setItem(key, value); };
        }

        // For use by the online component
        QRuntime.$wordsToNetID       = wordsToNetID;
        QRuntime.$netIDToWords       = netIDToWords;
        QRuntime.$netIDToSentence    = netIDToSentence;
        QRuntime.$netIDToString      = netIDToString;
        QRuntime.$changeMyHostNetID  = changeMyHostNetID;
        QRuntime.$setMyOnlineName    = setMyOnlineName;
        QRuntime.start_hosting       = $start_hosting;
        QRuntime.stop_hosting        = stopHosting;
        QRuntime.$startGuesting      = startGuesting;
        QRuntime.$getIsOffline       = getIsOffline;
        QRuntime.$NET_ID_WORD_TABLE  = NET_ID_WORD_TABLE;
        QRuntime.$showPopupMessage   = showPopupMessage;
        QRuntime.$setRuntimeDialogVisible   = setRuntimeDialogVisible;

        // Map the global midi object as read-only
        Object.defineProperty(QRuntime, 'midi', {value: midi, writable: false});

        // For use by the controller remapping
        QRuntime.$localStorage       = localStorage;
        QRuntime.$getIdealGamepads   = getIdealGamepads;
        QRuntime.$setGamepadOrderMap = setGamepadOrderMap;

        // Accessors for touch and gamepads
        const padXGetter = {
            enumerable: true,
            get: function () {
                return this.$x * QRuntime.$scaleX;
            }
        };

        const dxGetter = {
            enumerable: true,
            get: function () {
                return this.$dx * QRuntime.$scaleX;
            }
        };
        
        const padXXGetter = {
            enumerable: true,
            get: function () {
                return this.$xx * QRuntime.$scaleX;
            }
        };
        
        const padYGetter = {
            enumerable: true,
            get: function () {
                return this.$y * QRuntime.$scaleY;
            }
        };
        
        const dyGetter = {
            enumerable: true,
            get: function () {
                return this.$dy * QRuntime.$scaleY;
            }
        };
        
        const padYYGetter = {
            enumerable: true,
            get: function () {
                return this.$yy * QRuntime.$scaleY;
            }
        };
        
        const xyGetter = {
            enumerable: true,
            get: function () {
                return {x: this.x, y: this.y}
            }
        };
        
        const hoverGetter = {
            enumerable: true,
            get: function () {
                if (mouse.movement_x || (mouse.screen_x !== mouse.screen_x_prev) ||
                    mouse.movement_y || (mouse.screen_y !== mouse.screen_y_prev)) {
                    return {
                        x: (mouse.screen_x - QRuntime.$offsetX) / QRuntime.$scaleX,
                        y: (mouse.screen_y - QRuntime.$offsetY) / QRuntime.$scaleY
                    };
                } else {
                    return {x: NaN, y: NaN};
                }
            }
        };

        const dxyGetter = {
            enumerable: true,
            get: function () {
                return {x: this.dx, y: this.dy}
            }
        };

        const angleGetter = {
            enumerable: true,
            get: function () {
                let a = (this.$angle * QRuntime.$scaleY + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
                if (Math.abs(a + Math.PI) < 1e-10) { a = Math.PI; }
                return a;
            }
        };

        const dangleGetter = {
            enumerable: true,
            get: function () {
                let a = (this.$dangle * QRuntime.$scaleY + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
                if (Math.abs(a + Math.PI) < 1e-10) { a = Math.PI; }
                return a;
            }
        };

        const statusGetter = {
            enumerable: true,
            get: function() { return this.$status; }
        };


        function $bind_gamepad_getters(pad) {
            Object.defineProperty(pad, 'x', padXGetter);
            Object.defineProperty(pad, 'dx', dxGetter);
            Object.defineProperty(pad, 'xx', padXXGetter);
            Object.defineProperty(pad, 'y', padYGetter);
            Object.defineProperty(pad, 'dy', dyGetter);
            Object.defineProperty(pad, 'yy', padYYGetter);
            Object.defineProperty(pad, 'xy', xyGetter);
            Object.defineProperty(pad, 'dxy', dxyGetter);
            Object.defineProperty(pad, 'angle', angleGetter);
            Object.defineProperty(pad, 'dangle', dangleGetter);
            Object.defineProperty(pad, 'status', statusGetter);
        }

        QRuntime.touch = {
            screen_x: 0,
            screen_y: 0,
            screen_dx: 0,
            screen_dy: 0,
            a: 0,
            pressed_a: 0,
            aa: 0,
            released_a: 0
        };

        // Intentional error property to avoid typos
        Object.defineProperty(QRuntime.touch, 'a_pressed', {get: function () { throw 'No touch.a_pressed property exists. Use touch.pressed_a'; }});
        Object.defineProperty(QRuntime.touch, 'a_released', {get: function () { throw 'No touch.a_released property exists. Use touch.released_a'; }});
        Object.defineProperty(QRuntime.touch, 'xy', xyGetter);
        Object.defineProperty(QRuntime.touch, 'dxy', dxyGetter);
        Object.defineProperty(QRuntime.touch, 'x', {
            enumerable: true,
            get: function () {
                return (this.screen_x - QRuntime.$offsetX) / QRuntime.$scaleX;
            }
        });
        Object.defineProperty(QRuntime.touch, 'y', {
            enumerable: true,
            get: function () {
                return (this.screen_y - QRuntime.$offsetY) / QRuntime.$scaleY;
            }
        });
        Object.defineProperty(QRuntime.touch, 'dx', {
            enumerable: true,
            get: function () {
                return this.screen_dx / QRuntime.$scaleX;
            }
        });
        Object.defineProperty(QRuntime.touch, 'dy', {
            enumerable: true,
            get: function () {
                return this.screen_dy / QRuntime.$scaleY;
            }
        });
        Object.defineProperty(QRuntime.touch, 'screen_xy', {
            enumerable: true,
            get: function () {
                return {x: this.screen_x, y: this.screen_y}
            }
        });
        Object.defineProperty(QRuntime.touch, 'screen_dxy', {
            enumerable: true,
            get: function () {
                return {x: this.screen_dx, y: this.screen_dy}
            }
        });
        Object.defineProperty(QRuntime.touch, 'hover', hoverGetter);
        Object.seal(QRuntime.touch);
        
        QRuntime.gamepad_array = Object.seal([0,0,0,0]);
        const COLOR_ARRAY = ['f5a', '0af', 'ed3', '4e4'];

        for (let p = 0; p < 4; ++p) {
            const type = 'Quadplay';

            // These will be overridden immediately on the first call to updateInput()
            // if the id of the underlying device has changed.
            let controlBindings = JSON.parse(localStorage.getItem('pad0' + p) || 'null');
            if (! controlBindings) {
                controlBindings = {id: isMobile ? 'mobile' : '', type: defaultControlType(p)};
            }

            const player_color = parseHexColor(COLOR_ARRAY[p]);
            const pad = {
                // Set on connection
                $guest_name: '',

                $status: 'absent',

                // Set from network updates
                $guest_latest_state: null,
                
                $x: 0, $dx: 0, $xx: 0,
                $y: 0, $dy: 0, $yy: 0,
                $angle:0, $dangle:0,
                a:0, b:0, c:0, d:0, e:0, f:0, $p:0, q:0,
                aa:0, bb:0, cc:0, dd:0, ee:0, ff:0, $pp:0, qq:0,
                pressed_a:0, pressed_b:0, pressed_c:0, pressed_d:0, pressed_e: 0, pressed_f:0, $pressed_p:0, pressed_q:0,
                released_a:0, released_b:0, released_c:0, released_d:0, released_e:0, released_f:0, $released_p:0, released_q:0,
                index: p,
                player_color: Object.freeze({r:player_color.r, g:player_color.g, b:player_color.b}),
                type: controlBindings.type,
                prompt: Object.freeze(Object.assign({'##': '' + (p + 1)}, controlSchemeTable[controlBindings.type])),

                // May be the empty string
                $id: controlBindings.id,
                $analog: [0, 0, 0, 0],
                $name: `gamepad_array[${p}]`
            };

            $bind_gamepad_getters(pad);
            QRuntime.$controlSchemeTable = controlSchemeTable;

            for (let b of "abcdefq") {
                Object.defineProperty(pad, b + '_pressed', {get: function () { throw 'No gamepad.' + b + '_pressed property exists. Use gamepad.pressed_' + b; }});
                Object.defineProperty(pad, b + '_released', {get: function () { throw 'No gamepad.' + b + '_released property exists. Use gamepad.released_' + b; }});
            }

            Object.defineProperty(pad, 'online_name', {
                enumerable: true,
                get: function () {
                    if (! isHosting || this.index === 0) {
                        return myOnlineName;
                    } else {
                        return this.$guest_name;
                    }
                }
            });
            QRuntime.gamepad_array[p] = Object.seal(pad);
        }
        QRuntime.joy = QRuntime.gamepad_array[0];
        QRuntime.$bind_gamepad_getters = $bind_gamepad_getters;
        QRuntime.device_control  = device_control;
        QRuntime.$play_sound     = play_sound;
        QRuntime.stop_audio      = stop_audio;
        QRuntime.resume_audio    = resume_audio;
        QRuntime.set_volume      = set_volume;
        QRuntime.set_playback_rate = set_playback_rate;
        QRuntime.set_pitch       = set_pitch;
        
        // set_pan is different because it has a standard library stub that processes the
        // transformation before calling the browser version
        QRuntime.$set_pan        = set_pan;
        QRuntime.get_audio_status= get_audio_status;
        QRuntime.debug_pause     = onPauseButton;
        
        if (oncomplete) { oncomplete(); }
    };

    QRuntime.document.close();
}