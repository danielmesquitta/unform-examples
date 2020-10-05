import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';

const CheckboxInput = ({ name, options, ...rest }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);
  const [selecteds, setSelecteds] = useState([]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: refs => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: refs => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },

      setValue: (refs, values) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);

  const handleChange = e => {
    if (e.target?.checked) {
      setSelecteds([...selecteds, e.target.value]);
    } else {
      setSelecteds(selecteds.filter(value => value !== e.target.value));
    }
  };

  return (
    <div onChange={handleChange}>
      {options.map((option, index) => (
        <label
          key={option.id}
          style={
            selecteds.includes(option.id) ? { backgroundColor: 'green' } : {}
          }>
          <input
            defaultChecked={defaultValue.find(dv => dv === option.id)}
            ref={ref => {
              inputRefs.current[index] = ref;
            }}
            value={option.value}
            type="checkbox"
            id={option.id}
            {...rest}
          />
          {option.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxInput;
