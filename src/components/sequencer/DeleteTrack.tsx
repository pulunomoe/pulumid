import { useAppDispatch, useAppSelector } from "../../store.ts";
import { closeDialog, selectDialogParam } from "../../stores/dialogSlice.ts";
import { deleteTrack, selectTracks } from "../../stores/tracksSlice.ts";
import Button from "../commons/Button.tsx";

const DeleteTrack = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const dialogParam = useAppSelector(selectDialogParam);
  const trackNumber = parseInt(dialogParam ?? "0");

  const close = () => {
    dispatch(closeDialog());
  };

  const confirmDelete = () => {
    dispatch(deleteTrack(trackNumber));
    close();
  };

  return (
    <div className="fixed z-20 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
      <div className="border border-black bg-white">
        <div className="flex flex-row items-center justify-center gap-2 bg-black px-2 py-1">
          <h1 className="font-bold text-white">
            Delete track: {tracks[trackNumber]!.name}
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-2 p-2">
          <span>Are you sure?</span>
          <div className="flex flex-row items-center justify-center gap-4">
            <Button onClick={close} className="w-[10ch]">
              No
            </Button>
            <Button onClick={confirmDelete} className="w-[10ch]">
              Yes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTrack;
