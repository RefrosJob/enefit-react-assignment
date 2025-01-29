export interface Consumption {
    id: string;
    amount: number;
    amountUnit: string;
    consumptionTime: string;
    costEur: number;
    costEurVat: number;
}

export interface MeteringPoint {
    id: string;
    address: string;
    consumptions: Consumption[];
}
