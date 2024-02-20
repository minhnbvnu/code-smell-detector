function getSkillById(skills, id){
    return ko.utils.arrayFirst(skills, function (item) {
      return item.id === id;
    });
  }