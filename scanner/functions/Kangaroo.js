function Kangaroo(name) {
  if (!(this instanceof Kangaroo)) {
    throw new Error("이 객체는 new를 사용하여 생성해야 합니다");
  }
  this.name = name;
  this.isNocturnal = false;
}