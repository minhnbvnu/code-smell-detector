function generateTasks(source, options) {
            assertPatternsInput(source);
            const patterns = patternManager.transform([].concat(source));
            const settings = new settings_1.default(options);
            return taskManager.generate(patterns, settings);
        }