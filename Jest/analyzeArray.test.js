import analyzeArray from "./analyzeArray";
test('take in an array of numbers and return an object with the following properties', () => {
    const array_to_test = [1,8,3,4,2,6];
    expect(analyzeArray(array_to_test)).toEqual({average: 4, minimum: 1,maximum: 8, len: 6})
}
);