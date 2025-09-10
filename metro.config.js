const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Reduce file watching to prevent EMFILE error
config.watchFolders = [];
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Limit the number of files to watch
config.watcher = {
  additionalExts: ['cjs', 'mjs'],
  watchman: {
    deferStates: ['hg.update'],
  },
};

module.exports = config;
