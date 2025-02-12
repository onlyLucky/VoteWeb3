package global

import "vote-server/config"

//  全局数据对象， 后续数据库对象，redis对象，配置对象等都会放在这里
var (
	Config *config.Config
)
