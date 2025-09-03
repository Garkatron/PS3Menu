import { useEffect, useState, type ReactNode, isValidElement, cloneElement } from "react";
import "./Column.css";
import { motion } from "motion/react";
import icon from "../../assets/svg/buildings-home-house-svgrepo-com.svg";

type ColumnProps = {
  children: ReactNode;
  index: number;
  selected?: boolean;
  setIndex: (newIndex: number) => void;
};

export function Column({ children, index, selected = false }: ColumnProps) {
  const jumpHeight = 128;
  const items = Array.isArray(children) ? children : [children];
  const [positions, setPositions] = useState<number[]>([]);

  useEffect(() => {
    const newPositions = items.map((_, i) => {
      let pos = i - index;

      if (pos >= 0) {
        return pos;
      } else {
        return pos - 1;
      }
    });

    setPositions(newPositions);
  }, [index, items.length]);

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
