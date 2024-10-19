"use client";

import React from "react";
import { TransactionForm } from "./input-form";
import { ChangeOverview } from "./change-overview";
import { motion, AnimatePresence } from "framer-motion";

export const TransactionOverview = () => {
    return (
        <TransactionForm>
            {(data) => (
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            transition: {
                                duration: 0.5,
                                delay: 0.3,
                            },
                        }}
                        exit={{ opacity: 0, x: -100 }}
                    >
                        <ChangeOverview data={data} />
                    </motion.div>
                </AnimatePresence>
            )}
        </TransactionForm>
    );
};
