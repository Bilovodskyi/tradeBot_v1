"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const TypingTextAnimation = ({ items }: TypingTextAnimationProps) => {
    const [displayedItems, setDisplayedItems] = useState<TypingTextItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [typedText, setTypedText] = useState("");
    const [charIndex, setCharIndex] = useState(0);
    const [isTypingTicker, setIsTypingTicker] = useState(false);

    useEffect(() => {
        if (currentIndex < items.length) {
            const currentItem = items[currentIndex];
            const targetText = isTypingTicker
                ? currentItem.ticker
                : currentItem.name;

            if (charIndex < targetText.length) {
                const typingTimeout = setTimeout(() => {
                    setTypedText((prev) => prev + targetText.charAt(charIndex));
                    setCharIndex((prev) => prev + 1);
                }, 100); // Adjust typing speed here

                return () => clearTimeout(typingTimeout);
            } else if (!isTypingTicker) {
                // Start typing the ticker once the name is fully typed
                setIsTypingTicker(true);
                setTypedText("");
                setCharIndex(0);
            } else {
                const displayTimeout = setTimeout(() => {
                    setDisplayedItems((prev) => [...prev, currentItem]);
                    setTypedText("");
                    setCharIndex(0);
                    setIsTypingTicker(false);
                    setCurrentIndex((prev) => prev + 1);
                }, 500); // Adjust delay between items here

                return () => clearTimeout(displayTimeout);
            }
        }
    }, [charIndex, currentIndex, isTypingTicker, items]);

    return (
        <div className="flex flex-col gap-2">
            <ul className="py-2 px-4">
                {displayedItems.map((item) => (
                    <li
                        key={item.ticker}
                        className="py-2 px-3 hover:bg-zinc-500/15 rounded-md cursor-pointer">
                        <Link
                            href={`/${item.ticker}`}
                            className="flex justify-between">
                            <h1>{item.name}</h1>
                            <h1 className="text-zinc-500">{item.ticker}</h1>
                        </Link>
                    </li>
                ))}
                {currentIndex < items.length && (
                    <li className="py-2 px-3 bg-zinc-500/15 rounded-md flex justify-between">
                        <h1>
                            {isTypingTicker
                                ? items[currentIndex].name
                                : typedText}
                        </h1>
                        {isTypingTicker && (
                            <h1 className="text-zinc-500">{typedText}</h1>
                        )}
                    </li>
                )}
            </ul>
            {/* {currentIndex === items.length && ( */}
            <p className="text-zinc-500 text-[0.7rem] absolute bottom-0 pb-5 px-4">
                Important: The bot generates the top 5 suggestions. However, due
                to market trends, there may be fewer than 5 suggestions at
                times. In cases where no suggestions are available, the bot will
                display the top 5 US stocks
            </p>
            {/* )} */}
        </div>
    );
};

export default TypingTextAnimation;
