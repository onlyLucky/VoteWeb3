/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  defaultNetwork: "hardhat",
  solidity: "0.8.28",// 设置 Solidity 编译器版本
  networks: {
    hardhat: {},// 默认的 Hardhat 网络
  },
  paths: {
    sources: "./contracts", // 合约文件路径
    tests: "./test", // 测试文件路径
    cache: "./cache", // 缓存路径
    artifacts: "./artifacts" // 编译输出路径
  },
  mocha: {
    timeout: 20000 // 测试超时时间
  }
};
