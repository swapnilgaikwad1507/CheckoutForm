import React from "react"
import './App'

const FormInput = (props) => {

    console.log('show error message '+props.errorMessage)

    return (
        <>
            {props.headerText != '' && <h4 className='txtShipping'>{props.headerText}</h4>}
            <div className="form-group">
                <label >{props.labelName}</label>
                <input className="form-control input" name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    type= {props.type}
                    onChange={(e) => props.updateUserInput(e.target.value, e.target.name)}
                />
                {props.showError &&
                    <span className="span">{props.errorMessage}</span>
                }
            </div>
        </>
    )
}

export default FormInput