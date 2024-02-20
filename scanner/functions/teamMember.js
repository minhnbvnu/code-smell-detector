function teamMember(req, res, next) {
    var from = req.body.From;
    var member = team.get(from);

    if (member) {
        req.teamMember = member;
        next();
    } else {
        res.status(403).send('Limited to team member');
    }
}