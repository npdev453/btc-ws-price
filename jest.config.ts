import { jsWithTs as tsjPreset } from 'ts-jest/presets'

export default {

  // The test environment that will be used for testing
  testEnvironment: 'node',

  // A map from regular expressions to paths to transformers
  transform: {
    ...tsjPreset.transform
  }

}
