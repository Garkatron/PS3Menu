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


    const onWheel = (e) => {

        if (!e.target.classList.contains("column-container")) return;


        if (e.deltaY < 0) {
            setIndex(prev => Math.max(0, prev - 1));
        } else if (e.deltaY > 0) {
            setIndex(prev => Math.min(6, prev + 1));
        }

    }

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
            onWheel={onWheel}
            animate={isMobile ? "mobile" : "desktop"}
            variants={variants}
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}
