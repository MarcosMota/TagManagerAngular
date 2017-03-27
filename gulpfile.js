var js  = [
    './bower_components/jquery/dist/jquery.js',         // Todos os arquivos do diretório Jquery
    './bower_components/tagmanager/tagmanager.js'     // Todos os arquivos do diretório bootstrap e sub diretórios
	
];
var angular = ['./bower_components/angular/angular.min.js' ]
 var css  = [
    './bower_components/tagmanager/tagmanager.css'     // Todos os arquivos do diretório bootstrap e sub diretórios
];
// Núcleo do Gulp
var gulp = require('gulp');
 
// Transforma o javascript em formato ilegível para humanos
var uglify = require("gulp-uglify");
 
// Agrupa todos os arquivos em um
var concat = require("gulp-concat");

// minifica css
var minify = require('gulp-minify-css');
 
// Tarefa de minificação do Javascript
gulp.task('minify-js', function () {
    gulp.src(js)                        // Arquivos que serão carregados, veja variável 'js' no início
    .pipe(concat('script.min.js'))      // Arquivo único de saída
    .pipe(uglify())                     // Transforma para formato ilegível
    .pipe(gulp.dest('./dist/js/'));          // pasta de destino do arquivo(s)
});
 // Tarefa de minificação do Javascript
gulp.task('angular-js', function () {
    gulp.src(angular)                     // Transforma para formato ilegível
	.pipe(concat('angular.min.js'))
    .pipe(gulp.dest('./dist/js/'));          // pasta de destino do arquivo(s)
});
 
 
 
 // Tarefa de minificação do styles
gulp.task('minify-css', function () {
    gulp.src(css)                        // Arquivos que serão carregados, veja variável 'js' no início
    .pipe(concat('style.min.css'))      // Arquivo único de saída
    .pipe(minify())                    // Transforma para formato ilegível
    .pipe(gulp.dest('./dist/css/'));          // pasta de destino do arquivo(s)
});
 
 
// Tarefa padrão quando executado o comando GULP
gulp.task('default',['minify-js','minify-css','angular-js']);
 
// Tarefa de monitoração caso algum arquivo seja modificado, deve ser executado e deixado aberto, comando "gulp watch".
gulp.task('watch', function() {
    gulp.watch(js, ['minify-js']);
});
 