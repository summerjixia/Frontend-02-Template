1.发布系统的服务器安装nodejs
2.本地创建发布系统server项目，由nodejs的express框架为结构
3.启动服务器service ssh start
4.本地项目映射远程连接服务器。服务器开通8022转发端口,scp -P 8022 -r ./* summer@127.0.0.1:/home/summer/server将本地项目与服务器server目录映射。本地与线上node_module版本要一致。服务器开通8080端口，映射3000端口
5.创建publish-server/public-tool项目