function analyzeArray(arr){
    const sum = arr.reduce((a,b) => a+b,0)
    const average = sum/arr.length;
    const minimum = Math.min(...arr)
    const maximum = Math.max(...arr)
    const len = arr.length;
    return{average, minimum,maximum, len}
}
export default analyzeArray;