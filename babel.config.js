module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      "nativewind/babel",
      [
        "module:react-native-dotenv",
        {
          // envName: "APP_ENV",
          moduleName: "@env",
          // path: ".env",
          safe: false,
          allowUndefined: true,
          blocklist: null,
          allowlist: null,
          verbose: false,
        },
      ],
    ],
  };
};
