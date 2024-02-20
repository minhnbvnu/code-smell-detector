function spawnAsync(executable, params_array, scanFunction) {
  return defer(function (resolve, reject) {
    var spawn_cmd = spawn(executable, params_array);
    var outputs = [];

    // print command
    scanFunction && scanFunction(`$> ${executable} ${lazy.colors.bold(params_array.join(' '))}`);

    spawn_cmd.stdout.on('data', function (data) {
      outputs.push(data);
      scanFunction && scanFunction(data);
    });

    spawn_cmd.stderr.on('data', function (data) {
      outputs.push(data);
      scanFunction && scanFunction(data);
    });

    spawn_cmd.on('close', function (code) {
      var result_object = {
        error_code: code,
        message: outputs.join('\n')
      };

      if (code !== 0) {
        reject(result_object);
      } else {
        resolve(result_object);
      }
    });
  });
}