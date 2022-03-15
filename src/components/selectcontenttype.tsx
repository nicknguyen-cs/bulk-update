import React, { useEffect } from 'react';
import '../App.css';
import { Radio, Select, Button } from '@contentstack/venus-components'
import '@contentstack/venus-components/build/main.css'

interface select {
    id : number,
    label : string,
    value : string,
    schema : any
}



function SelectContentType(props : any) {

    const [options, setOptions] = React.useState<select[] | []>([]);
    const [value, setValue] = React.useState(null);

    useEffect(() => {
        if (props.data) {
            let count = 0;
            let options: select [] = [];
            for (let i = 0; i < props.data.length; i++) {
                let option = { id : count++, label : props.data[i].title, value : props.data[i].uid, schema: props.data[i].schema};
                options.push(option);
            }
            setOptions(options);
        }
    }, []);

    const handleValueUpdate = (e : any) => {
        props.setContentType(e.value);
        props.setSchema(e.schema);
        setValue(e);
    }

    return (
        <div>
            <Select
                selectLabel={"Select Option"}
                value={value}
                onChange={handleValueUpdate}
                options={options}
            />
        </div>
    );
}

export default SelectContentType;
