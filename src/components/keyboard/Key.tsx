import { PolySynth } from "tone";
import { ReactNode, useRef } from "react";

interface Props {
  type: "black" | "white";
  note: string;
  children: ReactNode;
}

const synth = new PolySynth().toDestination();

const Key = ({ type, note, children }: Props) => {
  const isPlaying = useRef(false);

  const playNote = () => {
    if (isPlaying.current) {
      return;
    }

    isPlaying.current = true;
    synth.triggerAttack(note);
  };

  const stopNote = () => {
    isPlaying.current = false;
    synth.triggerRelease(note);
  };

  const className =
    type === "black"
      ? "border border-black bg-black px-2 pb-2 pt-4 text-white hover:bg-white hover:text-black"
      : "border border-black px-3 pb-2 pt-4 hover:bg-black hover:text-white";

  return (
    <button
      onMouseDown={playNote}
      onMouseUp={stopNote}
      onMouseLeave={stopNote}
      className={className}
    >
      <br />
      {children}
    </button>
  );
};

export default Key;
