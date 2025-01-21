import { WIDGETS } from "../../stores/widgetsSlice.ts";
import Button from "../commons/Button.tsx";
import Field from "../commons/Field.tsx";
import Widget from "../commons/Widget.tsx";

const Project = () => {
  return (
    <Widget name={WIDGETS.PROJECT} title="Project">
      <div className="flex flex-row items-center justify-center gap-2">
        <Field id="name" label="Project Name">
          <input
            type="text"
            id="name"
            className="ms-2 border border-black p-1"
          />
        </Field>
        <Button>Save</Button>
        <Button>Load</Button>
      </div>
    </Widget>
  );
};

export default Project;
