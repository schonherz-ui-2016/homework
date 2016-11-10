/**
 * Created by Szimeonov Nikolett on 2016.11.09..
 */
var str = prompt("Please enter a camelCase string!");

function solve() {
    str = str.trim();
    if (str === "") {
        console.log("Not a valid expression!");

    } else
        return str.match(/^[a-z]|[A-Z]/g).length;
}
console.log(solve());









