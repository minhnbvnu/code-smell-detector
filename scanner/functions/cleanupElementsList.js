function cleanupElementsList() {
        elements.sort(function(a, b) {
            var x = a.getAttribute('contains');
            var y = b.getAttribute('contains');
            return x.localeCompare(y);
        });
    }