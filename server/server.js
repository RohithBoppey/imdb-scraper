const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.listen(5000, () => {
	console.log("server listening on port 5000");
});

app.post("/getMovie", (req, res) => {
	/*
    I receive movie URL, I decode the movie here and I return the movie details
    scraped as JSON. 
    */
	console.log(req.body);
    var title = '', rating = '', director = '';

	const start = async () => {
		const browser = await puppeteer.launch({
			headless: false,
		});
		const page = await browser.newPage();
		await page.goto(req.body.searchURL, { waitUntil: "domcontentloaded" });

		// Extracting names and other Attributes.
		let element = await page.$(
			"#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-2.khmuXj > h1"
		);
		title = await page.evaluate((el) => el.textContent, element);

		element = await page.$(
			"#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-db8c1937-0.eGmDjE.sc-94726ce4-4.dyFVGl > div > div:nth-child(1) > a > div > div > div.sc-7ab21ed2-0.fAePGh > div.sc-7ab21ed2-2.kYEdvH > span.sc-7ab21ed2-1.jGRxWM"
		);
		rating = await page.evaluate((el) => el.textContent, element);

		element = await page.$(
			"#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > div > section > div > div.sc-18496876-1.bxQyHL.ipc-page-grid__item.ipc-page-grid__item--span-2 > section.ipc-page-section.ipc-page-section--base.sc-36c36dd0-0.bfKRTS.title-cast.title-cast--movie.celwidget > ul > li:nth-child(1) > div > ul > li > a"
		);
		director = await page.evaluate((el) => el.textContent, element);

		// const casting = [];
		// for(let i = 1; i <= 5; i++){
		//     element = await page.$(
		//         `#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > div > section > div > div.sc-18496876-1.bxQyHL.ipc-page-grid__item.ipc-page-grid__item--span-2 > section.ipc-page-section.ipc-page-section--base.sc-36c36dd0-0.bfKRTS.title-cast.title-cast--movie.celwidget > div.ipc-shoveler.ipc-shoveler--base.ipc-shoveler--page0.title-cast__grid > div.ipc-sub-grid.ipc-sub-grid--page-span-2.ipc-sub-grid--wraps-at-above-l.ipc-sub-grid--4-unit-at-s.ipc-shoveler__grid > div:nth-child(${i})`
		//     )
		//     const temp_cast = page.evaluate(el => el.textContent, element);
		//     casting.push(temp_cast);
		// }

		// element = await page.$(
		// 	"#__next > main > div > section.ipc-page-background.ipc-page-background--base.sc-c7f03a63-0.kUbSjY > section > div:nth-child(4) > section > section > div.sc-94726ce4-0.cMYixt > div.sc-94726ce4-2.khmuXj > div > ul > li:nth-child(3)"
		// );
		// const runtime = page.evaluate((el) => el.textContent, element);

        const movieDetails = {title, rating, director};
        console.log(movieDetails);
        res.json(movieDetails);
		await browser.close();
	};
	start();

    const movieDetails = {title, rating, director};
	
});
