

module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        "prettier"
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module"
    },
    plugins: ["unused-imports", "filenames-simple", 'react-refresh',],
    overrides: [
        {
            files: ["_*.tsx"],
            rules: {
                "filenames-simple/naming-convention": "off"
            }

        }
    ],

    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        "semi": ["warn", "always"],
        "quotes": [
            "warn",
            "double",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ],

        "eqeqeq": ["warn", "smart"],
        "no-alert": "error",
        "semi-spacing": [
            "warn",
            {
                "before": false,
                "after": true
            }
        ],
        "default-case": "warn",
        "wrap-regex": "warn",
        "no-useless-rename": [
            "error",
            {
                "ignoreDestructuring": false,
                "ignoreImport": false,
                "ignoreExport": false
            }
        ],
        "filenames-simple/naming-convention": [
            "error", {
                "rule": "camelCase",
                "excepts": ["index"]
            }],
        "prefer-const": "warn",


        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "unused-imports/no-unused-imports": "warn",
        "unused-imports/no-unused-vars": [
            "warn",
            {
                "vars": "all",
                "varsIgnorePattern": "^_",
                "args": "after-used",
                "argsIgnorePattern": "^_"
            }
        ]
    },
}
