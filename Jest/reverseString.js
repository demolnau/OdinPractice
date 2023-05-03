function reverseString(string){
    var split_arr = string.split("")
    var reverse_arr = split_arr.reverse()
    var joined_arr = reverse_arr.join("")
    return joined_arr;
}
module.exports = reverseString;