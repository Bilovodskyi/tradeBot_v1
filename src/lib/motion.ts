export const fadeIn = ({
    delay,
    duration = 1.5,
}: {
    delay: number;
    duration?: number;
}) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay, duration, ease: "easeIn" } },
});

export const fadeInYChange = ({
    y,
    delay = 0.5,
}: {
    y: number;
    delay?: number;
}) => ({
    hidden: {
        opacity: 0,
        y,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.25,
            delay,
            ease: "easeInOut",
        },
    },
});

export const moveFromBottom = () => ({
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            opacity: { duration: 0.5, delay: 1.5, ease: "easeIn" },
            y: { duration: 1, delay: 1.6, ease: "easeOut" },
        },
    },
});

export const moveXAxisLeft = () => ({
    hidden: {
        opacity: 0,
        x: -280,
    },
    visible: {
        opacity: 1,
        x: -420,
        transition: {
            opacity: { duration: 0.5, delay: 2.3, ease: "easeIn" },
            x: { duration: 1.25, delay: 2.4, ease: "easeOut" },
        },
    },
});

export const moveXAxisRight = () => ({
    hidden: {
        opacity: 0,
        x: -40,
    },
    visible: {
        opacity: 1,
        x: 100,
        transition: {
            opacity: { duration: 0.5, delay: 2.3, ease: "easeIn" },
            x: { duration: 1.25, delay: 2.4, ease: "easeOut" },
        },
    },
});
