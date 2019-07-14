const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const config = require(path.join(__dirname, 'config.js'));
const compileDir = path.join(__dirname, '../', config.buildDir);
const templateDir = path.join(__dirname, '../views');
const nunjucks = require('nunjucks');
const del = require('del');
const generate = require('nanoid/generate');
const {applyFilters, createFilters} = require(path.join(__dirname, '../filters/filters'));
const { getPageContext } = require('./workers/pages.js');

const env = nunjucks.configure('views', {
  autoescape: false,
});
env.addGlobal('isExport', true);
env.addGlobal('hash', generate('1234567890abcdef', 10));

const filters = createFilters(env);
applyFilters(env, filters);

if (!fs.existsSync(compileDir)) {
	fs.mkdirSync(compileDir);
}

function syncClearFolder () {
	del.sync([
		`${compileDir}/*`, 
		`!${compileDir}/.git`
	]);
}

function build () {
	// FIXME: Переписать это все на промисы
	// сделать обработку ошибок, а то сейчас вообще нихуя нет
	syncClearFolder();
	
	// FIXME: Здесь заюзать Promise.all
	_.forEach(config.pages, page => {
		const {options} = getPageContext(page, true);
		const res = nunjucks.render(path.join(templateDir, `${page.name}.html`), options);
		fs.writeFileSync(path.join(compileDir, `${page.name}.html`), res);
		console.log(`starter:build page ${page.name}.html created`)
	});

	// Если contentOnly то компилим
	// еще и лэйаут на отдельной HTML-ке

	if (config.contentOnly) {
		const context = {
			root: config.buildStatic,
		 	isExport: true,
			_env: process.env.NODE_ENV,
		 	storage: config.storage
		}
		const result = nunjucks.render(path.join(templateDir, config.defaultLayout), context);
		fs.writeFileSync(path.join(compileDir, config.defaultLayout), result);
	}
}

build();