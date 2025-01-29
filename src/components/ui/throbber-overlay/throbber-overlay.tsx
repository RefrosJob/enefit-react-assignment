import React, { ReactNode } from "react";
import throbber from "/throbber.svg";

interface Props
    extends Omit<
        React.DetailedHTMLProps<
            React.ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
        >,
        "src"
    > {
    isLoading: boolean;
    children: ReactNode;
}

export default function ThrobberOverlay({
    isLoading,
    className,
    children,
    ...props
}: Props) {
    return (
        <div className="relative">
            {isLoading && (
                <img
                    alt="Loading..."
                    className={`absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 ${className}`}
                    src={throbber}
                    {...props}
                />
            )}
            {children}
        </div>
    );
}
