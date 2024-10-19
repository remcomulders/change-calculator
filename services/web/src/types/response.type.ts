import { type IDenomination } from "./denomination.type";

export interface IResponse {
    totalChange: number;
    currency: "EUR" | "USD" | "GBP";
    denominationBreakdown: IDenomination[];
}
