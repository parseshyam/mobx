const BabelRcPlugin = require('@jackwilsdon/craco-use-babelrc');
const CracoAntDesignPlugin = require('craco-antd');

module.exports = {
  plugins: [
    { plugin: BabelRcPlugin },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#31b8ff',
          '@layout-sider-background': '#fff',
          '@layout-body-background': '#fbfbfb',
          '@layout-header-background': '#fbfbfb',
        },
      },
    },
  ],
};
