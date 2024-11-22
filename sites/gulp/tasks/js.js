import webpack from "webpack-stream";
import UnminifiedWebpackPlugin from "unminified-webpack-plugin";

export const js = () => {
	return app.gulp
		.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(
			app.plugins.plumber(
				app.plugins.notify.onError({
					title: "JS",
					message: "Error: <%= error.message %>s",
				})
			)
		)
		.pipe(
			webpack({
				mode: app.isBuild ? "production" : "development",
				output: {
					filename: "app.min.js",
				},
				plugins: [new UnminifiedWebpackPlugin()],
			})
		)
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
};
