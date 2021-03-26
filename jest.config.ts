export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",

    moduleNameMapper: {
        "^@/(.*)": "<rootDir>/src/$1",
        "^config/(.*)": "<rootDir>/src/core/ts/config/$1"
    },

    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ]
};
