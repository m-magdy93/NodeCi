const {Buffer} = require('safe-buffer');
const keygrip = require('keygrip');
const keys = require('../../config/keys');
const KeyGrip = new keygrip([keys.cookieKey])

module.exports = (user) => {

  //const userId = "5feadf16c710ef1a02ed065d";
  const sessionObj = {
    passport: {user: user._id.toString()}
  }
  const sessionString = Buffer.from(
    JSON.stringify(sessionObj)
  ).toString('base64');
  const sig = KeyGrip.sign('session=' + sessionString);
  return {session: sessionString, sig}

}