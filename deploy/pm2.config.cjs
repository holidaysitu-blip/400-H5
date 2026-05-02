module.exports = {
  apps: [
    {
      name: '400-h5-api',
      script: './server/index.mjs',
      cwd: '/www/wwwroot/400-H5',
      env: {
        NODE_ENV: 'production',
        PORT: '8787',
      },
    },
  ],
};
