
import React from 'react';
import { TextInput, Radio, FieldLabel } from '@contentstack/venus-components'
import '@contentstack/venus-components/build/main.css'

function SingleLineText(props) {

    const [value, setValue] = React.useState('');

    const updateInput = (e) => {
        setValue(e.target.value + e.key);
        props.setValue(e.target.value + e.key);
    }

    switch (props.type) {
        case "text":
            return (
                <div>
                    <FieldLabel
                        htmlFor="someInput"
                        testId="cs-field-label"
                    >
                        Enter Value
                    </FieldLabel>
                    <TextInput
                        name="value"
                        type={"text"}
                        autoFocus={true}
                        width='medium'
                        onKeyDown={e => updateInput(e)}
                        placeholder={"Enter Value"}
                    />
                </div>)
        case "number":
            return (
                <div>
                    <FieldLabel
                        htmlFor="someInput"
                        testId="cs-field-label"
                    >
                        Enter Value
                    </FieldLabel>
                    <TextInput
                        type={"number"}
                        autoFocus={true}
                        width='medium'
                        placeholder={"Enter Value"}
                    />
                </div>)
        case "isodate":
            return (
                <div>
                    <FieldLabel
                        htmlFor="someInput"
                        testId="cs-field-label"
                    >
                        Enter Value
                    </FieldLabel>
                    <TextInput
                        type={"date"}
                        autoFocus={true}
                        width='medium'
                        placeholder={"Enter Value"}
                    />
                </div>
            )
        case "boolean":
            return (
                <div>
                    <FieldLabel
                        htmlFor="someInput"
                        testId="cs-field-label"
                    >
                        Enter Value
                    </FieldLabel>
                    <div>
                        <div className="Radio-wrapper">
                            <Radio name="option" checked="true" id="default" label={"option one"} />
                        </div>
                        <div className="Radio-wrapper">
                            <Radio name="option" id="default" label={'option two'} />
                        </div>
                    </div>
                </div>
            )

    }

}

export default SingleLineText;