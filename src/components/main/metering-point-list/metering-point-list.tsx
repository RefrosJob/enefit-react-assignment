import { Card } from "../../ui/card/Card.tsx";
import { MeteringPoint } from "../../../types/consumption.ts";
import { useEffect, useRef, useState } from "react";
import { orderBy } from "lodash";
import type { ChartOptions } from "chart.js";
import { Bar } from "react-chartjs-2";
import useWindowDimensions from "../../../hooks/windowDimensions.ts";

interface Props {
    meteringPoints: MeteringPoint[];
}

export function MeteringPointList({ meteringPoints }: Props) {
    const [meteringPointCardKeyToState, setMeteringPointCardKeyToState] =
        useState<Record<number, boolean>>({});
    const chartRef = useRef<any>(null);
    const { width } = useWindowDimensions();

    function generateDatasetFromMeteringPoint(point: MeteringPoint) {
        const randInt = () => Math.floor(Math.random() * Math.floor(255));
        return {
            label: point.address,
            data: point.consumptions.map(({ amount }) => amount),
            backgroundColor: `rgba(255, ${randInt()}, ${randInt()} , 0.8)`,
        };
    }

    const options: ChartOptions<"bar"> = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
        scales: {
            y: {
                display: true,
                title: {
                    display: true,
                    text: "KW/H",
                    font: {
                        size: 20,
                        style: "normal",
                        lineHeight: 1.2,
                    },
                    padding: { top: 30, bottom: 0 },
                },
            },
        },
    };

    useEffect(() => {
        if (chartRef?.current) {
            chartRef.current.redraw && chartRef.current.redraw();
        }
    }, [chartRef, width]);

    return (
        <div
            id="metering-point-list"
            className="flex h-max flex-col gap-5 rounded-xl bg-green-700 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3)] drop-shadow-2xl max-xl:p-2 xl:p-10"
        >
            {meteringPoints.map((point, key) => (
                <Card
                    key={`metering-point-card-${key}`}
                    className={`bg-slate-300`}
                    title={point.address}
                    isExpanded={meteringPointCardKeyToState[key]}
                    onExpand={(isExpanded) =>
                        setMeteringPointCardKeyToState((record) => ({
                            ...record,
                            [key]: isExpanded,
                        }))
                    }
                >
                    <div className="flex h-full flex-col">
                        <div className="flex h-full flex-col justify-center max-xl:p-2">
                            <div>
                                <Bar
                                    height={Number(width) >= 1280 ? 100 : 150}
                                    data={{
                                        labels: Object.keys(
                                            orderBy(
                                                point.consumptions,
                                                "consumptionTime",
                                            ),
                                        ).map((date) =>
                                            new Date(date).toLocaleDateString(
                                                "en-GB",
                                            ),
                                        ),
                                        datasets: [
                                            generateDatasetFromMeteringPoint(
                                                point,
                                            ),
                                        ],
                                    }}
                                    options={options}
                                />
                            </div>
                        </div>
                        <div className="flex h-full md:pl-0 md:pr-0 xl:pl-16 xl:pr-16">
                            <table className="h-1/2 w-full table-fixed border-separate overflow-auto rounded-md border border-slate-400 bg-slate-200 shadow-md">
                                <tbody>
                                    <tr className="h-1/4">
                                        <th className="border-l border-slate-400 first:border-l-0">
                                            <label className="text-center font-bold uppercase max-xl:text-sm xl:text-xl">
                                                ID
                                            </label>
                                        </th>
                                        <th className="border-l border-slate-400 first:border-l-0">
                                            <label className="text-center font-bold uppercase max-xl:text-sm xl:text-xl">
                                                Date
                                            </label>
                                        </th>
                                        <th className="border-l border-slate-400 first:border-l-0">
                                            <label className="text-center font-bold uppercase max-xl:text-sm xl:text-xl">
                                                Amount
                                            </label>
                                        </th>
                                        <th className="border-l border-slate-400 first:border-l-0">
                                            <label className="text-center font-bold uppercase max-xl:text-sm xl:text-xl">
                                                Cost
                                            </label>
                                        </th>
                                        <th className="border-l border-slate-400 first:border-l-0">
                                            <label className="text-center font-bold uppercase max-xl:text-sm xl:text-xl">
                                                VAT Cost
                                            </label>
                                        </th>
                                    </tr>

                                    {point.consumptions.map(
                                        (consumption, key) => (
                                            <tr key={`$consumption-row-${key}`}>
                                                <td className="overflow-ellipsis border-l border-t border-slate-400 first:border-l-0">
                                                    <p className="overflow-ellipsis text-center font-semibold max-xl:text-sm xl:text-lg">
                                                        {consumption.id}
                                                    </p>
                                                </td>
                                                <td className="border-l border-t border-slate-400 first:border-l-0">
                                                    <p className="text-center font-semibold max-xl:text-sm xl:text-lg">
                                                        {new Date(
                                                            consumption.consumptionTime,
                                                        ).toLocaleDateString(
                                                            "de-DE",
                                                        )}
                                                    </p>
                                                </td>
                                                <td className="border-l border-t border-slate-400 first:border-l-0">
                                                    <p className="text-center font-semibold max-xl:text-sm xl:text-lg">{`${consumption.amount} ${consumption.amountUnit}`}</p>
                                                </td>
                                                <td className="border-l border-t border-slate-400 first:border-l-0">
                                                    <p className="text-center font-semibold max-xl:text-sm xl:text-lg">
                                                        {consumption.costEur}
                                                    </p>
                                                </td>
                                                <td className="border-l border-t border-slate-400 first:border-l-0">
                                                    <p className="text-center font-semibold max-xl:text-sm xl:text-lg">
                                                        {consumption.costEurVat}
                                                    </p>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
