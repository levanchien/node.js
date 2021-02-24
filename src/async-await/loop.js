async function loop() {
  for (var i = 0; i < 3; i++) {
    console.log('before async: ', i)
    await new Promise(resolve => {
      setTimeout(() => {
        console.log('inner findResult callback');
        resolve(5);
      }, 2);
    });
    console.log('after async: ', i)
  }
}

loop();
