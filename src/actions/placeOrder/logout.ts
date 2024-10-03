"use server";

import https from "https";
import axios from "axios";

export async function logout() {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false, // Accept self-signed certificates
        });
        const response = await axios.post(
            `https://localhost:5555/v1/api/logout`,
            {},
            {
                headers: {
                    "Content-Type": "application/json",
                },
                httpsAgent: agent,
            }
        );

        const data = response.data;

        return data;
    } catch (error) {
        console.error("Error logging out:", error);
        throw new Error("Error logging out.");
    }
}
