module.exports = {
    entry: './front/src/index.js',
    output: { path: __dirname + '/public', filename: 'bundle.js' },
    module: {
        rules:
            [
                {
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-react']
                            }
                        }
                    ],
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {},
                        },
                    ],
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
    }
}