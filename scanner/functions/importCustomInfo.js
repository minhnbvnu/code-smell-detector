function importCustomInfo() {
      $`freecdn db --del-all`
      $`freecdn db --import <<< "
        wM+PPlLHcZenNEqjDFKpiuJrcOoeek6E0V5NxAro/Fc= https://foo/path/to/file1.js
        wM+PPlLHcZenNEqjDFKpiuJrcOoeek6E0V5NxAro/Fc= https://bar/path/to/file2.js
        XTZpbfuMkxViYSW2q370udBiH6h2xPPsbA9GLxfBfBg= http://127.0.0.1:30004/video/test.mp4"
      `
    }