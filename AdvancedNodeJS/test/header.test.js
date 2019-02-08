const puppeteer = require('puppeteer');

test('Adds two numbers', () => {
  const sum = 1 + 2;
  expect(sum).toEqual(3);
});

describe('When logged in', async () => {
  test('test', async () => {
    const browser = await puppeteer.launch({
      headless: true, //this will make browser opened without some graphic
      args: ['--no-sandbox']
    });
    const page = await browser.newPage();

    // await page.goto('localhost:3000'); for local
    await page.goto('http://localhost:3000'); // for travis

    const text = await page.$eval('a.brand-logo', el => el.innerHTML);

    expect(text).toEqual('Blogster');
    await page.close();
  });
});
