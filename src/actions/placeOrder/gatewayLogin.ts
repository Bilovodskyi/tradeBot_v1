"use server";
import puppeteer from "puppeteer";

export async function gatewayLogin({
    email,
    password,
}: {
    email: string;
    password: string;
}) {
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--ignore-certificate-errors",
        ],
    });
    try {
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
        return { success: true };
    } catch (error) {
        console.error("Login failed:", error);
        return { success: false, error };
    } finally {
        await browser.close();
    }
}
