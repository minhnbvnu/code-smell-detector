function ImportSequencer(onSequencerEmpty) {
            this.imports = [];
            this.variableImports = [];
            this._onSequencerEmpty = onSequencerEmpty;
            this._currentDepth = 0;
        }