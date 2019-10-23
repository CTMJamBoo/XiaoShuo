const {addWebpackAlias,override,useEslintRc,addDecoratorsLegacy,fixBabelImports} = require('customize-cra')
const path = require('path')

module.exports = override(
    // 配置别名
    addWebpackAlias({
        '@': path.resolve(__dirname, 'src/') // 使用@作为/src的路径别名
    }),

    // 配置eslint
    useEslintRc(),

    // 配置装饰器语法
    addDecoratorsLegacy(),

    //配置antd-mobile的按需引入
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        style: 'css',
    }) 
)