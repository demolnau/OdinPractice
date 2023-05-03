const capitalize = require('./capitalize')

test('takes string in and returns it with the first letter capitalized', () => {
    expect(capitalize("honey")).toBe("Honey");
}
);
