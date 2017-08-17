const readonly = require('./readonly.js');

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

const app = new App('test', 1);

// Incrementing version...
app.incrementVersion();
// Calling same method as readonly... An exception is thrown
app.incrementVersion.callAsReadonly(app);
