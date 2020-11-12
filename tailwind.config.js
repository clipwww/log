module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    layers: ['components', 'utilities'],
    content: [
      './src/**/*.html',
      './src/**/*.vue',
    ]
  },
  theme: {
    extend: {
      lineHeight: {
        '0': 0
      }
    },
  },
  variants: {},
  plugins: [

  ],
}
