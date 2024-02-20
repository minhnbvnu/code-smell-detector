function User(name, options) {
    this.name = name;
    this.options = options || {};

    this.el = null;
    this.width = 0;
    this.height = 0;
    this.left = 0;
    this.top = 0;
    this.x = 0;
    this.y = 0;

    this.moving = false;
    this.lucky = false;

    this.createEl();
    this.move();
  }