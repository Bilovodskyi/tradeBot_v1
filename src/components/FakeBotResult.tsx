import Image from "next/image";
import React from "react";
import Button from "./Button";

const FakeBotResult = () => {
    return (
        <>
            <div className="flex flex-col items-center pt-8 gap-4 scale-90">
                <Image
                    src="/AI_bot_logo.png"
                    alt="main-logo"
                    width={33}
                    height={33}
                    className=""
                />
                <h1 className="text-zinc-400">Analyze and invest wisely!</h1>
            </div>
            <div className="flex flex-col gap-2 scale-95">
                <ul className="py-2 px-4">
                    <li className="py-2 px-3 rounded-md flex justify-between">
                        <h1>Apple</h1>
                        <h1 className="text-zinc-500">APPL</h1>
                    </li>
                    <li className="py-2 px-3 rounded-md flex justify-between">
                        <h1>Microsoft</h1>
                        <h1 className="text-zinc-500">MCSF</h1>
                    </li>
                    <li className="py-2 px-3 rounded-md flex justify-between">
                        <h1>Tesla</h1>
                        <h1 className="text-zinc-500">TSLA</h1>
                    </li>
                    <li className="py-2 px-3 rounded-md flex justify-between">
                        <h1>Berkshire Hathaway</h1>
                        <h1 className="text-zinc-500">BKH</h1>
                    </li>
                    <li className="py-2 px-3 rounded-md flex justify-between">
                        <h1>Amazon</h1>
                        <h1 className="text-zinc-500">AMZN</h1>
                    </li>
                </ul>
                <div className="flex items-center justify-center flex-1">
                    <Button text="Top 5 Best Stocks for Today!" disabled />
                </div>
            </div>
        </>
    );
};

export default FakeBotResult;
