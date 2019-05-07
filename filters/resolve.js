const path = require('path');
const config = require(path.join(__dirname, '../starter/config'));

function getFileName(fileName, hash) {
  if (config.assetsHash && hash) {
		return fileName + '?rev=' + hash;
	}
	return fileName
}

function isExternalPath (path = '') {
  // проверяю, является ли путь до файла внешним. 
  // т.е. начинается с http:// или с https://
  // или с domain.zone или c www.domain.zone
  const re = new RegExp('^((https?:)?\/\/)|^[a-zA-Z]+\..+\/');
  return re.test(path);
}

/**
 * 
 * @param {string} assetPath - имя файла или путь до файла
 * @param {string?} options.root - диретория например images, javascripts, etc
 * @param {string?} options.hash - хеш сборки, чтобы избежать кеша
 * @param {boolean?} options.isExport - билд/небилд
 * @return {string} - путь до файла
 * 
 */
const resolve = (assetPath, options) => {
  // Если путь внешний, то мы его не изменяем
  if (isExternalPath(assetPath)) return assetPath;
  const { isExport, root, hash } = options;
  
  let result = "";

  if(isExport) {
    if(config.dpe) {
      result = resolveDPE(assetPath, root)
    } else {
      result = path.normalize(
        path.join(
          config.buildStatic,
          root,
          getFileName(assetPath, hash)
        )
      )
    }
  } else {
    result = path.normalize(
      path.join(
        config.devStatic,
        root,
        getFileName(assetPath, hash)
      )
    )
  }
  
  // переворачиваем виндовые слешы
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
