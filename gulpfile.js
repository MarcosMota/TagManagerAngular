var js  = [
    './bower_components/jquery/dist/jquery.js',         // Todos os arquivos do diret�rio Jquery
    './bower_components/tagmanager/tagmanager.js'     // Todos os arquivos do diret�rio bootstrap e sub diret�rios
	
];
var angular = ['./bower_components/angular/angular.min.js' ]
 var css  = [
    './bower_components/tagmanager/tagmanager.css'     // Todos os arquivos do diret�rio bootstrap e sub diret�rios
];
// N�cleo do Gulp
var gulp = require('gulp');
 
// Transforma o javascript em formato ileg�vel para humanos
var uglify = require("gulp-uglify");
 
// Agrupa todos os arquivos em um
var concat = require("gulp-concat");

// minifica css
var minify = require('gulp-minify-css');
 
// Tarefa de minifica��o do Javascript
gulp.task('minify-js', function () {
    gulp.src(js)                        // Arquivos que ser�o carregados, veja vari�vel 'js' no in�cio
    .pipe(concat('script.min.js'))      // Arquivo �nico de sa�da
    .pipe(uglify())                     // Transforma para formato ileg�vel
    .pipe(gulp.dest('./dist/js/'));          // pasta de destino do arquivo(s)
});
 // Tarefa de minifica��o do Javascript
gulp.task('angular-js', function () {
    gulp.src(angular)                     // Transforma para formato ileg�vel
	.pipe(concat('angular.min.js'))
    .pipe(gulp.dest('./dist/js/'));          // pasta de destino do arquivo(s)
});
 
 
 
 // Tarefa de minifica��o do styles
gulp.task('minify-css', function () {
    gulp.src(css)                        // Arquivos que ser�o carregados, veja vari�vel 'js' no in�cio
    .pipe(concat('style.min.css'))      // Arquivo �nico de sa�da
    .pipe(minify())                    // Transforma para formato ileg�vel
    .pipe(gulp.dest('./dist/css/'));          // pasta de destino do arquivo(s)
});
 
 
// Tarefa padr�o quando executado o comando GULP
gulp.task('default',['minify-js','minify-css','angular-js']);
 
// Tarefa de monitora��o caso algum arquivo seja modificado, deve ser executado e deixado aberto, comando "gulp watch".
gulp.task('watch', function() {
    gulp.watch(js, ['minify-js']);
});
 