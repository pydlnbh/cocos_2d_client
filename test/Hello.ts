let i: number = 0;
var j: string = "hello";

console.log("i = " + i);
console.log("j = " + j);

if (i == 0) {
    // let k = 2;
    var l = 3;
}

// console.log("k = " + k);
console.log("l = " + l);

let user = {
    userId: 1,
    userName: "anxin",
    gender: 0,
    age: 18
}

console.log("userId = " + user.userId + ", userName = " + user.userName + ", gender = " + (user.gender == 0 ? "man" : "woman") + ", age = " + user.age);
console.log(`userId = ${user.userId}, userName = ${user.userName}`);
console.log(`user = ${JSON.stringify(user)}`);

let json: string = JSON.stringify(user);
let p = JSON.parse(json);

console.log("userName = " + p.userName);

p.score = 100;
p["level"] = 1000;

console.log(`score = ${p["score"]}`);

class studet {
    userId: number;
    userName: string;
    gender: number;
    age: number;
}

class vipStudent extends studet {
    vipLevel: number;
}

interface IBehaviour {
    doSomething(): void;
}

let s = new vipStudent;

function sayhello(): void {
    console.log("hello world");
}

let handler = sayhello;
handler();

handler = (): void => {
    console.log("hi");
}

handler();


let handler1 = (userName: string): void => {
    console.log(`userName = ${userName}`);
}

handler1("anxin");

let add = (a: number, b: number): number => {
    return a + b;
}

let a = 1;
let b = 2;
console.log(`${a} + ${b} = ${add(a, b)}`);

function operate(a: number, b: number, f: (a:number, b: number) => number): number {
    return f(a, b);
}

console.log("a + b = " + operate(a, b, add));
console.log("a - b = " + operate(a, b, (a, b) => a - b));

function printUserName() {
    console.log("userName = " + this.userName);
}
printUserName();

let newF = printUserName.bind(user);
newF();

let u = {
    userName: "lixiang",
}

let newFu = printUserName.bind(u);
newFu();