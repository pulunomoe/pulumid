import { capitalize } from "lodash";
import { useAppDispatch, useAppSelector } from "./store.ts";
import { DIALOGS, selectDialogName } from "./stores/dialogSlice.ts";
import {
  minimizeWidget,
  restoreWidget,
  selectWidgets,
  WIDGETS,
} from "./stores/widgetsSlice.ts";
import AddTrack from "./components/sequencer/AddTrack.tsx";
import DeleteTrack from "./components/sequencer/DeleteTrack.tsx";
import Keyboard from "./components/keyboard/Keyboard.tsx";
import Metronome from "./components/metronome/Metronome.tsx";
import Project from "./components/project/Project.tsx";
import Sequencer from "./components/sequencer/Sequencer.tsx";

const App = () => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialogName);
  const widgets = useAppSelector(selectWidgets);

  const minimize = (name: string) => {
    dispatch(minimizeWidget(name));
  };

  const restore = (name: string) => {
    dispatch(restoreWidget(name));
  };

  return (
    <>
      {dialog === DIALOGS.ADD_TRACK && <AddTrack />}
      {dialog === DIALOGS.DELETE_TRACK && <DeleteTrack />}
      {widgets[WIDGETS.KEYBOARD].minimized || <Keyboard />}
      {widgets[WIDGETS.PROJECT].minimized || <Project />}
      {widgets[WIDGETS.METRONOME].minimized || <Metronome />}
      <div className="flex h-screen flex-col justify-between">
        <h1 className="mb-4 bg-black px-8 py-1 text-2xl font-bold text-white">
          PuluMid
        </h1>
        <Sequencer />
        <div className="flex flex-row gap-4 bg-black px-8 py-2 text-white">
          {Object.entries(widgets).map(([name, widget]) => {
            const className = widget.minimized
              ? "hover:bg-white hover:text-black"
              : "bg-white text-black";
            return (
              <button
                key={name}
                onClick={() =>
                  widget.minimized ? restore(name) : minimize(name)
                }
                className={`w-[20ch] border border-white px-2 py-1 text-start ${className}`}
              >
                {capitalize(name)}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default App;
