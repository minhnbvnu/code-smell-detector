function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
            var manager = recognizer.manager;
            if (manager) {
                return manager.get(otherRecognizer);
            }
            return otherRecognizer;
        }