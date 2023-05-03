import {add, subtract, divide, multiply} from "./calculator.js"

test('add x to y', () => {
    expect(add(2,2)).toBe(4);
}
);

test('subtract y from x', () => {
    expect(subtract(4,2)).toBe(2);
}
);

test('divide x form y',() => {
    expect(divide(6,2)).toBe(3);
}
);

test('multiply x to y',() =>{
    expect(multiply(3,6)).toBe(18);
});