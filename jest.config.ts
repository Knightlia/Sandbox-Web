export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",

    moduleNameMapper: {
        ".less$": "<rootDir>/src/core/tests/stub.ts",
        "^@/(.*)": "<rootDir>/src/$1",
        "^config/(.*)": "<rootDir>/src/core/ts/config/$1"
    }
};
