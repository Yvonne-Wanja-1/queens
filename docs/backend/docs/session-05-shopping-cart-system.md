# Session 05 – Shopping Cart System

**Date:** 20 July 2026

## Objective

The objective of this session was to build a complete Shopping Cart system for Queens’ Touch Beauty Shop.

The cart system allows authenticated users to add products to a cart, view cart contents, update quantities, and remove products from the cart.

---

## Database Design

### carts Table

The `carts` table stores one cart per user.

```sql
CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### cart_items Table

The `cart_items` table stores the products inside each cart.

```sql
CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES carts(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Relationship

* One user has one cart.
* One cart has many cart items.
* Each cart item references one product.

---

## Cart Endpoints

| Method | Endpoint       | Purpose                        |
| ------ | -------------- | ------------------------------ |
| POST   | /cart/add      | Add a product to the cart      |
| GET    | /cart          | View cart contents             |
| PUT    | /cart/item/:id | Update cart item quantity      |
| DELETE | /cart/item/:id | Remove a product from the cart |

---

## Add to Cart Logic

The `addToCart` function performs the following steps:

1. Validates `product_id` and `quantity`.
2. Gets the logged-in user ID from `req.user.id`.
3. Checks whether the product exists.
4. Checks whether the user already has a cart.
5. Creates a cart if one does not exist.
6. Checks whether the product is already in the cart.
7. Updates the quantity if the product exists.
8. Inserts a new cart item if the product does not exist.

---

## View Cart Logic

The `getCart` function:

* Retrieves the user’s cart.
* Joins `cart_items` with `products`.
* Returns product details, quantity, and total price.
* Calculates the overall cart total.

---

## Update Quantity Logic

The `updateCartItem` function:

* Validates the new quantity.
* Ensures the cart item belongs to the logged-in user.
* Updates the quantity in `cart_items`.

---

## Remove From Cart Logic

The `removeFromCart` function:

* Ensures the cart item belongs to the logged-in user.
* Deletes the item from `cart_items`.
* Returns a success message.

---

## Security

All cart routes are protected using JWT authentication middleware.

```javascript
router.use(authenticateToken);
```

This ensures that only logged-in users can access their cart.

---

## Key Concepts Learned

* One-to-many database relationships.
* Foreign keys.
* ON DELETE CASCADE.
* SQL JOIN operations.
* Cart CRUD operations.
* JWT-protected routes.
* Backend cart total calculations.

---

## Project Status

Completed modules:

* Product CRUD with PostgreSQL
* User Authentication
* JWT Authorization
* Admin Role Authorization
* Shopping Cart CRUD

Next module:

* Order and Checkout System
