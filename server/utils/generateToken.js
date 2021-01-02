const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'myappsecretfordairyproducts', {
    expiresIn: '30d',
  })
}


module.exports = generateToken;
