import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import htmlmin from "gulp-htmlmin";
import removeHtmlComments from "gulp-remove-html-comments";

export const html = () => {
	return (
		app.gulp
			.src(app.path.src.html)
			// .pipe(
			//   app.plugins.plumber(
			//     app.plugins.notify.onError({
			//       title: "HTML",
			//       message: "Error: <%= error.message %>",
			//     })
			//   )
			// )
			.pipe(
				app.plugins.plumber({
					errorHandler: app.plugins.notify.onError("Error: <%= error.message %>"),
				})
			)
			.pipe(fileinclude())
			.pipe(removeHtmlComments())
			.pipe(app.plugins.replace(/@img\//g, "img/"))
			// .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
			// .pipe(app.plugins.if(app.isBuild, htmlmin({ collapseWhitespace: true })))
			.pipe(app.gulp.dest(app.path.build.html))
			.pipe(app.plugins.browsersync.stream())
	);
};
