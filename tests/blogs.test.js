const Page = require('./helper/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

describe('when logged in', async () => {
  
  beforeEach(async () => {
    await page.login();
    await page.click('a.btn-floating');
  });
  
  test('can see create blog from', async () => {
    const label = await page.getContentsOf('form label');
    expect(label).toEqual('Blog Title');
  });
    
  describe.only('And using valid inputs', async () => {

    beforeEach(async () => {
      await page.type('.title input', 'My title');
      await page.type('.content input', 'My content');
      await page.click('form button');
    });

    test('submitting takes user to review screen', async () => {
      const text = await page.getContentsOf('h5');
      expect(text).toEqual('Please confirm your entries');
    });

    test('submitting then saving adds blog to index page', async () => {
      await page.click('button.green');
      await page.waitFor('.card');
      const title = await page.getContentsOf('.card-title');
      const content = await page.getContentsOf('p');
      expect(title).toEqual('My title');
      expect(content).toEqual('My content');
    });

  });

  describe('And using invalid inputs', async () => {

    test('the form shows an error msg', async () => {
      await page.click('form button');
      const titleErr = await page.getContentsOf('.title .red-text');
      const contentErr = await page.getContentsOf('.content .red-text');
      expect(titleErr).toEqual('You must provide a value');
      expect(contentErr).toEqual('You must provide a value');
    });

  });  

});

afterEach(async () => {
  await page.close();
});
