'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const config = require(path.join(__dirname, '../starter/config'));
let commonData = {};

if (config.commonData) {
	_.forEach(config.commonData, name => {
		let d = JSON.parse(fs.readFileSync(path.join(__dirname, '../datasource', `${name}.json`)));
		commonData[name] = d
	});
}

_.forEach(config.pages, page => {

	router.get(page.route, (req, res, next) => {

		let layout = page.layout || config.defaultLayout;
		
		let context = {
			root: config.devStatic,
			_pages: config.pages,
			_showPages: config.showPageList,
			locals: {},
			common: commonData,
			storage: `${config.devStatic}storage/`,
			_env: process.env.NODE_ENV,
			themeColor: config.themeColor,
			layout
		}

		if (page.pageData) {
			_.forEach(page.pageData,  (v, k) => {
				let d = JSON.parse(fs.readFileSync(path.join(__dirname, '../datasource', `${v}.json`)));
				context[v] = d
			});
		}

		if (page.pageVars) {
			_.forEach(page.pageVars, (v, k) => {
				context.locals[k] = v
			});
		}

		res.render(page.name, context)
	});

});

module.exports = router;
