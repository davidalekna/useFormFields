import { useReducer } from "react";
import cloneDeep from "lodash.clonedeep";

const errorPusher = field => {
  if (field.requirements) {
    field.errors = [];
    for (const fn of field.requirements) {
      const error = fn(field.value);
      if (error && !field.errors.includes(error)) {
        field.errors.push(error);
      }
    }
  }
  return field;
};

const defaultFieldValidation = (state, updateState) => {
  const validatedState = [...state].map(errorPusher);
  updateState(validatedState);
  // if any errors return undefined, otherwise state
  if (
    validatedState
      .map(field => field.errors)
      .flat()
      .filter(Boolean).length > 0
  ) {
    alert("fix your errors please!");
    return undefined;
  } else {
    return validatedState;
  }
};

export default function useFormFields(
  initialValues = [],
  validate = defaultFieldValidation
) {
  const [state, updateState] = useReducer(
    (state, newState) => newState,
    cloneDeep(initialValues)
  );

  const mergeState = (newItemKey, newItem) => {
    updateState(state.map(i => (i.name === newItemKey ? newItem : i)));
  };

  const handleChange = ({ target }) => {
    if (!target.name) throw Error("no input name");
    const item = state.find(item => item.name === target.name);
    const updatedItem = Object.assign(item, {
      value: target.type === "checkbox" ? target.checked : target.value
    });
    mergeState(target.name, updatedItem);
  };

  const validateOnBlur = ({ target }) => {
    if (!target.name) throw Error("no input name");
    const item = state.find(item => item.name === target.name);
    const updatedItem = errorPusher(item);
    mergeState(target.name, updatedItem);
  };

  const clearValues = () => {
    updateState(
      initialValues.map(fld => {
        return { ...fld, errors: [] };
      })
    );
  };

  const handleSubmit = () => {
    return validate(state, updateState);
  };

  return [state, handleChange, handleSubmit, validateOnBlur, clearValues];
}
