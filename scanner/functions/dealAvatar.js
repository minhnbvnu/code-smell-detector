function dealAvatar (avatar) {
        delete avatar.position
        delete avatar.vo_tag
        delete avatar.desc
        delete avatar.promption
        delete avatar.relics
        delete avatar.behaviorList
        delete avatar.images
        delete avatar.ranks
        if (avatar.equipment) {
          avatar.equipment = {
            level: avatar.equipment.level,
            rank: avatar.equipment.rank,
            name: avatar.equipment.name,
            skill_desc: avatar.equipment.skill_desc
          }
        }
      }