import { createContext, useState, useEffect } from "react";

// Add cart item
const addCartItem = (cartItems, productToAdd) => {
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === productToAdd.id
	);
	// if found increment quantity
	if (existingCartItem) {
		return cartItems.map(cartItem =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// Remove cart item
const removeCartItem = (cartItems, CartItemToRemove) => {
	// find cart item to remove
	const existingCartItem = cartItems.find(
		cartItem => cartItem.id === CartItemToRemove.id
	);
	// check if quantity = 1, if yes remove from cart
	if (existingCartItem.quantity === 1) {
		return cartItems.filter(cartItem => cartItem.id !== CartItemToRemove.id);
	}
	// return back cartitems with matching cart item with reduced quantity
	return cartItems.map(cartItem =>
		cartItem.id === CartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

// clear cart items
const clearCartItem = (cartItems, CartItemToClear) => {
	return cartItems.filter(cartItem => cartItem.id !== CartItemToClear.id);
};

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemToCart: () => {},
	removeItemFromCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [cartTotal, setCartTotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		setCartTotal(newCartTotal);
	}, [cartItems]);

	const addItemToCart = productToAdd => {
		setCartItems(addCartItem(cartItems, productToAdd));
	};

	const removeItemFromCart = CartItemToRemove => {
		setCartItems(removeCartItem(cartItems, CartItemToRemove));
	};

	const clearItemFromCart = CartItemToClear => {
		setCartItems(clearCartItem(cartItems, CartItemToClear));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemToCart,
		removeItemFromCart,
		clearItemFromCart,
		cartItems,
		cartCount,
		cartTotal
	};

	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
