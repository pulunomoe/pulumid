import { useRef } from "react";
import { useAppDispatch } from "../../store.ts";
import { closeDialog } from "../../stores/dialogSlice.ts";
import { addTrack } from "../../stores/tracksSlice.ts";
import Button from "../commons/Button.tsx";
import Field from "../commons/Field.tsx";

const AddTrack = () => {
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const close = () => {
    dispatch(closeDialog());
  };

  const add = () => {
    dispatch(
      addTrack({
        name: inputRef.current!.value,
        instrument: "piano",
      }),
    );
    close();
  };

  return (
    <div className="fixed z-20 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="border border-black bg-white">
        <div className="flex flex-row items-center justify-between gap-2 bg-black px-2 py-1">
          <h1 className="font-bold text-white">Add new track</h1>
          <button onClick={close} className="text-white">
            [X]
          </button>
        </div>
        <div className="flex flex-col gap-2 p-2">
          <Field id={"name"} label="Name">
            <input
              type="text"
              id={"name"}
              ref={inputRef}
              className="ms-2 border border-black p-1"
            />
          </Field>
          <div className="flex flex-row justify-center gap-4">
            <Button onClick={add}>Add</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTrack;
