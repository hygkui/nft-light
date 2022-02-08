# nft-light
nft-light @ xian 

## 合约代码
  ./hardhat-tutorial/contracts/zlight.sol

## 图和json，属性设定
  ./demo/images ./demo/json
  
## 合约使用方法：

### 白名单阶段

```
setSaleState(false)
setAllowList([]addresses, 每个钱包可以mint的数量)
setIsAllowListActive(true)
mintAllowList(mint的数量) mint白名单
```

### 公开销售阶段

```
setIsAllowListActive(false)
setSaleState(true)
mint(mint的数量) 公开mint
```
