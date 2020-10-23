yeoman 构建项目结构工具

注意点：1.yeoman项目名以generators-name命名
       2.入口index.js的方法从上往下会依次执行
       3.使用npm link映射
       4.在需要构建的文件夹下使用yo name

常用的方法
       1.prompt()定义输入内容
       2.fs.extendJSON/npmInstall 创建package.json/添加依赖
       3.fs.copyTpl 复制模板



webapck 打包工具

 项目内使用：npm install webpack-cli --save-dev 
            npx webapck

webpack.config.js重要的配置：entry 入口
                            publicPath 输出路径
                            loader 解析文件
                            plugin 插件



babel js编译工具
      
      @babel/core
      @babel/cli 
      @babel/preset-env

      .babelrc文件配置：presets 编译的库
                       plugin  编译插件
