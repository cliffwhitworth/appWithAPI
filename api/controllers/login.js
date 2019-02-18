const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const connection = require('../dbconfig');

module.exports = {

  login: (req, res) => {
    const { Username, Password } = req.body;

    let err = '';
    let user = {};
    let result = {};
    // https://www.restapitutorial.com/httpstatuscodes.html
    // https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
    let status = 200;
    if(!Username && !Password) err = 'Name and password is required'
      else if(!Username) err = 'Name is required';
      else if(!Password) err = 'Password is required';
    if(err){
      status = 404
      result.error = err;
      res.status(status).send(result);
    }

    // get salt to add to password
    connection.query('select salt from user_info where email = ?', [Username], function (e, r, f) {
      if (e) throw e;

      if(!r.length) {
        status = 404;
        result.error = 'User not found';
        res.status(status).send(result);
        return;
      }

      // hash password with salt
      let sha256 = crypto.createHash('sha256');
      let password = Password + r[0].salt;
      sha256.update(password, 'utf8');
      let hashedPassword = sha256.digest('hex');

      // verify user creds
      connection.query('select id as Id, first_name as Firstname, middle_name as Middlename, last_name as Lastname, Email as Username from user_info where email = ? and password = ?', [Username, hashedPassword], function (error, results, fields) {
        if (error) res.send(error);

        user = results[0];

        // Create a token
        const payload = { user: Username };
        const options = { expiresIn: '2d', issuer: process.env.JWT_ISSUER };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, options);
        user.Token = token;

        res.status(status).send(user);
      });

    });
  },

  // a get call that doesn't require authentication
  getLogin: (req, res) => {
    let result = {};
    let status = 200;
    result.message = 'Get Login is working';
    res.status(status).send(result);
  }
}
