import { useState, type ReactNode, useEffect, useRef } from "react";
import { motion } from "motion/react";
import "./Row.css";

type RowProps = {
    children: ReactNode;
    index: number;
    setIndex: (newIndex: number) => void;
};

export function Row({ children, index, setIndex }: RowProps) {
    const cellWidth = 128;
    const step = cellWidth;

    const items = Array.isArray(children) ? children : [children];

    if (index >= items.length) setIndex(0);
    if (index < 0) setIndex(items.length - 1);

    const targetX = -index * step;

    return (
        <motion.div
            animate={{ x: targetX }}
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
            className="row-container"
        >
            {children}
        </motion.div>
    );
}