import { MouseEvent, ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store.ts";
import {
  minimizeWidget,
  moveWidget,
  selectWidgets,
} from "../../stores/widgetsSlice.ts";

interface Props {
  name: string;
  title: string;
  children: ReactNode;
}

const Widget = ({ name, title, children }: Props) => {
  const widget = useAppSelector(selectWidgets)[name];
  const dispatch = useAppDispatch();

  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const startDragging = (event: MouseEvent) => {
    setIsDragging(true);
    setDragOffset({
      x: event.clientX - widget.x,
      y: event.clientY - widget.y,
    });
  };

  const dragging = (event: MouseEvent) => {
    if (!isDragging) {
      return;
    }
    const newX = event.clientX - dragOffset.x;
    const newY = event.clientY - dragOffset.y;
    dispatch(moveWidget({ name, x: newX, y: newY }));
  };

  const stopDragging = () => {
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  const minimize = () => {
    dispatch(minimizeWidget(name));
  };

  if (!widget) {
    return null;
  }

  return (
    <div
      className={`absolute border border-black bg-white`}
      style={{
        top: `${widget.y}px`,
        left: `${widget.x}px`,
        zIndex: isDragging ? 999 : 10,
        userSelect: isDragging ? "none" : "auto",
      }}
    >
      <div
        onMouseDown={startDragging}
        onMouseMove={dragging}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className="flex flex-row items-center justify-between gap-2 bg-black px-2 py-1"
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <h1 className="font-bold text-white">{title}</h1>
        <button className="text-white" onClick={minimize}>
          [-]
        </button>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
};

export default Widget;
