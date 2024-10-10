import axios from "axios";
import { getDateThreeMonthsAgo, getFormattedDate } from "./helperFunctions";
import { cacheApiCall } from "./cache";

export const fetchEMAData = async ({ window, ticker }: fetchDataProps) => {
    const cacheKey = `fetchEMAData-${ticker}-${window}`;
    return cacheApiCall(cacheKey, async () => {
        const res = await axios(
            `https://api.polygon.io/v1/indicators/ema/${ticker}?timespan=day&adjusted=true&window=${window}&series_type=close&order=desc&limit=20&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const resArray: ArrayOfValues = res.data?.results?.values?.map(
            (item: FirstAlgorithmDataResponse) => item.value
        );
        const datesArray: number[] = res.data?.results?.values
            ?.map((item: FirstAlgorithmDataResponse) => item.timestamp)
            .reverse();
        return { resArray, datesArray };
    });
};

export const fetchSingleStockData = async (ticker: string | string[]) => {
    const cacheKey = `fetchSingleStockData-${ticker}`;
    return cacheApiCall(cacheKey, async () => {
        const res = await axios(
            `https://api.polygon.io/v3/reference/tickers/${ticker}?apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        return res.data.results;
    });
};

const todaysDate = getFormattedDate();
const threeMonthAgoDate = getDateThreeMonthsAgo();

export const fetchBarsForChart = async (ticker: string | string[]) => {
    const cacheKey = `fetchBarsForChart-${ticker}`;
    return cacheApiCall(cacheKey, async () => {
        const res = await axios(
            `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${threeMonthAgoDate}/${todaysDate}?adjusted=true&sort=asc&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        return res.data.results;
    });
};
