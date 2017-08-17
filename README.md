## Readonly methods in JavaScript

This is an experiment to mimic the behaviour of **const methods in C++**. 

When a function is called with the `callAsReadonly` extension method, it has readonly access to the instance (object properties become immutable). When an attempt is made to write to a property, an exception is thrown. 

### Usage
Arguments can be passed in the usual way.
```javascript
<Function>.callAsReadonly(<Target>[, arg1 [, arg2, ...]]);

app.method.callAsReadonly(app);
app.method.callAsReadonly(app, 3, 2, 1);
```

### Exception handling
A custom exception handler can be registered globally that applies to all readonly calls.


### Example
```javascript
const readonly = require('./readonly');

function myExceptionHandler(err) {
    console.error('Access Violation Exception. Cannot modify object with readonly access.');
}
readonly.register(myExceptionHandler);


class App {
    constructor(name, version) {
        this.name = name;
        this.version = version;
    }
    incrementVersion() {
        this.version++;
    }
}

let app = new App('test', 1);

// Incrementing version...
app.incrementVersion();
// Calling same method as readonly... An exception is thrown
app.incrementVersion.callAsReadonly(app);
```



### Implementation
 - [CommonJS module](readonly.js)
 - See the ES6 [sample application](https://stackblitz.com/edit/react-7um1jz) in action.
