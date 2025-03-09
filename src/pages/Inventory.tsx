import { formOptions, useForm } from "@tanstack/react-form";
import { z } from "zod";
import { FieldInfo } from "../components/FieldInfo";

const PersonSchema = z.object({
  name: z.string().min(5).max(50),
  age: z.number().gte(18),
});

type Person = z.infer<typeof PersonSchema>;

export function Inventory() {
  const formOpts = formOptions({
    defaultValues: {
      name: "",
      age: 20,
    } as Person,
    validators: {
      onChange: PersonSchema,
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  return (
    <div className="container mx-auto px-2">
      <h1>Inventory form</h1>

      {/* <div>
				<dl>
					<dt>Name</dt>
					<dd>{name}</dd>
					<dt>Age</dt>
					<dd>{age}</dd>
				</dl>
			</div> */}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field
          name="name"
          children={(field) => (
            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                className="border border-stone-400 rounded p-2"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Field
          name="age"
          children={(field) => (
            <div>
              <label htmlFor="age">Age</label>
              <input
                className="border border-stone-400 rounded p-2"
                value={field.state.value}
                type="number"
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.valueAsNumber)}
              />
              <FieldInfo field={field} />
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit}
              className={`${canSubmit ? "bg-green-200" : "bg-stone-200"} rounded p-2 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? "..." : "Submit"}
            </button>
          )}
        />
      </form>
    </div>
  );
}
