import { useEffect, useState, type ReactNode, isValidElement, cloneElement, useMemo, Children } from "react";
import "./Column.css";
import { motion } from "motion/react";

type ColumnProps = {
  children: ReactNode;
  selected?: boolean;
  icon?: string;
};

export function Column({ icon, children, selected = false }: ColumnProps) {
  const jumpHeight = 128;
  const items = useMemo(() => Children.toArray(children).filter(Boolean), [children]);

  const [positions, setPositions] = useState<number[]>([]);
  const [currentRow, setCurrentRow] = useState(0);


  useEffect(() => {
    if (selected) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowUp") setCurrentRow(prev => prev - 1);
        if (e.key === "ArrowDown") setCurrentRow(prev => prev + 1);
      };

      if (items.length === 0) {
        if (currentRow !== 0) setCurrentRow(0);
      } else if (currentRow >= items.length) {

        setCurrentRow(0);
      } else if (currentRow < 0) {
        setCurrentRow(items.length - 1);
      }

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [currentRow, selected]);

  useEffect(() => {
    const newPositions = items.map((_, i) => {
      let pos = i - currentRow;

      if (pos >= 0) {
        return pos;
      } else {
        return pos - 1;
      }
    });

    setPositions(newPositions);

  }, [currentRow, items, setPositions]);



  return (
    <div>
      <img
        src={icon}
        alt=""
        style={{ width: "128px", filter: "invert()" }}
      />
      <div className="column" style={{ position: "relative", opacity: selected ? 1 : 0.2 }}>
        {items.map((child, i) => {
          const childWithProps = isValidElement(child)
            ? cloneElement(child, { selected: i === currentRow, active: selected })
            : child;

          return (
            <motion.div
              key={i}
              style={{ position: "absolute", top: 0, left: 0 }}
              animate={{ y: positions[i] * jumpHeight }}
              transition={{ type: "spring", duration: 0.4, ease: "easeOut" }}
            >
              {childWithProps}
            </motion.div>
          );
        })}
      </div>
    </div >
  );
}
