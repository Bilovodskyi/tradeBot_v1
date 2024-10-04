"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Button from "./Button";
import { startIBGateway } from "@/actions/placeOrder/startGateway";
import { gatewayLogin } from "@/actions/placeOrder/gatewayLogin";
import { fetchConId } from "@/actions/placeOrder/fetchContractId";
import { placeOrder } from "@/actions/placeOrder/placeOrder";
import { InputField } from "./InputField";
import { fetchAccountId } from "@/actions/placeOrder/fetchAccountId";
import Image from "next/image";

const OpenPositionDialogWindow = ({ stockName }: { stockName: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [loadingText, setLoadingText] = useState("");
    const FormValidator = z.object({
        email: z.string().min(1, { message: "Cannot be enpty!" }),
        password: z.string().min(1, { message: "Cannot be enpty!" }),
        quantity: z.string().min(1, { message: "Cannot be enpty!" }),
        takeProfit: z.string(),
        stopLoss: z.string(),
    });

    const {
        register,
        getValues,
        handleSubmit,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof FormValidator>>({
        resolver: zodResolver(FormValidator),
        defaultValues: {
            email: "",
            password: "",
            quantity: "",
            takeProfit: "",
            stopLoss: "",
        },
    });

    const handleOpenPosion = async () => {
        setError("");
        setLoading(true);
        const { email, password, quantity, takeProfit, stopLoss } = getValues();
        try {
            setLoadingText("Starting IB Gateway...");
            await startIBGateway();
            setLoadingText("Login to IB account...");

            await gatewayLogin({ email, password });

            setLoadingText("Fetching account Id...");
            const accountId = await fetchAccountId();
            setLoadingText("Fetching contract ID...");
            const { conId, exchange } = await fetchConId({ symbol: stockName });

            setLoadingText("Placing order...");

            await placeOrder({
                accountId,
                conId,
                exchange,
                ticker: stockName,
                quantity,
                takeProfit,
                stopLoss,
            });

            setLoadingText("Done!");
            // await logout();
        } catch (error) {
            if (error instanceof Error) {
                setLoading(false);
                setError(error.message);
            } else {
                setLoading(false);
                setError("Unexpected error ocured! Try again!");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleCloseModal = () => {
        reset();
        clearErrors();
        setError("");
        setIsOpen(false);
    };
    console.log(error);

    return (
        <div>
            <Dialog
                open={isOpen}
                onOpenChange={(isOpen) => !isOpen && handleCloseModal()}>
                <DialogTrigger
                    onClick={() => setIsOpen(true)}
                    className="outline-none max-md:mb-4 rounded-full px-4 py-2 bg-[#24282E] z-20 border border-zinc-700 glowing-border-button cursor-pointer hover:bg-[#2E333B] duration-150 before:hover:bg-[#2E333B]">
                    <h1>Open position</h1>
                </DialogTrigger>
                {loading ? (
                    <DialogContent className="bg-mainBackground md:h-3/4 outline-none md:dialog-decoration-dots">
                        <div className="flex-1 flex flex-col items-center justify-center pb-12 gap-10">
                            <h1 className="text-xl text-zinc-400">
                                {loadingText}
                            </h1>
                            <div className="running-algorithm">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    </DialogContent>
                ) : (
                    <DialogContent className="bg-mainBackground md:h-3/4 outline-none max-xl:overflow-scroll max-md:px-6 md:dialog-decoration-dots">
                        <DialogTitle className="text-2xl md:text-3xl font-bold md:mx-6 p-4 md:p-16 text-center metalic-text">
                            Login to your Interactive Brokers account and
                            provide position details:
                        </DialogTitle>

                        <div className="flex max-md:flex-col md:h-full md:items-center">
                            <div className="md:w-1/2 md:py-10 md:pr-12 md:pl-24 flex flex-col gap-8">
                                <div className="flex flex-col gap-4 items-center">
                                    <div className="rounded-border-container bg-white/10 flex w-[50px] h-[50px] p-1">
                                        <Image
                                            src="/ibkr-symbol.svg"
                                            alt="Interactive Brokers"
                                            width={50}
                                            height={50}
                                        />
                                    </div>
                                    <h2 className="text-zinc-400 text-xl">
                                        Log in to Interactive Brokers
                                    </h2>
                                </div>
                                <InputField
                                    input="email"
                                    type="email"
                                    register={register}
                                    errors={errors}
                                />

                                <InputField
                                    input="password"
                                    type="password"
                                    register={register}
                                    errors={errors}
                                />
                            </div>
                            <div className="flex max-md:gap-2 md:w-1/2 flex-col md:pl-12 md:pr-24 md:h-full justify-around max-md:pt-12 md:py-12">
                                <InputField
                                    input="quantity"
                                    register={register}
                                    errors={errors}
                                    additionalText="* Important. Minimum quantity is 1. No
                                        decimal."
                                />

                                <InputField
                                    input="takeProfit"
                                    register={register}
                                    errors={errors}
                                    additionalText="* Optional field * Important info. If take profit price less
                                        then current price, order will not be
                                        placed."
                                />

                                <InputField
                                    input="stopLoss"
                                    register={register}
                                    errors={errors}
                                    additionalText="* Optional field * Important info. If stop loss price bigger
                                        then current price, order will not be
                                        placed."
                                />
                            </div>
                            <div className="max-md:hidden absolute left-1/2 transform w-[0.5px] translate-x-[0px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                            <div className="max-md:hidden absolute right-0 transform w-[0.5px] -translate-x-[48px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                            <div className="max-md:hidden absolute transform w-[0.5px] translate-x-[48px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                            <div className="max-md:hidden horizontal-line -translate-x-[0px] -translate-y-[180px]" />
                            <div className="max-md:hidden horizontal-line -translate-x-[0px] translate-y-[200px]" />
                        </div>
                        {error && (
                            <h1 className="text-center text-red-500">
                                {error}
                            </h1>
                        )}
                        <div className="flex justify-center py-16 flex-col items-center gap-6">
                            {process.env.NEXT_PUBLIC_IS_LOCAL === "false" ? (
                                <p className="text-center">
                                    You can open position only using local
                                    version of this website. Check GitHub repo
                                    for more details.
                                </p>
                            ) : (
                                <Button
                                    onClick={handleSubmit(handleOpenPosion)}
                                    text="Run Bot"
                                    glowing
                                />
                            )}
                            <h1
                                className="md:hidden text-zinc-400"
                                onClick={handleCloseModal}>
                                Go back
                            </h1>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    );
};

export default OpenPositionDialogWindow;
