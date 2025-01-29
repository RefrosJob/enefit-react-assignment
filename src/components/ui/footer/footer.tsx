import { ReactNode } from "react";
import ThrobberOverlay from "../throbber-overlay/throbber-overlay";

export const defaultheightClass =
    "lg:h-min-48 lg:h-48  max-md:h-min-64 max-md:h-64 h-min-48 h-48";

interface Props {
    heightClass?: string;
    className?: string;
    isLoading?: boolean;
    disabled?: boolean;
    children?: ReactNode;
}

export default function Footer({
    className,
    disabled,
    heightClass = defaultheightClass,
    isLoading = false,
    children,
}: Props) {
    return (
        <div
            className={`${heightClass} absolute bottom-0 z-20 w-full min-w-full rounded-tl-xl rounded-tr-xl bg-slate-100 shadow-md`}
        >
            <ThrobberOverlay isLoading={isLoading}>
                <div
                    className={`${
                        disabled || isLoading
                            ? "animate-blur-in blur-sm"
                            : "animate-blur-out blur-0"
                    } ${heightClass} ${className}`}
                >
                    {children}
                </div>
            </ThrobberOverlay>
        </div>
    );
}
