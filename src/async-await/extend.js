async function sum(a, b) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return a + b;
}

async function await_1() {
    
    console.time('Await 1');
    const a = await sum(1, 2);
    const b = await sum(2, 2);
    const c = await sum(5, 2);

    const r = a + b + c;
    console.log(r);
    console.timeEnd('Await 1');
}

async function await_2() {
    
    console.time('Await 2');
    const a =  sum(1, 2);
    const b =  sum(2, 2);
    const c =  sum(5, 2);

    const r = (await a) + (await b) + (await c);
    console.log(r);
    console.timeEnd('Await 2');
}

async function await_3() {
    
    console.time('Promise All');
    const a = sum(1, 2);
    const b = sum(2, 2);
    const c = sum(5, 2);

    const r = (await Promise.all([a, b, c])).reduce((total,value) => total + value);
    console.log(r);
    console.timeEnd('Promise All');
}

async function main() {
    await await_1();
    await await_2();
    await await_3();
}

main();