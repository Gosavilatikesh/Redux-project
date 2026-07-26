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

## 🔄 Data Flow in Redux Toolkit

Redux Toolkit strictly enforces a **unidirectional (one-way) data flow**:

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

📁 Standard Folder Structure
RTK recommends a feature-based structure (Ducks pattern):

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

🛠️ Important Functions
1. configureStore()
Replaces legacy createStore. Automatically combines slice reducers, adds redux-thunk middleware, and enables Redux DevTools integration.

import { configureStore } from '@reduxjs/toolkit';
import countersReducer from '../features/counters/countersSlice';

export const store = configureStore({
  reducer: {
    counters: countersReducer,
  },
});

2. createSlice()
Accepts an initial state, slice name, and reducer functions. Automatically generates matching action creators and action type strings.

import { createSlice } from '@reduxjs/toolkit';

const countersSlice = createSlice({
  name: 'counters',
  initialState: { items: [] },
  reducers: {
    addCounter: (state, action) => {
      // Direct array push is safely handled via Immer
      state.items.push(action.payload);
    },
  },
});

export const { addCounter } = countersSlice.actions;
export default countersSlice.reducer;


📝 Personal Takeaways & Notes
Local vs. Global State: Not all data belongs in Redux. Temporary form values (useState) should remain local until submission. Only lift state to Redux if multiple independent components need access.

Immer Mechanics: state.items.push() works strictly inside RTK slice reducers. Never mutate state outside of slice reducers!

Naming Conventions: Name slices using plural nouns (counters, users, cartItems) to maintain clear global access paths (state.counters.items).

🌍 Real-World Use Cases
Shopping Cart System: Managing cart items, quantities, discounts, and totals shared between Header Nav, Product List, and Checkout components.

User Authentication: Storing session info, access tokens, user roles, and permissions accessed across protected app routes.

Global Notifications/Toasts: Triggering global alert popups from async API responses anywhere in the application tree.
