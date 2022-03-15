import logo from './logo.svg';
import React, { useEffect } from 'react';
import Stack from './sdk-plugin/stack'

import SelectContentType from './components/selectcontenttype.tsx'
import SelectField from './components/selectfield.js'

import './App.css';
import { InfiniteScrollTable, Radio, Select, Button } from '@contentstack/venus-components'
import '@contentstack/venus-components/build/main.css'
import SingleLineText from './components/singlelinetext';
import stack from './sdk-plugin/stack';

function App() {

  const [contentTypes, setContentTypes] = React.useState(null);
  const [contentType, setContentType] = React.useState(null);
  const [schema, setSchema] = React.useState(null);
  const [field, setField] = React.useState(null);
  const [input, setInput] = React.useState('');
  // get results for components
  const [values, setValues] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    function getContentTypes() {
      Stack.getContentTypes()
        .then((data) => {
          setContentTypes(data.content_types);
        })
    }
    getContentTypes();
  }, []);

  useEffect(() => {
    if (schema) {
      setSchema(schema);
    }
  })

  async function handleSubmit() {
    setLoading(true);
    const message = await stack.updateAllEntries(contentType, field, input);
    console.log("###: ", message);
    if (message === 'success') {
      console.log("yes")
    } else {
      console.log("no");
    }
    setLoading(false);
  }

  return (
    <div className="pure-g">
      <div className="pure-u-1-3 one-box">
        <form className="pure-form pure-form-stacked">
          <fieldset>
            {contentTypes && <SelectContentType data={contentTypes} setContentType={setContentType} setSchema={setSchema} />}
            {schema && <SelectField data={schema} setField={setField} />}
            {field && <SingleLineText type={field.data.data_type} setValue={setInput} />}
            {field && <Button
              buttonType="primary"
              icon="Send"
              isLoading={loading}
              onClick={e => handleSubmit(e)}
            >
              Publish New Values
            </Button>}
            <p> Successfully updated </p>
          </fieldset>
        </form>
      </div>
      <div className="pure-u-1-6 one-box">

      </div>
    </div>
  );
}

export default App;
