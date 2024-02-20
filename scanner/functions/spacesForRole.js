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