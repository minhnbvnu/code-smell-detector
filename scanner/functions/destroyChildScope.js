function destroyChildScope($event) {
        $event.currentScope.$$destroyed = true;
    }