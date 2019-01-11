import React from 'react';
import ReactDOM from 'react-dom';
import initialFields from './fields';
import useFormFields from './useFormFields';
import FieldContainer from './components/FieldContainer';
import './styles.css';

function App() {
  const [
    fields,
    handleChange,
    submit,
    validateOnBlur,
    clearValues,
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
              ...field,
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

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
