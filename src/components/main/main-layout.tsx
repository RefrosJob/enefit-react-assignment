import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import { useStore } from "../../store/authStore.ts";
import { getMeteringPointsWithConsumptionData } from "../../services/enefitApi.ts";
import { Consumption, MeteringPoint } from "../../types/consumption.ts";
import ThrobberOverlay from "../ui/throbber-overlay/throbber-overlay.tsx";
import { MeteringPointList } from "./metering-point-list/metering-point-list.tsx";
import { groupBy } from "lodash";
import { Bar } from "react-chartjs-2";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    type ChartData,
    type ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from "chart.js";
import { useDispatch } from "react-redux";
import { clearAuthorizationPackage } from "../../store/reducers/auth.ts";
import useWindowDimensions from "../../hooks/windowDimensions.ts";
import { getAuthPackageWithLocalStorage } from "../../store/selector-functions/auth.ts";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
);

export default function MainLayout() {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const chartRef = useRef<any>(null);
    const { width } = useWindowDimensions();

    const authorizationPackage = useStore(getAuthPackageWithLocalStorage);

    const { username, authKey } = authorizationPackage;

    const [meteringPoints, setMeteringPoints] = useState<MeteringPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const datasets = meteringPoints.map(generateDatasetFromMeteringPoint);

    const allConsumptions = meteringPoints.reduce((acc, point) => {
        return [...acc, ...point.consumptions];
    }, [] as Consumption[]);

    const labels: string[] = Object.keys(
        groupBy(allConsumptions, "consumptionTime"),
    ).map((date) =>
        new Date(date).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
        }),
    );

    useEffect(() => {
        if (chartRef?.current) {
            chartRef.current.redraw && chartRef.current.redraw();
        }
    }, [chartRef, width]);

    const data: ChartData<"bar", number[]> = {
        labels: labels,
        datasets,
    };

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

    useEffect(init, [navigateTo, authorizationPackage]);

    function init() {
        if (!authKey || !username) {
            navigateTo("/login");
            return;
        }
        requestConsumptionData().finally();
    }

    function logOut() {
        dispatch(clearAuthorizationPackage());
    }

    function generateDatasetFromMeteringPoint(point: MeteringPoint) {
        const randint = () => Math.floor(Math.random() * Math.floor(255));
        return {
            label: point.address,
            data: point.consumptions.map(({ amount }) => amount),
            backgroundColor: `rgba(255, ${randint()}, ${randint()} , 0.8)`,
        };
    }

    async function requestConsumptionData() {
        setIsLoading(true);
        if (!authKey || !username) {
            return init();
        }
        try {
            const { data: meteringPoints } =
                await getMeteringPointsWithConsumptionData(username, authKey);
            if (!meteringPoints.length) {
                console.error("No metering points");
                setIsLoading(false);
                return;
            }
            setMeteringPoints(meteringPoints);
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }

    if (!authKey || !username) {
        return null;
    }

    return (
        <div className="h-full max-xl:p-2 xl:p-8">
            <ThrobberOverlay isLoading={isLoading}>
                <div
                    id="main-card"
                    className={`flex h-max flex-col gap-5 rounded-md bg-slate-300 max-xl:pb-2 max-xl:pl-2 max-xl:pr-2 max-xl:pt-2 xl:pb-5 xl:pl-16 xl:pr-16 xl:pt-8 ${isLoading ? "animate-blur-in blur-md" : "animate-blur-out blur-0"}`}
                >
                    <div id="general-info" className="h-full">
                        <div id="header" className="max-xl:h-12 xl:h-24">
                            <div className="flex h-full flex-row items-center justify-between">
                                <button
                                    onClick={logOut}
                                    className="flex items-center justify-center rounded-xl bg-red-600 p-2 font-bold text-white shadow-md hover:bg-red-500 active:bg-red-700 max-xl:h-8 xl:h-12"
                                >
                                    LOGOUT
                                </button>
                                <label className="max-xl:text-md flex items-center justify-center rounded-md bg-slate-600 p-2 text-center font-bold uppercase text-white max-xl:h-8 xl:h-12 xl:text-xl">
                                    {username}
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <label className="text-2xl font-semibold">
                                All consumption data:{" "}
                            </label>
                            <div className="h-full w-full rounded-xl bg-green-700 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.2)] max-xl:p-2 xl:p-5">
                                <div className="flex h-96 flex-col gap-5 rounded-xl bg-slate-300 shadow-xl max-xl:p-2 xl:p-10">
                                    <div
                                        id="bar-chart-wrapper"
                                        className="flex h-full w-full items-center justify-center"
                                    >
                                        <Bar
                                            ref={chartRef}
                                            data={data}
                                            options={options}
                                            height={
                                                Number(width) >= 1280
                                                    ? 100
                                                    : 150
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex h-full flex-col gap-5">
                        <label className="pb-2 pl-1 text-2xl font-semibold">
                            Consumption data by metering point:
                        </label>
                        <MeteringPointList meteringPoints={meteringPoints} />
                    </div>
                </div>
            </ThrobberOverlay>
        </div>
    );
}
