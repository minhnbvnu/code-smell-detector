function buildQuiz(ui) {
            var min = 5;
            var max = 20;
            var html = "";
            var values = [];
            var numbers = [];
            var options = [];
            var solution = 0;
            var optionsLength = 3;
            var numbersLength = getRandomInt(2, 4);
            var scatter = Math.floor((min * numbersLength) / 2);

            for (var i = 0; i < numbersLength; i++) {
                var number = getRandomInt(min, max);
                numbers.push(number);
                solution += number;
            }

            while (values.length < optionsLength) {
                var value = getRandomInt(solution - scatter, solution + scatter);
                if(value !== solution && values.indexOf(value) === -1) {
                    values.push(value);
                }
            }
            // put correct answer
            values.splice(getRandomInt(0, optionsLength - 1), 0, solution);

            for (var n = 0; n < values.length; n++) {
                options.push(createInput(values[n]));
            }

            html += numbers.join(' + ') + ' = ?';
            html += '<br><br>';
            html += options.join('<br>');

            ui.setContent(html);
            ui.centerDialog();
            ui.solution = solution;
        }