const gulp=require('gulp');
const browserSync=require('browser-sync').create();
const sass=require('gulp-sass');
const plumber=require('gulp-plumber');


const STYLES_PATH='src/scss/**/*.scss'

// Compile sass 
gulp.task('sass',function(){

        console.log('starting sass task');
        return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','node_modules/font-awesome/scss/font-awesome.scss',STYLES_PATH])
            .pipe(plumber())
            .pipe(sass())    
            .pipe(gulp.dest('src/css'))
            .pipe(browserSync.stream())
            
    });


// Move fonts 

gulp.task('fonts',function(){

    console.log('starting fonts task');
    return gulp.src('node_modules/font-awesome/fonts/*')
            .pipe(gulp.dest('src/fonts'))
});


// scripts

gulp.task('scripts', function(){
     console.log('starting scripts task');
     return gulp.src(['node_modules/jquery/dist/jquery.min.js','node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
            .pipe(gulp.dest('src/js'))
            .pipe(browserSync.stream())
    
    })
    


// Watch Sass, html and Serve

gulp.task('serve', function(){

   browserSync.init({
       server:"./src"
   });
   
    
    gulp.watch([STYLES_PATH,'node_modules/bootstrap/scss/bootstrap.scss'],['sass']);
    gulp.watch('src/*.html').on('change',browserSync.reload);
   
   
   
});

// Default 

gulp.task('default',['scripts','sass','fonts', 'serve'])

