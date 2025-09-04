import { type ReactNode } from "react";
import { motion } from "motion/react";
import "./Row.css";
import { useIsMobile } from "../../utils";

type RowProps = {
    children: ReactNode;
    index: number;
    setIndex: (newIndex: number) => void;
};

export function Row({ children, index, setIndex }: RowProps) {
    const cellSize = 128;
    const isMobile = useIsMobile();

    const items = Array.isArray(children) ? children : [children];

    if (index >= items.length) setIndex(0);
    if (index < 0) setIndex(items.length - 1);

    const variants = {
        mobile: {
            y: -index * cellSize,
        },
        desktop: {
            x: -index * cellSize,
        },
    };

    return (
        <motion.div
            className="row"
            animate={isMobile ? "mobile" : "desktop"}
            variants={variants}
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
