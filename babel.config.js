module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // Required for expo-router
      "expo-router/babel",
      "nativewind/babel",
      "react-native-reanimated/plugin",
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
      // [
      //   "module-resolver",
      //   {
      //     extensions: [
      //       ".ios.js",
      //       ".android.js",
      //       ".ios.jsx",
      //       ".android.jsx",
      //       ".js",
      //       ".jsx",
      //       ".json",
      //       ".ts",
      //       ".tsx",
      //     ],
      //     // root: ["."],
      //     alias: {
      //       // "@app": "/",
      //       util: "./Util",
      //       components: "./components",
      //       store: "./store",
      //     },
      //   },
      // ],
    ],
  };
};
