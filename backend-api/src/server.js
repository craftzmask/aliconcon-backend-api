"use strict";

const app = require("./app");

const PORT = process.env.PORT || 3055;

app.listen(PORT, () => {
  console.log(`WSV eCommerce start with ${PORT}`);
});
