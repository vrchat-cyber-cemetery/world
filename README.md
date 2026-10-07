# Cyber Cemetery — VRChat World

本仓库保存未来的Unity／Udon世界工程，目标Windows PC／PCVR。当前只有仓库骨架和固定内容源配置，尚未创建Unity场景。

- [固定地址清单](config/addresses.json)：577个预置URL（1目录＋64区域＋512组包），由主仓库构建工具生成并导入，编辑器工具只从这里取址，不在运行时拼接路径。

- [Unity详细计划](https://github.com/vrchat-cyber-cemetery/vrchat-cyber-cemetery.github.io/blob/main/plans/UNITY-DEVELOPMENT.md)
- [图文包协议](https://github.com/vrchat-cyber-cemetery/vrchat-cyber-cemetery.github.io/blob/main/plans/RUNTIME-DATA.md)
- [主仓库](https://github.com/vrchat-cyber-cemetery/vrchat-cyber-cemetery.github.io)

本地验证：Node.js24下执行 npm run check。未来工程根目录就是本仓库，生成的Library、Temp及SDK包本体不进入Git。

自有代码采用[MIT](LICENSE)，第三方世界素材和VRChat SDK遵守各自许可。
