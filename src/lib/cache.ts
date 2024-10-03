const cache: { [key: string]: any } = {};

const CACHE_EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day

const isCacheValid = (timestamp: number) => {
    return Date.now() - timestamp < CACHE_EXPIRATION_TIME;
};

export const cacheApiCall = async (
    cacheKey: string,
    apiCall: () => Promise<any>
) => {
    const cachedData = cache[cacheKey];
    if (cachedData && isCacheValid(cachedData.timestamp)) {
        console.log(`Serving from cache for key: ${cacheKey}`);
        return cachedData.data;
    }

    const data = await apiCall();

    cache[cacheKey] = {
        data,
        timestamp: Date.now(),
    };
    console.log(cache);
    return data;
};
