"use server";

import https from "https";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

type PlaceOrderParams = {
    accountId: string;
    conId: string;
    exchange: string;
    ticker: string;
    quantity: string;
    takeProfit?: string;
    stopLoss?: string;
};

type Order = {
    acctId: string;
    conid: number;
    secType: string;
    cOID: string;
    orderType: string;
    side: string;
    quantity: number;
    tif: string;
    ticker?: string;
    listingExchange?: string;
    outsideRTH?: boolean;
    parentId?: string;
    price?: number;
    auxPrice?: number;
    transmit: boolean;
};

export async function placeOrder({
    accountId,
    conId,
    exchange,
    ticker,
    quantity,
    takeProfit,
    stopLoss,
}: PlaceOrderParams) {
    const parentCOID = uuidv4();

    const parentOrder = {
        acctId: accountId,
        conid: parseFloat(conId),
        secType: "STK",
        cOID: parentCOID,
        orderType: "MKT",
        side: "BUY",
        quantity: parseFloat(quantity),
        tif: "DAY",
        ticker: ticker,
        listingExchange: exchange,
        outsideRTH: false,
        transmit: false,
    };

    const orders: Order[] = [parentOrder];

    if (takeProfit) {
        const takeProfitOrder = {
            acctId: accountId,
            conid: parseFloat(conId),
            secType: "STK",
            cOID: uuidv4(),
            parentId: parentCOID,
            orderType: "LMT",
            side: "SELL",
            quantity: parseFloat(quantity),
            price: parseFloat(takeProfit),
            tif: "DAY",
            transmit: false,
        };
        orders.push(takeProfitOrder);
    }

    if (stopLoss) {
        const stopLossOrder = {
            acctId: accountId,
            conid: parseFloat(conId),
            secType: "STK",
            cOID: uuidv4(),
            parentId: parentCOID,
            orderType: "STP",
            side: "SELL",
            quantity: parseFloat(quantity),
            auxPrice: parseFloat(stopLoss),
            tif: "DAY",
            transmit: false,
        };
        orders.push(stopLossOrder);
    }

    orders[orders.length - 1].transmit = true; // Set transmit to true only to the last object in array.

    const requestBody = {
        orders: orders,
    };

    try {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });

        const response = await axios.post(
            `https://localhost:5555/v1/api/iserver/account/${accountId}/orders`,
            requestBody,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                httpsAgent: agent,
            }
        );

        const data = response.data;
        console.log("Order placed successfully:", data);
        return data;
    } catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
}
