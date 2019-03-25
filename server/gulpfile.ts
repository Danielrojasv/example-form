import * as gulp from "gulp";
import * as clean from "gulp-clean";
import * as ts from "gulp-typescript";
let tsProject = ts.createProject("tsconfig.json");

gulp.task('clean', () =>
    gulp.src('dist/**/*.js', {
        read: false
    })
    .pipe(clean())
);

gulp.task('build', () =>
    gulp.src('src/**/*.ts')
    .pipe(tsProject())
    .js.pipe(gulp.dest("dist"))
);