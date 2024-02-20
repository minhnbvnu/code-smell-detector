function Voxel() {
    this.update = bind(this.update, this);
    return Voxel.__super__.constructor.apply(this, arguments);
  }