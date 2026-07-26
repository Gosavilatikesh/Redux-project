# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Introduction to Redux Toolkit
Redux is a global state management library for JavaScript applications, commonly used with React. Instead of passing state down through multiple levels of components (prop drilling), Redux stores the entire application's global state in a central location.
Redux Toolkit (RTK) is the official, modern way to write Redux code. It wraps around core Redux and provides pre-configured tools that simplify setup and reduce boilerplate.
Why Redux Toolkit is Used
Plain "legacy" Redux was powerful but painful to work with. RTK was introduced to fix the biggest pain points developers faced every day:
Problems RTK Solves
Too Much Boilerplate: Standard Redux required separate files for action types, action creators, and reducers. RTK merges all of this into a single createSlice call.
Complex Store Setup: Setting up a store in plain Redux required combining reducers, adding thunk middleware, and configuring Redux DevTools manually. RTK’s configureStore does all of this out of the box with zero configuration.
Accidental State Mutation: In traditional Redux, mutating state directly (e.g., state.push()) broke re-rendering because objects weren't immutable. You had to use spread operators everywhere ([...state, newItem]). RTK includes Immer.js under the hood, allowing you to write "mutating" syntax while safely converting it to immutable updates behind the scenes.
Core Concepts
1. Store
The single source of truth for the entire application. It holds the complete global state tree object. Components connect to the store to read data or trigger updates.
2. Actions
Plain JavaScript objects that represent an intention to change the state. Every action must have a type property (a string describing what happened) and an optional payload (the data being sent).
3. Reducers
Pure functions that take the current state and an action, then return a new state based on that action. They define how the state changes.
4. Slice
A collection of Redux reducer logic and actions for a single feature or domain (e.g., userSlice, counterSlice). It automatically generates action creators and action types based on the reducer functions you define.
5. useSelector and useDispatch
useSelector: A React-Redux hook that extracts specific pieces of data from the Redux store state. The component re-renders whenever the selected data changes.
useDispatch: A React-Redux hook that returns the store's dispatch function. You call dispatch(action) to send actions to the store.
Data Flow in Redux Toolkit
Redux follows a strict one-way data flow:
Plaintext
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

Event Trigger: User clicks a button in a React component.
Dispatch Action: Component calls dispatch(addCounter('New Label')).
Reducer Execution: The store runs the corresponding reducer function inside the slice.
State Update: Reducer updates state in the store.
UI Update: useSelector detects the state change and automatically re-renders the subscribed component.
Standard Folder Structure
Feature-based folder structure (ducks pattern) recommended by the Redux team:
Plaintext
src/
├── app/
│   └── store.js          # Global store configuration
├── features/
│   ├── counters/
│   │   ├── countersSlice.js # Slice logic (actions + reducers)
│   │   └── CounterApp.jsx   # UI components for counters
│   └── user/
│       ├── userSlice.js
│       └── Profile.jsx
├── App.jsx
└── main.jsx

Important Functions
configureStore()
Replaces legacy createStore. Automatically combines slice reducers, adds middleware (like redux-thunk), and enables Redux DevTools extension integration.
JavaScript
import { configureStore } from '@reduxjs/toolkit';
import countersReducer from '../features/counters/countersSlice';

export const store = configureStore({
  reducer: {
    counters: countersReducer,
  },
});

createSlice()
Accepts an initial state, an object of reducer functions, and a slice name. Automatically generates action creators and action type strings.
JavaScript
import { createSlice } from '@reduxjs/toolkit';

const countersSlice = createSlice({
  name: 'counters',
  initialState: { items: [] },
  reducers: {
    addCounter: (state, action) => {
      // Immer allows direct mutations safely here
      state.items.push(action.payload);
    },
  },
});

export const { addCounter } = countersSlice.actions;
export default countersSlice.reducer;

Personal Takeaways & Notes
Local vs. Global State: Not everything belongs in Redux. Form input fields (useState) should stay local to the component until submitted. Only share data globally if multiple unrelated components need access to it.
Immer Magic: state.items.push() works inside RTK slice reducers, but only inside RTK slices. Don't try mutating state outside slice reducers!
Naming Conventions: Name slices using plural nouns (counters, users, cartItems) to keep the global state tree clear (state.counters.items).
Real-World Use Cases
Shopping Cart System: Cart items, total count, discounts, and prices accessed across navbar, product page, and checkout screens.
User Authentication: Storing current user profile, auth tokens, and permissions used across protected routes.
Global Notifications/Toasts: Triggering popups or alert messages from API calls anywhere in the app.
Common Challenges Faced During Implementation
Import Path Errors: Vite throwing Failed to resolve import "./countersSlice" when the relative import path or file capitalization didn't match the file system exact case.
Forgetting to Wrap App in Provider: Attempting to call useSelector or useDispatch without <Provider store="{store}"> at the root (main.jsx) leads to a runtime crash.
Passing Payload Object vs Single Value: Passing multiple parameters to a dispatch (e.g., dispatch(updateValue(id, amount))) instead of combining them into a single payload object (dispatch(updateValue({ id, amount }))).
Additional Things Explored
Redux DevTools Extension: Installed the Chrome/Firefox browser extension to inspect real-time state changes, action history, and time-travel debugging.
createAsyncThunk: Handled asynchronous API requests (loading, success, error states) cleanly using extraReducers.


