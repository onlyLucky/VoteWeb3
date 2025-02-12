package config

import (
	"fmt"
	"log"
	"os"

	"gopkg.in/yaml.v3"
)

const yamlPath = "config/config.yaml"

type Config struct {
	System struct {
		Env     string `yaml:"env"`     // 环境值 区分开发环境测试环境
		IP      string `yaml:"ip"`      // 项目运行的ip
		Port    int    `yaml:"port"`    // 项目运行的端口
		Version string `yaml:"version"` // 项目的版本
	} `yaml:"system"`
	Mysql struct {
		Host     string `yaml:"host"`     // 服务器地址:端口
		Port     int    `yaml:"port"`     //端口
		Config   string `yaml:"config"`   // 高级配置
		DB       string `yaml:"db"`       // 数据库名
		Username string `yaml:"username"` // 数据库用户名
		Password string `yaml:"password"` // 数据库密码
		LogLevel string `yaml:"logLevel"` // 是否开启Gorm全局日志
	} `yaml:"mysql"`
}

func (c Config) GetAddr() string {
	return fmt.Sprintf("%s:%d", c.System.IP, c.System.Port)
}

// 读取yaml 配置初始化
func InitConfig() (c *Config) {
	byteData, err := os.ReadFile(yamlPath)
	if err != nil {
		log.Fatalln("read yaml err:", err.Error())
	}
	c = new(Config)
	err = yaml.Unmarshal(byteData, c)
	if err != nil {
		log.Fatalln("解析 yaml err：", err.Error())
	}
	return c
}
