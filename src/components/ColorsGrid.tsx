const ColorGrid = ({
    colors,
    dates,
}: {
    colors: string[][];
    dates: number[];
}) => {
    const formatDate = (date: number) => {
        const formatedDate = new Date(date);
        return formatedDate.toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            timeZone: "UTC",
        });
    };

    return (
        <div className="flex relative justify-center">
            {colors.map((row, rowIndex) => (
                <div key={rowIndex} className="group flex flex-col">
                    {row.map((color, colIndex) => (
                        <div
                            key={colIndex}
                            className="relative group-hover:after:absolute group-hover:after:inset-0 group-hover:after:content-[''] group-hover:after:bg-black/20 w-[18px] h-[24px] flex justify-center border-[0.25px] border-x-black border-y-white/20"
                            style={{ backgroundColor: color }}></div>
                    ))}
                    <div className="hidden group-hover:block absolute bottom-[-20px] z-999 translate-x-[-25%]">
                        {formatDate(dates[rowIndex])}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ColorGrid;
