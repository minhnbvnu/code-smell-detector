function verifyOverloads() {
            trans = db.transaction('store');
            store = trans.objectStore('store');
            index = store.index('index');

            checkCursorDirection("store.openCursor()", "next");
            checkCursorDirection("store.openCursor(0)", "next");
            checkCursorDirection("store.openCursor(0, 'next')", "next");
            checkCursorDirection("store.openCursor(0, 'nextunique')", "nextunique");
            checkCursorDirection("store.openCursor(0, 'prev')", "prev");
            checkCursorDirection("store.openCursor(0, 'prevunique')", "prevunique");

            checkCursorDirection("store.openCursor(FDBKeyRange.only(0))", "next");
            checkCursorDirection("store.openCursor(FDBKeyRange.only(0), 'next')", "next");
            checkCursorDirection("store.openCursor(FDBKeyRange.only(0), 'nextunique')", "nextunique");
            checkCursorDirection("store.openCursor(FDBKeyRange.only(0), 'prev')", "prev");
            checkCursorDirection("store.openCursor(FDBKeyRange.only(0), 'prevunique')", "prevunique");

            checkCursorDirection("index.openCursor()", "next");
            checkCursorDirection("index.openCursor(0)", "next");
            checkCursorDirection("index.openCursor(0, 'next')", "next");
            checkCursorDirection("index.openCursor(0, 'nextunique')", "nextunique");
            checkCursorDirection("index.openCursor(0, 'prev')", "prev");
            checkCursorDirection("index.openCursor(0, 'prevunique')", "prevunique");

            checkCursorDirection("index.openCursor(FDBKeyRange.only(0))", "next");
            checkCursorDirection("index.openCursor(FDBKeyRange.only(0), 'next')", "next");
            checkCursorDirection("index.openCursor(FDBKeyRange.only(0), 'nextunique')", "nextunique");
            checkCursorDirection("index.openCursor(FDBKeyRange.only(0), 'prev')", "prev");
            checkCursorDirection("index.openCursor(FDBKeyRange.only(0), 'prevunique')", "prevunique");

            checkCursorDirection("index.openKeyCursor()", "next");
            checkCursorDirection("index.openKeyCursor(0)", "next");
            checkCursorDirection("index.openKeyCursor(0, 'next')", "next");
            checkCursorDirection("index.openKeyCursor(0, 'nextunique')", "nextunique");
            checkCursorDirection("index.openKeyCursor(0, 'prev')", "prev");
            checkCursorDirection("index.openKeyCursor(0, 'prevunique')", "prevunique");

            checkCursorDirection("index.openKeyCursor(FDBKeyRange.only(0))", "next");
            checkCursorDirection("index.openKeyCursor(FDBKeyRange.only(0), 'next')", "next");
            checkCursorDirection("index.openKeyCursor(FDBKeyRange.only(0), 'nextunique')", "nextunique");
            checkCursorDirection("index.openKeyCursor(FDBKeyRange.only(0), 'prev')", "prev");
            checkCursorDirection("index.openKeyCursor(FDBKeyRange.only(0), 'prevunique')", "prevunique");
        }