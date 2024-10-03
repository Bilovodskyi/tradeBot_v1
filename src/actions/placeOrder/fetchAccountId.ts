"use server";

import https from "https";
import axios from "axios";

export async function fetchAccountId() {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });
        const response = await axios.get(
            "https://localhost:5555/v1/api/iserver/accounts",
            {
                headers: {
                    "Content-Type": "application/json",
                },
                httpsAgent: agent,
            }
        );

        const data = response.data;

        if (
            !data ||
            !Array.isArray(data.accounts) ||
            data.accounts.length === 0
        ) {
            throw new Error("Account not found");
        }

        const accountId = data.accounts[0];

        if (!accountId) {
            throw new Error("Account not found");
        }

        return accountId;
    } catch (error) {
        console.error("Error fetching accountId:", error);
        throw new Error("Failed to fetch account ID");
    }
}

// DUA405927
