const tasks = require('./taskConfig');
const pages = require('./pages.json');
const starterConfig = {
  devStatic: "/",
	buildStatic: "",
	buildDir: "build",
	port: 8080,
	dpe: false,
	commonData: ["data"],
	defaultLayout: "layout.html", 
	emptyLayout: "empty_layout.html", 
	contentOnly: false,
	storage: "https://your-path-to-blob",
	assetsHash: true,
	showPageList: false,
	exportWithExtension: ".html",
	exportIndexUrl: "/",
  themeColor: "#00bcf2",
  buildIgnorePaths: [
    "less",
    "svg",
    "javascripts/sources",
    "javascripts/libs",
    "javascripts/*.map",
  ],
  restartTriggerFiles: [
    'views/blocks/*.html', 
    'views/*.html', 
    'datasource/*.json', 
    'app.js', 
    'gulpfile.js', 
    'routes/**/*.js'
  ],
  reloadTriggerFiles: [
    'public/stylesheets/*.css',
    'public/javascripts/*.js'
  ],
  tasks,
  pages,
}
module.exports = starterConfig;