const sayHello = (name) => {
    console.log(`Hello ${name} 🙂 !`);
}

const arg = process.argv.splice(2);

sayHello("Miszka");

const fetch = require('node-fetch');

const asyncFunc = async () => {
    let data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    data = await data.json();
    console.log(data);
}

asyncFunc();