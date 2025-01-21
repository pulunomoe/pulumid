import { useRef, useState } from "react";
import { Player } from "tone";
import { WIDGETS } from "../../stores/widgetsSlice.ts";
import Button from "../commons/Button.tsx";
import Field from "../commons/Field.tsx";
import Widget from "../commons/Widget.tsx";
import clickWav from "../../assets/click.wav";

const tone = new Player(clickWav).toDestination();

const Circle = ({ color }: { color: string }) => {
  return (
    <svg width="20" height="20">
      <circle
        cx="10"
        cy="10"
        r="8"
        fill={color}
        stroke="black"
        strokeWidth="1"
      />
    </svg>
  );
};

const Metronome = () => {
  const [bpm, setBPM] = useState(120);
  const [started, setStarted] = useState(false);
  const [circleColor, setCircleColor] = useState("white");
  const intervalRef = useRef<number | null>();

  const toggleMetronome = () => {
    setStarted((prevState) => !prevState);
    if (!started) {
      intervalRef.current = setInterval(() => {
        tone.start();
        setCircleColor((prevColor) =>
          prevColor === "white" ? "black" : "white",
        );
      }, 60000 / bpm);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  return (
    <Widget name={WIDGETS.METRONOME} title={"Metronome"}>
      <div className="flex flex-row items-center justify-center gap-2">
        <Field id="bpm" label="BPM">
          <input
            type="number"
            id="bpm"
            min={0}
            max={999}
            step={1}
            value={bpm}
            onChange={(e) => setBPM(Number(e.target.value))}
            className="ms-2 border border-black p-1"
          />
        </Field>
        <Button onClick={toggleMetronome}>{started ? "Stop" : "Start"}</Button>
        <div className="flex flex-row gap-1">
          <Circle color={circleColor} />
          <Circle color={circleColor === "black" ? "white" : "black"} />
        </div>
      </div>
    </Widget>
  );
};

export default Metronome;
