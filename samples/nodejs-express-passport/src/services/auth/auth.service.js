const jwt = require('jsonwebtoken');

const users = [
  {
    id: 1,
    username: 'baz',
    password: 'baz'
  },
  {
    id: 2,
    username: 'foo',
    password: 'foo'
  }
]

module.exports.login = (username, password) => {
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    throw new Error('User not found');
  }
  return jwt.sign({
    sub: user.id
  }, 'secret', { expiresIn: 1440000 });
}

module.exports.findUser = (id) => {
  return users.find(user => user.id === id);
}
