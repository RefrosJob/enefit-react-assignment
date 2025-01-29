import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    header: string;
    className?: string;
    size?: "small" | "medium" | "large";
    disabled?: boolean;
    isVisible?: boolean;
    confrim?: {
        text: string;
        action: () => void;
    };
    cancel?: {
        text: string;
        action: () => void;
    };
};

export default function Modal({
    children,
    header,
    className,
    isVisible,
    disabled = false,
    size = "medium",
    confrim,
    cancel,
}: Props) {
    const sizes = {
        small: "w-80 h-80",
        medium: "w-96 h-96",
        large: " w-1/2 h-1/2",
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
            <div
                className={`z-50 flex animate-modal-in flex-col justify-evenly ${sizes[size]} absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border-2 border-slate-300 bg-slate-200 shadow-md`}
            >
                <div className="mb-1 flex h-10 flex-col justify-center border-b-2 border-slate-300 pb-3 pl-3 pr-3 pt-3 align-middle font-bold shadow-sm">
                    <h3>{header}</h3>
                </div>
                <div className={`h-full ${className}`}>{children}</div>
                <div className="mb-3 ml-3 mr-3 flex h-10 justify-between">
                    {cancel && (
                        <button
                            className="h-full w-1/3 rounded-md bg-red-500 p-2 text-sm font-semibold uppercase text-white shadow-sm hover:bg-red-400 disabled:cursor-not-allowed disabled:bg-red-300 disabled:hover:bg-red-300"
                            disabled={disabled}
                            onClick={cancel.action}
                        >
                            {cancel.text}
                        </button>
                    )}
                    <div className="w-1" />
                    {confrim && (
                        <button
                            onClick={confrim.action}
                            disabled={disabled}
                            className="h-full w-1/3 rounded-lg bg-green-500 p-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-green-300 disabled:hover:bg-green-300"
                        >
                            {confrim.text}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
