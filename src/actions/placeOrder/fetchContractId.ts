"use server";

import https from "https";
import axios from "axios";

export async function fetchConId({ symbol }: { symbol: string }) {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });
        const response = await axios.post(
            `https://localhost:5555/v1/api/iserver/secdef/search`,
            {
                symbol,
                secType: "STK",
                name: true,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                httpsAgent: agent,
            }
        );

        const data = response.data;

        const conId = data[0]?.conid;
        const exchange = data[0]?.description;

        if (!conId) {
            throw new Error("Contract not found");
        }

        if (!exchange) {
            throw new Error("Exchange not found");
        }

        return { conId, exchange };
    } catch (error) {
        console.error("Error fetching conId:", error);
        throw new Error("Failed to fetch contract ID");
    }
}
