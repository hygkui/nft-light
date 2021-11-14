require('dotenv').config({ path: '.env' })

const scanNetwork = `etherscan.io`
const contractAddr = `0x8a90cab2b38dba80c64b7734e58ee1db38b8992e`
const total_supply = 10000
const page = 1
const url = `https://${scanNetwork}/token/generic-tokenholders2?a=${contractAddr}&sid=&m=normal&s=${total_supply}&p=${page}`

const axios = require('axios-https-proxy-fix')

const main  = async function () {
  console.log('url :>> ', url);
  const axios = require('axios-https-proxy-fix')

  axios(url,{
      proxy: {
          host: '127.0.0.1',
          port: '7890'
      },
      timeout: 10000
  })
  .then(res=>{
      console.log(res.data)
  })
}

main()