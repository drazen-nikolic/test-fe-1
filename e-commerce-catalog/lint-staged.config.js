module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint .'],
  '*': 'jest --config=./jest.config.js --bail --findRelatedTests --passWithNoTests'
}
