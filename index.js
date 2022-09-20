const puppeteer = require("puppeteer");

const url =
  "https://old.reddit.com/r/learnprogramming/comments/4q6tae/i_highly_recommend_harvards_free_online_2016_cs50/";

(async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);

  // expand all comment threads:
  // let expandButtons = await page.$$(".morecomments");
  // while (expandButtons.length) {
  //   for (let button of expandButtons) {
  //     await button.click();
  //     await page.waitForTimeout(500);
  //   }
  //   await page.waitForTimeout(1000);
  //   expandButtons = await page.$$(".morecomments");
  // }

  // for every comment, scrape the text and the points
  const comments = await page.$$(".entry");

  const formattedComments = [];

  for (let comment of comments) {
    const points = await comment
      .$eval(".score", (elem) => elem.textContent)
      .catch((err) => console.error("No score!"));

    const rawText = await comment
      .$eval(".usertext-body", (elem) => elem.textContent)
      .catch((err) => console.error("No text!"));

    if (points && rawText) {
      const text = rawText.replace(/\n/g, "");
      formattedComments.push({ points, text });
    }
  }

  // sort comments by highest points
  formattedComments.sort((a, b) => {
    const pointsA = Number(a.points.split(" ")[0]);
    const pointsB = Number(b.points.split(" ")[0]);
    return pointsB - pointsA;
  });
  console.log(formattedComments.slice(0, 10));

  // insert the sorted comments into the google spreadsheet
  
  // await browser.close();
})();
