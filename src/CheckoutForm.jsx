import React, {  useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import FormInput from './FormInput';

const ACTIONS = {
    SHIPPING_ADDRESS: 'shippingAddress',
    BILLING_ADDRESS: 'billingAddress',
    CARD_NUMBER: 'cardNumber',
    END_DATE: 'endDate',
    CVV: 'cvv',
    SHOW_ERROR_SHIPPING: 'showErrorShipping',
    SHOW_ERROR_BILLING: 'showErrorBilling',
    SHOW_ERROR_CARD: 'showErrorCard',
    SHOW_ERROR_END_DATE: 'showErrorEndDate',
    SHOW_ERROR_CVV: 'showErrorCvv',
    ERROR_MESSAGE: 'errorMessage'
}

const MESSAGES = {
    SHIPPING_ERROR_MESSAGE: 'Enter valid Shipping Address.',
    BILLING_ERROR_MESSAGE: 'Enter valid Billing Address.',
    CARD_ERROR_MESSAGE: 'Enter valid card number',
    END_DATE_ERROR_MESSAGE: 'Enter valid end date',
    CVV_ERROR_MESSAGE: 'Enter valid CVV number'
}

const CheckoutForm = () => {

    const [state, dispatch] = useReducer(reducer, {
        shippingAddress: '', billingAddress: '', cardNumber: '',
        endDate: '', cvv: '', showErrorShipping: false, showErrorBilling: false,
        showErrorCard: false, showErrorEndDate: false, showErrorCvv: false, errorMessage: ''
    })

    function reducer(state, action) {
        switch (action.type) {
            case ACTIONS.SHIPPING_ADDRESS:
                return { ...state, shippingAddress: action.value }


            case ACTIONS.BILLING_ADDRESS:
                return { ...state, billingAddress: action.value }

            case ACTIONS.CARD_NUMBER:
                return {
                    ...state, cardNumber: action.value
                }

            case ACTIONS.END_DATE:
                return {
                    ...state, endDate: action.value
                }

            case ACTIONS.CVV:
                return {
                    ...state, cvv: action.value
                }

            case ACTIONS.SHOW_ERROR_SHIPPING:
                return {
                    ...state, showErrorShipping: action.value
                }

            case ACTIONS.SHOW_ERROR_BILLING:
                return {
                    ...state, showErrorBilling: action.value
                }

            case ACTIONS.SHOW_ERROR_CARD:
                return {
                    ...state, showErrorCard: action.value
                }

            case ACTIONS.SHOW_ERROR_END_DATE:
                return {
                    ...state, showErrorEndDate: action.value
                }

            case ACTIONS.SHOW_ERROR_CVV:
                return {
                    ...state, showErrorCvv: action.value
                }

            case ACTIONS.ERROR_MESSAGE:
                return {
                    ...state, errorMessage: action.value
                }

            default:
                return {
                    ...state
                }
        }
    }

    function updateUserInput(value, name) {

        dispatch({ type: name, value: value })
    }

    const errorOccured = (type, message) => {

        console.log(type)

        dispatch({ type: ACTIONS.ERROR_MESSAGE, value: message })
        dispatch({ type: type, value: true })

    }

    const removeExisitingValidations = () => {
        dispatch({ type: ACTIONS.SHOW_ERROR_SHIPPING, value: false })
        dispatch({ type: ACTIONS.SHOW_ERROR_BILLING, value: false })
        dispatch({ type: ACTIONS.SHOW_ERROR_CARD, value: false })
        dispatch({ type: ACTIONS.SHOW_ERROR_END_DATE, value: false })
        dispatch({ type: ACTIONS.SHOW_ERROR_CVV, value: false })
    }

    const onFormSubmit = (e) => {

        removeExisitingValidations()

        if (state.shippingAddress.length == 0 || state.shippingAddress.length > 40) {
            errorOccured(ACTIONS.SHOW_ERROR_SHIPPING, MESSAGES.SHIPPING_ERROR_MESSAGE)
        } else if (state.billingAddress.length == 0 || state.billingAddress.length > 40) {
            errorOccured(ACTIONS.SHOW_ERROR_BILLING, MESSAGES.BILLING_ERROR_MESSAGE)
        } else if (state.cardNumber.length != 16) {
            errorOccured(ACTIONS.SHOW_ERROR_CARD, MESSAGES.CARD_ERROR_MESSAGE)
        } else if (state.endDate == '') {
            errorOccured(ACTIONS.SHOW_ERROR_END_DATE, MESSAGES.END_DATE_ERROR_MESSAGE)
        } else if (state.cvv.length != 3) {
            errorOccured(ACTIONS.SHOW_ERROR_CVV, MESSAGES.CVV_ERROR_MESSAGE)
        }
        e.preventDefault()
    }

    return (
        <div className="parent-container">
            <div className="col-md-6 col-sm-10 mx-auto text-center">
                <div className="header-title">
                    <h1 className='txtCheckout'>
                        Checkout Form
                    </h1>
                </div>
            </div>

            <div className="row">
                <div className="col-md-6 mx-auto">

                    <form className="signupForm" onSubmit={onFormSubmit}>
                        <FormInput placeholder='Enter shipping address' name="shippingAddress" showError={state.showErrorShipping} errorMessage={state.errorMessage}
                            labelName="Shipping Address" headerText="Shipping information" updateUserInput={updateUserInput} value={state.shippingAddress}></FormInput>

                        <FormInput placeholder='Enter billing address' name="billingAddress" showError={state.showErrorBilling} errorMessage={state.errorMessage}
                            labelName="Billing address" headerText="Billing information" updateUserInput={updateUserInput}></FormInput>

                        <FormInput placeholder="Enter your card number" name="cardNumber" showError={state.showErrorCard} errorMessage={state.errorMessage}
                            labelName="Card number" headerText="Payment information" updateUserInput={updateUserInput}></FormInput>

                        <div className='row'>
                            <div className="form-group col-md-6 mx-auto">
                                <FormInput placeholder="Enter your end date" name="endDate" showError={state.showErrorEndDate} errorMessage={state.errorMessage}
                                    labelName="End date" updateUserInput={updateUserInput}></FormInput>
                            </div>
                            <div className="form-group col-md-6 mx-auto">
                                <FormInput placeholder="Enter your CVV" name="cvv" showError={state.showErrorCvv} errorMessage={state.errorMessage}
                                    type='password'
                                    labelName="CVV" updateUserInput={updateUserInput}></FormInput>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btnSubmit" >Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default CheckoutForm;