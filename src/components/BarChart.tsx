"use client";
import React, { useEffect, useRef } from "react";
import { ColorType, createChart } from "lightweight-charts";
import { convertDataForChart } from "@/lib/helperFunctions";

const BarChart = ({ data }: { data: BarChartDataProps[] }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartContainerRef.current) {
            const chart = createChart(chartContainerRef.current, {
                width: chartContainerRef.current.clientWidth,
                height: chartContainerRef.current.clientHeight,
                layout: {
                    textColor: "#d1d4dc",
                    // background: { type: ColorType.Solid, color: "#131722" },
                    background: {
                        type: ColorType.Solid,
                        // color: "rgb(10, 10, 10)",
                        color: "transparent",
                    },
                },

                rightPriceScale: {
                    borderColor: "transparent",
                },
                timeScale: {
                    borderColor: "transparent",
                },
                grid: {
                    vertLines: {
                        color: "rgba(42, 46, 57, 0.5)",
                    },
                    horzLines: {
                        color: "rgba(42, 46, 57, 0.5)",
                    },
                },
            });

            const chartCanvas =
                chartContainerRef.current.querySelector("canvas");

            if (chartCanvas)
                chartCanvas.style.border = "0.5px solid rgba(42, 46, 57, 0.5)";
            const candlestickSeries = chart.addCandlestickSeries({
                upColor: "#26a69a",
                downColor: "#ef5350",
                borderVisible: false,
                wickUpColor: "#26a69a",
                wickDownColor: "#ef5350",
            });
            candlestickSeries.setData(convertDataForChart(data));

            const handleResize = () => {
                chart.applyOptions({
                    width: chartContainerRef.current?.clientWidth,
                    height: chartContainerRef.current?.clientHeight,
                });
            };

            window.addEventListener("resize", handleResize);

            chart.timeScale().fitContent();
            return () => {
                window.removeEventListener("resize", handleResize);
                chart.remove();
            };
        }
    }, [data]);

    return (
        <div
            className="md:rounded-border-container overflow-hidden md:flex-1 max-md:w-full h-[550px] md:h-full"
            ref={chartContainerRef}
        />
    );
};

export default BarChart;
