持续集成

之前开发周期长:
1.daily build 每天build代码是否成功
2.build verify test  build成功后的验证代码测试

现在开发周期短：
1.git hooks 添加pre-commit钩子文件,commit时检查提交内容
2.eslint    检查代码是否符合标准
3.无头浏览器 无界面运行,获取dom元素检查元素，通过命令行或代码操作浏览器
