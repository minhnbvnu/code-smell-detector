function initTestEnvironment () {
        // Show which features the browser natively supports
        getElementById('supports-websql').className += env.nativeWebSql ? ' pass' : ' fail';
        getElementById('supports-indexeddb').className += env.nativeIndexedDB ? ' pass' : ' fail';
        getElementById('supports-mozindexeddb').className += window.mozIndexedDB ? ' pass' : '';
        getElementById('supports-webkitindexeddb').className += window.webkitIndexedDB ? ' pass' : '';
        getElementById('supports-msindexeddb').className += window.msIndexedDB ? ' pass' : '';

        // Has a WebSQL shim been loaded?
        env.webSql = window.openDatabase;

        // Should we use the shim instead of the native IndexedDB?
        var useShim = location.search.includes('useShim=true');
        if (useShim || !window.indexedDB || window.indexedDB === window.shimIndexedDB) {
            // Replace the browser's native IndexedDB with the shim
            shimIndexedDB.__useShim();
            shimIndexedDB.__setConfig('useSQLiteIndexes', true);
            shimIndexedDB.__debug(true);
            env.isNative = false;
            if (!IDBFactory.toString().includes('[native code]')) {
                env.indexedDB = shimIndexedDB;
                env.isShimmed = true;
            } else {
                env.isPolyfilled = true;
            }

            if (env.isShimmed) {
                // Use the shimmed Error & Event classes instead of the native ones
                env.Event = window.ShimEvent;
                env.DOMException = window.ShimDOMException;
            }

            if (env.nativeIndexedDB) {
                // Allow users to switch back to the native IndexedDB
                getElementById('use-native').style.display = 'inline-block';
            }
        } else {
            // Allow users to switch to use the shim instead of the native IndexedDB
            getElementById('use-shim').style.display = 'inline-block';
        }

        if ((env.browser.isIE && !env.browser.isMobile) || (env.browser.isSafari && env.browser.version > 6 && env.isShimmed && !window.device)) {
            // These browsers choke when trying to run all the tests, so show a warning message
            getElementById('choke-warning').className = 'problem-child';
        }
    }