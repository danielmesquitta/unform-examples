import React, { useRef } from 'react';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';

import { Input, Checkbox, Radio } from './components';

function App() {
  const formRef = useRef();
  const initialData = {
    email: 'daniel@estudioflow.com.br',
    language: 'english',
  };

  const checkboxOptions = [
    { id: 'node', value: 'node', label: 'Node' },
    { id: 'react', value: 'react', label: 'ReactJS' },
  ];

  const radioOptions = [
    { id: 'portuguese', value: 'portuguese', label: 'Portuguese' },
    { id: 'english', value: 'english', label: 'English' },
    { id: 'spanish', value: 'spanish', label: 'Spanish' },
    { id: 'arabic', value: 'arabic', label: 'Arabic' },
  ];

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit}>
      <Input name="email" label="Email" />
      <Input name="password" label="Password" />

      <Scope path="address">
        <Input name="street" label="Street" />
        <Input name="number" label="Number" />
      </Scope>

      <Checkbox name="techs" options={checkboxOptions} />

      <Radio name="language" options={radioOptions} />

      <button type="submit">Send</button>
    </Form>
  );
}

export default App;
