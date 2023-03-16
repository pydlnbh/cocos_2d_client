var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var i = 0;
var j = "hello";
console.log("i = " + i);
console.log("j = " + j);
if (i == 0) {
    // let k = 2;
    var l = 3;
}
// console.log("k = " + k);
console.log("l = " + l);
var user = {
    userId: 1,
    userName: "anxin",
    gender: 0,
    age: 18
};
console.log("userId = " + user.userId + ", userName = " + user.userName + ", gender = " + (user.gender == 0 ? "man" : "woman") + ", age = " + user.age);
console.log("userId = ".concat(user.userId, ", userName = ").concat(user.userName));
console.log("user = ".concat(JSON.stringify(user)));
var json = JSON.stringify(user);
var p = JSON.parse(json);
console.log("userName = " + p.userName);
p.score = 100;
p["level"] = 1000;
console.log("score = ".concat(p["score"]));
var studet = /** @class */ (function () {
    function studet() {
    }
    return studet;
}());
var vipStudent = /** @class */ (function (_super) {
    __extends(vipStudent, _super);
    function vipStudent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return vipStudent;
}(studet));
var s = new vipStudent;
function sayhello() {
    console.log("hello world");
}
var handler = sayhello;
handler();
handler = function () {
    console.log("hi");
};
handler();
var handler1 = function (userName) {
    console.log("userName = ".concat(userName));
};
handler1("anxin");
var add = function (a, b) {
    return a + b;
};
var a = 1;
var b = 2;
console.log("".concat(a, " + ").concat(b, " = ").concat(add(a, b)));
function operate(a, b, f) {
    return f(a, b);
}
console.log("a + b = " + operate(a, b, add));
console.log("a - b = " + operate(a, b, function (a, b) { return a - b; }));
function printUserName() {
    console.log("userName = " + this.userName);
}
printUserName();
var newF = printUserName.bind(user);
newF();
var u = {
    userName: "lixiang"
};
var newFu = printUserName.bind(u);
newFu();
