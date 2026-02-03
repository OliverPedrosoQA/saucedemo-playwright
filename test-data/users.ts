export const SUCCESS_USERS = [
  "standard_user",
  "problem_user",
  "performance_glitch_user",
  "error_user",
  "visual_user",
];

export const ERROR_SCENARIOS = [
  {
    name: "Locked out user",
    user: "locked_out_user",
    pass: "secret_sauce",
    error: "Epic sadface: Sorry, this user has been locked out.",
  },
  {
    name: "Missing username",
    user: "",
    pass: "secret_sauce",
    error: "Epic sadface: Username is required",
  },
  {
    name: "Missing password",
    user: "standard_user",
    pass: "",
    error: "Epic sadface: Password is required",
  },
  {
    name: "Invalid credentials",
    user: "invalid_user",
    pass: "wrong_pass",
    error:
      "Epic sadface: Username and password do not match any user in this service",
  },
];

export const UNAUTHORIZED_SCENARIOS = [
  {
    path: "/inventory.html",
    error:
      "Epic sadface: You can only access '/inventory.html' when you are logged in.",
  },
  {
    path: "/inventory-item.html?id=4",
    error:
      "Epic sadface: You can only access '/inventory-item.html' when you are logged in.",
  },
  {
    path: "/cart.html",
    error:
      "Epic sadface: You can only access '/cart.html' when you are logged in.",
  },
  {
    path: "/checkout-step-one.html",
    error:
      "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.",
  },
  {
    path: "/checkout-step-two.html",
    error:
      "Epic sadface: You can only access '/checkout-step-two.html' when you are logged in.",
  },
  {
    path: "/checkout-complete.html",
    error:
      "Epic sadface: You can only access '/checkout-complete.html' when you are logged in.",
  },
];
