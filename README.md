

# 📚 About
This is a Next.js project. It consist of 3 parts. 

## 1. Webscraping Bot.
Finding free, up-to-date market data can be challenging, so I created this part of the project to scrape technical data (MA rating, OS rating, tech rating, and RSI) from TradingView. The data is then filtered to provide the top five stocks worth attention.
## 2. Trading Indicator.
This algorithm is based on three EMAs (Exponential Moving Averages) with different period lengths (20, 30, and 40). After fetching the EMAs, it calculates two things: the changes in EMAs between consecutive data points and the relationship between EMAs of different period lengths. It then analyzes the data and provides a signal to "Buy" only if the EMA trend for the past week shows upward momentum (indicated by light green cells).
## 3. Interactive Broker Automation Trading Bot. 
This part of the project integrates with an IB (Interactive Brokers) account using IB Gateway. It allows you to open positions and set take-profit and stop-loss orders.

# 🛠️ How to use

Puppeteer and the IB Automation Trading Bot work only locally:

Puppeteer works locally due to its size and the requirement to run on a server (Vercel provides serverless functions with a 5MB size limit), making it available only in the local version.
The IB Gateway works only locally due to security considerations.

1. Clone the GitHub Repository to Your Computer
2. Create a .env File and Add Environment Variables
```
NEXT_PUBLIC_API_KEY= "Your polygon.io API key"
NEXT_PUBLIC_SOME_WEBSITE_FOR_SCRAPING="https://www.tradingview.com/markets/stocks-usa/market-movers-large-cap/"
NEXT_PUBLIC_IS_LOCAL=true
```
3. Install Java Runtime Environment (JRE)
To execute the IB Gateway application, your system must have the Java Runtime Environment installed.
 [Link to download Java](https://www.oracle.com/java/technologies/downloads/)
4. Install IB Gateway on Your Computer
[Link to download IB gateway](https://download2.interactivebrokers.com/portal/clientportal.gw.zip)
You will download a folder named clientportal.
5. Install project dependecies 
``` dash
npm install
```
6. Modify the startGateway.ts file.
Navigate to the project folder: src -> actions -> placeOrder -> startGateway.ts and change this line of code to the path where the "clientportal" folder is located on your machine:
``` js
{ cwd: "/Users/bohdanbilovodskyi/Downloads/clientportal" },
```
7. One more detail: go to the "clientportal" folder -> root -> conf.yaml, open it using your text editor (e.g., VS Code), and change the listenPort from 5000 to 5555:
``` js
listenPort: 5000
```
8. You're all done! Now you are ready to use the IB Automation Trading Bot.

# 🔒 SSL Certificates

Since the Interactive Brokers (IB) Gateway doesn't provide SSL certificates by default, I decided to turn off SSL checks in my application for simplicity.

However, as this can introduce security risks, you can create and self-sign SSL certificates. You can follow the official IB documentation for how to install SSL certificates: [find section "Invalid SSL certificate"](https://interactivebrokers.github.io/cpwebapi/use-cases)

Additionally, you will need to update the following files (Follow these steps only if you are using self-signed certificates.):

1. Go to fetchAccountId.ts, fetchContractId.ts, and placeOrder.ts and change rejectUnauthorized to true:
``` js
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });
```
2. Go to gatewayLogin.ts and remove the --ignore-certificate-errors argument:
``` js
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--ignore-certificate-errors",
        ],
    });
```







