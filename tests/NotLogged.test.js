const Page = require('./helper/page');

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto('http://localhost:3000');
});

describe('when user not logged in', async() => {

  test('user can not create blog posts', async () => {
    const result = await page.evaluate(
      () => {
        return fetch('/api/blogs', {
          method: "post",
          credentials: "same-origin",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({
            title: "post title",
            content: "post content"
          })
        }).then(res => res.json());
      }
    );
    
    console.log(result);
    expect(result).toEqual({error: 'You must log in!'});

  });

  test('user can not get blog posts', async () => {
    const result = await page.evaluate(
      () => {
        return fetch('/api/blogs', {
          method: "get",
          credentials: "same-origin",
          headers: {
            "content-type": "application/json"
          }
        }).then(res => res.json());
      }
    );
    
    console.log(result);
    expect(result).toEqual({error: 'You must log in!'});

  });

})

afterEach(async () => {
  await page.close();
});
