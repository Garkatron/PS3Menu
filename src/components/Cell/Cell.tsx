import { Children, type ReactNode } from "react";
import "./Cell.css";
import { motion } from "motion/react";

type CellProps = {
    icon: string;
    selected?: boolean;
    active?: boolean;
    children?: ReactNode;
};

export function Cell({ icon, children, selected = false, active = false }: CellProps) {
    return (
        <motion.div
            className="cell"
            animate={{ opacity: selected ? 1 : 0.2, scale: selected && active ? 1.3 : 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <img src={icon} alt="" style={{ filter: "invert()" }} />
            {children}
        </motion.div>
    );
}
