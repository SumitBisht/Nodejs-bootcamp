module.exports = function(grunt){
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/**\n *  Package: <%= pkg.name %>\n *  Version: <%= pkg.version %>\n'+
        ' * Generated: <%= grunt.template.today("dd-mm-yyyy") %>\n**/\n'
      },
      my_target: {
        files:{
          'js/generated_min.js': ['js/hello.js']
        }
      }
    }
  });


  grunt.registerTask('default', function(){
    grunt.log.writeln('Hello from grunt\'s default task');
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
}