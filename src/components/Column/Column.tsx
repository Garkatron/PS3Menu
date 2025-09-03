import { useEffect, useState, type ReactNode, isValidElement, cloneElement, useMemo, Children } from "react";
import "./Column.css";
import { motion } from "motion/react";

type ColumnProps = {
  children: ReactNode;
  index: number;
  selected?: boolean;
  icon?: string;
  setIndex: (newIndex: number[]) => void;
};

export function Column({ icon, children, index, selected = false, setIndex }: ColumnProps) {
  const jumpHeight = 128;
  const items = useMemo(() => Children.toArray(children).filter(Boolean), [children]);
  const [positions, setPositions] = useState<number[]>([]);



  useEffect(() => {

    if (selected) {

      if (items.length === 0) {
        if (index !== 0) setIndex(Array(6).fill(0));
      } else if (index >= items.length) {

        setIndex(Array(6).fill(0));
      } else if (index < 0) {
        setIndex(Array(6).fill(items.length - 1));
      }
    }

    const newPositions = items.map((_, i) => {
      let pos = i - index;

      if (pos >= 0) {
        return pos;
      } else {
        return pos - 1;
      }
    });

    setPositions(newPositions);

  }, [index, items, selected, setIndex]);



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
            ? cloneElement(child, { selected: i === index, active: selected })
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
