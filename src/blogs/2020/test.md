# Hello World

```javascript
const createURL = ({ title, date, description }, hash) => {
  return path.resolve(
    `./blogs/${date.getFullYear()}/${title
      .toLowerCase()
      .split(" ")
      .join("_")}-${hash}.html`
  );
};
```