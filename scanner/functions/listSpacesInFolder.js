function listSpacesInFolder(req, res, parent_space_id) {
  db.Space
    .findOne({where: {
      _id: parent_space_id
    }})
    .then(function(space) {
      if (space) {
        function spacesForRole(role) {
          if (role == "none") {
            if (space.access_mode == "public") {
              role = "viewer";
            }
          }
          if (role != "none") {
            db.Space
              .findAll({where:{
                parent_space_id: parent_space_id
              }, include:[db.CreatorSafeInclude(db)]})
              .then(function(spaces) {
                res.status(200).json(spaces);
              });
          } else {
            res.status(403).json({"error": "not authorized"});
          }
        }

        if (req["spaceAuth"] && space.edit_hash) {
          // TODO could be editor, too
          spacesForRole("none");
        } else {
          db.getUserRoleInSpace(space, req.user, spacesForRole);
        }
      } else {
        res.status(404).json({"error": "space not found"});
      }
    });
}