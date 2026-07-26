# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


# 🚀 Redux Toolkit (RTK) — Complete Reference & Study Guide

An all-in-one technical reference, mental model guide, and troubleshooting log for **Redux Toolkit (RTK)** in modern React applications.

---

## 📖 Introduction to Redux Toolkit

**Redux** is a centralized state management library for JavaScript applications. Instead of manually passing state down through multiple nested component layers (**prop drilling**), Redux stores the entire application's state in a single, predictable location.

**Redux Toolkit (RTK)** is the official, opinionated, standard approach for writing Redux logic. It wraps around core Redux to eliminate boilerplate, streamline store configuration, and enforce best practices by default.

---

## 💡 Why Redux Toolkit?

Legacy Redux was powerful, but it introduced significant setup overhead. RTK was introduced to solve three core problems:

### Problems RTK Solves

1. **Boilerplate Overkill:** Standard Redux required separate files for action types, action creators, and reducers. RTK merges all of this into a single `createSlice` call.
2. **Complex Store Setup:** Configuring a legacy store required manually combining reducers, setting up thunk middleware, and configuring browser extension hooks. `configureStore` handles all of this out of the box with zero boilerplate.
3. **Accidental State Mutation:** Direct state mutation (e.g., `state.push()`) breaks React re-renders. Standard Redux required complex spread syntax (`[...state, newItem]`). RTK bakes in **Immer.js**, allowing you to write intuitive "mutating" code that is safely rendered immutably behind the scenes.

---

## 🧩 Core Concepts

| Concept | Description |
| :--- | :--- |
| **Store** | The single source of truth that holds the entire global state tree of the application. |
| **Actions** | Plain JavaScript objects representing an intent to update state. Must contain a `type` string and an optional `payload`. |
| **Reducers** | Pure functions that accept current `state` and an `action`, returning the next state based on that action. |
| **Slice** | A container bundling initial state, reducers, and automatically generated action creators for a specific domain/feature. |
| **`useSelector`** | React-Redux hook to extract specific pieces of state from the store and subscribe components to updates. |
| **`useDispatch`** | React-Redux hook returning the store's `dispatch` function to send actions to reducers. |

---

# 🔄 Data Flow in Redux Toolkit

Redux Toolkit strictly follows a **unidirectional (one-way) data flow** architecture.

```text
[ User Action / UI Event ]
           │
           ▼
    dispatch(action)
           │
           ▼
      [ Reducer ] ────► (Updates State via Immer)
           │
           ▼
       [ Store ]
           │
           ▼
    useSelector() ────► [ Component Re-renders ]
```

---

# 📁 Standard Folder Structure

Redux Toolkit recommends a **feature-based structure (Ducks Pattern)**.

```text
src/
├── app/
│   └── store.js             # Central Redux store configuration
├── features/
│   ├── counters/
│   │   ├── countersSlice.js # Slice logic (reducers + actions)
│   │   └── CounterApp.jsx   # UI component for counters
│   └── user/
│       ├── userSlice.js
│       └── Profile.jsx
├── App.jsx
└── main.jsx
```

---

# 🛠️ Important Functions

## 1. configureStore()

`configureStore()` replaces the legacy `createStore()` function. It automatically:

- Combines reducers
- Adds Redux Thunk middleware
- Enables Redux DevTools
- Provides sensible default configurations

### Example

```javascript
import { configureStore } from '@reduxjs/toolkit';
import countersReducer from '../features/counters/countersSlice';

export const store = configureStore({
  reducer: {
    counters: countersReducer,
  },
});
```

---

## 2. createSlice()

`createSlice()` allows developers to define:

- Slice name
- Initial state
- Reducers

It automatically generates matching action creators and action types.

### Example

```javascript
import { createSlice } from '@reduxjs/toolkit';

const countersSlice = createSlice({
  name: 'counters',
  initialState: { items: [] },
  reducers: {
    addCounter: (state, action) => {
      // Safe mutation using Immer
      state.items.push(action.payload);
    },
  },
});

export const { addCounter } = countersSlice.actions;
export default countersSlice.reducer;
```

---

# 📝 Personal Takeaways & Notes

> 💡 Key Learnings from Development

### Local State vs Global State

Not every piece of data belongs in Redux.

- Temporary form inputs should remain in component state using `useState()`.
- Redux should only store data that needs to be shared across multiple components.

### Understanding Immer

Redux Toolkit uses **Immer.js** internally.

This means code like:

```javascript
state.items.push(action.payload);
```

looks like a mutation but is actually converted into an immutable update behind the scenes.

⚠️ Never mutate Redux state outside of reducers.

### Naming Conventions

Using plural names for slices improves readability.

Examples:

```javascript
state.counters.items
state.users.list
state.cartItems.products
```

This makes the Redux store easier to understand and maintain.

---

# 🌍 Real-World Use Cases

| Domain | Redux Implementation |
|----------|----------|
| 🛒 Shopping Cart System | Managing cart items, quantities, discounts, and totals across multiple pages |
| 🔑 User Authentication | Storing login status, tokens, user roles, and profile data |
| 🔔 Global Notifications | Displaying toast messages and alerts from anywhere in the application |
| 📚 Student Management System | Managing student records across forms, tables, and reports |
| 🏦 Banking Applications | Managing account information, transactions, and user sessions |
| 📦 Inventory Systems | Tracking products, stock levels, and order management |

---

# ⚠️ Common Challenges & Solutions

| Problem / Error | Root Cause | Solution |
|----------------|------------|-----------|
| Failed to resolve import "./countersSlice" | Incorrect file path or file name casing | Verify exact file name and import path |
| Could not find "store" in context of `<Provider>` | Redux Provider missing | Wrap the application with `<Provider store={store}>` |
| Dispatching multiple arguments fails | Redux actions accept only one payload | Pass multiple values inside an object |
| State not updating | Reducer not connected to store | Verify reducer registration inside `configureStore()` |
| useSelector returns undefined | Incorrect state path | Check slice name and selector path |

### Example Fix

```javascript
dispatch(
  updateValue({
    id,
    amount,
  })
);
```

Instead of:

```javascript
dispatch(updateValue(id, amount));
```

---

# 🚀 Additional Explorations

## 🔍 Redux DevTools

Redux DevTools helped in:

- Tracking actions
- Inspecting state changes
- Debugging reducer logic
- Time-travel debugging

---

## ⚡ createAsyncThunk()

Explored handling asynchronous operations using `createAsyncThunk()`.

Useful for:

- Fetching data from APIs
- Loading states
- Error handling
- Async CRUD operations

Example workflow:

```text
pending
   ↓
fulfilled
   ↓
rejected
```

---

## 🔔 Global Notifications / Toasts

Explored triggering global notification messages from Redux state.

Examples:

- Successful login
- Product added to cart
- API request success/failure
- Form submission alerts

This approach avoids passing notification props through multiple component levels.

---

# 📌 Summary

Through this project, I gained practical experience with Redux Toolkit's core concepts including:

- Store
- Slice
- Reducers
- Actions
- useSelector
- useDispatch
- Immer
- Redux DevTools
- Async operations with createAsyncThunk

Redux Toolkit significantly reduces boilerplate code and provides a clean, scalable structure for managing application state in modern React applications.
