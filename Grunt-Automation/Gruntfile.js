module.exports = function(grunt){
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
  });

  grunt.registerTask('default', function(){
    grunt.log.writeln('Hello from grunt\'s default task');
  });
}