function Material(id){
    /**
     * The material identifier
     * @property id
     * @type {Number}
     */
    this.id = id || Material.idCounter++;
}