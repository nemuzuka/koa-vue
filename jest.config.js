module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testPathIgnorePatterns: ["/dist/", "/node_modules/", "__fixtures__"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true
};
