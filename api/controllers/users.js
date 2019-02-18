const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const connection = require('../dbconfig');

module.exports = {

  postUsers: (req, res) => {
    let result = {};
    let status = 201;
    const { Firstname, Middlename, Lastname, Username, GroupId, Password } = req.body;

    if (Username && Password) {
      let user = {};
      user.Firstname = Firstname?Firstname:'';
      user.Middlename = Middlename?Middlename:'';
      user.Lastname = Lastname?Lastname:'';
      user.Username = Username;
      user.GroupId = GroupId?GroupId:0;

      //create salt and hashedPassword
      let salt = crypto.randomBytes(Math.ceil(16))
                  .toString('hex')
                  .slice(0,32);
      let sha256 = crypto.createHash('sha256');
      let password = Password + salt;
      sha256.update(password, 'utf8');
      let hashedPassword = sha256.digest('hex');
      user.Password = hashedPassword;

      // check if user already exists
      connection.query('select email from user_info where email = ?', [user.Username], function(e, r, f){
        if (e) res.send(e);

        if(!r[0]){
          // insert the user
          connection.query('insert into user_info(first_name, middle_name, last_name, email, group_id, password, salt) values(?, ?, ?, ?, ?, ?, ?)', [user.Firstname, user.Middlename, user.Lastname, user.Username, user.GroupId, hashedPassword, salt], function (error, results, fields) {
            if (error) res.send(error);

            // get id of record
            user.Id = results.insertId

            // Create a token
            const payload = { user: Username };
            const options = { expiresIn: '2d', issuer: process.env.JWT_ISSUER };
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign(payload, secret, options);
            user.Token = token;

            res.status(status).send(user);
          });
        } else {
          status = 409;
          result.error = 'Username is already being used.';
          res.status(status).send(result);
        }
      });
    } else {
      status = 500;
      result.status = status;
      let err = '';
      if(!name && !password) err = 'Name and password is required'
        else if(!name) err = 'Name is required';
        else if(!password) err = 'Password is required';
      result.error = err;
      res.status(status).send(result);
    }
  },

  validate: (req, res) => {
    let result = {};
    let status = 200;
    result.message = 'Validated';
    res.status(status).send(result);
  }

}
