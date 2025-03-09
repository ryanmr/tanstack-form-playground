import { formOptions, useForm } from "@tanstack/react-form";
import { Fragment } from "react";
import z from "zod";
import { FieldInfo } from "../components/FieldInfo";
import { REPEATED_FORM_COUNT } from "../library/constants";

const PersonSchema = z.object({
  id: z.number(),
  name: z.string().min(5).max(50),
  age: z.number().gte(18),
});

const PeopleSchema = z.object({
  people: z.array(PersonSchema),
});

type People = z.infer<typeof PeopleSchema>;

export function HeavyA() {
  const formOpts = formOptions({
    defaultValues: {
      people: Array(REPEATED_FORM_COUNT)
        .fill(null)
        .map((_, i) => ({ id: i, name: "", age: 20 })),
    } as People,
    validators: {
      onChange: PeopleSchema,
    },
  });

  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value);
    },
  });

  console.log("rendered");

  return (
    <>
      <h1>People</h1>
      <form.Field name="people" mode="array">
        {(field) => (
          <div>
            {field.state.value.map((f, i) => {
              return (
                <Fragment key={f.id}>
                  <form.Field name={`people[${i}].name`}>
                    {(sf) => (
                      <div>
                        <label htmlFor="name">Name for Person {f.id}</label>
                        <input
                          id="name"
                          className="border border-stone-400 rounded p-2"
                          value={sf.state.value}
                          onBlur={sf.handleBlur}
                          onChange={(e) => sf.handleChange(e.target.value)}
                        />
                        <FieldInfo field={sf} />
                      </div>
                    )}
                  </form.Field>
                  <form.Field name={`people[${i}].age`}>
                    {(sf) => (
                      <div>
                        <label htmlFor="age">Age for Person {f.id}</label>
                        <input
                          id="age"
                          className="border border-stone-400 rounded p-2"
                          type="number"
                          value={sf.state.value}
                          onBlur={sf.handleBlur}
                          onChange={(e) =>
                            sf.handleChange(e.target.valueAsNumber)
                          }
                        />
                        <FieldInfo field={sf} />
                      </div>
                    )}
                  </form.Field>
                </Fragment>
              );
            })}
          </div>
        )}
      </form.Field>
    </>
  );
}
