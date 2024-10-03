"use server";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";

export async function gatewayLogin({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    let browser = null;
    try {
        browser = await puppeteer.launch({
            executablePath: await chromium.executablePath,
            headless: chromium.headless,
            args: [
                ...chromium.args,
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--ignore-certificate-errors",
            ],
            // Optional: Set defaultViewport to null to use the default viewport size
            defaultViewport: chromium.defaultViewport,
        });
        const page = await browser.newPage();
        await page.goto("https://localhost:5555", {
            waitUntil: "networkidle2",
        });
        await page.setViewport({ width: 1920, height: 1080 });

        await page.type("#xyz-field-username", email);
        await page.type("#xyz-field-password", password);

        await Promise.all([
            page.click(".btn"),
            page.waitForNavigation({ waitUntil: "networkidle2" }),
        ]);

        await page.close();
        await browser.close();
        return { success: true };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error };
    }
}
