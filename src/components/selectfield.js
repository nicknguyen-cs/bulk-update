import React, { useEffect } from 'react';
import '../App.css';
import { Radio, Select, Button } from '@contentstack/venus-components'
import '@contentstack/venus-components/build/main.css'

function SelectField(props: any) {

    const [options, setOptions] = React.useState(null);
    const [value, setValue] = React.useState(null);

    useEffect(() => {
        if (props.data) {
            let count = 0;
            let options = [];
            for (let i = 0; i < props.data.length; i++) {
                var option = new Object();
                option.id = count++;
                option.label = props.data[i].display_name;
                option.value = props.data[i].uid;
                option.data = props.data[i];
                options.push(option);
            }
            setOptions(options);
        }
    }, []);

    const handleValueUpdate = (e) => {
        console.log("selectfield.js" , e);
        props.setField(e);
        setValue(e);
    }


    return (
        <div>
            <Select
                selectLabel={"Select Field"}
                value={value}
                onChange={handleValueUpdate}
                options={options}
            />
        </div>
    );
}

export default SelectField;

 