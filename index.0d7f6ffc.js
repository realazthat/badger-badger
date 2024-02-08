// For semistandard.
/* global FileReader */ /* global Image */ /* global Blob */ /* global URL */ /* global XMLSerializer */ var $c0b0e9e2ffdc921d$exports = {};
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $c0b0e9e2ffdc921d$var$runtime = function(exports) {
    "use strict";
    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var defineProperty = Object.defineProperty || function(obj, key, desc) {
        obj[key] = desc.value;
    };
    var undefined; // More compressible than void 0.
    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
    function define(obj, key, value) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
        return obj[key];
    }
    try {
        // IE 8 has a broken Object.defineProperty that only works on DOM objects.
        define({}, "");
    } catch (err) {
        define = function(obj, key, value) {
            return obj[key] = value;
        };
    }
    function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []);
        // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.
        defineProperty(generator, "_invoke", {
            value: makeInvokeMethod(innerFn, self, context)
        });
        return generator;
    }
    exports.wrap = wrap;
    // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.
    function tryCatch(fn, obj, arg) {
        try {
            return {
                type: "normal",
                arg: fn.call(obj, arg)
            };
        } catch (err) {
            return {
                type: "throw",
                arg: err
            };
        }
    }
    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed";
    // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.
    var ContinueSentinel = {};
    // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.
    function Generator() {}
    function GeneratorFunction() {}
    function GeneratorFunctionPrototype() {}
    // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.
    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function() {
        return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    defineProperty(Gp, "constructor", {
        value: GeneratorFunctionPrototype,
        configurable: true
    });
    defineProperty(GeneratorFunctionPrototype, "constructor", {
        value: GeneratorFunction,
        configurable: true
    });
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
    // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.
    function defineIteratorMethods(prototype) {
        [
            "next",
            "throw",
            "return"
        ].forEach(function(method) {
            define(prototype, method, function(arg) {
                return this._invoke(method, arg);
            });
        });
    }
    exports.isGeneratorFunction = function(genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };
    exports.mark = function(genFun) {
        if (Object.setPrototypeOf) Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
        }
        genFun.prototype = Object.create(Gp);
        return genFun;
    };
    // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.
    exports.awrap = function(arg) {
        return {
            __await: arg
        };
    };
    function AsyncIterator(generator, PromiseImpl) {
        function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") reject(record.arg);
            else {
                var result = record.arg;
                var value = result.value;
                if (value && typeof value === "object" && hasOwn.call(value, "__await")) return PromiseImpl.resolve(value.__await).then(function(value) {
                    invoke("next", value, resolve, reject);
                }, function(err) {
                    invoke("throw", err, resolve, reject);
                });
                return PromiseImpl.resolve(value).then(function(unwrapped) {
                    // When a yielded Promise is resolved, its final value becomes
                    // the .value of the Promise<{value,done}> result for the
                    // current iteration.
                    result.value = unwrapped;
                    resolve(result);
                }, function(error) {
                    // If a rejected Promise was yielded, throw the rejection back
                    // into the async generator function so it can be handled there.
                    return invoke("throw", error, resolve, reject);
                });
            }
        }
        var previousPromise;
        function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
                return new PromiseImpl(function(resolve, reject) {
                    invoke(method, arg, resolve, reject);
                });
            }
            return previousPromise = // If enqueue has been called before, then we want to wait until
            // all previous Promises have been resolved before calling invoke,
            // so that results are always delivered in the correct order. If
            // enqueue has not been called before, then it is important to
            // call invoke immediately, without waiting on a callback to fire,
            // so that the async generator function has the opportunity to do
            // any necessary setup in a predictable way. This predictability
            // is why the Promise constructor synchronously invokes its
            // executor callback, and why async functions synchronously
            // execute code before the first await. Since we implement simple
            // async functions in terms of async generators, it is especially
            // important to get this right, even though it requires care.
            previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
            // invocations of the iterator.
            callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        }
        // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).
        defineProperty(this, "_invoke", {
            value: enqueue
        });
    }
    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
        return this;
    });
    exports.AsyncIterator = AsyncIterator;
    // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.
    exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
        if (PromiseImpl === void 0) PromiseImpl = Promise;
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
        return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
         : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
        });
    };
    function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
            if (state === GenStateExecuting) throw new Error("Generator is already running");
            if (state === GenStateCompleted) {
                if (method === "throw") throw arg;
                // Be forgiving, per 25.3.3.3.3 of the spec:
                // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
                return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while(true){
                var delegate = context.delegate;
                if (delegate) {
                    var delegateResult = maybeInvokeDelegate(delegate, context);
                    if (delegateResult) {
                        if (delegateResult === ContinueSentinel) continue;
                        return delegateResult;
                    }
                }
                if (context.method === "next") // Setting context._sent for legacy support of Babel's
                // function.sent implementation.
                context.sent = context._sent = context.arg;
                else if (context.method === "throw") {
                    if (state === GenStateSuspendedStart) {
                        state = GenStateCompleted;
                        throw context.arg;
                    }
                    context.dispatchException(context.arg);
                } else if (context.method === "return") context.abrupt("return", context.arg);
                state = GenStateExecuting;
                var record = tryCatch(innerFn, self, context);
                if (record.type === "normal") {
                    // If an exception is thrown from innerFn, we leave state ===
                    // GenStateExecuting and loop back for another invocation.
                    state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                    if (record.arg === ContinueSentinel) continue;
                    return {
                        value: record.arg,
                        done: context.done
                    };
                } else if (record.type === "throw") {
                    state = GenStateCompleted;
                    // Dispatch the exception by looping back around to the
                    // context.dispatchException(context.arg) call above.
                    context.method = "throw";
                    context.arg = record.arg;
                }
            }
        };
    }
    // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.
    function maybeInvokeDelegate(delegate, context) {
        var methodName = context.method;
        var method = delegate.iterator[methodName];
        if (method === undefined) {
            // A .throw or .return when the delegate iterator has no .throw
            // method, or a missing .next mehtod, always terminate the
            // yield* loop.
            context.delegate = null;
            // Note: ["return"] must be used for ES3 parsing compatibility.
            if (methodName === "throw" && delegate.iterator["return"]) {
                // If the delegate iterator has a return method, give it a
                // chance to clean up.
                context.method = "return";
                context.arg = undefined;
                maybeInvokeDelegate(delegate, context);
                if (context.method === "throw") // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
            }
            if (methodName !== "return") {
                context.method = "throw";
                context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method");
            }
            return ContinueSentinel;
        }
        var record = tryCatch(method, delegate.iterator, context.arg);
        if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
        }
        var info = record.arg;
        if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
        }
        if (info.done) {
            // Assign the result of the finished delegate to the temporary
            // variable specified by delegate.resultName (see delegateYield).
            context[delegate.resultName] = info.value;
            // Resume execution at the desired location (see delegateYield).
            context.next = delegate.nextLoc;
            // If context.method was "throw" but the delegate handled the
            // exception, let the outer generator proceed normally. If
            // context.method was "next", forget context.arg since it has been
            // "consumed" by the delegate iterator. If context.method was
            // "return", allow the original .return call to continue in the
            // outer generator.
            if (context.method !== "return") {
                context.method = "next";
                context.arg = undefined;
            }
        } else // Re-yield the result returned by the delegate method.
        return info;
        // The delegate iterator is finished, so forget it and continue with
        // the outer generator.
        context.delegate = null;
        return ContinueSentinel;
    }
    // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.
    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator");
    // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.
    define(Gp, iteratorSymbol, function() {
        return this;
    });
    define(Gp, "toString", function() {
        return "[object Generator]";
    });
    function pushTryEntry(locs) {
        var entry = {
            tryLoc: locs[0]
        };
        if (1 in locs) entry.catchLoc = locs[1];
        if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
        }
        this.tryEntries.push(entry);
    }
    function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
    }
    function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [
            {
                tryLoc: "root"
            }
        ];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
    }
    exports.keys = function(val) {
        var object = Object(val);
        var keys = [];
        for(var key in object)keys.push(key);
        keys.reverse();
        // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.
        return function next() {
            while(keys.length){
                var key = keys.pop();
                if (key in object) {
                    next.value = key;
                    next.done = false;
                    return next;
                }
            }
            // To avoid creating an additional object, we just hang the .value
            // and .done properties off the next function object itself. This
            // also ensures that the minifier will not anonymize the function.
            next.done = true;
            return next;
        };
    };
    function values(iterable) {
        if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) return iteratorMethod.call(iterable);
            if (typeof iterable.next === "function") return iterable;
            if (!isNaN(iterable.length)) {
                var i = -1, next = function next() {
                    while(++i < iterable.length)if (hasOwn.call(iterable, i)) {
                        next.value = iterable[i];
                        next.done = false;
                        return next;
                    }
                    next.value = undefined;
                    next.done = true;
                    return next;
                };
                return next.next = next;
            }
        }
        // Return an iterator with no values.
        return {
            next: doneResult
        };
    }
    exports.values = values;
    function doneResult() {
        return {
            value: undefined,
            done: true
        };
    }
    Context.prototype = {
        constructor: Context,
        reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            // Resetting context._sent for legacy support of Babel's
            // function.sent implementation.
            this.sent = this._sent = undefined;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
                for(var name in this)// Not sure about the optimal order of these conditions:
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) this[name] = undefined;
            }
        },
        stop: function() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") throw rootRecord.arg;
            return this.rval;
        },
        dispatchException: function(exception) {
            if (this.done) throw exception;
            var context = this;
            function handle(loc, caught) {
                record.type = "throw";
                record.arg = exception;
                context.next = loc;
                if (caught) {
                    // If the dispatched exception was caught by a catch block,
                    // then let that catch block handle the exception normally.
                    context.method = "next";
                    context.arg = undefined;
                }
                return !!caught;
            }
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                var record = entry.completion;
                if (entry.tryLoc === "root") // Exception thrown outside of any try block that could handle
                // it, so set the completion value of the entire function to
                // throw the exception.
                return handle("end");
                if (entry.tryLoc <= this.prev) {
                    var hasCatch = hasOwn.call(entry, "catchLoc");
                    var hasFinally = hasOwn.call(entry, "finallyLoc");
                    if (hasCatch && hasFinally) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                        else if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else if (hasCatch) {
                        if (this.prev < entry.catchLoc) return handle(entry.catchLoc, true);
                    } else if (hasFinally) {
                        if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
                    } else throw new Error("try statement without catch or finally");
                }
            }
        },
        abrupt: function(type, arg) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                    var finallyEntry = entry;
                    break;
                }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
                this.method = "next";
                this.next = finallyEntry.finallyLoc;
                return ContinueSentinel;
            }
            return this.complete(record);
        },
        complete: function(record, afterLoc) {
            if (record.type === "throw") throw record.arg;
            if (record.type === "break" || record.type === "continue") this.next = record.arg;
            else if (record.type === "return") {
                this.rval = this.arg = record.arg;
                this.method = "return";
                this.next = "end";
            } else if (record.type === "normal" && afterLoc) this.next = afterLoc;
            return ContinueSentinel;
        },
        finish: function(finallyLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.finallyLoc === finallyLoc) {
                    this.complete(entry.completion, entry.afterLoc);
                    resetTryEntry(entry);
                    return ContinueSentinel;
                }
            }
        },
        "catch": function(tryLoc) {
            for(var i = this.tryEntries.length - 1; i >= 0; --i){
                var entry = this.tryEntries[i];
                if (entry.tryLoc === tryLoc) {
                    var record = entry.completion;
                    if (record.type === "throw") {
                        var thrown = record.arg;
                        resetTryEntry(entry);
                    }
                    return thrown;
                }
            }
            // The context.catch method must only be called with a location
            // argument that corresponds to a known catch block.
            throw new Error("illegal catch attempt");
        },
        delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
                iterator: values(iterable),
                resultName: resultName,
                nextLoc: nextLoc
            };
            if (this.method === "next") // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
            return ContinueSentinel;
        }
    };
    // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.
    return exports;
}(// If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
(0, $c0b0e9e2ffdc921d$exports));
try {
    regeneratorRuntime = $c0b0e9e2ffdc921d$var$runtime;
} catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if (typeof globalThis === "object") globalThis.regeneratorRuntime = $c0b0e9e2ffdc921d$var$runtime;
    else Function("r", "regeneratorRuntime = r")($c0b0e9e2ffdc921d$var$runtime);
}


function $7996c9b92ef7fb2f$var$ClearCircle({ x: x, y: y, radius: radius, ctx: ctx }) {
    // ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
}
function $7996c9b92ef7fb2f$var$FillCircle({ x: x, y: y, radius: radius, color: color, ctx: ctx }) {
    console.log(`FillCircle().x: ${x}, y: ${y}, radius: ${radius}, color: ${color}`);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
}
function $7996c9b92ef7fb2f$var$DrawImage({ canvas: canvas, ctx: ctx, img: img, imgSize: imgSize, u: u, v: v, radiusU: radiusU, borderU: borderU, fontSizeU: fontSizeU, offsetU: offsetU, offsetV: offsetV }) {
    ctx.drawImage(img, 0, 0, imgSize, imgSize);
    $7996c9b92ef7fb2f$var$ClearCircle({
        x: u * imgSize,
        y: v * imgSize,
        radius: (radiusU + borderU) * imgSize,
        ctx: ctx
    });
    $7996c9b92ef7fb2f$var$FillCircle({
        x: u * imgSize,
        y: v * imgSize,
        radius: radiusU * imgSize,
        color: "red",
        ctx: ctx
    });
    // Add number to the badge,
    const textSizePX = fontSizeU * imgSize;
    ctx.fillStyle = "white";
    ctx.font = `700 ${textSizePX}px "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif`;
    const text = document.getElementById("badge-text").value;
    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
    const method = "centering";
    if (method === "centering") {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
    }
    let centerX = u * imgSize;
    centerX += offsetU * imgSize;
    let centerY = v * imgSize;
    centerY += offsetV * imgSize;
    if (method === "metrics") {
        centerX -= textWidth / 2;
        centerY += textHeight / 2;
    }
    ctx.fillText(text, centerX, centerY);
}
function $7996c9b92ef7fb2f$var$DrawImageOverlay({ canvas: canvas, ctx: ctx, img: img, imgSize: imgSize, alpha: alpha }) {
    console.log(`DrawImageOverlay().imgSize: ${imgSize}, alpha: ${alpha}, img.width: ${img.width}, img.height: ${img.height}`);
    ctx.globalAlpha = alpha;
    ctx.drawImage(img, 0, 0, imgSize, imgSize);
    ctx.globalAlpha = 1;
}
function $7996c9b92ef7fb2f$var$DrawOutlineOverlay({ canvas: canvas, ctx: ctx, imgSize: imgSize, alpha: alpha, roundness: roundness }) {
    const offScreenCanvas = document.createElement("canvas");
    offScreenCanvas.width = imgSize;
    offScreenCanvas.height = imgSize;
    const offCtx = offScreenCanvas.getContext("2d");
    // Fill the background with semitransparent color
    offCtx.fillStyle = `rgba(54, 57, 63, ${alpha})`;
    offCtx.fillRect(0, 0, imgSize, imgSize);
    // Set composite operation for transparent cut-out
    offCtx.globalCompositeOperation = "destination-out";
    // Calculate radius for rounded corners
    const radius = imgSize / 2 * roundness;
    const fullCircle = roundness === 1;
    if (!fullCircle) {
        // Draw path for rounded rectangle
        offCtx.beginPath();
        offCtx.moveTo(radius, 0);
        offCtx.lineTo(imgSize - radius, 0);
        offCtx.arc(imgSize - radius, radius, radius, 1.5 * Math.PI, 2 * Math.PI);
        offCtx.lineTo(imgSize, imgSize - radius);
        offCtx.arc(imgSize - radius, imgSize - radius, radius, 0, 0.5 * Math.PI);
        offCtx.lineTo(radius, imgSize);
        offCtx.arc(radius, imgSize - radius, radius, 0.5 * Math.PI, Math.PI);
        offCtx.lineTo(0, radius);
        offCtx.arc(radius, radius, radius, Math.PI, 1.5 * Math.PI);
        offCtx.closePath();
    } else {
        // Draw a circle for roundness = 1
        offCtx.beginPath();
        offCtx.arc(imgSize / 2, imgSize / 2, radius, 0, 2 * Math.PI);
    }
    offCtx.fillStyle = "rgba(255, 255, 255, 1)";
    offCtx.fill();
    // Reset composite operation to default
    offCtx.globalCompositeOperation = "source-over";
    ctx.drawImage(offScreenCanvas, 0, 0, imgSize, imgSize);
}
function $7996c9b92ef7fb2f$var$SVGDrawImage({ svg: svg /*: SVGElement */ , svgSize: svgSize, img: img /*: Image */ , u: u, v: v, fontSizeU: fontSizeU, offsetU: offsetU, offsetV: offsetV, radius: radius, border: border }) {
    // Create mask:
    const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    mask.setAttribute("id", "image-mask");
    // Mask's full-opacity rectangle:
    const maskRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    maskRect.setAttribute("x", "0");
    maskRect.setAttribute("y", "0");
    maskRect.setAttribute("width", "100%");
    maskRect.setAttribute("height", "100%");
    maskRect.setAttribute("fill", "white");
    mask.appendChild(maskRect);
    // Mask's transparent circle:
    const maskCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    maskCircle.setAttribute("cx", u * svgSize);
    maskCircle.setAttribute("cy", v * svgSize);
    maskCircle.setAttribute("r", (radius + border) * svgSize);
    maskCircle.setAttribute("fill", "black");
    mask.appendChild(maskCircle);
    svg.appendChild(mask);
    // Draw the image with mask applied:
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("x", "0");
    image.setAttribute("y", "0");
    image.setAttribute("width", "100%");
    image.setAttribute("height", "100%");
    image.setAttribute("href", img.src);
    image.setAttribute("mask", "url(#image-mask)");
    svg.appendChild(image);
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", u * svgSize);
    circle.setAttribute("cy", v * svgSize);
    circle.setAttribute("r", radius * svgSize);
    // Set color
    circle.setAttribute("fill", "red");
    svg.appendChild(circle);
    // Add number to the badge,
    const text = document.getElementById("badge-text").value;
    const textSizePX = fontSizeU * svgSize;
    const textX = u * svgSize + offsetU * svgSize;
    let textY = v * svgSize + offsetV * svgSize;
    textY += radius / 2 * svgSize;
    const textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    textElement.setAttribute("x", textX);
    textElement.setAttribute("y", textY);
    textElement.setAttribute("fill", "white");
    textElement.setAttribute("text-anchor", "middle");
    // textElement.setAttribute('dominant-baseline', 'middle');
    // textElement.setAttribute('alignment-baseline', 'middle');
    // textElement.setAttribute('alignment-baseline', 'central');
    // textElement.setAttribute('alignment-baseline', 'mathematical ');
    textElement.setAttribute("vertical-align", "middle");
    textElement.setAttribute("font-size", `${textSizePX}px`);
    textElement.setAttribute("font-weight", "700");
    textElement.setAttribute("font-family", '"gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif');
    textElement.textContent = text;
    svg.appendChild(textElement);
    svg.style.display = "block";
}
function $7996c9b92ef7fb2f$var$ClearSVG({ svg: svg }) {
    while(svg.firstChild)svg.removeChild(svg.firstChild);
}
function $7996c9b92ef7fb2f$var$SVGDrawImageOverlay({ svg: svg, img: img, alpha: alpha }) {
    const image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    image.setAttribute("x", "0");
    image.setAttribute("y", "0");
    image.setAttribute("width", "100%");
    image.setAttribute("height", "100%");
    image.setAttribute("href", img.src);
    image.setAttribute("opacity", alpha);
    svg.appendChild(image);
}
function $7996c9b92ef7fb2f$var$SVGDrawOutlineOverlay({ svg: svg, svgSize: svgSize, alpha: alpha, roundness: roundness }) {
    const mask = document.createElementNS("http://www.w3.org/2000/svg", "mask");
    mask.setAttribute("id", "outline-overlay-image-mask");
    // Mask's full-opacity rectangle:
    const visibleRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    visibleRect.setAttribute("x", "0");
    visibleRect.setAttribute("y", "0");
    visibleRect.setAttribute("width", "100%");
    visibleRect.setAttribute("height", "100%");
    visibleRect.setAttribute("fill", "white");
    mask.appendChild(visibleRect);
    const transparentRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    transparentRect.setAttribute("x", "0");
    transparentRect.setAttribute("y", "0");
    transparentRect.setAttribute("width", "100%");
    transparentRect.setAttribute("height", "100%");
    transparentRect.setAttribute("fill", "black");
    // Add corner radius
    transparentRect.setAttribute("rx", `${roundness * svgSize / 2}px`);
    transparentRect.setAttribute("ry", `${roundness * svgSize / 2}px`);
    mask.appendChild(transparentRect);
    svg.appendChild(mask);
    // Draw a rect with the mask applied
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", "0");
    rect.setAttribute("y", "0");
    rect.setAttribute("opacity", alpha);
    rect.setAttribute("width", "100%");
    rect.setAttribute("height", "100%");
    rect.setAttribute("fill", "rgba(54, 57, 63)");
    rect.setAttribute("mask", "url(#outline-overlay-image-mask)");
    svg.appendChild(rect);
}
class $7996c9b92ef7fb2f$var$State {
    constructor(){
        this.mainImage = new Image();
        this.overlayImage = new Image();
        this._imageOverlayAlpha = 0.5;
        this._outlineOverlayAlpha = 0.5;
        this._outlineRoundness = 0;
        this._u = 0;
        this._v = 0;
        this._normalizedRadius = 0;
        this._normalizedBorder = 0;
        this._badgeText = "1";
        this._normalizedFontSize = 0;
        this._uTextOffset = 0;
        this._vTextOffset = 0;
        this.dirty = false;
    }
    GetImageWH() {
        return {
            w: this.mainImage.width,
            h: this.mainImage.height
        };
    }
    _RedrawEverything() {
        const canvas = document.getElementById("canvas");
        canvas.width = 256;
        canvas.height = 256;
        canvas.style.display = "block";
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        $7996c9b92ef7fb2f$var$DrawImage({
            canvas: canvas,
            ctx: ctx,
            img: this.mainImage,
            imgSize: 256,
            u: this.u,
            v: this.v,
            fontSizeU: this.normalizedFontSize,
            offsetU: this.uTextOffset,
            offsetV: this.vTextOffset,
            radiusU: this.normalizedRadius,
            borderU: this.normalizedBorder
        });
        const canvasOverlay = document.getElementById("canvas-overlay");
        canvasOverlay.style.display = "block";
        canvasOverlay.width = 256;
        canvasOverlay.height = 256;
        const ctxOverlay = canvasOverlay.getContext("2d");
        ctxOverlay.clearRect(0, 0, canvas.width, canvas.height);
        $7996c9b92ef7fb2f$var$DrawImageOverlay({
            canvas: canvasOverlay,
            ctx: ctxOverlay,
            img: this.overlayImage,
            imgSize: 256,
            alpha: this.imageOverlayAlpha
        });
        $7996c9b92ef7fb2f$var$DrawOutlineOverlay({
            canvas: canvasOverlay,
            ctx: ctxOverlay,
            imgSize: 256,
            alpha: this.outlineOverlayAlpha,
            roundness: this.outlineRoundness
        });
        const svg = document.getElementById("svg");
        svg.style.display = "block";
        svg.setAttribute("width", 256);
        svg.setAttribute("height", 256);
        $7996c9b92ef7fb2f$var$ClearSVG({
            svg: svg
        });
        $7996c9b92ef7fb2f$var$SVGDrawImage({
            svg: svg,
            svgSize: 256,
            img: this.mainImage,
            u: this.u,
            v: this.v,
            fontSizeU: this.normalizedFontSize,
            offsetU: this.uTextOffset,
            offsetV: this.vTextOffset,
            radius: this.normalizedRadius,
            border: this.normalizedBorder
        });
        const svgOverlay = document.getElementById("svg-overlay");
        svgOverlay.style.display = "block";
        $7996c9b92ef7fb2f$var$ClearSVG({
            svg: svgOverlay
        });
        $7996c9b92ef7fb2f$var$SVGDrawImageOverlay({
            svg: svgOverlay,
            img: this.overlayImage,
            alpha: this.imageOverlayAlpha
        });
        $7996c9b92ef7fb2f$var$SVGDrawOutlineOverlay({
            svg: svgOverlay,
            svgSize: 256,
            alpha: this.outlineOverlayAlpha,
            roundness: this.outlineRoundness
        });
        console.log(`_RedrawEverything().x: ${this.x}, y: ${this.y}, u: ${this.u}, v: ${this.v}`);
        const mainImage = this.mainImage;
        function SetOrDisable(id, value) {
            if (mainImage.width === 0) {
                document.getElementById(id).value = "0";
                document.getElementById(id).disabled = true;
            } else {
                document.getElementById(id).value = value;
                document.getElementById(id).disabled = false;
            }
        }
        document.getElementById("image-overlay-alpha").value = this.imageOverlayAlpha;
        document.getElementById("outline-overlay-alpha").value = this.outlineOverlayAlpha;
        document.getElementById("outline-overlay-roundness").value = this.outlineRoundness;
        SetOrDisable("x", this.x);
        SetOrDisable("y", this.y);
        document.getElementById("u").value = this.u;
        document.getElementById("v").value = this.v;
        document.getElementById("normalized-radius").value = this.normalizedRadius;
        document.getElementById("normalized-border").value = this.normalizedBorder;
        SetOrDisable("pixel-radius", this.pixelRadius);
        SetOrDisable("pixel-border", this.pixelBorder);
        document.getElementById("badge-text").value = this.badgeText;
        document.getElementById("normalized-font-size").value = this.normalizedFontSize;
        document.getElementById("normalized-offset-u").value = this.uTextOffset;
        document.getElementById("normalized-offset-v").value = this.vTextOffset;
        SetOrDisable("pixel-font-size", this.pixelFontSize);
        SetOrDisable("pixel-offset-x", this.xTextOffset);
        SetOrDisable("pixel-offset-y", this.yTextOffset);
        console.log(this);
    }
    MarkDirty() {
        if (this.dirty) return;
        this.dirty = true;
        // Since the image size might have changed, recompute all the computed values that depends on the image size.
        this.u = 1.0 * this.u;
        this.v = 1.0 * this.v;
        this.normalizedRadius = 1.0 * this.normalizedRadius;
        this.normalizedBorder = 1.0 * this.normalizedBorder;
        setTimeout(()=>{
            this._RedrawEverything();
            this.dirty = false;
        }, 0);
    }
    set imageOverlayAlpha(value) {
        this._imageOverlayAlpha = value;
    }
    get imageOverlayAlpha() {
        return this._imageOverlayAlpha;
    }
    set outlineOverlayAlpha(value) {
        this._outlineOverlayAlpha = value;
    }
    get outlineOverlayAlpha() {
        return this._outlineOverlayAlpha;
    }
    set outlineRoundness(value) {
        this._outlineRoundness = value;
    }
    get outlineRoundness() {
        return this._outlineRoundness;
    }
    set x(value) {
        this._u = value / this.GetImageWH().w;
    }
    get x() {
        return this._u * this.GetImageWH().w;
    }
    set y(value) {
        this._v = value / this.GetImageWH().h;
    }
    get y() {
        return this._v * this.GetImageWH().h;
    }
    set u(value) {
        this._u = value;
    }
    get u() {
        return this._u;
    }
    set v(value) {
        this._v = value;
    }
    get v() {
        return this._v;
    }
    set pixelRadius(value) {
        this._normalizedRadius = value / this.GetImageWH().w;
    }
    get pixelRadius() {
        return this._normalizedRadius * this.GetImageWH().w;
    }
    set normalizedRadius(value) {
        this._normalizedRadius = value;
    }
    get normalizedRadius() {
        return this._normalizedRadius;
    }
    set pixelBorder(value) {
        this._normalizedBorder = value / this.GetImageWH().w;
    }
    get pixelBorder() {
        return this._normalizedBorder * this.GetImageWH().w;
    }
    set normalizedBorder(value) {
        this._normalizedBorder = value;
    }
    get normalizedBorder() {
        return this._normalizedBorder;
    }
    set badgeText(value) {
        this._badgeText = value;
    }
    get badgeText() {
        return this._badgeText;
    }
    set normalizedFontSize(value) {
        this._normalizedFontSize = value;
    }
    get normalizedFontSize() {
        return this._normalizedFontSize;
    }
    set pixelFontSize(value) {
        this._normalizedFontSize = value / this.GetImageWH().w;
    }
    get pixelFontSize() {
        return this._normalizedFontSize * this.GetImageWH().w;
    }
    set uTextOffset(value) {
        this._uTextOffset = value;
    }
    get uTextOffset() {
        return this._uTextOffset;
    }
    set xTextOffset(value) {
        this._uTextOffset = value / this.GetImageWH().w;
    }
    get xTextOffset() {
        return this._uTextOffset * this.GetImageWH().w;
    }
    set vTextOffset(value) {
        this._vTextOffset = value;
    }
    get vTextOffset() {
        return this._vTextOffset;
    }
    set yTextOffset(value) {
        this._vTextOffset = value / this.GetImageWH().h;
    }
    get yTextOffset() {
        return this._vTextOffset * this.GetImageWH().h;
    }
}
async function $7996c9b92ef7fb2f$var$LoadBlobAsImage(blob) {
    return new Promise((resolve, reject)=>{
        const img = new Image();
        function handleLoad() {
            img.removeEventListener("load", handleLoad);
            img.removeEventListener("error", handleError);
            resolve(img);
        }
        function handleError(error) {
            img.removeEventListener("load", handleLoad);
            img.removeEventListener("error", handleError);
            reject(error);
        }
        img.addEventListener("load", handleLoad);
        img.addEventListener("error", handleError);
        img.src = URL.createObjectURL(blob);
    });
}
async function $7996c9b92ef7fb2f$var$LoadImageAsBlob(image /* Image */ ) {
    console.log(`LoadImageAsBlob().image: ${image}, image.width: ${image.width}, image.height: ${image.height}`);
    console.log(`image instanceof Image: ${image instanceof Image}`);
    return await new Promise((resolve, reject)=>{
        // Define the processImage function to be used in the load event listener
        const processImage = ()=>{
            const canvas = document.createElement("canvas");
            canvas.width = image.width;
            canvas.height = image.height;
            console.log(`LoadImageAsBlob().processImage().image.width: ${image.width}, image.height: ${image.height}`);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            canvas.toBlob((blob)=>{
                resolve(blob);
            }, "image/png");
            // Clean up: Remove the event listener after processing the image
            image.removeEventListener("load", processImage);
            image.removeEventListener("error", handleError);
        };
        // Define the handleError function to be used in the error event listener
        const handleError = (error)=>{
            reject(error);
            // Clean up: Remove the event listener if there's an error
            image.removeEventListener("load", processImage);
            image.removeEventListener("error", handleError);
        };
        if (image.complete && image.naturalHeight !== 0) // If the image is already loaded, process it immediately
        processImage();
        else {
            // If the image is not yet loaded, wait for it to load
            image.addEventListener("load", processImage);
            image.addEventListener("error", handleError);
        }
    });
}
/// /////////////////////////////////////////////////////////////////////////////
window.badgerState = new $7996c9b92ef7fb2f$var$State();
/// /////////////////////////////////////////////////////////////////////////////
document.getElementById("upload-image").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        window.badgerState.mainImage = new Image();
        window.badgerState.mainImage.onload = function() {
            window.badgerState.MarkDirty();
        };
        window.badgerState.mainImage.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});
document.getElementById("upload-image-overlay").addEventListener("change", function(e) {
    window.badgerState.overlayImage = new Image();
    const reader = new FileReader();
    reader.onload = function(event) {
        window.badgerState.overlayImage = new Image();
        window.badgerState.overlayImage.onload = function() {
            window.badgerState.MarkDirty();
        };
        window.badgerState.overlayImage.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});
document.getElementById("download-image").addEventListener("click", function(e) {
    const canvas = document.getElementById("canvas");
    const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.download = "badger-badger-pfp.png";
    link.href = image;
    link.click();
});
document.getElementById("download-svg").addEventListener("click", function(e) {
    const svg = document.getElementById("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const blob = new Blob([
        svgData
    ], {
        type: "image/svg+xml"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "badger-badger-pfp.svg";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
});
document.getElementById("download-svg-as-png").addEventListener("click", function(e) {
    const svg = document.getElementById("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement("a");
        link.download = "badger-badger-pfp-svg.png";
        link.href = image;
        link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
});
/// /////////////////////////////////////////////////////////////////////////////
for (const eventName of [
    "input",
    "change"
]){
    document.getElementById("image-overlay-alpha").addEventListener(eventName, function(e) {
        window.badgerState.imageOverlayAlpha = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("outline-overlay-alpha").addEventListener(eventName, function(e) {
        window.badgerState.outlineOverlayAlpha = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("outline-overlay-roundness").addEventListener(eventName, function(e) {
        window.badgerState.outlineRoundness = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("x").addEventListener(eventName, function(e) {
        window.badgerState.x = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("y").addEventListener(eventName, function(e) {
        window.badgerState.y = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("u").addEventListener(eventName, function(e) {
        window.badgerState.u = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("v").addEventListener(eventName, function(e) {
        window.badgerState.v = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("pixel-radius").addEventListener(eventName, function(e) {
        window.badgerState.pixelRadius = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("normalized-radius").addEventListener(eventName, function(e) {
        window.badgerState.normalizedRadius = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("pixel-border").addEventListener(eventName, function(e) {
        window.badgerState.pixelBorder = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("normalized-border").addEventListener(eventName, function(e) {
        window.badgerState.normalizedBorder = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("badge-text").addEventListener(eventName, function(e) {
        window.badgerState.badgeText = e.target.value;
        window.badgerState.MarkDirty();
    });
    document.getElementById("pixel-font-size").addEventListener(eventName, function(e) {
        window.badgerState.pixelFontSize = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("normalized-font-size").addEventListener(eventName, function(e) {
        window.badgerState.normalizedFontSize = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("pixel-offset-x").addEventListener(eventName, function(e) {
        window.badgerState.xTextOffset = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("normalized-offset-u").addEventListener(eventName, function(e) {
        window.badgerState.uTextOffset = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("pixel-offset-y").addEventListener(eventName, function(e) {
        window.badgerState.yTextOffset = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
    document.getElementById("normalized-offset-v").addEventListener(eventName, function(e) {
        window.badgerState.vTextOffset = parseFloat(e.target.value);
        window.badgerState.MarkDirty();
    });
}
/// /////////////////////////////////////////////////////////////////////////////
document.getElementById("outline-overlay-roundness-server-default").addEventListener("click", function(e) {
    window.badgerState.outlineRoundness = 0.66;
    window.badgerState.MarkDirty();
});
document.getElementById("outline-overlay-roundness-user-default").addEventListener("click", function(e) {
    window.badgerState.outlineRoundness = 1;
    window.badgerState.MarkDirty();
});
document.getElementById("outline-overlay-roundness-clear").addEventListener("click", function(e) {
    window.badgerState.outlineRoundness = 0;
    window.badgerState.MarkDirty();
});
document.getElementById("lower-right").addEventListener("click", function(e) {
    window.badgerState.u = 1 - 21.25 / 128;
    window.badgerState.v = 1 - 21 / 128;
    window.badgerState.MarkDirty();
});
document.getElementById("lower-left").addEventListener("click", function(e) {
    window.badgerState.u = 21.25 / 128;
    window.badgerState.v = 1 - 21 / 128;
    window.badgerState.MarkDirty();
});
document.getElementById("upper-left").addEventListener("click", function(e) {
    window.badgerState.u = 21.25 / 128;
    window.badgerState.v = 21 / 128;
    window.badgerState.MarkDirty();
});
document.getElementById("upper-right").addEventListener("click", function(e) {
    window.badgerState.u = 1 - 21.25 / 128;
    window.badgerState.v = 21 / 128;
    window.badgerState.MarkDirty();
});
document.getElementById("lower-right-inner").addEventListener("click", function(e) {
    window.badgerState.u = 0.5 + Math.sqrt(2) / 4 - window.badgerState.normalizedRadius;
    window.badgerState.v = 0.5 + Math.sqrt(2) / 4 - window.badgerState.normalizedRadius;
    window.badgerState.MarkDirty();
});
document.getElementById("lower-left-inner").addEventListener("click", function(e) {
    window.badgerState.u = 0.5 - Math.sqrt(2) / 4 + window.badgerState.normalizedRadius;
    window.badgerState.v = 0.5 + Math.sqrt(2) / 4 - window.badgerState.normalizedRadius;
    window.badgerState.MarkDirty();
});
document.getElementById("upper-left-inner").addEventListener("click", function(e) {
    window.badgerState.u = 0.5 - Math.sqrt(2) / 4 + window.badgerState.normalizedRadius;
    window.badgerState.v = 0.5 - Math.sqrt(2) / 4 + window.badgerState.normalizedRadius;
    window.badgerState.MarkDirty();
});
document.getElementById("upper-right-inner").addEventListener("click", function(e) {
    window.badgerState.u = 0.5 + Math.sqrt(2) / 4 - window.badgerState.normalizedRadius;
    window.badgerState.v = 0.5 - Math.sqrt(2) / 4 + window.badgerState.normalizedRadius;
    window.badgerState.MarkDirty();
});
document.getElementById("default-radius").addEventListener("click", function(e) {
    window.badgerState.normalizedRadius = 21 / 128;
    window.badgerState.normalizedBorder = 0.25 - 21 / 128;
    window.badgerState.MarkDirty();
});
document.getElementById("default-contents").addEventListener("click", function(e) {
    window.badgerState.normalizedFontSize = 30 / 128;
    window.badgerState.badgeText = "1";
    window.badgerState.uTextOffset = 0;
    window.badgerState.vTextOffset = 0;
    window.badgerState.MarkDirty();
});
document.getElementById("sample-pfp").addEventListener("click", async function(e) {
    console.log("sample-pfp.click");
    const imageElement = document.getElementById("sample-pfp-image");
    console.log(`imageElement: ${imageElement}`);
    const blob = await $7996c9b92ef7fb2f$var$LoadImageAsBlob(imageElement);
    console.log(`blob instanceof Blob: ${blob instanceof Blob}`);
    window.badgerState.mainImage = await $7996c9b92ef7fb2f$var$LoadBlobAsImage(blob);
    window.badgerState.MarkDirty();
});
document.getElementById("clear-pfp").addEventListener("click", async function(e) {
    window.badgerState.mainImage = new Image();
    window.badgerState.MarkDirty();
});
document.getElementById("sample-pfp-overlay").addEventListener("click", async function(e) {
    const blob = await $7996c9b92ef7fb2f$var$LoadImageAsBlob(document.getElementById("sample-pfp-overlay-image"));
    window.badgerState.overlayImage = await $7996c9b92ef7fb2f$var$LoadBlobAsImage(blob);
    window.badgerState.MarkDirty();
});
document.getElementById("clear-pfp-overlay").addEventListener("click", async function(e) {
    window.badgerState.overlayImage = new Image();
    window.badgerState.MarkDirty();
});
/// /////////////////////////////////////////////////////////////////////////////
document.getElementById("lower-right").click();
document.getElementById("default-radius").click();
document.getElementById("default-contents").click();


//# sourceMappingURL=index.0d7f6ffc.js.map
