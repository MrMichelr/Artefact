module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/lib/packages/core/test'],
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: 'lib/packages/core/tsconfig.json'
        }],
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    reporters: ['default', '<rootDir>/custom-reporter.js'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};