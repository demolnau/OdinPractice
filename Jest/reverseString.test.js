const reverseString = require('./reverseString')

test('take in a string an reverse it', () => {
    const string ="honey"
    expect(reverseString(string)).toBe("yenoh")
}
);

