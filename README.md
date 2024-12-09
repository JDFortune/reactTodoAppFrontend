Project Notes

# Design Choices
I decided to try out a bunch of new things, out of curiosity (and also because I'm not sure what is preferrable at this point).

## OOP
To handle interaction and manipulation of my todo lists, once received from the backend, I pass the list into a new TodoUtility object that has methods for handling the list in a variety of ways.

I wanted to see if it would make my code cleaner to have all the methods extracted to a single class, but I feel like the end result was more messy than when I had everything working through unrelated utility functions. (I don't think it made it much cleaner).

## image importing

I moved images to my `src/` directory, but it was having trouble linking images in my files, so I had to import them like you would a module and store the image in a variable that I reference in the `img` tag's `src` attribute

## DOM Traversal

To Locate the designated Title's in the Nav Bar (that I use for selecting specific groups of todos, by date/category) and set the designated sections active, I traverse the DOM and I'm not sure if that's the proper way to handle this and maybe a better way would be to render the specific components with some type of boolean value that determines the clicked part of the nav.

## Complex state

A lot of my state ended up being complex objects that hold properties that determine the different functionality of my program.

My moduleState, for instance, holds three properties (`visible`, `todoId`, and `form`) which are altered individually at different times, based on user interactions to make the module visible and render form fields based on a selected todo, or for generating a new form.

I reduced these primarily, because I though I was creating a lot of state with `useState` and I'm not sure what the preferred way to handle things is with react, just yet.

By reducing mutliple separate but related state to single, complex state, I'm able to remove the need to call multiple setState methods in a row, in my code (again, not sure if that is an issue, but I didn't feel good calling `setSomeState` methods three times in a row for the different state in a function, and wanted to see if I could reduce it by changing the state to those single complex objects).

## Event Delegation

I only have a few event listeners set up in my app and they dispatch events to a single handler that determines the actions, based on the event target. I was trying to be clever, but I think it makes it a little harder to parse and, having seen all the later areas affected by it, I think my code could have been more readable by using a little more storage on the front end, to create separate event listeners for each todo and each group selection in the Nav bar. Maybe if you had thousands of todos, this would have been the way to go.

## Conclusions

Ultimately, I changed up a lot of my code at the end to try and practice OOP with a project, to remove gratuitous calls to setState with multiple rerenderings, and to reduce the number of event listeners created by my application, but when I was showing it to my group, I felt like the decisions I made ultimately made it harder to explain and I'd like to write code that's more friendly to the developers I'm working with.

<!-- # React + TypeScript + Vite -->
<!-- 
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
``` -->
