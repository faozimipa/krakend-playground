const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('../../package.json').dependencies;

module.exports = (config, context) => {
  return {
    ...config,
    output: {
      publicPath: 'http://localhost:3000/',
      uniqueName: 'users',
    },
    experiments: {
      topLevelAwait: true,
    },
    optimization: {
      runtimeChunk: false,
    },
    plugins: [
      ...config.plugins,
      new ModuleFederationPlugin({
        name: 'users',
        filename: 'usersEntry.js',
        exposes: {
          './UsersEntry': './src/app/pages/data/UsersEntry',
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            eager: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
    ],
  };
};
