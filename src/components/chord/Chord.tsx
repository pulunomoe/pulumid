import { useState } from "react";
import { PolySynth } from "tone";
import Field from "../commons/Field.tsx";
import Widget from "../commons/Widget.tsx";

const SYNTH = new PolySynth().toDestination();

const DEGREES = ["I", "II", "III", "IV", "V", "VI", "VII"];
const NOTES = ["c", "c#", "d", "d#", "e", "f", "f#", "g", "g#", "a", "a#", "b"];
const ENHARMONIC: Record<string, string> = {
  "e#": "f",
  "b#": "c",
};

const SCALE_INTERVALS = {
  diatonic: [0, 2, 4, 5, 7, 9, 11],
};
const CHORD_INTERVALS: Record<string, number[]> = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  aug: [0, 4, 8],
  dim: [0, 3, 6],
  sus: [0, 5, 7],
};

const getScaleNotes = (key: string, scaleIntervals: number[]): string[] => {
  const rootIndex = NOTES.indexOf(key);
  const scaleNotes = scaleIntervals.map(
    (interval) => NOTES[(rootIndex + interval) % NOTES.length],
  );
  return scaleNotes.map((note) => ENHARMONIC[note] || note);
};

const getChordNotes = (
  scaleNotes: string[],
  degree: number,
  chordIntervals: number[],
): string[] => {
  const rootNote = scaleNotes[degree];
  const rootIndexInNotes = NOTES.indexOf(rootNote);

  const chordNotes = chordIntervals.map(
    (interval) => NOTES[(rootIndexInNotes + interval) % NOTES.length],
  );

  return chordNotes.map((note) => ENHARMONIC[note] || note);
};

const Chord = () => {
  const [key, setKey] = useState("c");

  const playChord = (notes: string[]) => {
    notes.forEach((note) => SYNTH.triggerAttack(note));
  };

  const stopChord = (notes: string[]) => {
    notes.forEach((note) => SYNTH.triggerRelease(note));
  };

  const SCALE_NOTES = getScaleNotes(key, SCALE_INTERVALS.diatonic);
  const CHORDS: Record<number, Record<string, string[]>> = SCALE_NOTES.reduce(
    (degreeAcc, _, degreeIndex) => ({
      ...degreeAcc,
      [degreeIndex]: Object.entries(CHORD_INTERVALS).reduce(
        (typeAcc, [chordType, intervals]) => ({
          ...typeAcc,
          [chordType]: getChordNotes(SCALE_NOTES, degreeIndex, intervals),
        }),
        {},
      ),
    }),
    {},
  );

  const getChordNotesWithOctave = (notes: string[]): string[] => {
    let currentOctave = 3;
    let previousNoteIndex = NOTES.indexOf(notes[0]);

    return notes.map((note, index) => {
      const noteIndex = NOTES.indexOf(note);
      if (index > 0 && noteIndex <= previousNoteIndex) {
        currentOctave++;
      }
      previousNoteIndex = noteIndex;
      return `${note}${currentOctave}`;
    });
  };

  const getChordNotesVariation = (notes: string[]): string[] => {
    const baseOctave = parseInt(notes[0].slice(-1));
    const sameOctave = notes.every(
      (note) => parseInt(note.slice(-1)) === baseOctave,
    );

    if (sameOctave) {
      return [
        ...notes.slice(0, -1),
        notes[notes.length - 1].slice(0, -1) + (baseOctave - 1),
      ];
    } else {
      return notes.map((note) => note.slice(0, -1) + baseOctave);
    }
  };

  return (
    <Widget name="Chord" title="Chord">
      <Field id="key" label="Key">
        <select
          id="root"
          defaultValue="C"
          onChange={(e) => setKey(e.target.value)}
          className="ms-2 border border-black bg-white p-1"
        >
          {NOTES.map((note) => (
            <option key={note} value={note}>
              {note.toUpperCase()}
            </option>
          ))}
        </select>
      </Field>
      <div className="mt-4 flex flex-row items-center justify-center gap-4">
        {DEGREES.map((degree, index) => (
          <div key={degree} className="flex flex-col items-center">
            <h1>{degree}</h1>
            <h2>{SCALE_NOTES[index].toUpperCase()}</h2>
            {Object.entries(CHORDS[index]).map(([chordType, notes]) => {
              const chordNotesWithOctave = getChordNotesWithOctave(notes);
              const chordNotesVariation =
                getChordNotesVariation(chordNotesWithOctave);
              return (
                <div className="flex flex-row">
                  <button
                    key={`${degree}-${chordType}`}
                    onMouseDown={() => playChord(chordNotesWithOctave)}
                    onMouseUp={() => stopChord(chordNotesWithOctave)}
                    onMouseLeave={() => stopChord(chordNotesWithOctave)}
                    className="mt-2 w-[12ch] border border-black px-2 py-1 hover:bg-black hover:text-white"
                  >
                    {chordType}
                    <br />
                    <span className="text-sm">
                      {notes.map((note) => note.toUpperCase() + " ")}
                    </span>
                  </button>
                  <button
                    key={`${degree}-${chordType}-variation`}
                    onMouseDown={() => playChord(chordNotesVariation)}
                    onMouseUp={() => stopChord(chordNotesVariation)}
                    onMouseLeave={() => stopChord(chordNotesVariation)}
                    className="mt-2 border border-l-0 border-black px-2 py-1 hover:bg-black hover:text-white"
                  >
                    v2
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Widget>
  );
};

export default Chord;
