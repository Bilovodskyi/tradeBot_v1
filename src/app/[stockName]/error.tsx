"use client";

import { useEffect } from "react";

export default function Error({
    error,
}: {
    error: Error & { digest?: string };
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="w-full h-screen flex flex-col gap-10 items-center justify-center">
            <h2 className="text-2xl w-[360px] md:w-[600px] lg:w-[900px] text-center">
                I&apos;m using the Polygon API free tier, which allows only one
                request per minute. Sorry for the inconvenience! Please try
                refreshing the page in a few seconds using the button below.
            </h2>
        </div>
    );
}
