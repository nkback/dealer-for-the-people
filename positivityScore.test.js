const { test, expect } = require('@jest/globals')
const {getPositivityScore} = require('./positivityScore')

test('passing a comment with 5 exclamation points to getPostiveScore should return 32', () => {
    expect(getPositivityScore('I loved this place!!!!!')).toBe(32);
});

test('passing a comment with absolutely, agreeable, and admire returns 17', () => {
    expect(getPositivityScore('I absolutely admire their agreeable nature')).toBe(17);
});

test('passing a comment with no keywords or explanations should return 2', () => {
    expect(getPositivityScore('This review is lame')).toBe(2);
});

test('passing a comment with a keyword, a single exlamation, and 3 sequential exclamations should return 512', () => {
    expect(getPositivityScore('I got lucky! Will come again!!!')).toBe(512);
});

test('passing empty string should return 2', () => {
    expect(getPositivityScore('')).toBe(2);
});

test('passing null should throw exception', () => {
    try {
        getPositivityScore(null)
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe("Comment needs to be a string");
    }
});

test('passing number should throw exception', () => {
    try {
        getPositivityScore(5)
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe("Comment needs to be a string");
    }
});

test('passing array should throw exception', () => {
    try {
        getPositivityScore([])
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe("Comment needs to be a string");
    }
});

test('passing object should throw exception', () => {
    try {
        getPositivityScore({})
        expect(true).toBe(false);
    } catch (e) {
        expect(e.message).toBe("Comment needs to be a string");
    }
});