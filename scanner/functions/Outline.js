function Outline(tc,t) {
  this.ts = TimeNow();
  this.tc = tc;
  this.tag = t;
  this.x = this.y = this.w = this.h = this.sc = 1;
  this.z = 0;
  this.Draw = tc.pulsateTo < 1 && tc.outlineMethod != 'colour' ? 
    this.DrawPulsate : this.DrawSimple;
  this.radius = tc.outlineRadius | 0;
  this.SetMethod(tc.outlineMethod);
}