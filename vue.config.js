module.exports = {
    publicPath: '/h5/manage/',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'baidu.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'views': '@/views',
                'api': '@/request',
                'router': '@/router',
                'common': '@/components/common',
                'store': '@/store',
            }
        }
    }
}