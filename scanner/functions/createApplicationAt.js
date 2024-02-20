function createApplicationAt(path) {
  console.log();
  process.on('exit', function(){
    console.log();
    console.log('   install dependencies:');
    console.log('     $ cd %s && npm install', path);
    console.log();
    console.log('   run the app:');
    console.log('     $ node server');
    console.log();
  });
  
  mkdir(path, function() {
    mkdir(path + '/app');
    mkdir(path + '/app/controllers', function(){
      write(path + '/app/controllers/pagesController.js', pagesController);
    });
    mkdir(path + '/app/views');
    mkdir(path + '/app/views/pages', function(){
      write(path + '/app/views/pages/main.html.ejs', mainTemplate);
    });
    
    mkdir(path + '/config', function(){
      write(path + '/config/routes.js', routesTemplate);
    });
    mkdir(path + '/config/environments', function(){
      write(path + '/config/environments/all.js', allEnvironments);
      write(path + '/config/environments/development.js', developmentEnvironment);
      write(path + '/config/environments/production.js', productionEnvironment);
    });
    mkdir(path + '/config/initializers', function(){
      write(path + '/config/initializers/00_generic.js', genericInitializer);
      write(path + '/config/initializers/01_mime.js', mimeInitializer);
      write(path + '/config/initializers/02_views.js', viewsInitializer);
      write(path + '/config/initializers/30_middleware.js', middlewareInitializer);
    });
    
    mkdir(path + '/public');
    mkdir(path + '/public/stylesheets', function(){
      write(path + '/public/stylesheets/screen.css', cssStylesheet);
    });
    
    write(path + '/package.json', packageJSON);
    write(path + '/server.js', serverJS);
  });
}