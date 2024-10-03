"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    fadeIn,
    fadeInYChange,
    moveFromBottom,
    moveXAxisLeft,
    moveXAxisRight,
} from "@/lib/motion";
import { scrapeStockPrice } from "@/actions/webScraping/webScraping";
import Button from "@/components/Button";
import TypingTextAnimation from "@/components/TypingTextAnimation";
import FakeBotResult from "@/components/FakeBotResult";

const DEFAULT_DATA = [
    { name: "Apple Inc.", ticker: "AAPL" },
    { name: "Microsoft Corporation", ticker: "MSFT" },
    { name: "Alphabet Inc.", ticker: "GOOGL" },
    { name: "Amazon.com Inc.", ticker: "AMZN" },
    { name: "NVIDIA Corporation", ticker: "NVDA" },
];

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [generatedItems, setGeneratedItems] = useState<TypingTextItem[]>([]);

    useEffect(() => {
        const storedData = sessionStorage.getItem("dataArray");
        if (storedData) {
            setIsLoading(true);

            const timeoutId = setTimeout(() => {
                setIsLoading(false);
            }, 2000);

            const parsedData = JSON.parse(storedData);
            pickTopStocks(parsedData);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, []);

    const handleRunBot = async () => {
        setIsLoading(true);
        const storedData = sessionStorage.getItem("dataArray");
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            pickTopStocks(parsedData);
        } else {
            const scrapedDataArray = await scrapeStockPrice();
            sessionStorage.setItem(
                "dataArray",
                JSON.stringify(scrapedDataArray)
            );
            pickTopStocks(scrapedDataArray);
        }

        setIsLoading(false);
    };

    const pickTopStocks = (dataArray: scrapedDataArray[]) => {
        const filteredStocks = dataArray.filter(
            (stock) =>
                parseFloat(stock.rsi) < 65 &&
                (stock.signal1 === "Buy" || stock.signal1 === "Strong buy") &&
                (stock.signal2 === "Buy" || stock.signal2 === "Strong buy") &&
                (stock.signal3 === "Buy" || stock.signal3 === "Strong buy")
        );
        setGeneratedItems(
            filteredStocks.length > 1
                ? filteredStocks.slice(0, 5).map((stock) => ({
                      name: stock.stockName,
                      ticker: stock.ticker,
                  }))
                : DEFAULT_DATA
        );
    };

    const handleLinkToGitHub = () => {
        window.open("https://github.com/Bilovodskyi/tradingBot", "_blank");
    };

    return (
        <div className="flex flex-col items-center h-[calc(100vh+150px)] md:h-screen relative overflow-hidden">
            <motion.nav
                className="flex p-6 w-[370px] md:w-[600px] justify-between items-center"
                variants={fadeInYChange({ y: -5 })}
                initial="hidden"
                animate="visible">
                <div className="text-[1rem] font-semibold text-zinc-400">
                    TradeBot_v1
                </div>

                <Image
                    src="/AI_bot_logo.png"
                    alt="main-logo"
                    width={33}
                    height={33}
                    className="absolute left-1/2 transform -translate-x-[50%] top-5"
                />
                <Button text="GitHub" onClick={handleLinkToGitHub} />
            </motion.nav>
            <div className="absolute top-1/2 transform -translate-y-[320px]">
                <motion.h2
                    variants={fadeInYChange({ y: -5 })}
                    initial="hidden"
                    animate="visible"
                    className="fading-lines ">
                    Introducing
                </motion.h2>
            </div>
            <motion.div
                variants={fadeIn({ delay: 0.75, duration: 0.5 })}
                initial="hidden"
                animate="visible"
                className="spotlight scale-x-[9]"></motion.div>
            <motion.div
                variants={fadeIn({ delay: 0.75, duration: 0.5 })}
                initial="hidden"
                animate="visible"
                className="spotlight rotate-[20deg] scale-x-[9]"></motion.div>
            <motion.div
                variants={fadeIn({ delay: 0.75, duration: 0.5 })}
                initial="hidden"
                animate="visible"
                className="spotlight -rotate-[20deg] scale-x-[9]"></motion.div>
            <motion.div
                variants={fadeIn({ delay: 0 })}
                initial="hidden"
                animate="visible"
                className="text-[4rem] md:text-[6.5rem] font-bold absolute top-1/2 transform -translate-y-[240px] md:-translate-y-[270px] metalic-text">
                TradeBot
            </motion.div>
            <div className="absolute top-1/2 transform -translate-y-[95px] md:-translate-y-[100px] w-full md:w-[470px] ">
                <motion.h2
                    variants={fadeInYChange({ y: 5 })}
                    initial="hidden"
                    animate="visible"
                    className="md:text-[1.2rem] text-center px-12 md:px-4 metalic-text">
                    The best algorithm for trading stocks and bot to
                    automatically open positions
                </motion.h2>
            </div>
            <motion.div
                variants={moveFromBottom()}
                initial="hidden"
                animate="visible"
                className="rounded-border-container rotated-div-center w-[370px] h-[420px] bg-[#131318] absolute bottom-10 z-30 flex flex-col">
                <div className="flex flex-col items-center py-8 gap-4">
                    <Image
                        src="/AI_bot_logo.png"
                        alt="main-logo"
                        width={33}
                        height={33}
                        className=""
                    />
                    <h1 className="text-zinc-400">
                        {isLoading
                            ? "Scrapping internet!"
                            : generatedItems.length > 0
                            ? "Analyze and invest wisely!"
                            : "Get Today's Top Stocks"}
                    </h1>
                </div>
                {isLoading ? (
                    <div className="flex-1 flex items-center justify-center pb-12">
                        <div className="running-algorithm">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
                ) : generatedItems.length > 0 ? (
                    <TypingTextAnimation items={generatedItems} />
                ) : (
                    <div className="px-6 flex flex-col gap-2">
                        <ol className="list-decimal py-2 px-4 text-zinc-500 text-[.9rem]">
                            <li className="py-2">
                                <p className="text-zinc-500">
                                    Get Today's Top Stocks by web scraping
                                    TradinView website.
                                </p>
                            </li>
                            <li className="py-2">
                                <p className="text-zinc-500">
                                    Then ChatGPT will analize resieved data.
                                    Based on RSI, Tech rating, MA rating and Os
                                    rating.
                                </p>
                            </li>
                            <li className="py-2">
                                <p className="text-zinc-500">
                                    In case of bear market bot will provide
                                    top-5 US stock by capitalization
                                </p>
                            </li>
                        </ol>
                        <div className="flex items-center justify-center flex-1">
                            <Button
                                text="Run Bot"
                                glowing
                                onClick={handleRunBot}
                            />
                        </div>
                    </div>
                )}
            </motion.div>

            <motion.div
                variants={moveXAxisLeft()}
                initial="hidden"
                animate="visible"
                className="absolute bottom-16 left-1/2 z-20">
                <div className="rotated-div-left rounded-border-container w-[320px] h-[370px] bg-[#131318]">
                    <FakeBotResult />
                </div>
            </motion.div>
            <motion.div
                variants={moveXAxisRight()}
                initial="hidden"
                animate="visible"
                className="absolute bottom-16 left-1/2 z-20">
                <div className="rounded-border-container rotated-div-right w-[320px] h-[370px] bg-[#131318]">
                    <FakeBotResult />
                </div>
            </motion.div>
            <DecorationLine
                axis="horizontal-line"
                translate="-translate-y-[350px]"
            />
            <DecorationLine
                axis="horizontal-line"
                translate="-translate-y-[270px]"
            />
            <DecorationLine
                axis="horizontal-line"
                translate="-translate-y-[110px]"
            />
            <DecorationLine
                axis="horizontal-line"
                translate="-translate-y-[30px]"
            />
            <DecorationLine
                axis="vertical-line"
                translate="max-md:hidden md:-translate-x-[320px]"
            />
            <DecorationLine
                axis="vertical-line"
                translate="max-md:hidden md:translate-x-[320px]"
            />
            <DecorationLine
                axis="vertical-line"
                translate="-translate-x-[160px] md:-translate-x-[240px]"
            />
            <DecorationLine
                axis="vertical-line"
                translate="translate-x-[160px] md:translate-x-[240px]"
            />
        </div>
    );
};

const DecorationLine = ({
    axis,
    translate,
}: {
    axis: string;
    translate: string;
}) => {
    return (
        <motion.div
            variants={fadeIn({ delay: 0.5 })}
            initial="hidden"
            animate="visible"
            className={`${axis} ${translate}`}
        />
    );
};

export default Home;
