export const presets = [
  '@babel/preset-env',
];

export const env = {
  test: {
    plugins: ['@babel/plugin-transform-modules-commonjs']
  }
};