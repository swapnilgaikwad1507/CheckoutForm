import React from "react"
import '../../App'

const FormInput = (props) => {

    return (
        <>
            <div className="form-group">
                {props.labelName && <label className="label-name">{props.labelName}</label>}
                <input className="form-control" name={props.name}
                    placeholder={props.placeholder}
                    value={props.value}
                    type= {props.type}
                    onChange={(e) => props.updateUserInput(e.target.value, e.target.name)}
                />
            </div>
        </>
    )
}

export default FormInput