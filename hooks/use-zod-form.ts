import z, { ZodSchema } from "zod";
import { useForm } from "react-hook-form";
import { UseMutateFunction } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
  schema: ZodSchema<any, any>;
  mutation: UseMutateFunction;
  defaultValues?: any;
};

const useZodForm = ({ schema, mutation, defaultValues }: Props) => {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues },
  });

  const onFormSubmit = handleSubmit(async (value) => mutation({ ...value }));

  return { register, reset, watch, onFormSubmit, errors };
};

export default useZodForm;
