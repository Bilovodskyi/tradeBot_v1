import React from "react";

const Button = ({
    text,
    disabled = false,
    glowing = false,
    ...props
}: ButtonProps) => {
    return (
        <button
            className={`cursor-default rounded-full px-4 py-2 bg-[#24282E] z-20 border border-zinc-700 ${
                glowing ? "glowing-border-button" : ""
            } ${
                !disabled
                    ? "before:hover:bg-[#2E333B] cursor-pointer hover:bg-[#2E333B] duration-150"
                    : ""
            }`}
            {...props}>
            <p className="metalic-text">{text}</p>
        </button>
    );
};

export default Button;
