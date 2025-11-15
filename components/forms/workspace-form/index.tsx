import FormGenerator from "@/components/global/form-generator";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "@/hooks/use-create-workspace";

type Props = {};

const WorkspaceForm = (props: Props) => {
  const { errors, isPending, register, onFormSubmit } = useCreateWorkspace();

  return (
    <form onSubmit={onFormSubmit} className="flex flex-col gap-y-3">
      <FormGenerator
        name="name"
        label="Name"
        placeHolder="Workspace Name"
        errors={errors}
        inputType="input"
        type="text"
        register={register}
      />
      <Button
        className="text-sm w-full mt-2"
        type="submit"
        disabled={isPending}
      >
        <Loader state={isPending}>Create Workspace</Loader>
      </Button>
    </form>
  );
};

export default WorkspaceForm;
