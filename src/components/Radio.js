import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';

function Radio({ name, options, ...rest }) {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRefs.current,
      getValue(refs) {
        const checked = refs.find(ref => ref.checked);
        return checked ? checked.value : null;
      },
      setValue(refs, value) {
        const item = refs.find(ref => ref.value === value);
        if (item) {
          item.checked = true;
        }
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {options.map((option, index) => {
        return (
          <label
            key={option.id}
            style={
              selected === option.id ? { backgroundColor: 'steelblue' } : {}
            }>
            <input
              ref={elRef => (inputRefs.current[index] = elRef)}
              type="radio"
              name={fieldName}
              value={option.id}
              defaultChecked={defaultValue === option.id}
              onClick={() => setSelected(option.id)}
              {...rest}
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </>
  );
}

export default Radio;
