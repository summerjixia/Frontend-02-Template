var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    super(args, opts);

  }

  async initPackage() {
    const answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Your project name",
        default: this.appname // Default to current folder name
      },
    ]);

    const pkgJson = {
      "name": answers.name,
      "version": "1.0.0",
      "description": "",
      "main": "generators/app/index.js",
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
      },
      "author": "",
      "license": "ISC",
      "dependencies": {
      }
    };

    this.fs.extendJSON(this.destinationPath('package.json'), pkgJson);
    this.npmInstall(['vue'], { 'save-dev': false });
    this.npmInstall(['vue-loader', 'webpack', 'webpack-cli', 'vue-template-compiler',
      'css-loader', 'vue-style-loader','copy-webpack-plugin'], { 'save-dev': true });

    this.fs.copyTpl(
      this.templatePath('index.html'),//默认当前templates文件夹
      this.destinationPath('src/index.html'),
      { title: answers.name }
    );
    this.fs.copyTpl(
      this.templatePath('HelloWorld.vue'),//默认当前templates文件夹
      this.destinationPath('src/HelloWorld.vue'),
    );
    this.fs.copyTpl(
      this.templatePath('main.js'),//默认当前templates文件夹
      this.destinationPath('src/main.js'),
    );
    this.fs.copyTpl(
      this.templatePath('webpack.config.js'),//默认当前templates文件夹
      this.destinationPath('webpack.config.js'),
    );
  }
};