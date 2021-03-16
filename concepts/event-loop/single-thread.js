setInterval(() => {
    console.log(`interval 1`);
}, 1000);

setInterval(() => {
    console.log(`interval 2`);
    while(true) {}; // infinity loop => call stack never free => block event loop
}, 1000);
