import React from "react";
import { FaShoppingCart } from 'react-icons/fa'
import { Badge, } from 'react-bootstrap'
import { Link } from "react-router-dom";

const Header = (props) => {

    return (
        <>

            <div className="header col-12">
                <div className="cart-parent">
                    {props.isVisible &&
                        <Link to={"/checkout"}>
                            <FaShoppingCart color="white" fontSize="25px"></FaShoppingCart>
                            {props.cartCount != 0 && <Badge bg="success">{props.cartCount}</Badge>}
                        </Link>
                    }
                </div>
            </div>
        </>
    )
}

export default Header