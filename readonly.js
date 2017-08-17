module.exports = {
    register: (exceptionHandler) => {
        if (typeof Function.prototype.callAsReadonly === 'undefined') {
            Function.prototype.callAsReadonly = function(obj, ...params) {
                //const self = {...obj};  // proposal; only works in Chrome at the moment
                const self = Object.assign({}, obj);

                try {
                    return this.call(Object.freeze(self), ...params);
                } catch(e) {
                    if (e instanceof TypeError) {
                        if (typeof exceptionHandler === 'function') exceptionHandler(e);
                        else throw TypeError(e);
                    }
                }
            };
        }
    }
};
