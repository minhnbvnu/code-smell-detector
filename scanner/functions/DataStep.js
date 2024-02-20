function DataStep(start, end, minimumStep, containerHeight, customRange, formattingFunction, alignZeros) {
    // variables
    this.current = 0;

    this.autoScale = true;
    this.stepIndex = 0;
    this.step = 1;
    this.scale = 1;
    this.formattingFunction = formattingFunction;

    this.marginStart;
    this.marginEnd;
    this.deadSpace = 0;

    this.majorSteps = [1, 2, 5, 10];
    this.minorSteps = [0.25, 0.5, 1, 2];

    this.alignZeros = alignZeros;

    this.setRange(start, end, minimumStep, containerHeight, customRange);
  }