import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { currency } from "@/lib/mappers/currency";
import type { IResponse } from "@/types/response.type";
import React from "react";

interface IChangeOverview {
    data: IResponse | undefined;
}

export const ChangeOverview = ({ data }: IChangeOverview) => {
    if (!data || !Object.keys(data.denominationBreakdown).length) return null;
    return (
        <Card className="w-96 relative z-10">
            <CardHeader>
                <CardTitle>Total change</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.denominationBreakdown
                            .sort((a, b) => b.value - a.value)
                            .map((denomination) => (
                                <TableRow key={denomination.type}>
                                    <TableCell className="font-medium">
                                        {denomination.type}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {denomination.amount}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {currency[data.currency]}{" "}
                                        {denomination.value.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell className="text-right">
                                {currency[data.currency]}{" "}
                                {data.totalChange.toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </CardContent>
        </Card>
    );
};
