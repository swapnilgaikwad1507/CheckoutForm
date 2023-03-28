import React, { useEffect, useState } from "react";
import ProductChildComponent from "./ProductChildComponent";
import { Badge, } from 'react-bootstrap'
import "./productpage.css"
import Header from "../../Components/Header";
import { removeProductFromCartUtils } from "../../util/utils";
import { CART_PRODUCTS_KEY } from "../../util/constnats";

const ListOfProducts = () => {
    var dummyArr = []
    const [cartCount, setCartCount] = useState(0)
    const PRODUCT_LIST = [{ id: 1, productName: 'Football', Cost: 80, manufacturerName: 'Nike', warranty: '2 Years', img: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Football_%28soccer_ball%29.svg', isAdded: false },
    { id: 2, productName: 'Jersey', Cost: 50, manufacturerName: 'Fila', warranty: '3 Years', img: 'https://arenajerseys.com/wp-content/uploads/2022/07/download-28.jpg', isAdded: false },
    { id: 3, productName: 'Studs', Cost: 80, manufacturerName: 'Adidas', warranty: '2 Years', img: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1af46845-3b81-4571-abad-3a9db81377dd/gripknit-phantom-gx-elite-dynamic-fit-fg-football-boot-WnHcNF.png', isAdded: false },
    { id: 4, productName: 'Shin guard', Cost: 30, manufacturerName: 'Puma', warranty: '2 Years', img: 'https://5.imimg.com/data5/IR/DJ/MY-38334257/football-shin-guards-500x500.jpg', isAdded: false },
    { id: 5, productName: 'T-shirt', Cost: 30, manufacturerName: 'Puma', warranty: '2 Years', img: 'https://www.mydesignation.com/wp-content/uploads/2019/08/malayali-tshirt-mydesignation-mockup-image-latest-golden-.jpg', isAdded: false },
    { id: 6, productName: 'Polo T-shirt', Cost: 30, manufacturerName: 'Puma', warranty: '2 Years', img: 'https://www.mydesignation.com/wp-content/uploads/2020/02/petrol-blue-polo-tshirt-image-mydesignation-.jpg', isAdded: false }]

    useEffect(() => {
        if (JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY)) != null) {
            setCartCount(JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY)).length)
        }

    }, [])

    const isAddedInCart = (prodId) => {
        var cartElements = JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY)) ? 
        JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY)) : []

        var isAvailableInCart = false;
        for (var i = 0; i < cartElements.length; i++) {
            if (cartElements[i].id == prodId) {
                isAvailableInCart = true
            }
        }

        return isAvailableInCart

    }

    const removeItFromCart = (id) => {
        isAddedInCart(id)
        setCartCount(removeProductFromCartUtils(id).length)
    }

    const addItToCart = (productId) => {

        var elementPos = PRODUCT_LIST.map(function (x) { return x.id; }).indexOf(productId);
        var objectFound = PRODUCT_LIST[elementPos];

        var mykey = 'isAdded';
        objectFound[mykey] = true;

        var cartProducts = JSON.parse(localStorage.getItem(CART_PRODUCTS_KEY));
        dummyArr = []
        if (cartProducts != null)
            for (var i = 0; i < cartProducts.length; i++) {
                dummyArr.push(cartProducts[i])
            }
        dummyArr.push(objectFound)
        setCartCount(dummyArr.length)
        localStorage.setItem(CART_PRODUCTS_KEY, JSON.stringify(dummyArr));
    }

    return (

        <>
            <Header cartCount={cartCount} isVisible={true} headerName = {'Products'}></Header>
            <div className="productParentContainer">
                {
                    PRODUCT_LIST.map((prod) => {
                        return <ProductChildComponent productName={prod.productName} Cost={prod.Cost}
                            img={prod.img} addItToCart={addItToCart} removeItFromCart={removeItFromCart} id={prod.id} isAdded={isAddedInCart(prod.id)}></ProductChildComponent>
                    })
                }
            </div>

        </>

    )

}

export default ListOfProducts