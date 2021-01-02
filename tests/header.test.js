const Page = require('./helper/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

afterEach(async () => {
  await page.close();
});



test('the header has the correct test', async () => {
  const text = await page.$eval('a.brand-logo', el => el.innerHTML);
  expect(text).toEqual('Blogster');
});

test('clicking login start oauth flow', async () => {
  await page.click('.right a');
  const url =  await page.url();

  expect(url).toMatch(/accounts\.google.com/);
});

test('when signed in shows logout button', async () => {
  await page.login();
  const text = await page.getContentsOf('a[href="/auth/logout"]');
  expect(text).toEqual('Logout');
});



/**
 * @ response of auth callback get the session
 * @ node
 * const session = "val";
 * const Buffer = require('buffer').Buffer;
 * Buffer.from(session, 'base64').toString('utf8'); 
 * // print out session details
 */

 /**
  * How the browser sends a cookie that contains the 
  * session to the server
  * Sends (session, session.sig) cookie
  * Server - middleware (cookie-session)
  *   - pulls props of session,sessio.sig off cookie
  *   - uses session.sig to ensure session was not touchde
  *   - decode session into js object
  *   - places req.session
  * Server - middleware (passport)
  *   - access info in req.session
  *   - use userId to check if user exists
  *   - assign req.user
  */

  /**
   * session + cookieKey = session.sig
   * session.sig + cookiekey = session
   * 
   * cookie-session middleware uses cookies module
   * cookies modules contains keygrip module
   * 
   * const keygrip = require('keygrip');
   * const KeyGrip = new keygrip(['cookiekey']);
   * KeyGrip.sign('session='+session_var);
   * // returns session.sig
   * KeyGrip.verify('session='+session, 'session.sig');
   * // returns true if not manipulated
   */

   /**
    * 
    * 
    # Travis CI Flow
      - We push code to github
      - Travis automatically detects pushed code
      - Travis clones the project
      - Travis run tests using .travis.yaml file
      - If tests are ok, Travis sends us an email or do as we wanted

    # Trvis file
    language: node_js     
    node_js:
      - "12"        // node version
    dist: trusty    // used linux dist as a virtual machine
    services:
      - mongodb
      - redis-server
    env:
      - NODE_ENV=ci
    */