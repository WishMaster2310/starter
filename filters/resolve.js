const path = require('path');
const config = require(path.join(__dirname, '../starter/config'));
function getFileName(fileName, hash) {
	if (config.assetsHash) {
		return fileName + '?rev=' + hash;
	}
	return fileName
}

/**
 * 
 * @param {string} assetPath - имя файла или путь до файла
 * @param {string?} assetDir - диретория например images, javascripts, etc
 */
const resolve = (assetPath, options) => {
	const { isExport, root, hash } = options;
  let result = "";
  if(isExport) {
    if(config.dpe) {
      result = resolveDPE(assetPath, root)
    } else {
      result = path.normalize(path.join(config.buildStatic, root, getFileName(assetPath, hash)))
    }
  } else{
    result = path.normalize(path.join(config.devStatic, root, getFileName(assetPath, hash)))
  }
  return result.replace(/\\/g, '\/');
}

function resolveDPE() {
	let result = "";
	switch(folder) {
		case "stylesheets/":
		 result = `@File("/files/css/${name}")`
		 break;
	  case "images/":
	  	result = `@File("/files/images/${name}")`
	  	break;
  	case "javascripts/":
  		result = `@File("/files/js/${name}")`
  		break;
		default:
			result = `@File("/files/${name}")`;
	}

	return result;
}


module.exports = {
  resolve
}
