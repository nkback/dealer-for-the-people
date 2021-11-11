const { test, expect } = require('@jest/globals')
const {getPositivityScore} = require('./positivityScore')

test('passing a comment with 5 exclamation points to getPostiveScore should return 5', () => {
    expect(getPositivityScore('I loved this place!!!!!')).toBe(5);
});