import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import csso from "gulp-csso"; // Сжатие CSS файла
import webpcss from "gulp-webpcss"; // Вывод WEBP изображений
import autoprefixer from "gulp-autoprefixer"; // Добавление вендорных префиксов
import gcmq from "gulp-group-css-media-queries"; // Группировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = () => {
	return (
		app.gulp
			.src(app.path.src.scss, { sourcemaps: app.isDev })
			// .pipe(
			//   app.plugins.plumber(
			//     app.plugins.notify.onError({
			//       title: "SCSS",
			//       message: "Error: <%= error.message %>",
			//     })
			//   )
			// )
			.pipe(
				app.plugins.plumber({
					errorHandler: app.plugins.notify.onError("Error: <%= error.message %>"),
				})
			)
			.pipe(app.plugins.replace(/@img\//g, "https://d3b6muno9lbfvx.cloudfront.net/urban-life/img/"))
			.pipe(
				sass({
					outputStyle: "expanded",
				})
			)
			.pipe(gcmq())
			// .pipe(
			// 	app.plugins.if(
			// 		app.isBuild,
			// 		webpcss({
			// 			webpClass: ".webp",
			// 			noWebpClass: ".no-webp",
			// 		})
			// 	)
			// )
			.pipe(
				// app.plugins.if(
				// 	app.isBuild,
				autoprefixer({
					grid: true,
					overrideBrowserslist: ["last 3 versions"],
					cascade: true,
				})
				// )
			)
			// Расскомментировать если нужен не сжатый дубль файла стилей
			.pipe(app.gulp.dest(app.path.build.css))
			.pipe(csso())
			.pipe(rename({ extname: ".min.css" }))
			.pipe(app.gulp.dest(app.path.build.css))
			.pipe(app.plugins.browsersync.stream())
	);
};
