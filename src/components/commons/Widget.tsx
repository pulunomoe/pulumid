import React, { ReactNode, useCallback, useEffect, useRef } from "react";
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

  const isDragging = useRef(false);
  const position = useRef({ x: widget.x, y: widget.y });
  const dragOffset = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>();
  const widgetDiv = useRef<HTMLDivElement>(null);

  const startDragging = (event: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true;
    dragOffset.current = {
      x: event.clientX - position.current.x,
      y: event.clientY - position.current.y,
    };

    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", stopDragging);
  };

  const handleDragging = (e: MouseEvent) => {
    if (!isDragging.current) return;

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }

    animationFrame.current = requestAnimationFrame(() => {
      const newX = e.clientX - dragOffset.current.x;
      const newY = e.clientY - dragOffset.current.y;

      position.current = { x: newX, y: newY };

      if (widgetDiv.current) {
        widgetDiv.current.style.transform = `translate3d(${newX}px, ${newY}px, 0)`;
      }
    });
  };

  const stopDragging = useCallback(() => {
    if (!isDragging.current) return;

    isDragging.current = false;
    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", stopDragging);

    dispatch(moveWidget({ name, ...position.current }));

    if (widgetDiv.current) {
      widgetDiv.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0)`;
    }
  }, [dispatch, name]);

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleDragging);
      document.removeEventListener("mouseup", stopDragging);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [stopDragging]);

  const minimize = () => {
    dispatch(minimizeWidget(name));
  };

  return (
    <div
      ref={widgetDiv}
      className={`absolute transform-gpu border border-black bg-white`}
      style={{
        transform: `translate3d(${widget.x}px, ${widget.y}px, 0)`,
        zIndex: isDragging.current ? 999 : 10,
        userSelect: "none",
      }}
    >
      <div
        onMouseDown={startDragging}
        className="flex flex-row items-center justify-between gap-2 bg-black px-2 py-1"
        style={{
          cursor: isDragging.current ? "grabbing" : "grab",
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
