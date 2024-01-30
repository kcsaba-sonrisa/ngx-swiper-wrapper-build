(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('swiper/bundle')) :
    typeof define === 'function' && define.amd ? define('ngx-swiper-wrapper', ['exports', '@angular/core', '@angular/common', 'swiper/bundle'], factory) :
    (global = global || self, factory(global['ngx-swiper-wrapper'] = {}, global.ng.core, global.ng.common, global.Swiper));
}(this, (function (exports, i0, common, Swiper) { 'use strict';

    Swiper = Swiper && Object.prototype.hasOwnProperty.call(Swiper, 'default') ? Swiper['default'] : Swiper;

    var SWIPER_CONFIG = new i0.InjectionToken('SWIPER_CONFIG');
    var SwiperEventNames = [
        'init',
        'beforeDestroy',
        'scroll',
        'progress',
        'keyPress',
        'resize',
        'loopFix',
        'breakpoint',
        'zoomChange',
        'beforeResize',
        'beforeLoopFix',
        'sliderMove',
        'slideChange',
        'setTranslate',
        'setTransition',
        'fromEdge',
        'reachEnd',
        'reachBeginning',
        'autoplay',
        'autoplayStop',
        'autoplayStart',
        'imagesReady',
        'lazyImageLoad',
        'lazyImageReady',
        'scrollbarDragEnd',
        'scrollbarDragMove',
        'scrollbarDragStart',
        'navigationHide',
        'navigationShow',
        'paginationRender',
        'paginationUpdate',
        'paginationHide',
        'paginationShow',
        'swiperTap',
        'swiperClick',
        'swiperDoubleTap',
        'swiperTouchEnd',
        'swiperTouchMove',
        'swiperTouchStart',
        'swiperTouchMoveOpposite',
        'swiperTransitionEnd',
        'swiperTransitionStart',
        'slideNextTransitionEnd',
        'slideNextTransitionStart',
        'slidePrevTransitionEnd',
        'slidePrevTransitionStart',
        'slideChangeTransitionEnd',
        'slideChangeTransitionStart',
        'toEdge',
        'observerUpdate'
    ];
    var SwiperConfig = /** @class */ (function () {
        function SwiperConfig(config) {
            if (config === void 0) { config = {}; }
            this.assign(config);
        }
        SwiperConfig.prototype.assign = function (config, target) {
            if (config === void 0) { config = {}; }
            target = target || this;
            for (var key in config) {
                if (config[key] != null && !Array.isArray(config[key]) && typeof config[key] === 'object' &&
                    (typeof HTMLElement === 'undefined' || !(config[key] instanceof HTMLElement))) {
                    target[key] = {};
                    this.assign(config[key], target[key]);
                }
                else {
                    target[key] = config[key];
                }
            }
        };
        return SwiperConfig;
    }());

    var SwiperDirective = /** @class */ (function () {
        function SwiperDirective(platformId, zone, elementRef, differs, defaults) {
            this.platformId = platformId;
            this.zone = zone;
            this.elementRef = elementRef;
            this.differs = differs;
            this.defaults = defaults;
            this.initialIndex = null;
            this.configDiff = null;
            this.disabled = false;
            this.performance = false;
            this.indexChange = new i0.EventEmitter();
            this.S_INIT = new i0.EventEmitter();
            this.S_BEFOREDESTROY = new i0.EventEmitter();
            this.S_SCROLL = new i0.EventEmitter();
            this.S_PROGRESS = new i0.EventEmitter();
            this.S_KEYPRESS = new i0.EventEmitter();
            this.S_RESIZE = new i0.EventEmitter();
            this.S_BREAKPOINT = new i0.EventEmitter();
            this.S_ZOOMCHANGE = new i0.EventEmitter();
            this.S_AFTERRESIZE = new i0.EventEmitter();
            this.S_BEFORERESIZE = new i0.EventEmitter();
            this.S_LOOPFIX = new i0.EventEmitter();
            this.S_BEFORELOOPFIX = new i0.EventEmitter();
            this.S_SLIDERMOVE = new i0.EventEmitter();
            this.S_SLIDECHANGE = new i0.EventEmitter();
            this.S_SETTRANSLATE = new i0.EventEmitter();
            this.S_SETTRANSITION = new i0.EventEmitter();
            this.S_FROMEDGE = new i0.EventEmitter();
            this.S_TOEDGE = new i0.EventEmitter();
            this.S_REACHEND = new i0.EventEmitter();
            this.S_REACHBEGINNING = new i0.EventEmitter();
            this.S_AUTOPLAY = new i0.EventEmitter();
            this.S_AUTOPLAYSTART = new i0.EventEmitter();
            this.S_AUTOPLAYSTOP = new i0.EventEmitter();
            this.S_IMAGESREADY = new i0.EventEmitter();
            this.S_LAZYIMAGELOAD = new i0.EventEmitter();
            this.S_LAZYIMAGEREADY = new i0.EventEmitter();
            this.S_SCROLLDRAGEND = new i0.EventEmitter();
            this.S_SCROLLDRAGMOVE = new i0.EventEmitter();
            this.S_SCROLLDRAGSTART = new i0.EventEmitter();
            this.S_NAVIGATIONHIDE = new i0.EventEmitter();
            this.S_NAVIGATIONSHOW = new i0.EventEmitter();
            this.S_PAGINATIONRENDER = new i0.EventEmitter();
            this.S_PAGINATIONUPDATE = new i0.EventEmitter();
            this.S_PAGINATIONHIDE = new i0.EventEmitter();
            this.S_PAGINATIONSHOW = new i0.EventEmitter();
            this.S_TAP = new i0.EventEmitter();
            this.S_CLICK = new i0.EventEmitter();
            this.S_DOUBLETAP = new i0.EventEmitter();
            this.S_TOUCHEND = new i0.EventEmitter();
            this.S_TOUCHMOVE = new i0.EventEmitter();
            this.S_TOUCHSTART = new i0.EventEmitter();
            this.S_TOUCHMOVEOPPOSITE = new i0.EventEmitter();
            this.S_TRANSITIONEND = new i0.EventEmitter();
            this.S_TRANSITIONSTART = new i0.EventEmitter();
            this.S_SLIDEPREVTRANSITIONEND = new i0.EventEmitter();
            this.S_SLIDEPREVTRANSITIONSTART = new i0.EventEmitter();
            this.S_SLIDENEXTTRANSITIONEND = new i0.EventEmitter();
            this.S_SLIDENEXTTRANSITIONSTART = new i0.EventEmitter();
            this.S_SLIDECHANGETRANSITIONEND = new i0.EventEmitter();
            this.S_SLIDECHANGETRANSITIONSTART = new i0.EventEmitter();
            this.S_OBSERVERUPDATE = new i0.EventEmitter();
        }
        Object.defineProperty(SwiperDirective.prototype, "index", {
            set: function (index) {
                if (index != null) {
                    this.setIndex(index);
                }
            },
            enumerable: false,
            configurable: true
        });
        SwiperDirective.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (!common.isPlatformBrowser(this.platformId)) {
                return;
            }
            var params = new SwiperConfig(this.defaults);
            params.assign(this.config); // Custom configuration
            if (params.scrollbar === true) {
                params.scrollbar = {
                    el: '.swiper-scrollbar'
                };
            }
            if (params.pagination === true) {
                params.pagination = {
                    el: '.swiper-pagination'
                };
            }
            if (params.navigation === true) {
                params.navigation = {
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next'
                };
            }
            if (this.disabled) {
                params.allowSlidePrev = false;
                params.allowSlideNext = false;
            }
            if (this.initialIndex != null) {
                params.initialSlide = this.initialIndex;
                this.initialIndex = null;
            }
            params.on = {
                slideChange: function () {
                    if (_this.instance && _this.indexChange.observers.length) {
                        _this.emit(_this.indexChange, _this.instance.realIndex);
                    }
                }
            };
            this.zone.runOutsideAngular(function () {
                _this.instance = new Swiper(_this.elementRef.nativeElement, params);
            });
            if (params.init !== false && this.S_INIT.observers.length) {
                this.emit(this.S_INIT, this.instance);
            }
            // Add native Swiper event handling
            SwiperEventNames.forEach(function (eventName) {
                var swiperEvent = eventName.replace('swiper', '');
                swiperEvent = swiperEvent.charAt(0).toLowerCase() + swiperEvent.slice(1);
                _this.instance.on(swiperEvent, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (args.length === 1) {
                        args = args[0];
                    }
                    var output = "S_" + swiperEvent.toUpperCase();
                    var emitter = _this[output];
                    if (emitter.observers.length) {
                        _this.emit(emitter, args);
                    }
                });
            });
            if (!this.configDiff) {
                this.configDiff = this.differs.find(this.config || {}).create();
                this.configDiff.diff(this.config || {});
            }
        };
        SwiperDirective.prototype.ngOnDestroy = function () {
            var _this = this;
            if (this.instance) {
                this.zone.runOutsideAngular(function () {
                    _this.instance.destroy(true, _this.instance.initialized || false);
                });
                this.instance = null;
            }
        };
        SwiperDirective.prototype.ngDoCheck = function () {
            if (this.configDiff) {
                var changes = this.configDiff.diff(this.config || {});
                if (changes) {
                    this.initialIndex = this.getIndex(true);
                    this.ngOnDestroy();
                    this.ngAfterViewInit();
                    this.update();
                }
            }
        };
        SwiperDirective.prototype.ngOnChanges = function (changes) {
            var _this = this;
            if (this.instance && changes['disabled']) {
                if (changes['disabled'].currentValue !== changes['disabled'].previousValue) {
                    if (changes['disabled'].currentValue === true) {
                        this.zone.runOutsideAngular(function () {
                            _this.ngOnDestroy();
                            _this.ngAfterViewInit();
                        });
                    }
                    else if (changes['disabled'].currentValue === false) {
                        this.zone.runOutsideAngular(function () {
                            _this.ngOnDestroy();
                            _this.ngAfterViewInit();
                        });
                    }
                }
            }
        };
        SwiperDirective.prototype.emit = function (emitter, value) {
            if (this.performance) {
                emitter.emit(value);
            }
            else {
                this.zone.run(function () { return emitter.emit(value); });
            }
        };
        SwiperDirective.prototype.swiper = function () {
            return this.instance;
        };
        SwiperDirective.prototype.init = function () {
            var _this = this;
            if (this.instance) {
                this.zone.runOutsideAngular(function () {
                    _this.instance.init();
                });
            }
        };
        SwiperDirective.prototype.update = function () {
            var _this = this;
            setTimeout(function () {
                if (_this.instance) {
                    _this.zone.runOutsideAngular(function () {
                        _this.instance.update();
                    });
                }
            }, 0);
        };
        SwiperDirective.prototype.getIndex = function (real) {
            if (!this.instance) {
                return this.initialIndex || 0;
            }
            else {
                return real ? this.instance.realIndex : this.instance.activeIndex;
            }
        };
        SwiperDirective.prototype.setIndex = function (index, speed, silent) {
            var _this = this;
            if (!this.instance) {
                this.initialIndex = index;
            }
            else {
                var realIndex_1 = index * this.instance.params.slidesPerGroup;
                if (this.instance.params.loop) {
                    realIndex_1 += this.instance.loopedSlides;
                }
                this.zone.runOutsideAngular(function () {
                    _this.instance.slideTo(realIndex_1, speed, !silent);
                });
            }
        };
        SwiperDirective.prototype.prevSlide = function (speed, silent) {
            var _this = this;
            if (this.instance) {
                this.zone.runOutsideAngular(function () {
                    _this.instance.slidePrev(speed, !silent);
                });
            }
        };
        SwiperDirective.prototype.nextSlide = function (speed, silent) {
            var _this = this;
            if (this.instance) {
                this.zone.runOutsideAngular(function () {
                    _this.instance.slideNext(speed, !silent);
                });
            }
        };
        SwiperDirective.prototype.stopAutoplay = function (reset) {
            var _this = this;
            if (reset) {
                this.setIndex(0);
            }
            if (this.instance && this.instance.autoplay) {
                this.zone.runOutsideAngular(function () {
                    _this.instance.autoplay.stop();
                });
            }
        };
        SwiperDirective.prototype.startAutoplay = function (reset) {
            var _this = this;
            if (reset) {
                this.setIndex(0);
            }
            if (this.instance && this.instance.autoplay) {
                this.zone.runOutsideAngular(function () {
                    _this.instance.autoplay.start();
                });
            }
        };
        return SwiperDirective;
    }());
    SwiperDirective.ɵfac = function SwiperDirective_Factory(t) { return new (t || SwiperDirective)(i0.ɵɵdirectiveInject(i0.PLATFORM_ID), i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.KeyValueDiffers), i0.ɵɵdirectiveInject(SWIPER_CONFIG, 8)); };
    SwiperDirective.ɵdir = i0.ɵɵdefineDirective({ type: SwiperDirective, selectors: [["", "swiper", ""]], inputs: { index: "index", disabled: "disabled", performance: "performance", config: ["swiper", "config"] }, outputs: { indexChange: "indexChange", S_INIT: "init", S_BEFOREDESTROY: "beforeDestroy", S_SCROLL: "scroll", S_PROGRESS: "progress", S_KEYPRESS: "keyPress", S_RESIZE: "resize", S_BREAKPOINT: "breakpoint", S_ZOOMCHANGE: "zoomChange", S_AFTERRESIZE: "afterResize", S_BEFORERESIZE: "beforeResize", S_LOOPFIX: "loopFix", S_BEFORELOOPFIX: "beforeLoopFix", S_SLIDERMOVE: "sliderMove", S_SLIDECHANGE: "slideChange", S_SETTRANSLATE: "setTranslate", S_SETTRANSITION: "setTransition", S_FROMEDGE: "fromEdge", S_TOEDGE: "toEdge", S_REACHEND: "reachEnd", S_REACHBEGINNING: "reachBeginning", S_AUTOPLAY: "autoplay", S_AUTOPLAYSTART: "autoplayStart", S_AUTOPLAYSTOP: "autoplayStop", S_IMAGESREADY: "imagesReady", S_LAZYIMAGELOAD: "lazyImageLoad", S_LAZYIMAGEREADY: "lazyImageReady", S_SCROLLDRAGEND: "scrollDragEnd", S_SCROLLDRAGMOVE: "scrollDragMove", S_SCROLLDRAGSTART: "scrollDragStart", S_NAVIGATIONHIDE: "navigationHide", S_NAVIGATIONSHOW: "navigationShow", S_PAGINATIONRENDER: "paginationRender", S_PAGINATIONUPDATE: "paginationUpdate", S_PAGINATIONHIDE: "paginationHide", S_PAGINATIONSHOW: "paginationShow", S_TAP: "swiperTap", S_CLICK: "swiperClick", S_DOUBLETAP: "swiperDoubleTap", S_TOUCHEND: "swiperTouchEnd", S_TOUCHMOVE: "swiperTouchMove", S_TOUCHSTART: "swiperTouchStart", S_TOUCHMOVEOPPOSITE: "swiperTouchMoveOpposite", S_TRANSITIONEND: "swiperTransitionEnd", S_TRANSITIONSTART: "swiperTransitionStart", S_SLIDEPREVTRANSITIONEND: "slidePrevTransitionEnd", S_SLIDEPREVTRANSITIONSTART: "slidePrevTransitionStart", S_SLIDENEXTTRANSITIONEND: "slideNextTransitionEnd", S_SLIDENEXTTRANSITIONSTART: "slideNextTransitionStart", S_SLIDECHANGETRANSITIONEND: "slideChangeTransitionEnd", S_SLIDECHANGETRANSITIONSTART: "slideChangeTransitionStart", S_OBSERVERUPDATE: "observerUpdate" }, exportAs: ["ngxSwiper"], features: [i0.ɵɵNgOnChangesFeature] });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SwiperDirective, [{
                type: i0.Directive,
                args: [{
                        selector: '[swiper]',
                        exportAs: 'ngxSwiper'
                    }]
            }], function () {
            return [{ type: Object, decorators: [{
                            type: i0.Inject,
                            args: [i0.PLATFORM_ID]
                        }] }, { type: i0.NgZone }, { type: i0.ElementRef }, { type: i0.KeyValueDiffers }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [SWIPER_CONFIG]
                        }] }];
        }, { index: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], performance: [{
                    type: i0.Input
                }], config: [{
                    type: i0.Input,
                    args: ['swiper']
                }], indexChange: [{
                    type: i0.Output
                }], S_INIT: [{
                    type: i0.Output,
                    args: ['init']
                }], S_BEFOREDESTROY: [{
                    type: i0.Output,
                    args: ['beforeDestroy']
                }], S_SCROLL: [{
                    type: i0.Output,
                    args: ['scroll']
                }], S_PROGRESS: [{
                    type: i0.Output,
                    args: ['progress']
                }], S_KEYPRESS: [{
                    type: i0.Output,
                    args: ['keyPress']
                }], S_RESIZE: [{
                    type: i0.Output,
                    args: ['resize']
                }], S_BREAKPOINT: [{
                    type: i0.Output,
                    args: ['breakpoint']
                }], S_ZOOMCHANGE: [{
                    type: i0.Output,
                    args: ['zoomChange']
                }], S_AFTERRESIZE: [{
                    type: i0.Output,
                    args: ['afterResize']
                }], S_BEFORERESIZE: [{
                    type: i0.Output,
                    args: ['beforeResize']
                }], S_LOOPFIX: [{
                    type: i0.Output,
                    args: ['loopFix']
                }], S_BEFORELOOPFIX: [{
                    type: i0.Output,
                    args: ['beforeLoopFix']
                }], S_SLIDERMOVE: [{
                    type: i0.Output,
                    args: ['sliderMove']
                }], S_SLIDECHANGE: [{
                    type: i0.Output,
                    args: ['slideChange']
                }], S_SETTRANSLATE: [{
                    type: i0.Output,
                    args: ['setTranslate']
                }], S_SETTRANSITION: [{
                    type: i0.Output,
                    args: ['setTransition']
                }], S_FROMEDGE: [{
                    type: i0.Output,
                    args: ['fromEdge']
                }], S_TOEDGE: [{
                    type: i0.Output,
                    args: ['toEdge']
                }], S_REACHEND: [{
                    type: i0.Output,
                    args: ['reachEnd']
                }], S_REACHBEGINNING: [{
                    type: i0.Output,
                    args: ['reachBeginning']
                }], S_AUTOPLAY: [{
                    type: i0.Output,
                    args: ['autoplay']
                }], S_AUTOPLAYSTART: [{
                    type: i0.Output,
                    args: ['autoplayStart']
                }], S_AUTOPLAYSTOP: [{
                    type: i0.Output,
                    args: ['autoplayStop']
                }], S_IMAGESREADY: [{
                    type: i0.Output,
                    args: ['imagesReady']
                }], S_LAZYIMAGELOAD: [{
                    type: i0.Output,
                    args: ['lazyImageLoad']
                }], S_LAZYIMAGEREADY: [{
                    type: i0.Output,
                    args: ['lazyImageReady']
                }], S_SCROLLDRAGEND: [{
                    type: i0.Output,
                    args: ['scrollDragEnd']
                }], S_SCROLLDRAGMOVE: [{
                    type: i0.Output,
                    args: ['scrollDragMove']
                }], S_SCROLLDRAGSTART: [{
                    type: i0.Output,
                    args: ['scrollDragStart']
                }], S_NAVIGATIONHIDE: [{
                    type: i0.Output,
                    args: ['navigationHide']
                }], S_NAVIGATIONSHOW: [{
                    type: i0.Output,
                    args: ['navigationShow']
                }], S_PAGINATIONRENDER: [{
                    type: i0.Output,
                    args: ['paginationRender']
                }], S_PAGINATIONUPDATE: [{
                    type: i0.Output,
                    args: ['paginationUpdate']
                }], S_PAGINATIONHIDE: [{
                    type: i0.Output,
                    args: ['paginationHide']
                }], S_PAGINATIONSHOW: [{
                    type: i0.Output,
                    args: ['paginationShow']
                }], S_TAP: [{
                    type: i0.Output,
                    args: ['swiperTap']
                }], S_CLICK: [{
                    type: i0.Output,
                    args: ['swiperClick']
                }], S_DOUBLETAP: [{
                    type: i0.Output,
                    args: ['swiperDoubleTap']
                }], S_TOUCHEND: [{
                    type: i0.Output,
                    args: ['swiperTouchEnd']
                }], S_TOUCHMOVE: [{
                    type: i0.Output,
                    args: ['swiperTouchMove']
                }], S_TOUCHSTART: [{
                    type: i0.Output,
                    args: ['swiperTouchStart']
                }], S_TOUCHMOVEOPPOSITE: [{
                    type: i0.Output,
                    args: ['swiperTouchMoveOpposite']
                }], S_TRANSITIONEND: [{
                    type: i0.Output,
                    args: ['swiperTransitionEnd']
                }], S_TRANSITIONSTART: [{
                    type: i0.Output,
                    args: ['swiperTransitionStart']
                }], S_SLIDEPREVTRANSITIONEND: [{
                    type: i0.Output,
                    args: ['slidePrevTransitionEnd']
                }], S_SLIDEPREVTRANSITIONSTART: [{
                    type: i0.Output,
                    args: ['slidePrevTransitionStart']
                }], S_SLIDENEXTTRANSITIONEND: [{
                    type: i0.Output,
                    args: ['slideNextTransitionEnd']
                }], S_SLIDENEXTTRANSITIONSTART: [{
                    type: i0.Output,
                    args: ['slideNextTransitionStart']
                }], S_SLIDECHANGETRANSITIONEND: [{
                    type: i0.Output,
                    args: ['slideChangeTransitionEnd']
                }], S_SLIDECHANGETRANSITIONSTART: [{
                    type: i0.Output,
                    args: ['slideChangeTransitionStart']
                }], S_OBSERVERUPDATE: [{
                    type: i0.Output,
                    args: ['observerUpdate']
                }] });
    })();

    var _c0 = ["swiperSlides"];
    var _c1 = ["*"];
    var SwiperComponent = /** @class */ (function () {
        function SwiperComponent(zone, cdRef, platformId, defaults) {
            this.zone = zone;
            this.cdRef = cdRef;
            this.platformId = platformId;
            this.defaults = defaults;
            this.mo = null;
            this.swiperConfig = null;
            this.paginationBackup = null;
            this.paginationConfig = null;
            this.index = null;
            this.disabled = false;
            this.performance = false;
            this.useSwiperClass = true;
            this.indexChange = new i0.EventEmitter();
            this.S_INIT = new i0.EventEmitter();
            this.S_BEFOREDESTROY = new i0.EventEmitter();
            this.S_SCROLL = new i0.EventEmitter();
            this.S_PROGRESS = new i0.EventEmitter();
            this.S_KEYPRESS = new i0.EventEmitter();
            this.S_RESIZE = new i0.EventEmitter();
            this.S_BREAKPOINT = new i0.EventEmitter();
            this.S_ZOOMCHANGE = new i0.EventEmitter();
            this.S_AFTERRESIZE = new i0.EventEmitter();
            this.S_BEFORERESIZE = new i0.EventEmitter();
            this.S_BEFORELOOPFIX = new i0.EventEmitter();
            this.S_LOOPFIX = new i0.EventEmitter();
            this.S_SLIDERMOVE = new i0.EventEmitter();
            this.S_SLIDECHANGE = new i0.EventEmitter();
            this.S_SETTRANSLATE = new i0.EventEmitter();
            this.S_SETTRANSITION = new i0.EventEmitter();
            this.S_FROMEDGE = new i0.EventEmitter();
            this.S_TOEDGE = new i0.EventEmitter();
            this.S_REACHEND = new i0.EventEmitter();
            this.S_REACHBEGINNING = new i0.EventEmitter();
            this.S_AUTOPLAY = new i0.EventEmitter();
            this.S_AUTOPLAYSTART = new i0.EventEmitter();
            this.S_AUTOPLAYSTOP = new i0.EventEmitter();
            this.S_IMAGESREADY = new i0.EventEmitter();
            this.S_LAZYIMAGELOAD = new i0.EventEmitter();
            this.S_LAZYIMAGEREADY = new i0.EventEmitter();
            this.S_SCROLLDRAGEND = new i0.EventEmitter();
            this.S_SCROLLDRAGMOVE = new i0.EventEmitter();
            this.S_SCROLLDRAGSTART = new i0.EventEmitter();
            this.S_NAVIGATIONHIDE = new i0.EventEmitter();
            this.S_NAVIGATIONSHOW = new i0.EventEmitter();
            this.S_PAGINATIONRENDER = new i0.EventEmitter();
            this.S_PAGINATIONUPDATE = new i0.EventEmitter();
            this.S_PAGINATIONHIDE = new i0.EventEmitter();
            this.S_PAGINATIONSHOW = new i0.EventEmitter();
            this.S_TAP = new i0.EventEmitter();
            this.S_CLICK = new i0.EventEmitter();
            this.S_DOUBLETAP = new i0.EventEmitter();
            this.S_TOUCHEND = new i0.EventEmitter();
            this.S_TOUCHMOVE = new i0.EventEmitter();
            this.S_TOUCHSTART = new i0.EventEmitter();
            this.S_TOUCHMOVEOPPOSITE = new i0.EventEmitter();
            this.S_TRANSITIONEND = new i0.EventEmitter();
            this.S_TRANSITIONSTART = new i0.EventEmitter();
            this.S_SLIDEPREVTRANSITIONEND = new i0.EventEmitter();
            this.S_SLIDEPREVTRANSITIONSTART = new i0.EventEmitter();
            this.S_SLIDENEXTTRANSITIONEND = new i0.EventEmitter();
            this.S_SLIDENEXTTRANSITIONSTART = new i0.EventEmitter();
            this.S_SLIDECHANGETRANSITIONEND = new i0.EventEmitter();
            this.S_SLIDECHANGETRANSITIONSTART = new i0.EventEmitter();
            this.S_OBSERVERUPDATE = new i0.EventEmitter();
        }
        Object.defineProperty(SwiperComponent.prototype, "isAtLast", {
            get: function () {
                return (!this.directiveRef || !this.directiveRef.swiper()) ?
                    false : this.directiveRef.swiper()['isEnd'];
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SwiperComponent.prototype, "isAtFirst", {
            get: function () {
                return (!this.directiveRef || !this.directiveRef.swiper()) ?
                    false : this.directiveRef.swiper()['isBeginning'];
            },
            enumerable: false,
            configurable: true
        });
        SwiperComponent.prototype.ngAfterViewInit = function () {
            var _this = this;
            if (!common.isPlatformBrowser(this.platformId)) {
                return;
            }
            this.zone.runOutsideAngular(function () {
                _this.updateClasses();
                if (_this.swiperSlides && typeof MutationObserver !== 'undefined') {
                    _this.mo = new MutationObserver(function () {
                        _this.updateClasses();
                    });
                    _this.mo.observe(_this.swiperSlides.nativeElement, { childList: true });
                }
            });
            window.setTimeout(function () {
                if (_this.directiveRef) {
                    _this.S_INIT.emit();
                    _this.directiveRef.indexChange = _this.indexChange;
                    SwiperEventNames.forEach(function (eventName) {
                        if (_this.directiveRef) {
                            var output = "S_" + eventName.replace('swiper', '').toUpperCase();
                            var directiveOutput = output;
                            var componentOutput = output;
                            _this.directiveRef[directiveOutput] = _this[componentOutput];
                        }
                    });
                }
            }, 0);
        };
        SwiperComponent.prototype.ngOnDestroy = function () {
            if (this.mo) {
                this.mo.disconnect();
            }
            if (this.config && this.paginationBackup) {
                this.config.pagination = this.paginationBackup;
            }
        };
        SwiperComponent.prototype.getConfig = function () {
            var _this = this;
            this.swiperConfig = new SwiperConfig(this.defaults);
            this.swiperConfig.assign(this.config); // Custom configuration
            if (this.swiperSlides && (this.swiperConfig.pagination === true ||
                (this.swiperConfig.pagination && typeof this.swiperConfig.pagination === 'object' &&
                    (!this.swiperConfig.pagination.type || this.swiperConfig.pagination.type === 'bullets') &&
                    !this.swiperConfig.pagination.renderBullet && this.swiperConfig.pagination.el === '.swiper-pagination'))) {
                this.config = this.config || {};
                if (!this.paginationConfig) {
                    this.paginationBackup = this.config.pagination;
                    this.paginationConfig = {
                        el: '.swiper-pagination',
                        renderBullet: function (index, className) {
                            var children = _this.swiperSlides ? Array.from(_this.swiperSlides.nativeElement.children) : [];
                            children = children.filter(function (child) { return child.classList.contains('swiper-slide'); });
                            var bullet = "<span class=\"" + className + " " + className + "-middle\" index=\"" + index + "\"></span>";
                            if (index === 0) {
                                bullet = "<span class=\"" + className + " " + className + "-first\" index=\"" + index + "\"></span>";
                            }
                            else if (index === (children.length - 1)) {
                                bullet = "<span class=\"" + className + " " + className + "-last\" index=\"" + index + "\"></span>";
                            }
                            return "<span class=\"swiper-pagination-handle\" index=\"" + index + "\">" + bullet + "</span>";
                        }
                    };
                }
                if (this.swiperConfig.pagination === true) {
                    this.config.pagination = this.paginationConfig;
                }
                else {
                    this.config.pagination = Object.assign({}, this.config.pagination, this.paginationConfig);
                }
            }
            return this.config;
        };
        SwiperComponent.prototype.updateClasses = function () {
            if (this.swiperSlides) {
                var updateNeeded = false;
                var children = this.swiperSlides.nativeElement.children;
                for (var i = 0; i < children.length; i++) {
                    if (/swiper-.*/.test(children[i].className) === false) {
                        updateNeeded = true;
                        children[i].classList.add('swiper-slide');
                    }
                }
                if (updateNeeded && this.directiveRef) {
                    this.directiveRef.update();
                }
            }
            this.cdRef.detectChanges();
        };
        SwiperComponent.prototype.onPaginationClick = function (index) {
            if (this.config && this.directiveRef && (this.config.pagination === true ||
                (this.config.pagination && typeof this.config.pagination === 'object' &&
                    (!this.config.pagination.type || this.config.pagination.type === 'bullets') &&
                    (this.config.pagination.clickable && this.config.pagination.el === '.swiper-pagination')))) {
                this.directiveRef.setIndex(index);
            }
        };
        return SwiperComponent;
    }());
    SwiperComponent.ɵfac = function SwiperComponent_Factory(t) { return new (t || SwiperComponent)(i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(i0.PLATFORM_ID), i0.ɵɵdirectiveInject(SWIPER_CONFIG, 8)); };
    SwiperComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SwiperComponent, selectors: [["swiper"]], viewQuery: function SwiperComponent_Query(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵviewQuery(_c0, true);
                i0.ɵɵviewQuery(SwiperDirective, true);
            }
            if (rf & 2) {
                var _t;
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.swiperSlides = _t.first);
                i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.directiveRef = _t.first);
            }
        }, inputs: { index: "index", disabled: "disabled", performance: "performance", config: "config", useSwiperClass: "useSwiperClass" }, outputs: { indexChange: "indexChange", S_INIT: "init", S_BEFOREDESTROY: "beforeDestroy", S_SCROLL: "scroll", S_PROGRESS: "progress", S_KEYPRESS: "keyPress", S_RESIZE: "resize", S_BREAKPOINT: "breakpoint", S_ZOOMCHANGE: "zoomChange", S_AFTERRESIZE: "afterResize", S_BEFORERESIZE: "beforeResize", S_BEFORELOOPFIX: "beforeLoopFix", S_LOOPFIX: "loopFix", S_SLIDERMOVE: "sliderMove", S_SLIDECHANGE: "slideChange", S_SETTRANSLATE: "setTranslate", S_SETTRANSITION: "setTransition", S_FROMEDGE: "fromEdge", S_TOEDGE: "toEdge", S_REACHEND: "reachEnd", S_REACHBEGINNING: "reachBeginning", S_AUTOPLAY: "autoplay", S_AUTOPLAYSTART: "autoplayStart", S_AUTOPLAYSTOP: "autoplayStop", S_IMAGESREADY: "imagesReady", S_LAZYIMAGELOAD: "lazyImageLoad", S_LAZYIMAGEREADY: "lazyImageReady", S_SCROLLDRAGEND: "scrollDragEnd", S_SCROLLDRAGMOVE: "scrollDragMove", S_SCROLLDRAGSTART: "scrollDragStart", S_NAVIGATIONHIDE: "navigationHide", S_NAVIGATIONSHOW: "navigationShow", S_PAGINATIONRENDER: "paginationRender", S_PAGINATIONUPDATE: "paginationUpdate", S_PAGINATIONHIDE: "paginationHide", S_PAGINATIONSHOW: "paginationShow", S_TAP: "swiperTap", S_CLICK: "swiperClick", S_DOUBLETAP: "swiperDoubleTap", S_TOUCHEND: "swiperTouchEnd", S_TOUCHMOVE: "swiperTouchMove", S_TOUCHSTART: "swiperTouchStart", S_TOUCHMOVEOPPOSITE: "swiperTouchMoveOpposite", S_TRANSITIONEND: "swiperTransitionEnd", S_TRANSITIONSTART: "swiperTransitionStart", S_SLIDEPREVTRANSITIONEND: "slidePrevTransitionEnd", S_SLIDEPREVTRANSITIONSTART: "slidePrevTransitionStart", S_SLIDENEXTTRANSITIONEND: "slideNextTransitionEnd", S_SLIDENEXTTRANSITIONSTART: "slideNextTransitionStart", S_SLIDECHANGETRANSITIONEND: "slideChangeTransitionEnd", S_SLIDECHANGETRANSITIONSTART: "slideChangeTransitionStart", S_OBSERVERUPDATE: "observerUpdate" }, exportAs: ["ngxSwiper"], ngContentSelectors: _c1, decls: 9, vars: 14, consts: [[1, "s-wrapper", 3, "swiper", "index", "disabled", "performance"], ["swiper", ""], [1, "swiper-wrapper"], ["swiperSlides", ""], [1, "swiper-scrollbar", 3, "hidden"], [1, "swiper-button-prev", 3, "hidden"], [1, "swiper-button-next", 3, "hidden"], [1, "swiper-pagination", 3, "hidden", "click", "keyup.enter"]], template: function SwiperComponent_Template(rf, ctx) {
            if (rf & 1) {
                i0.ɵɵprojectionDef();
                i0.ɵɵelementStart(0, "div", 0, 1);
                i0.ɵɵelementStart(2, "div", 2, 3);
                i0.ɵɵprojection(4);
                i0.ɵɵelementEnd();
                i0.ɵɵelement(5, "div", 4);
                i0.ɵɵelement(6, "div", 5);
                i0.ɵɵelement(7, "div", 6);
                i0.ɵɵelementStart(8, "div", 7);
                i0.ɵɵlistener("click", function SwiperComponent_Template_div_click_8_listener($event) { return ctx.onPaginationClick($event.target.getAttribute("index")); })("keyup.enter", function SwiperComponent_Template_div_keyup_enter_8_listener($event) { return ctx.onPaginationClick($event.target.getAttribute("index")); });
                i0.ɵɵelementEnd();
                i0.ɵɵelementEnd();
            }
            if (rf & 2) {
                i0.ɵɵclassProp("swiper", ctx.useSwiperClass)("swiper-container", ctx.useSwiperClass);
                i0.ɵɵproperty("swiper", ctx.getConfig())("index", ctx.index)("disabled", ctx.disabled)("performance", ctx.performance);
                i0.ɵɵadvance(5);
                i0.ɵɵproperty("hidden", !(ctx.swiperConfig == null ? null : ctx.swiperConfig.scrollbar) || (ctx.swiperConfig == null ? null : ctx.swiperConfig.scrollbar) !== true && !!(ctx.swiperConfig == null ? null : ctx.swiperConfig.scrollbar == null ? null : ctx.swiperConfig.scrollbar.el) && (ctx.swiperConfig == null ? null : ctx.swiperConfig.scrollbar == null ? null : ctx.swiperConfig.scrollbar.el) !== ".swiper-scrollbar");
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("hidden", !(ctx.swiperConfig == null ? null : ctx.swiperConfig.navigation) || (ctx.swiperConfig == null ? null : ctx.swiperConfig.navigation) !== true && !!(ctx.swiperConfig == null ? null : ctx.swiperConfig.navigation == null ? null : ctx.swiperConfig.navigation.prevEl) && (ctx.swiperConfig == null ? null : ctx.swiperConfig.navigation == null ? null : ctx.swiperConfig.navigation.prevEl) !== ".swiper-button-prev");
                i0.ɵɵattribute("disabled", ctx.isAtFirst || null);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("hidden", !(ctx.swiperConfig == null ? null : ctx.swiperConfig.navigation) || (ctx.swiperConfig == null ? null : ctx.swiperConfig.navigation) !== true && !!(ctx.swiperConfig == null ? null : ctx.swiperConfig.navigation == null ? null : ctx.swiperConfig.navigation.nextEl) && (ctx.swiperConfig == null ? null : ctx.swiperConfig.navigation == null ? null : ctx.swiperConfig.navigation.nextEl) !== ".swiper-button-next");
                i0.ɵɵattribute("disabled", ctx.isAtLast || null);
                i0.ɵɵadvance(1);
                i0.ɵɵproperty("hidden", !(ctx.swiperConfig == null ? null : ctx.swiperConfig.pagination) || (ctx.swiperConfig == null ? null : ctx.swiperConfig.pagination) !== true && !!(ctx.swiperConfig == null ? null : ctx.swiperConfig.pagination == null ? null : ctx.swiperConfig.pagination.el) && (ctx.swiperConfig == null ? null : ctx.swiperConfig.pagination == null ? null : ctx.swiperConfig.pagination.el) !== ".swiper-pagination");
            }
        }, directives: [SwiperDirective], styles: ["swiper[fxflex]{display:flex;flex-direction:inherit;min-height:0;min-width:0}swiper[fxflex]>.swiper.s-wrapper{-webkit-box-flex:1;flex:1 1 auto;min-height:0;min-width:0}swiper>.swiper.s-wrapper{height:100%;width:100%}swiper>.swiper.s-wrapper .swiper-wrapper .swiper-slide{height:100%;max-height:100%;max-width:100%;overflow:auto;width:100%;will-change:transform}swiper>.swiper.s-wrapper .swiper-pagination{pointer-events:none}swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle{cursor:pointer;display:inline-block;margin:2px;padding:4px;pointer-events:all;position:relative}swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet{display:inline-block;margin:0;pointer-events:none}swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{border:1px solid rgba(0,0,0,.5)}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-button-prev{left:50%;margin-left:-13px;margin-top:0;top:10px;transform:rotate(90deg)}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-button-next{bottom:10px;left:50%;margin-left:-13px;margin-top:0;top:auto;transform:rotate(90deg)}.swiper-button-next[hidden]:after,.swiper-button-prev[hidden]:after{display:none}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-scrollbar{transition:width .25s ease-in-out;width:8px}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-scrollbar:hover{width:16px}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle{display:block}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet{display:inline-block}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{margin:0 -1px}swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-scrollbar{height:8px;transition:height .25s ease-in-out}swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-scrollbar:hover{height:16px}swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{margin:-1px 0}", "@font-face{font-family:swiper-icons;font-style:normal;font-weight:400;src:url(\"data:application/font-woff;charset=utf-8;base64, d09GRgABAAAAAAZgABAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAGRAAAABoAAAAci6qHkUdERUYAAAWgAAAAIwAAACQAYABXR1BPUwAABhQAAAAuAAAANuAY7+xHU1VCAAAFxAAAAFAAAABm2fPczU9TLzIAAAHcAAAASgAAAGBP9V5RY21hcAAAAkQAAACIAAABYt6F0cBjdnQgAAACzAAAAAQAAAAEABEBRGdhc3AAAAWYAAAACAAAAAj//wADZ2x5ZgAAAywAAADMAAAD2MHtryVoZWFkAAABbAAAADAAAAA2E2+eoWhoZWEAAAGcAAAAHwAAACQC9gDzaG10eAAAAigAAAAZAAAArgJkABFsb2NhAAAC0AAAAFoAAABaFQAUGG1heHAAAAG8AAAAHwAAACAAcABAbmFtZQAAA/gAAAE5AAACXvFdBwlwb3N0AAAFNAAAAGIAAACE5s74hXjaY2BkYGAAYpf5Hu/j+W2+MnAzMYDAzaX6QjD6/4//Bxj5GA8AuRwMYGkAPywL13jaY2BkYGA88P8Agx4j+/8fQDYfA1AEBWgDAIB2BOoAeNpjYGRgYNBh4GdgYgABEMnIABJzYNADCQAACWgAsQB42mNgYfzCOIGBlYGB0YcxjYGBwR1Kf2WQZGhhYGBiYGVmgAFGBiQQkOaawtDAoMBQxXjg/wEGPcYDDA4wNUA2CCgwsAAAO4EL6gAAeNpj2M0gyAACqxgGNWBkZ2D4/wMA+xkDdgAAAHjaY2BgYGaAYBkGRgYQiAHyGMF8FgYHIM3DwMHABGQrMOgyWDLEM1T9/w8UBfEMgLzE////P/5//f/V/xv+r4eaAAeMbAxwIUYmIMHEgKYAYjUcsDAwsLKxc3BycfPw8jEQA/gZBASFhEVExcQlJKWkZWTl5BUUlZRVVNXUNTQZBgMAAMR+E+gAEQFEAAAAKgAqACoANAA+AEgAUgBcAGYAcAB6AIQAjgCYAKIArAC2AMAAygDUAN4A6ADyAPwBBgEQARoBJAEuATgBQgFMAVYBYAFqAXQBfgGIAZIBnAGmAbIBzgHsAAB42u2NMQ6CUAyGW568x9AneYYgm4MJbhKFaExIOAVX8ApewSt4Bic4AfeAid3VOBixDxfPYEza5O+Xfi04YADggiUIULCuEJK8VhO4bSvpdnktHI5QCYtdi2sl8ZnXaHlqUrNKzdKcT8cjlq+rwZSvIVczNiezsfnP/uznmfPFBNODM2K7MTQ45YEAZqGP81AmGGcF3iPqOop0r1SPTaTbVkfUe4HXj97wYE+yNwWYxwWu4v1ugWHgo3S1XdZEVqWM7ET0cfnLGxWfkgR42o2PvWrDMBSFj/IHLaF0zKjRgdiVMwScNRAoWUoH78Y2icB/yIY09An6AH2Bdu/UB+yxopYshQiEvnvu0dURgDt8QeC8PDw7Fpji3fEA4z/PEJ6YOB5hKh4dj3EvXhxPqH/SKUY3rJ7srZ4FZnh1PMAtPhwP6fl2PMJMPDgeQ4rY8YT6Gzao0eAEA409DuggmTnFnOcSCiEiLMgxCiTI6Cq5DZUd3Qmp10vO0LaLTd2cjN4fOumlc7lUYbSQcZFkutRG7g6JKZKy0RmdLY680CDnEJ+UMkpFFe1RN7nxdVpXrC4aTtnaurOnYercZg2YVmLN/d/gczfEimrE/fs/bOuq29Zmn8tloORaXgZgGa78yO9/cnXm2BpaGvq25Dv9S4E9+5SIc9PqupJKhYFSSl47+Qcr1mYNAAAAeNptw0cKwkAAAMDZJA8Q7OUJvkLsPfZ6zFVERPy8qHh2YER+3i/BP83vIBLLySsoKimrqKqpa2hp6+jq6RsYGhmbmJqZSy0sraxtbO3sHRydnEMU4uR6yx7JJXveP7WrDycAAAAAAAH//wACeNpjYGRgYOABYhkgZgJCZgZNBkYGLQZtIJsFLMYAAAw3ALgAeNolizEKgDAQBCchRbC2sFER0YD6qVQiBCv/H9ezGI6Z5XBAw8CBK/m5iQQVauVbXLnOrMZv2oLdKFa8Pjuru2hJzGabmOSLzNMzvutpB3N42mNgZGBg4GKQYzBhYMxJLMlj4GBgAYow/P/PAJJhLM6sSoWKfWCAAwDAjgbRAAB42mNgYGBkAIIbCZo5IPrmUn0hGA0AO8EFTQAA\") format(\"woff\")}:root{--swiper-theme-color:#007aff}.swiper-container{list-style:none;margin-left:auto;margin-right:auto;overflow:hidden;padding:0;position:relative;z-index:1}.swiper-container-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{box-sizing:content-box;display:flex;height:100%;position:relative;transition-property:transform;width:100%;z-index:1}.swiper-container-android .swiper-slide,.swiper-wrapper{transform:translateZ(0)}.swiper-container-multirow>.swiper-wrapper{flex-wrap:wrap}.swiper-container-multirow-column>.swiper-wrapper{flex-direction:column;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{margin:0 auto;transition-timing-function:ease-out}.swiper-container-pointer-events{touch-action:pan-y}.swiper-container-pointer-events.swiper-container-vertical{touch-action:pan-x}.swiper-slide{flex-shrink:0;height:100%;position:relative;transition-property:transform;width:100%}.swiper-slide-invisible-blank{visibility:hidden}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-container-3d{perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:linear-gradient(270deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-right{background-image:linear-gradient(90deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-top{background-image:linear-gradient(0deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(180deg,rgba(0,0,0,.5),transparent)}.swiper-container-css-mode>.swiper-wrapper{-ms-overflow-style:none;overflow:auto;scrollbar-width:none}.swiper-container-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-container-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-container-horizontal.swiper-container-css-mode>.swiper-wrapper{-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory}.swiper-container-vertical.swiper-container-css-mode>.swiper-wrapper{-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory}:root{--swiper-navigation-size:44px}.swiper-button-next,.swiper-button-prev{align-items:center;color:var(--swiper-navigation-color,var(--swiper-theme-color));cursor:pointer;display:flex;height:var(--swiper-navigation-size);justify-content:center;margin-top:calc(0px - var(--swiper-navigation-size)/2);position:absolute;top:50%;width:calc(var(--swiper-navigation-size)/44*27);z-index:10}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{cursor:auto;opacity:.35;pointer-events:none}.swiper-button-next:after,.swiper-button-prev:after{font-family:swiper-icons;font-size:var(--swiper-navigation-size);font-variant:normal;letter-spacing:0;line-height:1;text-transform:none!important;text-transform:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{left:10px;right:auto}.swiper-button-prev:after,.swiper-container-rtl .swiper-button-next:after{content:\"prev\"}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{left:auto;right:10px}.swiper-button-next:after,.swiper-container-rtl .swiper-button-prev:after{content:\"next\"}.swiper-button-next.swiper-button-white,.swiper-button-prev.swiper-button-white{--swiper-navigation-color:#fff}.swiper-button-next.swiper-button-black,.swiper-button-prev.swiper-button-black{--swiper-navigation-color:#000}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;transform:translateZ(0);transition:opacity .3s;z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullets-dynamic{font-size:0;overflow:hidden}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{position:relative;transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active,.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{background:#000;border-radius:50%;display:inline-block;height:8px;opacity:.2;width:8px}button.swiper-pagination-bullet{-moz-appearance:none;-webkit-appearance:none;appearance:none;border:none;box-shadow:none;margin:0;padding:0}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet:only-child{display:none!important}.swiper-pagination-bullet-active{background:var(--swiper-pagination-color,var(--swiper-theme-color));opacity:1}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{display:block;margin:6px 0}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:transform .2s,top .2s}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 4px}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translateX(-50%);white-space:nowrap}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:transform .2s,left .2s}.swiper-container-horizontal.swiper-container-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:transform .2s,right .2s}.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));height:100%;left:0;position:absolute;top:0;transform:scale(0);transform-origin:left top;width:100%}.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progressbar,.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{height:4px;left:0;top:0;width:100%}.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-container-vertical>.swiper-pagination-progressbar{height:100%;left:0;top:0;width:4px}.swiper-pagination-white{--swiper-pagination-color:#fff}.swiper-pagination-black{--swiper-pagination-color:#000}.swiper-pagination-lock{display:none}.swiper-scrollbar{-ms-touch-action:none;background:rgba(0,0,0,.1);border-radius:10px;position:relative}.swiper-container-horizontal>.swiper-scrollbar{bottom:3px;height:5px;left:1%;position:absolute;width:98%;z-index:50}.swiper-container-vertical>.swiper-scrollbar{height:98%;position:absolute;right:3px;top:1%;width:5px;z-index:50}.swiper-scrollbar-drag{background:rgba(0,0,0,.5);border-radius:10px;height:100%;left:0;position:relative;top:0;width:100%}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{align-items:center;display:flex;height:100%;justify-content:center;text-align:center;width:100%}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{-o-object-fit:contain;max-height:100%;max-width:100%;object-fit:contain}.swiper-slide-zoomed{cursor:move}.swiper-lazy-preloader{-webkit-animation:swiper-preloader-spin 1s linear infinite;animation:swiper-preloader-spin 1s linear infinite;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top:4px solid transparent;box-sizing:border-box;height:42px;left:50%;margin-left:-21px;margin-top:-21px;position:absolute;top:50%;transform-origin:50%;width:42px;z-index:10}.swiper-lazy-preloader-white{--swiper-preloader-color:#fff}.swiper-lazy-preloader-black{--swiper-preloader-color:#000}@-webkit-keyframes swiper-preloader-spin{to{transform:rotate(1turn)}}@keyframes swiper-preloader-spin{to{transform:rotate(1turn)}}.swiper-container .swiper-notification{left:0;opacity:0;pointer-events:none;position:absolute;top:0;z-index:-1000}.swiper-container-fade.swiper-container-free-mode .swiper-slide{transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube{overflow:visible}.swiper-container-cube .swiper-slide{-webkit-backface-visibility:hidden;backface-visibility:hidden;height:100%;pointer-events:none;transform-origin:0 0;visibility:hidden;width:100%;z-index:1}.swiper-container-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube.swiper-container-rtl .swiper-slide{transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top{-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:0}.swiper-container-cube .swiper-cube-shadow{bottom:0;height:100%;left:0;opacity:.6;position:absolute;width:100%;z-index:0}.swiper-container-cube .swiper-cube-shadow:before{background:#000;bottom:0;content:\"\";filter:blur(50px);left:0;position:absolute;right:0;top:0}.swiper-container-flip{overflow:visible}.swiper-container-flip .swiper-slide{-webkit-backface-visibility:hidden;backface-visibility:hidden;pointer-events:none;z-index:1}.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:0}"], encapsulation: 2 });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SwiperComponent, [{
                type: i0.Component,
                args: [{
                        selector: 'swiper',
                        exportAs: 'ngxSwiper',
                        templateUrl: './swiper.component.html',
                        styleUrls: [
                            './swiper.component.css',
                            '../../../../node_modules/swiper/swiper-bundle.css'
                        ],
                        encapsulation: i0.ViewEncapsulation.None
                    }]
            }], function () {
            return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: Object, decorators: [{
                            type: i0.Inject,
                            args: [i0.PLATFORM_ID]
                        }] }, { type: undefined, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.Inject,
                            args: [SWIPER_CONFIG]
                        }] }];
        }, { index: [{
                    type: i0.Input
                }], disabled: [{
                    type: i0.Input
                }], performance: [{
                    type: i0.Input
                }], config: [{
                    type: i0.Input
                }], useSwiperClass: [{
                    type: i0.Input
                }], indexChange: [{
                    type: i0.Output
                }], swiperSlides: [{
                    type: i0.ViewChild,
                    args: ['swiperSlides', { static: false }]
                }], directiveRef: [{
                    type: i0.ViewChild,
                    args: [SwiperDirective, { static: false }]
                }], S_INIT: [{
                    type: i0.Output,
                    args: ['init']
                }], S_BEFOREDESTROY: [{
                    type: i0.Output,
                    args: ['beforeDestroy']
                }], S_SCROLL: [{
                    type: i0.Output,
                    args: ['scroll']
                }], S_PROGRESS: [{
                    type: i0.Output,
                    args: ['progress']
                }], S_KEYPRESS: [{
                    type: i0.Output,
                    args: ['keyPress']
                }], S_RESIZE: [{
                    type: i0.Output,
                    args: ['resize']
                }], S_BREAKPOINT: [{
                    type: i0.Output,
                    args: ['breakpoint']
                }], S_ZOOMCHANGE: [{
                    type: i0.Output,
                    args: ['zoomChange']
                }], S_AFTERRESIZE: [{
                    type: i0.Output,
                    args: ['afterResize']
                }], S_BEFORERESIZE: [{
                    type: i0.Output,
                    args: ['beforeResize']
                }], S_BEFORELOOPFIX: [{
                    type: i0.Output,
                    args: ['beforeLoopFix']
                }], S_LOOPFIX: [{
                    type: i0.Output,
                    args: ['loopFix']
                }], S_SLIDERMOVE: [{
                    type: i0.Output,
                    args: ['sliderMove']
                }], S_SLIDECHANGE: [{
                    type: i0.Output,
                    args: ['slideChange']
                }], S_SETTRANSLATE: [{
                    type: i0.Output,
                    args: ['setTranslate']
                }], S_SETTRANSITION: [{
                    type: i0.Output,
                    args: ['setTransition']
                }], S_FROMEDGE: [{
                    type: i0.Output,
                    args: ['fromEdge']
                }], S_TOEDGE: [{
                    type: i0.Output,
                    args: ['toEdge']
                }], S_REACHEND: [{
                    type: i0.Output,
                    args: ['reachEnd']
                }], S_REACHBEGINNING: [{
                    type: i0.Output,
                    args: ['reachBeginning']
                }], S_AUTOPLAY: [{
                    type: i0.Output,
                    args: ['autoplay']
                }], S_AUTOPLAYSTART: [{
                    type: i0.Output,
                    args: ['autoplayStart']
                }], S_AUTOPLAYSTOP: [{
                    type: i0.Output,
                    args: ['autoplayStop']
                }], S_IMAGESREADY: [{
                    type: i0.Output,
                    args: ['imagesReady']
                }], S_LAZYIMAGELOAD: [{
                    type: i0.Output,
                    args: ['lazyImageLoad']
                }], S_LAZYIMAGEREADY: [{
                    type: i0.Output,
                    args: ['lazyImageReady']
                }], S_SCROLLDRAGEND: [{
                    type: i0.Output,
                    args: ['scrollDragEnd']
                }], S_SCROLLDRAGMOVE: [{
                    type: i0.Output,
                    args: ['scrollDragMove']
                }], S_SCROLLDRAGSTART: [{
                    type: i0.Output,
                    args: ['scrollDragStart']
                }], S_NAVIGATIONHIDE: [{
                    type: i0.Output,
                    args: ['navigationHide']
                }], S_NAVIGATIONSHOW: [{
                    type: i0.Output,
                    args: ['navigationShow']
                }], S_PAGINATIONRENDER: [{
                    type: i0.Output,
                    args: ['paginationRender']
                }], S_PAGINATIONUPDATE: [{
                    type: i0.Output,
                    args: ['paginationUpdate']
                }], S_PAGINATIONHIDE: [{
                    type: i0.Output,
                    args: ['paginationHide']
                }], S_PAGINATIONSHOW: [{
                    type: i0.Output,
                    args: ['paginationShow']
                }], S_TAP: [{
                    type: i0.Output,
                    args: ['swiperTap']
                }], S_CLICK: [{
                    type: i0.Output,
                    args: ['swiperClick']
                }], S_DOUBLETAP: [{
                    type: i0.Output,
                    args: ['swiperDoubleTap']
                }], S_TOUCHEND: [{
                    type: i0.Output,
                    args: ['swiperTouchEnd']
                }], S_TOUCHMOVE: [{
                    type: i0.Output,
                    args: ['swiperTouchMove']
                }], S_TOUCHSTART: [{
                    type: i0.Output,
                    args: ['swiperTouchStart']
                }], S_TOUCHMOVEOPPOSITE: [{
                    type: i0.Output,
                    args: ['swiperTouchMoveOpposite']
                }], S_TRANSITIONEND: [{
                    type: i0.Output,
                    args: ['swiperTransitionEnd']
                }], S_TRANSITIONSTART: [{
                    type: i0.Output,
                    args: ['swiperTransitionStart']
                }], S_SLIDEPREVTRANSITIONEND: [{
                    type: i0.Output,
                    args: ['slidePrevTransitionEnd']
                }], S_SLIDEPREVTRANSITIONSTART: [{
                    type: i0.Output,
                    args: ['slidePrevTransitionStart']
                }], S_SLIDENEXTTRANSITIONEND: [{
                    type: i0.Output,
                    args: ['slideNextTransitionEnd']
                }], S_SLIDENEXTTRANSITIONSTART: [{
                    type: i0.Output,
                    args: ['slideNextTransitionStart']
                }], S_SLIDECHANGETRANSITIONEND: [{
                    type: i0.Output,
                    args: ['slideChangeTransitionEnd']
                }], S_SLIDECHANGETRANSITIONSTART: [{
                    type: i0.Output,
                    args: ['slideChangeTransitionStart']
                }], S_OBSERVERUPDATE: [{
                    type: i0.Output,
                    args: ['observerUpdate']
                }] });
    })();

    var SwiperModule = /** @class */ (function () {
        function SwiperModule() {
        }
        return SwiperModule;
    }());
    SwiperModule.ɵmod = i0.ɵɵdefineNgModule({ type: SwiperModule });
    SwiperModule.ɵinj = i0.ɵɵdefineInjector({ factory: function SwiperModule_Factory(t) { return new (t || SwiperModule)(); }, imports: [[common.CommonModule], common.CommonModule] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SwiperModule, { declarations: [SwiperComponent, SwiperDirective], imports: [common.CommonModule], exports: [common.CommonModule, SwiperComponent, SwiperDirective] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(SwiperModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [common.CommonModule],
                        declarations: [SwiperComponent, SwiperDirective],
                        exports: [common.CommonModule, SwiperComponent, SwiperDirective]
                    }]
            }], null, null);
    })();

    /**
     * Generated bundle index. Do not edit.
     */

    exports.SWIPER_CONFIG = SWIPER_CONFIG;
    exports.SwiperComponent = SwiperComponent;
    exports.SwiperConfig = SwiperConfig;
    exports.SwiperDirective = SwiperDirective;
    exports.SwiperModule = SwiperModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ngx-swiper-wrapper.umd.js.map
