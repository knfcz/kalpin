module.exports = {
    "parserOptions": {
        "ecmaVersion": 2017
    },

    "env": {
        "es6": true
    },
    rules: {
        'indent': ['error', 4, {SwitchCase: 1}],
        'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'react/destructuring-assignment': ['off'],
        'arrow-parens': ['error', 'as-needed'],
        'import/prefer-default-export': ['off'],
        'import/no-cycle': ['off'],
        'object-curly-spacing': ['error', 'always'],
        'prettier/prettier': ['off'],
        'react-hooks/exhaustive-deps': ['off'],
    },
};
