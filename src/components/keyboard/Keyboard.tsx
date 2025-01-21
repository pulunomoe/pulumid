import { useState } from "react";
import { WIDGETS } from "../../stores/widgetsSlice.ts";
import Button from "../commons/Button.tsx";
import Widget from "../commons/Widget.tsx";
import Octave from "./Octave.tsx";

const Keyboard = () => {
  const [octave, setOctave] = useState(4);

  const decreaseOctave = () => {
    setOctave((prevOctave) => Math.max(prevOctave - 1, 3));
  };

  const increaseOctave = () => {
    setOctave((prevOctave) => Math.min(prevOctave + 1, 5));
  };

  return (
    <Widget name={WIDGETS.KEYBOARD} title="Keyboard">
      <div className="flex flex-row gap-2">
        <Octave octave={octave - 1} border={false} />
        <Octave octave={octave} border={true} />
        <Octave octave={octave + 1} border={false} />
      </div>
      <div className="mt-2 flex flex-row items-center justify-center gap-2">
        <Button onClick={decreaseOctave}>-</Button>
        <span className="px-2">{octave}</span>
        <Button onClick={increaseOctave}>+</Button>
      </div>
    </Widget>
  );
};

export default Keyboard;
