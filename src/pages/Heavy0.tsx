import { Fragment } from "react";
import { REPEATED_FORM_COUNT } from "../library/constants";

export function Heavy0() {
  const people = Array(REPEATED_FORM_COUNT)
    .fill(null)
    .map((_, i) => ({ id: i, name: "", age: 20 }));

  console.log("rendered");

  return (
    <>
      <h1>People</h1>

      {people.map((f) => (
        <Fragment key={f.id}>
          <div>
            <label htmlFor="name">Name for Person {f.id}</label>
            <input id="name" className="border border-stone-400 rounded p-2" />
          </div>

          <div>
            <label htmlFor="age">Age for Person {f.id}</label>
            <input
              id="age"
              className="border border-stone-400 rounded p-2"
              type="number"
            />
          </div>
        </Fragment>
      ))}
    </>
  );
}
