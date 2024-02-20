function KrajeskiFilter()
{
    this.state = [0,0,0,0,0];
    this.delay = [0,0,0,0,0];

    this.drive = 1.0
    this.gComp = 1.0;

    this.setCutoff(1000);
    this.setResonance(0.1);
}