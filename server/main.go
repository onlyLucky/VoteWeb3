package main

import (
	"net/http"
	"vote-server/config"
	"vote-server/global"

	"github.com/gin-gonic/gin"
)

func main() {

	global.Config = config.InitConfig()
	// 创建默认的 Gin 引擎
	r := gin.Default()

	// 定义一个简单的路由
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello, Gin!",
		})
	})

	addr := global.Config.GetAddr()

	// 启动服务器
	r.Run(addr)
}
