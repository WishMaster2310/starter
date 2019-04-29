const _ = require('lodash');
const { resolve } = require('./resolve');
const { loop } = require('./loop');
const { tls } = require('./formats');

function applyFilters(env, filters) {
	_.each(filters, (filter, name) => {
		if (typeof filter === 'function') {
			env.addFilter(name, filter);
		}
	});
}

function createFilters (env) {
	const isExport = env.getGlobal('isExport');
	const hash = env.getGlobal('hash');
	const pathOptions = {
		hash,
		isExport,
		root: ''
	}
	return {
		loop,
		tls,
		resolve: path => resolve(path, pathOptions),
		resolveUpload: path => resolve(path, {...pathOptions, root: '/uploads'}),
		resolveImage:  path => resolve(path, {...pathOptions, root: '/images'}),
		resolveScript: path => resolve(path, {...pathOptions, root: '/javascripts'}),
		resolveStyle:  path => resolve(path, {...pathOptions, root: '/stylesheets'}),
	}
}

module.exports.createFilters = createFilters;
module.exports.applyFilters = applyFilters;