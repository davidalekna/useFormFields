import React, { memo } from "react";
import ReactDOM from "react-dom";
import initialFields from "./fields";
import useFormFields from "./useFormFields";
import "./styles.css";

function renderFieldErrors(errors) {
  return (
    errors && (
      <ul>
        {errors.map((err, key) => (
          <li key={key} style={{ color: "violet" }}>
            {err}
          </li>
        ))}
      </ul>
    )
  );
}

const FieldContainer = memo(
  ({ component: Field, ...props }) => {
    console.log("rendering", props.name);
    return (
      <label key={props.name}>
        <div>{props.label}</div>
        <Field
          name={props.name}
          type={props.type}
          value={props.value}
          placeholder={props.placeholder}
          checked={props.checked}
          onBlur={props.validateOnBlur}
          onChange={props.handleChange}
        />
        {renderFieldErrors(props.errors)}
      </label>
    );
  },
  (
    { value: prevValue, errors: prevErrors = [] },
    { value: nextValue, errors: nextErrors = [] }
  ) => {
    // TODO: should render the errors on blur...
    // console.log('prev',prevErrors)
    // console.log('next',nextErrors);
    if (prevValue === nextValue) {
      return true;
    }
  }
);

function App() {
  const [
    fields,
    handleChange,
    submit,
    validateOnBlur,
    clearValues
  ] = useFormFields(initialFields);

  const handleSubmit = evt => {
    evt.preventDefault();
    const values = submit();
    console.log(values);
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <FieldContainer
            {...{
              key: field.name,
              validateOnBlur,
              handleChange,
              ...field
            }}
          />
        ))}
        <br />
        <button type="submit">Submit</button>
        <button type="button" onClick={clearValues}>
          reset
        </button>
      </form>
    </section>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
