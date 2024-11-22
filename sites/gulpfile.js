// Основной модуль
import gulp from "gulp";
// Импорт путей
import { path, buildPath } from "./gulp/config/path.js";
// Импорт общих плагинов
import { plugins } from "./gulp/config/plugins.js";

// Передаем значения в глобальную переменную
if(process.argv.includes("--build")){
	global.app = {
		isBuild: process.argv.includes("--build"),
		isDev: !process.argv.includes("--build"),
		path: buildPath,
		gulp: gulp,
		plugins: plugins,
	};
} else {
	global.app = {
		isBuild: process.argv.includes("--build"),
		isDev: !process.argv.includes("--build"),
		path: path,
		gulp: gulp,
		plugins: plugins,
	};
}

// Импорт задач
import { copy } from "./gulp/tasks/copy.js";
import { reset } from "./gulp/tasks/reset.js";
import { html } from "./gulp/tasks/html.js";
import { server } from "./gulp/tasks/server.js";
import { scss } from "./gulp/tasks/scss.js";
import { js } from "./gulp/tasks/js.js";
import { images } from "./gulp/tasks/images.js";

// Наблюдатель за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.files, {usePolling: true}, copy);
	gulp.watch(path.watch.html, {usePolling: true}, html);
	gulp.watch(path.watch.scss, {usePolling: true}, scss);
	gulp.watch(path.watch.js, {usePolling: true}, js);
	gulp.watch(path.watch.images, {usePolling: true}, images);
}

const mainTasks = gulp.parallel(copy, html, scss, js, images);

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(mainTasks);

// Экспорт сценариев
export { dev };
export { build };

// Выполнение сценария по умолчанию
gulp.task("default", dev);