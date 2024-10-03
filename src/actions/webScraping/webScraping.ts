"use server";

import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export async function scrapeStockPrice() {
    const browser = await puppeteer.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath,
        headless: chromium.headless,
    });
    const page = await browser.newPage();
    try {
        await page.setViewport({ width: 1920, height: 1080 });

        const url = process.env.NEXT_PUBLIC_SOME_WEBSITE_FOR_SCRAPING;
        if (!url) {
            throw new Error(
                "Environment variable NEXT_PUBLIC_SOME_WEBSITE_FOR_SCRAPING is not set."
            );
        }
        await page.goto(url);

        await page.waitForSelector("#technicals", { visible: true });

        await page.click("#technicals");

        await new Promise((resolve) => setTimeout(resolve, 1000));

        await page.waitForSelector(".row-RdUXZpkv");

        const stocks = await page.$$eval(".row-RdUXZpkv", (rows) => {
            return rows.map((row) => {
                const stockName =
                    row
                        .querySelector(".tickerDescription-GrtoTeat")
                        ?.textContent?.trim() || "";
                const ticker =
                    row
                        .querySelector(".tickerNameBox-GrtoTeat")
                        ?.textContent?.trim() || "";
                const signal1 =
                    row
                        .querySelector(".cell-RLhfr_y4:nth-child(2)")
                        ?.textContent?.trim() || "";
                const signal2 =
                    row
                        .querySelector(".cell-RLhfr_y4:nth-child(3)")
                        ?.textContent?.trim() || "";
                const signal3 =
                    row
                        .querySelector(".cell-RLhfr_y4:nth-child(4)")
                        ?.textContent?.trim() || "";
                const rsi =
                    row
                        .querySelector(".cell-RLhfr_y4:nth-child(5)")
                        ?.textContent?.trim() || "";

                return { stockName, ticker, signal1, signal2, signal3, rsi };
            });
        });
        return stocks;
    } catch (error) {
        console.error("Scraping failed:", error);
        return [];
    } finally {
        await browser.close();
    }
}
