function lintFile(file, callback) {
    console.log("Linting " + file);
    fs.readFile(file, function(err, data) {
        if(err) {
            console.log('Error: ' + err);
            return;
        }
        if(jshint(data.toString())) {
            console.log('File ' + file + ' has no errors.');
            console.log('-----------------------------------------');
            callback(false);
        } else {
            console.log('Errors in file ' + file);
            var out = jshint.data(),
            errors = out.errors;
            for(var j = 0; j < errors.length; j++) {
                console.log(errors[j].line + ':' + errors[j].character + ' -> ' + errors[j].reason + ' -> ' +
errors[j].evidence);
            }
            console.log('-----------------------------------------');
            callback(true);
        }
    });
}