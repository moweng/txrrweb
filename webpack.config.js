const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  mode: 'production',
  module: {
    rules: [
        {
            // 匹配 *.worker.js
            test: /\.worker\.js$/,
            use: {
              loader: 'worker-loader',
              options: {
                inline: true,
                name: '[name]:[hash:8].js',
                // inline: true,
                // fallback: false
                // publicPath: '/scripts/workers/'
              }
            }
        },
        {
            // js 文件才使用 babel
                test: /\.js$/,
             // 使用哪个 loader
                use: 'babel-loader',
            // 不包括路径
                exclude: /node_modules/
        }
    ]
  }
}