module.exports = {
  transpileDependencies: ["vuetify"],
  //   module: {
  //     rules: [
  //       // ... other rules omitted

  //       // this will apply to both plain `.scss` files
  //       // AND `<style lang="scss">` blocks in `.vue` files
  //       {
  //         test: /\.scss$/,
  //         use: ["vue-style-loader", "css-loader", "sass-loader"],
  //       },
  //     ],
  //   },
  //   rules: [
  //     {
  //       test: /\.s(c|a)ss$/,
  //       use: [
  //         "vue-style-loader",
  //         "css-loader",
  //         {
  //           loader: "sass-loader",
  //           // Requires sass-loader@^8.0.0
  //           options: {
  //             implementation: require("sass"),
  //             sassOptions: {
  //               fiber: require("fibers"),
  //               indentedSyntax: true, // optional
  //             },
  //           },
  //         },
  //       ],
  //     },
  //   ],
  configureWebpack: {
    resolve: {
      alias: {
        "@nipacloud/nvision": "@nipacloud/nvision/dist/browser/nvision.js",
      },
    },
  },
};
