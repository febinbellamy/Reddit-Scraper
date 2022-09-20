const puppeteer = require("puppeteer");

const url =
  "https://old.reddit.com/r/learnprogramming/comments/4q6tae/i_highly_recommend_harvards_free_online_2016_cs50/";

(async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  // expand all comment threads:
  let expandButtons = await page.$$(".morecomments");
  while (expandButtons.length) {
    for (let button of expandButtons) {
      await button.click();
      await page.waitForTimeout(500);
    }
    await page.waitForTimeout(1000);
    expandButtons = await page.$$(".morecomments");
  }

  // scrape text and points
  // sort the comments by highest points
  // insert the sorted comments into the google spreadsheet

  // await browser.close();
})();
