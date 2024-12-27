import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import autoprefixer from 'gulp-autoprefixer';
import fontmin from 'gulp-fontmin';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import browserSync from 'browser-sync';
import { deleteAsync } from 'del';
import fileInclude from 'gulp-file-include';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import gulpFilter from 'gulp-filter';
import webp from 'gulp-webp';
import replace from 'gulp-replace';
import ghPages from 'gh-pages';
import path from 'path';

const bs = browserSync.create();
const sass = gulpSass(dartSass);

// Пути к файлам и папкам
const paths = {
	styles: {
		src: 'src/scss/**/*.scss',
		dest: 'dist/css/',
	},
	scripts: {
		src: 'src/js/**/*.js',
		dest: 'dist/js/',
	},
	images: {
		src: 'src/images/**/*',
		dest: 'dist/images/',
	},
	fonts: {
		src: 'src/fonts/**/*.{ttf,woff,woff2}',
		dest: 'dist/fonts/',
	},
	html: {
		src: 'src/pages/*.html',
		dest: 'dist/',
	},
	assets: {
		src: 'src/assets/**/*',
		dest: 'dist/assets',
	},
	buildFolder:{
		src: 'dist',
	}
};

// Очистка папки dist перед сборкой
export const clean = () => deleteAsync(['dist']);

// Компиляция SCSS в CSS
export const styles = () =>
	gulp.src(paths.styles.src)
		.pipe(sass().on('error', sass.logError)) // Компиляция SCSS
		.pipe(autoprefixer({ cascade: false })) // Добавление автопрефиксов
		.pipe(cleanCSS()) // Минификация CSS
		.pipe(concat('styles.min.css')) // Объединение в один файл
		.pipe(gulp.dest(paths.styles.dest)) // Сохранение в папку назначения
		.pipe(bs.stream()); // Обновление в браузере

// Минификация JS
export const scripts = async () => {
	const webpackConfig = await import('./webpack.config.js');
	return gulp
		.src(paths.scripts.src)
		.pipe(webpackStream(webpackConfig.default, webpack))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(browserSync.stream());
};

// Оптимизация изображений
export const images = () => gulp.src(paths.images.src)
	.pipe(imagemin())
	.pipe(gulp.dest(paths.images.dest));

// Преобразование и копирование шрифтов
export const fonts = () => gulp.src(paths.fonts.src)
	.pipe(fontmin())
	.pipe(gulp.dest(paths.fonts.dest));

// Копирование HTML
export const html = () =>
	gulp.src([paths.html.src])
		.pipe(
			fileInclude({
				prefix: '@@', // Префикс для директив
				basepath: 'src/partials', // Относительный путь к файлам
			})
		)
		.pipe(gulp.dest(paths.html.dest)) // Сохранение собранного HTML
		.pipe(bs.stream()); // Обновление браузера

// Копирование ассетов без изображений
export const assets = async () => {
	const excludeImages = gulpFilter(['**/*', '!**/*.{jpg,jpeg,png}'], { restore: true });

	return await gulp.src(paths.assets.src)
		.pipe(excludeImages) // Исключаем изображения
		.pipe(gulp.dest(paths.assets.dest))
		.pipe(bs.stream());
};

// Конвертация JPG и PNG в WebP
export const convertWebp = async () => {
	return await gulp.src('src/assets/**/*.{jpg,jpeg,png}',{ encoding: false })
		.pipe(webp())
		.pipe(gulp.dest('dist/assets'));
};

// Замена ссылок на изображения в HTML
export const replaceHtml = async () => {
	return gulp.src('dist/**/*.html') // Путь к HTML в папке dist
		.pipe(replace(/\.(png|jpg|jpeg)(\?[^"]*)?/g, '.webp$2')) // Заменяем расширения
		.pipe(gulp.dest('dist')); // Сохранение изменений
};


// Локальный сервер
export const serve = () => {
	bs.init({
		server: { baseDir: 'dist/' },
	});
	gulp.watch(paths.styles.src, styles);
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.images.src, images);
	gulp.watch(paths.fonts.src, fonts);
	gulp.watch(paths.html.src, gulp.series(html, replaceHtml)).on('change', bs.reload);
	gulp.watch(paths.assets.src, assets);
};


export const build = gulp.series(
	clean,
	gulp.parallel(styles, scripts, images, fonts, html, assets, convertWebp),
	replaceHtml
);

export const dev = gulp.series(build, serve);

export const deploy = gulp.series(  (done) => {
	ghPages.publish(
		path.join(process.cwd(), 'dist'),
		{
			branch: 'ghp', // Указание ветки
			message: 'Auto-generated commit'
		},
		(err) => {
			if (err) {
				console.error('Ошибка деплоя:', err);
			} else {
				console.log('Успешный деплой!');
			}
			done();
		}
	);
});

export default dev;
