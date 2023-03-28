import React from 'react'
import { Button, Card } from 'react-bootstrap'
import "./productpage.css"

const ProductChildComponent = (props) => {

    return (
        <div className='products col-sm-12 col-md-4'>
            <Card className='productsCard'>
                <Card.Img variant='top' src={props.img} alt={props.productName} height={300} width={100}></Card.Img>
                <Card.Body>
                    <Card.Title>{props.productName}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        <span>$ {props.Cost}</span>
                    </Card.Subtitle>

                    <Button style={{ flex: 0.5 }}
                        onClick={() => {
                            if(props.isAdded){
                                props.removeItFromCart(props.id)
                            }else{
                                props.addItToCart(props.id)
                            }
                            
                        }}

                        variant={props.isAdded ? 'danger' : 'primary'}>
                        {props.isAdded ? 'Remove from cart' : 'Add to cart'}
                    </Button>
                    {/* {
                        cart.some(p => p.id === prod.id) ? (
                            <Button style={{ flex: 0.5 }}
                                onClick={() => {
                                    dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: prod
                                    })
                                }}

                                variant='danger'>
                                Remove from Cart
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    dispatch({
                                        type: "ADD_TO_CART",
                                        payload: prod
                                    })
                                }}
                                variant='primary'
                                disabled={!prod.inStock}>
                                {!prod.inStock ? "Out of Stock" : "Add to Cart"}
                            </Button>
                        )
                    } */}


                </Card.Body>
            </Card>
        </div>
    )
}

export default ProductChildComponent