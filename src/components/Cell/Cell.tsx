import { type ReactNode, useRef, useEffect } from "react";
import "./Cell.css";
import { motion } from "motion/react";

type CellProps = {
    icon: string;
    selected?: boolean;
    active?: boolean;
    children?: ReactNode;
    onClick?: () => void;
};

export function Cell({
    icon,
    children,
    selected = false,
    active = false,
    onClick,
}: CellProps) {
    const cellRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selected) {
            cellRef.current?.focus();
        }
    }, [selected]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (selected && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClick?.();
        }
    };

    return (
        <motion.div
            ref={cellRef}
            className="cell"
            role="button"
            tabIndex={0}
            animate={{
                opacity: selected ? 1 : 0.2,
                scale: selected && active ? 1.3 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={onClick}
            onKeyDown={handleKeyDown}
        >
            <img src={icon} alt="" style={{ filter: "invert()" }} />
            {
                children && active && selected && (
                    <div className="content">
                        {children}

                    </div>
                )
            }

        </motion.div>
    );
}
