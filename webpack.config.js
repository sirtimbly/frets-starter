const path = require('path');
let webpack = require("webpack");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const production = process.env.NODE_ENV === "production";

module.exports = (env = {}) => {

return {
    entry: "./src/app.ts",

    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: __dirname + '/dist/',
        historyApiFallback: true,
        port: 8080,
        proxy: {
            '/.netlify/functions/*': {
                target: 'http://localhost:9000',
                pathRewrite: {"^/.netlify/functions": ""}
            }
        },
        hot: true
    },
    // context: __dirname,
    // node: {
    // //   __filename: false,
    //   __dirname: true
    // },
    // target: 'node',
    // Enable sourcemaps for debugging webpack's output.
    devtool: (() => (production) ?  "source-map" : "inline-source-map" )(),

    resolve: {
        modules: ['node_modules', __dirname + '/node_modules'],
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js"]
    },
    resolveLoader: {
        modules: ['node_modules', __dirname + '/node_modules'],
      },

    module: {

        rules: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ].concat((() => {
                if (production) {
                    console.log("I'm ignore css because it's prod")
                    return [{
                        test: /\.css$/,
                        loader: "ignore-loader"
                    }]


                } else {
                    console.log("not prod, include the css loaders")
                    return [{
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader', 'postcss-loader']
                        },
                        {
                            test: /\.(ttf|eot|woff|woff2|svg)$/,
                            loader: 'file-loader',
                            options: {
                              name: 'fonts/[name].[ext]',
                            },
                          }]
                }
            })())

        // preLoaders: [
        //     // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        //     { test: /\.js$/, loader: "source-map-loader" }
        // ]
    },
    plugins: [
        //strip out all locales except EN
        new MomentLocalesPlugin(),
        // new webpack.optimize.CommonsChunkPlugin('common.js'),
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ]),
        new webpack.NamedModulesPlugin(),
        // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ].concat((() => {
            if (production) {
                return [
                    new webpack.optimize.UglifyJsPlugin({
                        compress: {
                          warnings: false
                        },
                        sourceMap: true
                    }),
                    // new OptimizeCSSPlugin({
                    //     cssProcessorOptions: {
                    //         safe: true
                    //     }
                    // }),
                    // new ExtractTextPlugin("base.css"),
                    new HtmlWebpackPlugin({
                        filename: 'index.html',
                        template: 'index.html',
                        inject: true,
                        minify: {
                          removeComments: true,
                          collapseWhitespace: true,
                          removeAttributeQuotes: true
                          // more options:
                          // https://github.com/kangax/html-minifier#options-quick-reference
                        },
                        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                        chunksSortMode: 'dependency'
                      }),
                      // split vendor js into its own file
                      new webpack.optimize.CommonsChunkPlugin({
                        name: 'vendor',
                        minChunks: function (module, count) {
                          // any required modules inside node_modules are extracted to vendor
                          return (
                            module.resource &&
                            /\.js$/.test(module.resource) &&
                            module.resource.indexOf(
                              path.join(__dirname, 'node_modules')
                            ) === 0
                          )
                        }
                      }),
                    // extract webpack runtime and module manifest to its own file in order to
                    // prevent vendor hash from being updated whenever app bundle is updated
                      new webpack.optimize.CommonsChunkPlugin({
                        name: 'manifest',
                        chunks: ['vendor']
                      }),
                    // new BundleAnalyzerPlugin(),
                ]
            } else {
                return [
                    // new BundleAnalyzerPlugin(),
                    new webpack.HotModuleReplacementPlugin(),
                    new HtmlWebpackPlugin({
                        filename: 'index.html',
                        template: 'index.html',
                        inject: 'body'
                    })
                ]
            }
            })()),
        //


    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
        externals: {
            "Velocity": "Velocity"
        }
    }
}
