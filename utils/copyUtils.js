const fs = require('fs-extra');
const path = require('path');

function copyFeature(featureFolder, targetDir) {
  const source = path.join(__dirname, '..', 'features', featureFolder);
  fs.copySync(source, targetDir);
}

module.exports = copyFeature;
