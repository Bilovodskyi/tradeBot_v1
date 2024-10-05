

# 📚 About
This is a Next.js project. It consist with 3 parts. 

## 1. Webscraping bot.
Finding free, up-to-date market data can be challenging, so I created this part of the project to scrape technical data (MA rating, OS rating, tech rating, and RSI) from TradingView. The data is then filtered to provide the top five stocks worth attention.
## 2. Trading indicator.
This is a simplified version of the trading indicator I used during my trading career. The algorithm is based on three Exponential Moving Averages (EMA) with different period lengths (20, 30, and 40). After fetching the EMAs, the program calculates and assigns colors to cells based on the changes in EMAs between consecutive data points. A special function analyzes the data and signals a "Buy" opportunity when the EMA trend for the past week indicates upward momentum (light green cells).
## 3. Interactive boroker automation trading bot. 
This part of the project integrates with an IB (Interactive Brokers) account using IB Gateway. It allows users to open positions and set up take profit and stop loss orders.

# 🛠️ How to use

Puppeteer and IB automation trading bot works only localy:

Puppeteer works only localy because of its size and requairement to run on a server (Vercel provides serverless functions with 5mb size limit) available only on local version.

IB gataway also works only localy becouse security issues.

1. copy github repo to you computer
2. Create .env file and add this variables:
```
NEXT_PUBLIC_API_KEY= "Your polygon.io API key"
NEXT_PUBLIC_SOME_WEBSITE_FOR_SCRAPING="https://www.tradingview.com/markets/stocks-usa/market-movers-large-cap/"
NEXT_PUBLIC_IS_LOCAL=true
```
3. Install Java and IB Gateway
Link to Java instalation
Link to Ib Gateway
4. Changes in StartGateway.ts file 
5. Chage localhost to localhost:5555







