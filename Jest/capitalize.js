function capitalize(string){
    var capitalized_string = string.charAt(0).toUpperCase() + string.slice(1);
    return capitalized_string
}
module.exports = capitalize;