import Key from "./Key.tsx";

const KEYS = {
  black: [
    [
      { note: "c#", label: "C#" },
      { note: "d#", label: "D#" },
    ],
    [
      { note: "f#", label: "F#" },
      { note: "g#", label: "G#" },
      { note: "a#", label: "A#" },
    ],
  ],
  white: [
    { note: "c", label: "C" },
    { note: "d", label: "D" },
    { note: "e", label: "E" },
    { note: "f", label: "F" },
    { note: "g", label: "G" },
    { note: "a", label: "A" },
    { note: "b", label: "B" },
  ],
};

interface Props {
  octave: number;
  border: boolean;
}

const Octave = ({ octave, border }: Props) => {
  return (
    <div
      className={`flex flex-col ${border ? "border-x border-black px-2" : ""}`}
    >
      <div className="mb-2 flex flex-row justify-evenly">
        <div className="ms-2 flex w-[42.85%] flex-row justify-center gap-2">
          {KEYS.black[0].map((note) => (
            <Key key={note.note} type="black" note={`${note.note}${octave}`}>
              {note.label}
            </Key>
          ))}
        </div>
        <div className="ms-2 flex w-[57.15%] flex-row justify-center gap-2">
          {KEYS.black[1].map((note) => (
            <Key key={note.note} type="black" note={`${note.note}${octave}`}>
              {note.label}
            </Key>
          ))}
        </div>
      </div>
      <div className="flex flex-row justify-center gap-2">
        {KEYS.white.map((note) => (
          <Key key={note.note} type="white" note={`${note.note}${octave}`}>
            {note.label}
          </Key>
        ))}
      </div>
    </div>
  );
};

export default Octave;
