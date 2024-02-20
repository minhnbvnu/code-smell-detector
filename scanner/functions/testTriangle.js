function testTriangle() {
    var audiolet = new Audiolet();
    var triangle = new Triangle(audiolet);
    var recorder = new InputRecorder(audiolet, 1);

    triangle.connect(recorder);

    for (var i=0; i<81920; i++) {
        triangle.tick();
        recorder.tick();
    }

    var buffer = recorder.buffers[0][0];
    Assert.assertContinuous(buffer);
    Assert.assertAudibleValues(buffer);
    Assert.assertValuesInRange(buffer);
}