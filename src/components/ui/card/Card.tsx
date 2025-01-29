import React from "react";

interface Props {
    className?: string;
    title?: string;
    isExpanded?: boolean;
    onExpand?: (isExpanded: boolean) => void;
    children?: React.ReactNode;
}

export function Card({
    className,
    title,
    isExpanded = false,
    onExpand,
    children,
}: Props) {
    return (
        <div
            id="card"
            className={`flex flex-col rounded-lg shadow-md max-xl:pl-1 max-xl:pr-1 xl:pl-5 xl:pr-5 ${className} `}
        >
            <div
                id="card-header"
                className={`flex w-full cursor-pointer flex-row items-center justify-between p-6`}
                onClick={() => onExpand && onExpand(!isExpanded)}
            >
                <h2 className="text-center text-2xl font-bold uppercase">
                    {title}
                </h2>

                <p
                    className={` ${isExpanded ? "" : "rotate-90"} transition-all duration-300`}
                >
                    {"\u2B9F"}
                </p>
            </div>

            <div
                id="card-body"
                className={`h-0 overflow-y-clip ${isExpanded ? "h-max overflow-y-auto border-t border-slate-400 pb-5 pt-5" : "h-0 overflow-y-clip"}`}
            >
                {children}
            </div>
        </div>
    );
}
