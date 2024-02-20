function recordHit(req) {
    db.run(
        'INSERT INTO hits VALUES (?, ?);',
        Date.now(),
        getClientIP(req)
    );
}