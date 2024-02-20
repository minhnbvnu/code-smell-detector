function listHumans() {
    return _.filter(LIST, function(m) {
        return m.machine != true;
    });
}