const promise = ms => new Promise(resolve => setTimeout(() => {
    resolve(ms);
}, ms));

// Chain
promise(1000)
    .then(res => promise(res * 2))
    .then(res => console.log(res))
    .then(res => console.log(res))
    .catch(error => console.log(error));
// Xu ly song song
Promise.all([promise(10), promise(20), promise(30)]).then(res => console.log(res));
// Thang nao nhanh thi lay
Promise.race([promise(10), promise(20), promise(30)]).then(res => console.log(res));
