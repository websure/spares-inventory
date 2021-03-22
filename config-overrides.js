const {
  removeModuleScopePlugin,
  babelInclude,
  override,
} = require('customize-cra');
const path = require('path');
/*
  Adding
*/
module.exports = override(
  removeModuleScopePlugin(),
  babelInclude([path.resolve('src'), path.resolve('lib')]),
);
