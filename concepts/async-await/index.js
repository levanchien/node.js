execute()

function execute() {
  findResult().then()
  console.log("end of execute")
}

async function findResult() {
  for (var i = 0; i < 100000; i++) {
    var j = 100
  }

  console.log('before findResult')

  await new Promise(resolve => {
    setTimeout(() => {
      console.log('inner findResult callback');
      resolve();
    }, 2);
  });

  console.log('after findResult')
}