/** @type {import('next').NextConfig} */

// const nextConfig = {
//   reactStrictMode: true,
// }

module.exports = {
  env: {
    MONGO_URI:
      "mongodb+srv://PRITAM:PritamMatirp@cluster0.qsql9vd.mongodb.net/blockart?retryWrites=true&w=majority",
    INFURA_PROVIDER:
      "https://goerli.infura.io/v3/ca542ab2ca264900b6290b63fba035c2",
    MNEMONIC:
      "praise purity still aware solution comfort crew initial senior broom slice bubble",
  },
  images: {
    domains: ["ipfs.io/"],
  },
};
