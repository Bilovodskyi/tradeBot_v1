import { fetchBarsForChart, fetchEMAData } from "@/lib/apiCalls";
import ColorGrid from "@/components/ColorsGrid";
import BarChart from "@/components/BarChart";
import { getCellsColors, getSignal } from "@/lib/helperFunctions";
import Image from "next/image";
import Link from "next/link";
import { IoMdArrowBack } from "react-icons/io";
import { fetchSingleStockData } from "@/lib/apiCalls";
import OpenPositionDialogWindow from "@/components/OpenPositionDialogWindow";

type ParamsProp = {
    stockName: string;
};

const AlgorithmPage = async ({ params }: { params: ParamsProp }) => {
    // const { stockName } = params;

    // const windowParams = ["20", "30", "40"];

    // const data: ArrayOfValues[] = [];
    // let dates: number[] = [];

    // for (const window of windowParams) {
    //     const { resArray, datesArray } = await fetchEMAData({
    //         window: window,
    //         ticker: stockName,
    //     });
    //     data.push(resArray);
    //     if (dates.length === 0) {
    //         dates = datesArray;
    //     }
    // }

    // const cellColors = getCellsColors(data);
    // const signal = getSignal(cellColors);

    // const singleStockData = await fetchSingleStockData(stockName);

    // const barChartData = await fetchBarsForChart(stockName);

    return (
        <div className="h-screen flex flex-col">
            {/* <div
                className={`w-full px-4 md:px-10 py-12 flex flex-col gap-8 ${
                    signal
                        ? "bg-gradient-to-t from-transparent to-lime-500/30"
                        : "bg-gradient-to-t from-transparent to-red-500/30"
                }`}>
                <Link
                    href="/"
                    className="flex gap-2 items-center text stock-section-button text-[0.9rem]">
                    <IoMdArrowBack />
                    <p>Back to Search</p>
                </Link>
                <div className="flex gap-6">
                    <div className="h-[80px] md:h-[100px] min-w-[80px] md:min-w-[100px] rounded-full flex items-center justify-center overflow-hidden">
                        {!singleStockData?.branding?.icon_url ? (
                            <h1>No Image</h1>
                        ) : (
                            <Image
                                src={
                                    singleStockData?.branding?.icon_url +
                                    `?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
                                }
                                alt="Stock logo"
                                width={80}
                                height={80}
                                className="h-[80px] md:h-[100px] w-[80px] md:w-[100px]"
                            />
                        )}
                    </div>
                    <div>
                        <h1 className="text-2xl mb-1 ">
                            {singleStockData?.name}
                        </h1>
                        <h1 className="text-zinc-400">
                            {singleStockData?.sic_description}
                        </h1>
                    </div>
                </div>
            </div> */}
            <div className="p-2 md:p-10 flex max-md:flex-col gap-8 w-full items-center justify-start md:h-full">
                <div className="md:flex-1 flex flex-col justify-start md:h-full gap-8">
                    <div className="relative flex flex-col py-5 max-md:p-2 max-md:ml-4">
                        <h1 className="text-xl mb-6">How Algorithm works.</h1>
                        <ol className="list-decimal flex flex-col gap-2 text-zinc-400">
                            <li>
                                This algorithm based on 3 EMA(Exponential Moving
                                Avarage) with a different period length (20, 30,
                                40).
                            </li>
                            <li>
                                After fetching EMAs, it calculates and assigns
                                colors to cells based on the changes in
                                Exponential Moving Averages between consecutive
                                data points and EMA with a different period
                                length.
                            </li>
                            <li>
                                Then it analize the data and give you an signal
                                to Buy (only buy) only in case EMA for last week
                                show that trend is upward (light green cells)
                            </li>
                        </ol>
                    </div>
                    {/* <div className="py-5 px-2 md:px-20">
                        <ColorGrid colors={cellColors} dates={dates} />
                        <div className="flex items-center gap-1 mt-6 justify-center">
                            <h1 className="mr-1 text-xl">Signal:</h1>
                            <div
                                className={`rounded-full w-[15px] h-[15px] ${
                                    signal ? "bg-lime-500" : "bg-red-500"
                                }`}></div>
                            <p>{signal ? "Buy" : "Don't buy"}</p>
                        </div>
                    </div> */}
                    <div className="flex items-center justify-center md:h-full">
                        <OpenPositionDialogWindow stockName={"stockName"} />
                    </div>
                </div>
                {/* <BarChart data={barChartData} /> */}
            </div>
        </div>
    );
};

export default AlgorithmPage;
