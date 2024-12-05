## The localStorage object allows you to save key/value pairs in the browser.

The localStorage object stores data with no expiration date.

The data is not deleted when the browser is closed, and are available for future sessions.

## The sessionStorage Object which stores data for one session.
(The data is deleted when the browser window is closed)

## Syntax
window.localStorage
## or just:
localStorage
## Save Data to Local Storage
localStorage.setItem(key, value);
## Read Data from Local Storage
let lastname = localStorage.getItem(key);
## Remove Data from Local Storage
localStorage.removeItem(key);
## Remove All (Clear Local Storage)
localStorage.clear();

## values rakh dete ha to vo saari string mein kar deta hai
## jab values lete hai toh json mein convert karna padta hai
## jab values dete hai to string mein hi dena padta hai

## Example
__ Set and retrieve localStorage name/value pair: __

localStorage.setItem("lastname", "Smith");
localStorage.getItem("lastname");
