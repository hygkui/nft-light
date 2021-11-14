1.mint的时候，不指定baseuri就是盲挖
2.开图的时候，按照如下步骤
  - 图片先上传一个pinata的目录，这样所有的图片的前缀就是 QmcGX1uhcZSPvmEke5JuXDwTtoRcEvhcZWXVT8CdJGkntz
  - 使用 `toJson.js` 批量生成json数据，按照id号文件名，上传另一个目录： QmSxy8FLAbLQMPsY5vMWxz1JGMsMXBCF6HyT9TQZDG9yuM
  - 调用合约设置tokenBaseURI设置为 https://gateway.pinata.cloud/ipfs/QmSxy8FLAbLQMPsY5vMWxz1JGMsMXBCF6HyT9TQZDG9yuM/
  这样就可以通过 这个uri + tokenId来获取json的元数据了，而且这个数据是不用自建服务器的。

