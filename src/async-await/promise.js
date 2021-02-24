const promise1 = new Promise(resolve => setTimeout(() => {
    console.log('promise1');
    resolve(1);
}, 1000));
const promise2 = new Promise(resolve => setTimeout(() => {
    console.log('promise2');
    resolve(2);
}, 2000));
const promise3 = new Promise(resolve => setTimeout(() => {
    console.log('promise3');
    resolve(3);
}, 3000));

// Chain
promise1
    .then(res => promise2)
    .then(promise3)
    .catch(error => console.log(console.error(error)));
Promise.all([promise3, promise1, promise2]).then(res => console.log(res));
Promise.race([promise3, promise1, promise2]).then(res => console.log(res));