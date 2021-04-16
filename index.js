const { RuntimeGlobals } = require("webpack");

class WebpackMainAppPathPlugin {

  constructor(options) {
    this.options = options || {
      variable: 'MAIN_APP_HOST'
    }
  }

  apply(compiler) {
    const variable = this.options.variable;
    compiler.hooks.thisCompilation.tap('WebpackScopedPublicPath', function (compilation) {
      compilation.mainTemplate.hooks.requireExtensions.tap('WebpackScopedPublicPath', function (source, chunk, hash) {
        return `
        ${source}
        var mainAppHost = window.${variable || 'MAIN_APP_HOST'};
        ${RuntimeGlobals.publicPath} = mainAppHost || ${RuntimeGlobals.publicPath};
        `
      });
    });
  }
}

module.exports = WebpackMainAppPathPlugin;