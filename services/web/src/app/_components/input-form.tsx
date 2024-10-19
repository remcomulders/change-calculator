"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTransaction } from "@/hooks/use-transaction";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import type { IResponse } from "@/types/response.type";
import { useCallback, type ReactNode } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { isApiError } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface ITransactionForm {
    children: (data: IResponse | undefined) => ReactNode;
}

const formSchema = z.object({
    transactionAmount: z.number().min(0.01, {
        message: "Transaction amount can not be less than 0,01",
    }),
    totalGiven: z.number().min(0.01, {
        message: "Given amount can not be less than 0,01",
    }),
    currency: z.enum(["EUR", "USD", "GBP"]),
});

export const TransactionForm = ({ children }: ITransactionForm) => {
    const { isPending, data, mutate, reset } = useTransaction();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            transactionAmount: 0,
            totalGiven: 0,
            currency: "EUR",
        },
    });

    const resetForm = useCallback(() => {
        form.reset();
        form.clearErrors();
        reset();
    }, [form, reset]);

    const onSubmit = useCallback(
        (values: z.infer<typeof formSchema>) => {
            if (isPending) return;
            mutate(values, {
                onError: (error) => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: error.message,
                        action: (
                            <ToastAction
                                onClick={resetForm}
                                altText="Try again"
                            >
                                Try again
                            </ToastAction>
                        ),
                    });
                },
            });
        },
        [isPending, mutate, resetForm]
    );

    return (
        <>
            <Card className="w-96 relative z-20">
                <CardHeader>
                    <CardTitle>Change calculator</CardTitle>
                    <CardDescription>
                        Fill in the currency, total amount, and the cash amount
                        given.
                    </CardDescription>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="currency"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Currency</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                disabled={
                                                    isPending ?? field.disabled
                                                }
                                                value={field.value}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Theme" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="EUR">
                                                        Euro
                                                    </SelectItem>
                                                    <SelectItem value="USD">
                                                        Dollar
                                                    </SelectItem>
                                                    <SelectItem value="GBP">
                                                        British Pound
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="transactionAmount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Transaction Amount
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="How much is the total transaction?"
                                                type="number"
                                                {...field}
                                                disabled={
                                                    isPending ?? field.disabled
                                                }
                                                onChange={(event) =>
                                                    field.onChange(
                                                        +event.target.value
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="totalGiven"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Total Given Amount
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="What bills did the customer give?"
                                                type="number"
                                                {...field}
                                                disabled={
                                                    isPending ?? field.disabled
                                                }
                                                onChange={(event) =>
                                                    field.onChange(
                                                        +event.target.value
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button
                                variant="outline"
                                type="button"
                                onClick={resetForm}
                            >
                                Reset
                            </Button>
                            <Button type="submit" disabled={isPending}>
                                Calculate
                                {isPending ? (
                                    <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <ChevronRightIcon className="ml-2 h-4 w-4" />
                                )}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
            {data && !isApiError(data) && children(data)}
        </>
    );
};
