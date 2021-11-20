//Занятие 1. Основы функционального программирования
//Часть 1. Работа с функциями

//1. Аргументы функции.
function average() {
    if (arguments.length === 0) {
        return 0;
    }
    let sum = 0;
    for (var arg of arguments) {
        sum += arg;
    }
    return sum/arguments.length;
}

//среднее арифметическое для массива m = [1,2,3]
//average.apply(null, m)

//2. Замыкания (closures) функции.

function makeShout() {
    var phrase = "Привет!";
    var shout = function() {
        alert(phrase);
    }
    phrase = "Готово!"
    return shout;
}
shout = makeShout();
// выдаст "Готово"
// опосредованно вызовется функция shout, инкапсулированная в функции makeShout() и возвращаемая в качетве коллбэка
// при этом до вызова return переменная phrase меняет свое значение на "Готово!"
shout();

//3. Замыкания (closures) функции.
function sum(num1) {
    return function(num2) {
        return num1+num2;
    }
}

sum (2)(2); //4
var plus1 = sum(1);
plus1(3); // 4

//4. Замыкания (closures) функции.
function makeProperty(o, name, predicate) {
    var value;
    o["get" + name] = function() { return value; };

    o["set" + name] = function(v) {
        if (predicate && !predicate(v))
            throw "set" + name + ": invalid value " + v;
        else
            value = v;
    };
}

var o = {};
makeProperty(o, "Name", function(x) {
    return typeof x == "string";
});
//ок. в качестве имени передается строка
o.setName("Frank");
//выведет имя
console.log(o.getName());
//ошибка - проверка типов не пройдет.
//предикат typeof x == "string" вернет false
o.setName(0);

//5. Передача функции как параметра
function info(obj, f) {
    let result = "";
    for (let o in obj) {
        result += f(o, obj[o]);
    }
    return result;
}

//John;20;
info({name: "John", age: 20}, (p,v)=>v+";");
