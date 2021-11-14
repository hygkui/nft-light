const fs = require('fs')
const path = require('path')
const basePath_ = `https://gateway.pinata.cloud/ipfs/QmcGX1uhcZSPvmEke5JuXDwTtoRcEvhcZWXVT8CdJGkntz`
const jsonData = []
for (let i = 0; i < 15; i++) {
  let json_ = {
    id: i,
    name: `#${i}`,
    description: '加密世界艺术+创新灯报价，独一无二值得拥有',
    image: i > 9 ? `${basePath_}/${i}.svg` : `${basePath_}/0${i}.svg`,
    attributes: [
      {
        display_type: "number",
        trait_type: "Voting power",
        value: Math.floor(10 * Math.random())
      },
      {
        trait_type: "Background",
        value: Math.floor(10 * Math.random()),
      },
      {
        trait_type: "slogan",
        value: i % 2 === 0 ? 0 : 1
      }
    ],
  }
  jsonData.push(json_)
}

jsonData.map((item, index) => {
  let fp = path.join(__dirname, `nfts/${index}`)
  console.log('item :>> ', item);
  fs.writeFile(fp, JSON.stringify(item), err => {
  })
})