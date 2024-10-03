import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const change = ({
    emaOne,
    emaTwo,
}: {
    emaOne: number;
    emaTwo: number;
}) => {
    if (!emaTwo) {
        return emaOne;
    } else {
        return emaOne - emaTwo;
    }
};

export const convertDataForChart = (data: convertDataForChartParams[]) => {
    return data?.map((item) => ({
        time: new Date(item.t).toISOString().split("T")[0],
        open: item.o,
        high: item.h,
        low: item.l,
        close: item.c,
    }));
};

export const getFormattedDate = (date: Date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

export const getDateThreeMonthsAgo = () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3);

    return getFormattedDate(date);
};

export const getSignal = (data: ArrayOfColours[]) => {
    const lastSixDays = data.slice(-6);

    let limeDaysCount = 0;

    let nonLimeDayValid = false;

    for (let i = 0; i < lastSixDays.length; i++) {
        const day = lastSixDays[i];

        const allLime = day.every((color) => color === "lime");
        const noRed = day.every((color) => color !== "red");

        if (allLime) {
            limeDaysCount++;
        } else if (noRed) {
            nonLimeDayValid = true;
        } else {
            return false;
        }
    }
    return limeDaysCount >= 5 && (limeDaysCount === 6 || nonLimeDayValid);
};

export const getCellsColors = (data: ArrayOfValues[]) => {
    const cellColors = [];
    if (!data[0]) return [];
    for (let j = 0; j < data[0].length; j++) {
        const tempCellColors = [];
        for (let i = 0; i < data.length; i++) {
            const currentChange = change({
                emaOne: data[i][j],
                emaTwo: data[i][j - 1],
            });
            const condition1 =
                currentChange >= 0 && data[0][j] > data[data.length - 1][j];
            const condition2 =
                currentChange <= 0 && data[0][j] > data[data.length - 1][j];
            const condition3 =
                currentChange <= 0 && data[0][j] < data[data.length - 1][j];
            const condition4 =
                currentChange >= 0 && data[0][j] < data[data.length - 1][j];

            if (condition1) tempCellColors.push("maroon");
            else if (condition2) tempCellColors.push("lime");
            else if (condition3) tempCellColors.push("green");
            else if (condition4) tempCellColors.push("red");
        }
        cellColors.unshift(tempCellColors);
    }
    return cellColors;
};
