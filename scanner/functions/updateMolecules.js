function updateMolecules() {
    var phaseShift = 0;
    var amp = GET_WAVE_AMPLITUDE() * 14;
    var freq = GET_WAVE_FREQUENCY() * 100;
    var phaseShiftInc = freq / 200;

    for (i = 0; i < molecules.length; i++)
    {
      var angle = freq + moleculeTime + phaseShift;
      var sinAngle = Math.sin(angle);
      var sinAngleDelayed = Math.sin(angle-1.5);

      molecules[i].style('transform', `translateX(${xRangePhys(sinAngle * amp)}px)`)
      // molecules[i].style('opacity', Math.max(1.0 - (sinAngleDelayed * GET_WAVE_AMPLITUDE()), 0.6));
      pressureY[i] = sinAngleDelayed * 3 * amp + 150;
      phaseShift -= phaseShiftInc;
    }

    pressurePath.attr('d', sinePressure(d3.range(0, 385, 2)));
    rect.style('transform', `translateX(${xRangePhys(Math.sin(freq + moleculeTime)) * amp - 20}px)`);
    WAVE_INTERPOLATION += 0.1;
    WAVE_AMP_INTERPOLATION += 0.1;

    moleculeTime += GET_WAVE_FREQUENCY() / 2.0;
  }