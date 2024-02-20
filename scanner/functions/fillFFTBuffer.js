function fillFFTBuffer()
    {
      for (var i = 0; i < signalLength; i++)
      {
        signalFFTData.real[i] = 0.0;
        signalFFTData.imag[i] = 0.0;
      }

      for (var i = 0; i < signal.length; i++)
      {
        signalFFTData.real[i] = signal[i];
      }
    }