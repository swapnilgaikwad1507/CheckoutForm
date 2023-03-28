import React, { useEffect, useReducer, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import FormInput from './FormInput';
import Card from 'react-bootstrap/Card';
import { AiOutlineClose } from "react-icons/ai";
import AddressField from './AddressField';
import ReactModal from 'react-modal';
import { removeProductFromCartUtils } from '../../util/utils';
import Header from '../../Components/Header';
import { CART_PRODUCTS_KEY } from '../../util/constnats';

const ACTIONS = {
    SHIPPING_ADDRESS_LINE_1: 'shippingAddressLine1',
    SHIPPING_LOCALITY: 'shippingLocality',
    SHIPPING_STATE: 'shippingState',
    SHIPPING_CITY: 'shippingCity',
    SHIPPING_ZIPCODE: 'shippingZipcode',
    ERROR_TEXT: 'errorText',
    BILLING_ADDRESS_LINE_1: 'billingAddressLine1',
    BILLING_LOCALITY: 'billingLocality',
    BILLING_STATE: 'billingState',
    BILLING_CITY: 'billingCity',
    BILLING_ZIPCODE: 'billingZipcode',
    ERROR_TEXT_BILLING: 'errorTextBilling',
    CARD_NUMBER: 'cardNumber',
    ERROR_TEXT_CARD_INFO: 'errorTextCardInfo',
    END_DATE: 'endDate',
    CVV: 'cvv',
    PURCHASE_COMPLETE: 'purchaseComplete'
}

const MESSAGES = {
    SHIPPING_ERROR_MESSAGE: 'Enter valid Shipping Address.',
    BILLING_ERROR_MESSAGE: 'Enter valid Billing Address.',
    CARD_ERROR_MESSAGE: 'Enter valid card number',
    END_DATE_ERROR_MESSAGE: 'Enter valid end date',
    CVV_ERROR_MESSAGE: 'Enter valid CVV number'
}

const PRODUCT_LIST = [{ id: 1, productName: 'Football', Cost: 80, manufacturerName: 'Nike', warranty: '2 Years' },
{ id: 2, productName: 'Jersey', Cost: 50, manufacturerName: 'Fila', warranty: '3 Years' },
{ id: 3, productName: 'Studs', Cost: 80, manufacturerName: 'Adidas', warranty: '2 Years' },
{ id: 4, productName: 'Shin guard', Cost: 30, manufacturerName: 'Puma', warranty: '2 Years' }]

const CheckoutFormUpdated = () => {

    useEffect(() => {
        console.log(1 + '2' + '2')
    })

    const [state, dispatch] = useReducer(reducer, {
        shippingAddressLine1: '', shippingLocality: '', shippingState: '', shippingCity: '', shippingZipcode: '', errorText: '',
        billingAddressLine1: '', billingLocality: '', billingState: '', billingCity: '', billingZipcode: '', errorTextBilling: '',
        cardNumber: '', errorTextCardInfo: '', endDate: '', cvv: '', purchaseComplete: false
    })
    const [products, setProducts] = useState([])
    const [totalCost, setTotalCost] = useState(0)

    function reducer(state, action) {
        switch (action.type) {
            case ACTIONS.SHIPPING_ADDRESS_LINE_1:
                return { ...state, shippingAddressLine1: action.value }

            case ACTIONS.SHIPPING_LOCALITY:
                return {
                    ...state, shippingLocality: action.value
                }

            case ACTIONS.SHIPPING_STATE:
                return {
                    ...state, shippingState: action.value
                }

            case ACTIONS.SHIPPING_CITY:
                return {
                    ...state, shippingCity: action.value
                }

            case ACTIONS.SHIPPING_ZIPCODE:
                return {
                    ...state, shippingZipcode: action.value
                }

            case ACTIONS.ERROR_TEXT:
                return {
                    ...state, errorText: action.value
                }

            case ACTIONS.BILLING_ADDRESS_LINE_1:
                return { ...state, billingAddressLine1: action.value }

            case ACTIONS.BILLING_LOCALITY:
                return {
                    ...state, billingLocality: action.value
                }

            case ACTIONS.BILLING_STATE:
                return {
                    ...state, billingState: action.value
                }

            case ACTIONS.BILLING_CITY:
                return {
                    ...state, billingCity: action.value
                }

            case ACTIONS.BILLING_ZIPCODE:
                return {
                    ...state, billingZipcode: action.value
                }

            case ACTIONS.ERROR_TEXT_BILLING:
                return {
                    ...state, errorTextBilling: action.value
                }

            case ACTIONS.CARD_NUMBER:
                return {
                    ...state, cardNumber: action.value
                }

            case ACTIONS.ERROR_TEXT_CARD_INFO:
                return {
                    ...state, errorTextCardInfo: action.value
                }

            case ACTIONS.END_DATE:
                return {
                    ...state, endDate: action.value
                }

            case ACTIONS.CVV:
                return {
                    ...state, cvv: action.value
                }

            case ACTIONS.PURCHASE_COMPLETE:
                return {
                    ...state, purchaseComplete: action.value
                }

            default:
                return {
                    ...state
                }
        }
    }

    const getCartProducts = () => {
        var cartProducts = JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY))

        setProducts(cartProducts)
        calculateTotalCost(cartProducts)
    }

    useEffect(() => {
        getCartProducts()

    }, [])

    const calculateTotalCost = (productList) => {
        var costForAll = 0
        if (productList != null) {
            productList.map((prod) => {
                costForAll = costForAll + prod.Cost
            })
        }

        setTotalCost(costForAll)
    }

    const removeItem = (id) => {

        let products = removeProductFromCartUtils(id)

        calculateTotalCost(products)

        setProducts(products)
    }

    function updateUserInput(value, name) {

        dispatch({ type: name, value: value })
    }

    const onFormSubmit = (e) => {

        if (state.shippingAddressLine1.length == '' || state.shippingLocality.length == '' || state.shippingState.length == '' ||
            state.shippingCity.length == '' || state.shippingZipcode.length == '') {
            dispatch({ type: ACTIONS.ERROR_TEXT, value: 'All field in Shipping address are mandatory' })
        }
        else if (state.billingAddressLine1.length == '' || state.billingLocality.length == '' || state.billingState.length == '' ||
            state.billingCity.length == '' || state.billingZipcode.length == '') {
            dispatch({ type: ACTIONS.ERROR_TEXT, value: '' })
            dispatch({ type: ACTIONS.ERROR_TEXT_BILLING, value: 'All field in Billing address are mandatory' })
        } else if (state.cardNumber.length != 16 || state.endDate.length == '' || state.cvv.length == '') {
            dispatch({ type: ACTIONS.ERROR_TEXT, value: '' })
            dispatch({ type: ACTIONS.ERROR_TEXT_BILLING, value: '' })
            dispatch({ type: ACTIONS.ERROR_TEXT_CARD_INFO, value: 'Enter valid card details' })
        } else {
            dispatch({ type: ACTIONS.ERROR_TEXT, value: '' })
            dispatch({ type: ACTIONS.ERROR_TEXT_BILLING, value: '' })
            dispatch({ type: ACTIONS.ERROR_TEXT_CARD_INFO, value: '' })
            dispatch({ type: ACTIONS.PURCHASE_COMPLETE, value: true })
        }

        e.preventDefault()
    }

    return (
        <div>

            <Header headerName = {'Checkout'}></Header>

            <div className="parent-container">

                <div className="row">
                    <div className="col-md-5 mx-auto">

                        <div className="header-title">
                            <h1 className='txtCheckout'>
                                Checkout Form
                            </h1>
                        </div>
                        <form className="signupForm"
                            onSubmit={onFormSubmit}
                        >
                            <AddressField labelName={'Shipping address'}
                                name={ACTIONS.SHIPPING_ADDRESS_LINE_1} nameLocality={ACTIONS.SHIPPING_LOCALITY} nameState={ACTIONS.SHIPPING_STATE}
                                nameCity={ACTIONS.SHIPPING_CITY} nameZipcode={ACTIONS.SHIPPING_ZIPCODE} updateUserInput={updateUserInput} ></AddressField>

                            {state.errorText.length > 0 && <p className='span'>{state.errorText}</p>}

                            <AddressField labelName={'Billing address'}
                                name={ACTIONS.BILLING_ADDRESS_LINE_1} nameLocality={ACTIONS.BILLING_LOCALITY} nameState={ACTIONS.BILLING_STATE}
                                nameCity={ACTIONS.BILLING_CITY} nameZipcode={ACTIONS.BILLING_ZIPCODE} updateUserInput={updateUserInput} ></AddressField>

                            {state.errorTextBilling.length > 0 && <p className='span'>{state.errorTextBilling}</p>}

                            <FormInput placeholder="Enter your card number" name={ACTIONS.CARD_NUMBER}
                                labelName="Card number" updateUserInput={updateUserInput}></FormInput>

                            <div className='row'>
                                <div className="form-group col-md-6 mx-auto">
                                    <FormInput placeholder="Enter your end date" name={ACTIONS.END_DATE}
                                        updateUserInput={updateUserInput}></FormInput>
                                </div>
                                <div className="form-group col-md-6 mx-auto">
                                    <FormInput placeholder="Enter your CVV" name={ACTIONS.CVV}
                                        type='password' updateUserInput={updateUserInput}></FormInput>
                                </div>
                            </div>

                            <div className="text-center">
                                <button type="submit" className="btnSubmit" >Submit</button>
                            </div>

                            {state.errorTextCardInfo.length > 0 && <p className='span'>{state.errorTextCardInfo}</p>}

                            {state.purchaseComplete &&
                                <ReactModal
                                    isOpen={true}
                                    closeTimeoutMS={3}
                                    shouldCloseOnEsc={true}
                                    shouldCloseOnOverlayClick={true}
                                    contentLabel="Example Modal"
                                >
                                    Congratulations your purchase is complete.
                                </ReactModal>
                            }
                        </form>
                    </div>


                    <div className='col-md-4 col-sm-12'>
                        {products != null && products.map((product, currIndex) => {
                            return (
                                <Card className='parent-product-card'>
                                    <div className='row'>
                                        <Card.Img className='col-md-4' variant='top' src={product.img} alt={product.productName} ></Card.Img>
                                        <div className='col-md-6 col-sm-10'>
                                            <h4>{product.productName}</h4>
                                            <p >{'Cost : $' + product.Cost}</p>
                                            <p >{'Brand : ' + product.manufacturerName}</p>
                                            <p >{'Warranty : ' + product.warranty}</p>
                                        </div>
                                        <div className='parent-cross'>
                                            <AiOutlineClose onClick={() => removeItem(product.id)} />
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}

                        <Card className='parent-product-card'>
                            <h3>{'Total : $' + totalCost}</h3>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CheckoutFormUpdated;