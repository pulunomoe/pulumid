import { useAppDispatch, useAppSelector } from "../../store.ts";
import { DIALOGS, openDialog } from "../../stores/dialogSlice.ts";
import { selectTracks } from "../../stores/tracksSlice.ts";
import Button from "../commons/Button.tsx";

const Sequencer = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);

  return (
    <>
      <div className="mb-auto flex flex-col gap-4 px-8">
        {tracks.length > 0 && (
          <div className="flex flex-row border border-black">
            {tracks.map((track, index) => (
              <div className="flex w-[20ch] flex-col gap-2 border-r border-black p-2">
                <div>{track.name}</div>
                <select className="border border-black bg-white p-1">
                  <option>Piano</option>
                  <option>Bass</option>
                </select>
                <Button
                  onClick={() =>
                    dispatch(
                      openDialog({
                        name: DIALOGS.DELETE_TRACK,
                        param: index.toString(),
                      }),
                    )
                  }
                  className="text-xs"
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        )}
        <div>
          <Button
            onClick={() =>
              dispatch(
                openDialog({
                  name: DIALOGS.ADD_TRACK,
                }),
              )
            }
            className="w-[20ch]"
          >
            Add new track
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sequencer;
