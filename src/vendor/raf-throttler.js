/**
 * Hijack requestAnimationFrame. It can add preFunction or postFunction.
 *
 * @constructor
 */
var RafThrottler = function () {
    var originalFct = window.requestAnimationFrame;
    var _this = this;
    this.preFunction = null;
    this.postFunction = null;
    this.fps = -1;	// -1 is no throttle, === 0 for still, > 0 is number of frame per second

    //
    var requestAnimationFrame = function (callback) {
        if (_this.fps === -1) {
            originalFct(function (timestamp) {
                onAnimationFrame(callback, timestamp)
            })
        } else if (_this.fps > 0) {
            setTimeout(function () {
                onAnimationFrame(callback, performance.now())
            }, 1000 / _this.fps)
        } else if (_this.fps === 0) {
            var intervalId = setInterval(function () {
                if (_this.fps === 0)    return;
                clearInterval(intervalId);
                onAnimationFrame(callback, performance.now())
            }, 100)
        } else {
            console.assert(false)
        }
    };

    /**
     * restore the original requestAnimationFrame function
     */
    this.restore = function () {
        requestAnimationFrame = originalFct
    };



    function onAnimationFrame(callback, timestamp) {
        if (_this.preFunction !== null) {
            _this.preFunction(timestamp)
        }

        callback(timestamp);

        if (_this.postFunction !== null) {
            _this.postFunction(timestamp)
        }
    }
};
