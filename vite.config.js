const path = require('path');

export default {
  base: '/online-store/',
  root: path.resolve(__dirname, 'src'),
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '~bootstrap-icons': path.resolve(
        __dirname,
        'node_modules/bootstrap-icons'
      ),
    },
  },
  server: {
    port: 8080,
    hot: true,
  },
};
