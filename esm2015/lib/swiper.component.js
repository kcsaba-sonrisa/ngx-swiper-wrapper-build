import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, Optional, Component, Input, Output, EventEmitter, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperDirective } from './swiper.directive';
import { SWIPER_CONFIG, SwiperConfig, SwiperEventNames } from './swiper.interfaces';
import * as i0 from "@angular/core";
import * as i1 from "./swiper.directive";
const _c0 = ["swiperSlides"];
const _c1 = ["*"];
export class SwiperComponent {
    constructor(zone, cdRef, platformId, defaults) {
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
        this.indexChange = new EventEmitter();
        this.S_INIT = new EventEmitter();
        this.S_BEFOREDESTROY = new EventEmitter();
        this.S_SCROLL = new EventEmitter();
        this.S_PROGRESS = new EventEmitter();
        this.S_KEYPRESS = new EventEmitter();
        this.S_RESIZE = new EventEmitter();
        this.S_BREAKPOINT = new EventEmitter();
        this.S_ZOOMCHANGE = new EventEmitter();
        this.S_AFTERRESIZE = new EventEmitter();
        this.S_BEFORERESIZE = new EventEmitter();
        this.S_BEFORELOOPFIX = new EventEmitter();
        this.S_LOOPFIX = new EventEmitter();
        this.S_SLIDERMOVE = new EventEmitter();
        this.S_SLIDECHANGE = new EventEmitter();
        this.S_SETTRANSLATE = new EventEmitter();
        this.S_SETTRANSITION = new EventEmitter();
        this.S_FROMEDGE = new EventEmitter();
        this.S_TOEDGE = new EventEmitter();
        this.S_REACHEND = new EventEmitter();
        this.S_REACHBEGINNING = new EventEmitter();
        this.S_AUTOPLAY = new EventEmitter();
        this.S_AUTOPLAYSTART = new EventEmitter();
        this.S_AUTOPLAYSTOP = new EventEmitter();
        this.S_IMAGESREADY = new EventEmitter();
        this.S_LAZYIMAGELOAD = new EventEmitter();
        this.S_LAZYIMAGEREADY = new EventEmitter();
        this.S_SCROLLDRAGEND = new EventEmitter();
        this.S_SCROLLDRAGMOVE = new EventEmitter();
        this.S_SCROLLDRAGSTART = new EventEmitter();
        this.S_NAVIGATIONHIDE = new EventEmitter();
        this.S_NAVIGATIONSHOW = new EventEmitter();
        this.S_PAGINATIONRENDER = new EventEmitter();
        this.S_PAGINATIONUPDATE = new EventEmitter();
        this.S_PAGINATIONHIDE = new EventEmitter();
        this.S_PAGINATIONSHOW = new EventEmitter();
        this.S_TAP = new EventEmitter();
        this.S_CLICK = new EventEmitter();
        this.S_DOUBLETAP = new EventEmitter();
        this.S_TOUCHEND = new EventEmitter();
        this.S_TOUCHMOVE = new EventEmitter();
        this.S_TOUCHSTART = new EventEmitter();
        this.S_TOUCHMOVEOPPOSITE = new EventEmitter();
        this.S_TRANSITIONEND = new EventEmitter();
        this.S_TRANSITIONSTART = new EventEmitter();
        this.S_SLIDEPREVTRANSITIONEND = new EventEmitter();
        this.S_SLIDEPREVTRANSITIONSTART = new EventEmitter();
        this.S_SLIDENEXTTRANSITIONEND = new EventEmitter();
        this.S_SLIDENEXTTRANSITIONSTART = new EventEmitter();
        this.S_SLIDECHANGETRANSITIONEND = new EventEmitter();
        this.S_SLIDECHANGETRANSITIONSTART = new EventEmitter();
        this.S_OBSERVERUPDATE = new EventEmitter();
    }
    get isAtLast() {
        return (!this.directiveRef || !this.directiveRef.swiper()) ?
            false : this.directiveRef.swiper()['isEnd'];
    }
    get isAtFirst() {
        return (!this.directiveRef || !this.directiveRef.swiper()) ?
            false : this.directiveRef.swiper()['isBeginning'];
    }
    ngAfterViewInit() {
        if (!isPlatformBrowser(this.platformId)) {
            return;
        }
        this.zone.runOutsideAngular(() => {
            this.updateClasses();
            if (this.swiperSlides && typeof MutationObserver !== 'undefined') {
                this.mo = new MutationObserver(() => {
                    this.updateClasses();
                });
                this.mo.observe(this.swiperSlides.nativeElement, { childList: true });
            }
        });
        window.setTimeout(() => {
            if (this.directiveRef) {
                this.S_INIT.emit();
                this.directiveRef.indexChange = this.indexChange;
                SwiperEventNames.forEach((eventName) => {
                    if (this.directiveRef) {
                        const output = `S_${eventName.replace('swiper', '').toUpperCase()}`;
                        const directiveOutput = output;
                        const componentOutput = output;
                        this.directiveRef[directiveOutput] = this[componentOutput];
                    }
                });
            }
        }, 0);
    }
    ngOnDestroy() {
        if (this.mo) {
            this.mo.disconnect();
        }
        if (this.config && this.paginationBackup) {
            this.config.pagination = this.paginationBackup;
        }
    }
    getConfig() {
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
                    renderBullet: (index, className) => {
                        let children = this.swiperSlides ? Array.from(this.swiperSlides.nativeElement.children) : [];
                        children = children.filter((child) => child.classList.contains('swiper-slide'));
                        let bullet = `<span class="${className} ${className}-middle" index="${index}"></span>`;
                        if (index === 0) {
                            bullet = `<span class="${className} ${className}-first" index="${index}"></span>`;
                        }
                        else if (index === (children.length - 1)) {
                            bullet = `<span class="${className} ${className}-last" index="${index}"></span>`;
                        }
                        return `<span class="swiper-pagination-handle" index="${index}">${bullet}</span>`;
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
    }
    updateClasses() {
        if (this.swiperSlides) {
            let updateNeeded = false;
            const children = this.swiperSlides.nativeElement.children;
            for (let i = 0; i < children.length; i++) {
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
    }
    onPaginationClick(index) {
        if (this.config && this.directiveRef && (this.config.pagination === true ||
            (this.config.pagination && typeof this.config.pagination === 'object' &&
                (!this.config.pagination.type || this.config.pagination.type === 'bullets') &&
                (this.config.pagination.clickable && this.config.pagination.el === '.swiper-pagination')))) {
            this.directiveRef.setIndex(index);
        }
    }
}
SwiperComponent.ɵfac = function SwiperComponent_Factory(t) { return new (t || SwiperComponent)(i0.ɵɵdirectiveInject(i0.NgZone), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef), i0.ɵɵdirectiveInject(PLATFORM_ID), i0.ɵɵdirectiveInject(SWIPER_CONFIG, 8)); };
SwiperComponent.ɵcmp = i0.ɵɵdefineComponent({ type: SwiperComponent, selectors: [["swiper"]], viewQuery: function SwiperComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, true);
        i0.ɵɵviewQuery(SwiperDirective, true);
    } if (rf & 2) {
        var _t;
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.swiperSlides = _t.first);
        i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx.directiveRef = _t.first);
    } }, inputs: { index: "index", disabled: "disabled", performance: "performance", config: "config", useSwiperClass: "useSwiperClass" }, outputs: { indexChange: "indexChange", S_INIT: "init", S_BEFOREDESTROY: "beforeDestroy", S_SCROLL: "scroll", S_PROGRESS: "progress", S_KEYPRESS: "keyPress", S_RESIZE: "resize", S_BREAKPOINT: "breakpoint", S_ZOOMCHANGE: "zoomChange", S_AFTERRESIZE: "afterResize", S_BEFORERESIZE: "beforeResize", S_BEFORELOOPFIX: "beforeLoopFix", S_LOOPFIX: "loopFix", S_SLIDERMOVE: "sliderMove", S_SLIDECHANGE: "slideChange", S_SETTRANSLATE: "setTranslate", S_SETTRANSITION: "setTransition", S_FROMEDGE: "fromEdge", S_TOEDGE: "toEdge", S_REACHEND: "reachEnd", S_REACHBEGINNING: "reachBeginning", S_AUTOPLAY: "autoplay", S_AUTOPLAYSTART: "autoplayStart", S_AUTOPLAYSTOP: "autoplayStop", S_IMAGESREADY: "imagesReady", S_LAZYIMAGELOAD: "lazyImageLoad", S_LAZYIMAGEREADY: "lazyImageReady", S_SCROLLDRAGEND: "scrollDragEnd", S_SCROLLDRAGMOVE: "scrollDragMove", S_SCROLLDRAGSTART: "scrollDragStart", S_NAVIGATIONHIDE: "navigationHide", S_NAVIGATIONSHOW: "navigationShow", S_PAGINATIONRENDER: "paginationRender", S_PAGINATIONUPDATE: "paginationUpdate", S_PAGINATIONHIDE: "paginationHide", S_PAGINATIONSHOW: "paginationShow", S_TAP: "swiperTap", S_CLICK: "swiperClick", S_DOUBLETAP: "swiperDoubleTap", S_TOUCHEND: "swiperTouchEnd", S_TOUCHMOVE: "swiperTouchMove", S_TOUCHSTART: "swiperTouchStart", S_TOUCHMOVEOPPOSITE: "swiperTouchMoveOpposite", S_TRANSITIONEND: "swiperTransitionEnd", S_TRANSITIONSTART: "swiperTransitionStart", S_SLIDEPREVTRANSITIONEND: "slidePrevTransitionEnd", S_SLIDEPREVTRANSITIONSTART: "slidePrevTransitionStart", S_SLIDENEXTTRANSITIONEND: "slideNextTransitionEnd", S_SLIDENEXTTRANSITIONSTART: "slideNextTransitionStart", S_SLIDECHANGETRANSITIONEND: "slideChangeTransitionEnd", S_SLIDECHANGETRANSITIONSTART: "slideChangeTransitionStart", S_OBSERVERUPDATE: "observerUpdate" }, exportAs: ["ngxSwiper"], ngContentSelectors: _c1, decls: 9, vars: 14, consts: [[1, "s-wrapper", 3, "swiper", "index", "disabled", "performance"], ["swiper", ""], [1, "swiper-wrapper"], ["swiperSlides", ""], [1, "swiper-scrollbar", 3, "hidden"], [1, "swiper-button-prev", 3, "hidden"], [1, "swiper-button-next", 3, "hidden"], [1, "swiper-pagination", 3, "hidden", "click", "keyup.enter"]], template: function SwiperComponent_Template(rf, ctx) { if (rf & 1) {
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
    } if (rf & 2) {
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
    } }, directives: [i1.SwiperDirective], styles: ["swiper[fxflex]{display:flex;flex-direction:inherit;min-height:0;min-width:0}swiper[fxflex]>.swiper.s-wrapper{-webkit-box-flex:1;flex:1 1 auto;min-height:0;min-width:0}swiper>.swiper.s-wrapper{height:100%;width:100%}swiper>.swiper.s-wrapper .swiper-wrapper .swiper-slide{height:100%;max-height:100%;max-width:100%;overflow:auto;width:100%;will-change:transform}swiper>.swiper.s-wrapper .swiper-pagination{pointer-events:none}swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle{cursor:pointer;display:inline-block;margin:2px;padding:4px;pointer-events:all;position:relative}swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet{display:inline-block;margin:0;pointer-events:none}swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper>.swiper.s-wrapper .swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{border:1px solid rgba(0,0,0,.5)}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-button-prev{left:50%;margin-left:-13px;margin-top:0;top:10px;transform:rotate(90deg)}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-button-next{bottom:10px;left:50%;margin-left:-13px;margin-top:0;top:auto;transform:rotate(90deg)}.swiper-button-next[hidden]:after,.swiper-button-prev[hidden]:after{display:none}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-scrollbar{transition:width .25s ease-in-out;width:8px}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-scrollbar:hover{width:16px}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle{display:block}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet{display:inline-block}swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper>.swiper.s-wrapper.swiper-container-vertical>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{margin:0 -1px}swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-scrollbar{height:8px;transition:height .25s ease-in-out}swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-scrollbar:hover{height:16px}swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-first,swiper>.swiper.s-wrapper.swiper-container-horizontal>.swiper-pagination .swiper-pagination-handle .swiper-pagination-bullet.swiper-pagination-bullet-last{margin:-1px 0}", "@font-face{font-family:swiper-icons;font-style:normal;font-weight:400;src:url(\"data:application/font-woff;charset=utf-8;base64, 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\") format(\"woff\")}:root{--swiper-theme-color:#007aff}.swiper-container{list-style:none;margin-left:auto;margin-right:auto;overflow:hidden;padding:0;position:relative;z-index:1}.swiper-container-vertical>.swiper-wrapper{flex-direction:column}.swiper-wrapper{box-sizing:content-box;display:flex;height:100%;position:relative;transition-property:transform;width:100%;z-index:1}.swiper-container-android .swiper-slide,.swiper-wrapper{transform:translateZ(0)}.swiper-container-multirow>.swiper-wrapper{flex-wrap:wrap}.swiper-container-multirow-column>.swiper-wrapper{flex-direction:column;flex-wrap:wrap}.swiper-container-free-mode>.swiper-wrapper{margin:0 auto;transition-timing-function:ease-out}.swiper-container-pointer-events{touch-action:pan-y}.swiper-container-pointer-events.swiper-container-vertical{touch-action:pan-x}.swiper-slide{flex-shrink:0;height:100%;position:relative;transition-property:transform;width:100%}.swiper-slide-invisible-blank{visibility:hidden}.swiper-container-autoheight,.swiper-container-autoheight .swiper-slide{height:auto}.swiper-container-autoheight .swiper-wrapper{align-items:flex-start;transition-property:transform,height}.swiper-container-3d{perspective:1200px}.swiper-container-3d .swiper-cube-shadow,.swiper-container-3d .swiper-slide,.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top,.swiper-container-3d .swiper-wrapper{transform-style:preserve-3d}.swiper-container-3d .swiper-slide-shadow-bottom,.swiper-container-3d .swiper-slide-shadow-left,.swiper-container-3d .swiper-slide-shadow-right,.swiper-container-3d .swiper-slide-shadow-top{height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%;z-index:10}.swiper-container-3d .swiper-slide-shadow-left{background-image:linear-gradient(270deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-right{background-image:linear-gradient(90deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-top{background-image:linear-gradient(0deg,rgba(0,0,0,.5),transparent)}.swiper-container-3d .swiper-slide-shadow-bottom{background-image:linear-gradient(180deg,rgba(0,0,0,.5),transparent)}.swiper-container-css-mode>.swiper-wrapper{-ms-overflow-style:none;overflow:auto;scrollbar-width:none}.swiper-container-css-mode>.swiper-wrapper::-webkit-scrollbar{display:none}.swiper-container-css-mode>.swiper-wrapper>.swiper-slide{scroll-snap-align:start start}.swiper-container-horizontal.swiper-container-css-mode>.swiper-wrapper{-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory}.swiper-container-vertical.swiper-container-css-mode>.swiper-wrapper{-ms-scroll-snap-type:y mandatory;scroll-snap-type:y mandatory}:root{--swiper-navigation-size:44px}.swiper-button-next,.swiper-button-prev{align-items:center;color:var(--swiper-navigation-color,var(--swiper-theme-color));cursor:pointer;display:flex;height:var(--swiper-navigation-size);justify-content:center;margin-top:calc(0px - var(--swiper-navigation-size)/2);position:absolute;top:50%;width:calc(var(--swiper-navigation-size)/44*27);z-index:10}.swiper-button-next.swiper-button-disabled,.swiper-button-prev.swiper-button-disabled{cursor:auto;opacity:.35;pointer-events:none}.swiper-button-next:after,.swiper-button-prev:after{font-family:swiper-icons;font-size:var(--swiper-navigation-size);font-variant:normal;letter-spacing:0;line-height:1;text-transform:none!important;text-transform:none}.swiper-button-prev,.swiper-container-rtl .swiper-button-next{left:10px;right:auto}.swiper-button-prev:after,.swiper-container-rtl .swiper-button-next:after{content:\"prev\"}.swiper-button-next,.swiper-container-rtl .swiper-button-prev{left:auto;right:10px}.swiper-button-next:after,.swiper-container-rtl .swiper-button-prev:after{content:\"next\"}.swiper-button-next.swiper-button-white,.swiper-button-prev.swiper-button-white{--swiper-navigation-color:#fff}.swiper-button-next.swiper-button-black,.swiper-button-prev.swiper-button-black{--swiper-navigation-color:#000}.swiper-button-lock{display:none}.swiper-pagination{position:absolute;text-align:center;transform:translateZ(0);transition:opacity .3s;z-index:10}.swiper-pagination.swiper-pagination-hidden{opacity:0}.swiper-container-horizontal>.swiper-pagination-bullets,.swiper-pagination-custom,.swiper-pagination-fraction{bottom:10px;left:0;width:100%}.swiper-pagination-bullets-dynamic{font-size:0;overflow:hidden}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{position:relative;transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active,.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-main{transform:scale(1)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-prev-prev{transform:scale(.33)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next{transform:scale(.66)}.swiper-pagination-bullets-dynamic .swiper-pagination-bullet-active-next-next{transform:scale(.33)}.swiper-pagination-bullet{background:#000;border-radius:50%;display:inline-block;height:8px;opacity:.2;width:8px}button.swiper-pagination-bullet{-moz-appearance:none;-webkit-appearance:none;appearance:none;border:none;box-shadow:none;margin:0;padding:0}.swiper-pagination-clickable .swiper-pagination-bullet{cursor:pointer}.swiper-pagination-bullet:only-child{display:none!important}.swiper-pagination-bullet-active{background:var(--swiper-pagination-color,var(--swiper-theme-color));opacity:1}.swiper-container-vertical>.swiper-pagination-bullets{right:10px;top:50%;transform:translate3d(0,-50%,0)}.swiper-container-vertical>.swiper-pagination-bullets .swiper-pagination-bullet{display:block;margin:6px 0}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{top:50%;transform:translateY(-50%);width:8px}.swiper-container-vertical>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{display:inline-block;transition:transform .2s,top .2s}.swiper-container-horizontal>.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 4px}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic{left:50%;transform:translateX(-50%);white-space:nowrap}.swiper-container-horizontal>.swiper-pagination-bullets.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:transform .2s,left .2s}.swiper-container-horizontal.swiper-container-rtl>.swiper-pagination-bullets-dynamic .swiper-pagination-bullet{transition:transform .2s,right .2s}.swiper-pagination-progressbar{background:rgba(0,0,0,.25);position:absolute}.swiper-pagination-progressbar .swiper-pagination-progressbar-fill{background:var(--swiper-pagination-color,var(--swiper-theme-color));height:100%;left:0;position:absolute;top:0;transform:scale(0);transform-origin:left top;width:100%}.swiper-container-rtl .swiper-pagination-progressbar .swiper-pagination-progressbar-fill{transform-origin:right top}.swiper-container-horizontal>.swiper-pagination-progressbar,.swiper-container-vertical>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite{height:4px;left:0;top:0;width:100%}.swiper-container-horizontal>.swiper-pagination-progressbar.swiper-pagination-progressbar-opposite,.swiper-container-vertical>.swiper-pagination-progressbar{height:100%;left:0;top:0;width:4px}.swiper-pagination-white{--swiper-pagination-color:#fff}.swiper-pagination-black{--swiper-pagination-color:#000}.swiper-pagination-lock{display:none}.swiper-scrollbar{-ms-touch-action:none;background:rgba(0,0,0,.1);border-radius:10px;position:relative}.swiper-container-horizontal>.swiper-scrollbar{bottom:3px;height:5px;left:1%;position:absolute;width:98%;z-index:50}.swiper-container-vertical>.swiper-scrollbar{height:98%;position:absolute;right:3px;top:1%;width:5px;z-index:50}.swiper-scrollbar-drag{background:rgba(0,0,0,.5);border-radius:10px;height:100%;left:0;position:relative;top:0;width:100%}.swiper-scrollbar-cursor-drag{cursor:move}.swiper-scrollbar-lock{display:none}.swiper-zoom-container{align-items:center;display:flex;height:100%;justify-content:center;text-align:center;width:100%}.swiper-zoom-container>canvas,.swiper-zoom-container>img,.swiper-zoom-container>svg{-o-object-fit:contain;max-height:100%;max-width:100%;object-fit:contain}.swiper-slide-zoomed{cursor:move}.swiper-lazy-preloader{-webkit-animation:swiper-preloader-spin 1s linear infinite;animation:swiper-preloader-spin 1s linear infinite;border:4px solid var(--swiper-preloader-color,var(--swiper-theme-color));border-radius:50%;border-top:4px solid transparent;box-sizing:border-box;height:42px;left:50%;margin-left:-21px;margin-top:-21px;position:absolute;top:50%;transform-origin:50%;width:42px;z-index:10}.swiper-lazy-preloader-white{--swiper-preloader-color:#fff}.swiper-lazy-preloader-black{--swiper-preloader-color:#000}@-webkit-keyframes swiper-preloader-spin{to{transform:rotate(1turn)}}@keyframes swiper-preloader-spin{to{transform:rotate(1turn)}}.swiper-container .swiper-notification{left:0;opacity:0;pointer-events:none;position:absolute;top:0;z-index:-1000}.swiper-container-fade.swiper-container-free-mode .swiper-slide{transition-timing-function:ease-out}.swiper-container-fade .swiper-slide{pointer-events:none;transition-property:opacity}.swiper-container-fade .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-fade .swiper-slide-active,.swiper-container-fade .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube{overflow:visible}.swiper-container-cube .swiper-slide{-webkit-backface-visibility:hidden;backface-visibility:hidden;height:100%;pointer-events:none;transform-origin:0 0;visibility:hidden;width:100%;z-index:1}.swiper-container-cube .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-cube.swiper-container-rtl .swiper-slide{transform-origin:100% 0}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-cube .swiper-slide-active,.swiper-container-cube .swiper-slide-next,.swiper-container-cube .swiper-slide-next+.swiper-slide,.swiper-container-cube .swiper-slide-prev{pointer-events:auto;visibility:visible}.swiper-container-cube .swiper-slide-shadow-bottom,.swiper-container-cube .swiper-slide-shadow-left,.swiper-container-cube .swiper-slide-shadow-right,.swiper-container-cube .swiper-slide-shadow-top{-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:0}.swiper-container-cube .swiper-cube-shadow{bottom:0;height:100%;left:0;opacity:.6;position:absolute;width:100%;z-index:0}.swiper-container-cube .swiper-cube-shadow:before{background:#000;bottom:0;content:\"\";filter:blur(50px);left:0;position:absolute;right:0;top:0}.swiper-container-flip{overflow:visible}.swiper-container-flip .swiper-slide{-webkit-backface-visibility:hidden;backface-visibility:hidden;pointer-events:none;z-index:1}.swiper-container-flip .swiper-slide .swiper-slide{pointer-events:none}.swiper-container-flip .swiper-slide-active,.swiper-container-flip .swiper-slide-active .swiper-slide-active{pointer-events:auto}.swiper-container-flip .swiper-slide-shadow-bottom,.swiper-container-flip .swiper-slide-shadow-left,.swiper-container-flip .swiper-slide-shadow-right,.swiper-container-flip .swiper-slide-shadow-top{-webkit-backface-visibility:hidden;backface-visibility:hidden;z-index:0}"], encapsulation: 2 });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SwiperComponent, [{
        type: Component,
        args: [{
                selector: 'swiper',
                exportAs: 'ngxSwiper',
                templateUrl: './swiper.component.html',
                styleUrls: [
                    './swiper.component.css',
                    '../../../../node_modules/swiper/swiper-bundle.css'
                ],
                encapsulation: ViewEncapsulation.None
            }]
    }], function () { return [{ type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: Object, decorators: [{
                type: Inject,
                args: [PLATFORM_ID]
            }] }, { type: undefined, decorators: [{
                type: Optional
            }, {
                type: Inject,
                args: [SWIPER_CONFIG]
            }] }]; }, { index: [{
            type: Input
        }], disabled: [{
            type: Input
        }], performance: [{
            type: Input
        }], config: [{
            type: Input
        }], useSwiperClass: [{
            type: Input
        }], indexChange: [{
            type: Output
        }], swiperSlides: [{
            type: ViewChild,
            args: ['swiperSlides', { static: false }]
        }], directiveRef: [{
            type: ViewChild,
            args: [SwiperDirective, { static: false }]
        }], S_INIT: [{
            type: Output,
            args: ['init']
        }], S_BEFOREDESTROY: [{
            type: Output,
            args: ['beforeDestroy']
        }], S_SCROLL: [{
            type: Output,
            args: ['scroll']
        }], S_PROGRESS: [{
            type: Output,
            args: ['progress']
        }], S_KEYPRESS: [{
            type: Output,
            args: ['keyPress']
        }], S_RESIZE: [{
            type: Output,
            args: ['resize']
        }], S_BREAKPOINT: [{
            type: Output,
            args: ['breakpoint']
        }], S_ZOOMCHANGE: [{
            type: Output,
            args: ['zoomChange']
        }], S_AFTERRESIZE: [{
            type: Output,
            args: ['afterResize']
        }], S_BEFORERESIZE: [{
            type: Output,
            args: ['beforeResize']
        }], S_BEFORELOOPFIX: [{
            type: Output,
            args: ['beforeLoopFix']
        }], S_LOOPFIX: [{
            type: Output,
            args: ['loopFix']
        }], S_SLIDERMOVE: [{
            type: Output,
            args: ['sliderMove']
        }], S_SLIDECHANGE: [{
            type: Output,
            args: ['slideChange']
        }], S_SETTRANSLATE: [{
            type: Output,
            args: ['setTranslate']
        }], S_SETTRANSITION: [{
            type: Output,
            args: ['setTransition']
        }], S_FROMEDGE: [{
            type: Output,
            args: ['fromEdge']
        }], S_TOEDGE: [{
            type: Output,
            args: ['toEdge']
        }], S_REACHEND: [{
            type: Output,
            args: ['reachEnd']
        }], S_REACHBEGINNING: [{
            type: Output,
            args: ['reachBeginning']
        }], S_AUTOPLAY: [{
            type: Output,
            args: ['autoplay']
        }], S_AUTOPLAYSTART: [{
            type: Output,
            args: ['autoplayStart']
        }], S_AUTOPLAYSTOP: [{
            type: Output,
            args: ['autoplayStop']
        }], S_IMAGESREADY: [{
            type: Output,
            args: ['imagesReady']
        }], S_LAZYIMAGELOAD: [{
            type: Output,
            args: ['lazyImageLoad']
        }], S_LAZYIMAGEREADY: [{
            type: Output,
            args: ['lazyImageReady']
        }], S_SCROLLDRAGEND: [{
            type: Output,
            args: ['scrollDragEnd']
        }], S_SCROLLDRAGMOVE: [{
            type: Output,
            args: ['scrollDragMove']
        }], S_SCROLLDRAGSTART: [{
            type: Output,
            args: ['scrollDragStart']
        }], S_NAVIGATIONHIDE: [{
            type: Output,
            args: ['navigationHide']
        }], S_NAVIGATIONSHOW: [{
            type: Output,
            args: ['navigationShow']
        }], S_PAGINATIONRENDER: [{
            type: Output,
            args: ['paginationRender']
        }], S_PAGINATIONUPDATE: [{
            type: Output,
            args: ['paginationUpdate']
        }], S_PAGINATIONHIDE: [{
            type: Output,
            args: ['paginationHide']
        }], S_PAGINATIONSHOW: [{
            type: Output,
            args: ['paginationShow']
        }], S_TAP: [{
            type: Output,
            args: ['swiperTap']
        }], S_CLICK: [{
            type: Output,
            args: ['swiperClick']
        }], S_DOUBLETAP: [{
            type: Output,
            args: ['swiperDoubleTap']
        }], S_TOUCHEND: [{
            type: Output,
            args: ['swiperTouchEnd']
        }], S_TOUCHMOVE: [{
            type: Output,
            args: ['swiperTouchMove']
        }], S_TOUCHSTART: [{
            type: Output,
            args: ['swiperTouchStart']
        }], S_TOUCHMOVEOPPOSITE: [{
            type: Output,
            args: ['swiperTouchMoveOpposite']
        }], S_TRANSITIONEND: [{
            type: Output,
            args: ['swiperTransitionEnd']
        }], S_TRANSITIONSTART: [{
            type: Output,
            args: ['swiperTransitionStart']
        }], S_SLIDEPREVTRANSITIONEND: [{
            type: Output,
            args: ['slidePrevTransitionEnd']
        }], S_SLIDEPREVTRANSITIONSTART: [{
            type: Output,
            args: ['slidePrevTransitionStart']
        }], S_SLIDENEXTTRANSITIONEND: [{
            type: Output,
            args: ['slideNextTransitionEnd']
        }], S_SLIDENEXTTRANSITIONSTART: [{
            type: Output,
            args: ['slideNextTransitionStart']
        }], S_SLIDECHANGETRANSITIONEND: [{
            type: Output,
            args: ['slideChangeTransitionEnd']
        }], S_SLIDECHANGETRANSITIONSTART: [{
            type: Output,
            args: ['slideChangeTransitionStart']
        }], S_OBSERVERUPDATE: [{
            type: Output,
            args: ['observerUpdate']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpcGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvY3NhYmkvZGV2ZWxvcC9hcHBzL25neC1zd2lwZXItd3JhcHBlci9wcm9qZWN0cy9saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL3N3aXBlci5jb21wb25lbnQudHMiLCJsaWIvc3dpcGVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDNUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFVLE1BQU0sRUFBRSxRQUFRLEVBQWMsU0FBUyxFQUM1QixLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDckQsU0FBUyxFQUFFLGlCQUFpQixFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUl6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQWUsTUFBTSxxQkFBcUIsQ0FBQzs7Ozs7QUFZakcsTUFBTSxPQUFPLGVBQWU7SUFtRzFCLFlBQW9CLElBQVksRUFBVSxLQUF3QixFQUNuQyxVQUFrQixFQUNKLFFBQXVCO1FBRmhELFNBQUksR0FBSixJQUFJLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFtQjtRQUNuQyxlQUFVLEdBQVYsVUFBVSxDQUFRO1FBQ0osYUFBUSxHQUFSLFFBQVEsQ0FBZTtRQXBHNUQsT0FBRSxHQUE0QixJQUFJLENBQUM7UUFFcEMsaUJBQVksR0FBUSxJQUFJLENBQUM7UUFDekIscUJBQWdCLEdBQVEsSUFBSSxDQUFDO1FBQzdCLHFCQUFnQixHQUFRLElBQUksQ0FBQztRQUUzQixVQUFLLEdBQWtCLElBQUksQ0FBQztRQUU1QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBSTdCLG1CQUFjLEdBQVksSUFBSSxDQUFDO1FBRTlCLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQWdCWixXQUFNLEdBQTZCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0Qsb0JBQWUsR0FBb0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCxhQUFRLEdBQTJCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QsZUFBVSxHQUF5QixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELGVBQVUsR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCxhQUFRLEdBQTJCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRCxpQkFBWSxHQUF1QixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QsbUJBQWMsR0FBcUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCxvQkFBZSxHQUFvQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELGNBQVMsR0FBMEIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCxpQkFBWSxHQUF1QixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELGtCQUFhLEdBQXNCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0QsbUJBQWMsR0FBcUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRCxvQkFBZSxHQUFvQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTNELGVBQVUsR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRCxhQUFRLEdBQTJCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QsZUFBVSxHQUF5QixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELHFCQUFnQixHQUFtQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTNELGVBQVUsR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRCxvQkFBZSxHQUFvQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELG1CQUFjLEdBQXFCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0Qsa0JBQWEsR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRCxvQkFBZSxHQUFvQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELHFCQUFnQixHQUFtQixJQUFJLFlBQVksRUFBTyxDQUFDO1FBRTNELG9CQUFlLEdBQW9CLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QscUJBQWdCLEdBQW1CLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0Qsc0JBQWlCLEdBQWtCLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0QscUJBQWdCLEdBQW1CLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QscUJBQWdCLEdBQW1CLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0QsdUJBQWtCLEdBQWlCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QsdUJBQWtCLEdBQWlCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QscUJBQWdCLEdBQW1CLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QscUJBQWdCLEdBQW1CLElBQUksWUFBWSxFQUFPLENBQUM7UUFFM0QsVUFBSyxHQUE4QixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELFlBQU8sR0FBNEIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRCxnQkFBVyxHQUF3QixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELGVBQVUsR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRCxnQkFBVyxHQUF3QixJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELGlCQUFZLEdBQXVCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0Qsd0JBQW1CLEdBQWdCLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0Qsb0JBQWUsR0FBb0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRCxzQkFBaUIsR0FBa0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCw2QkFBd0IsR0FBVyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELCtCQUEwQixHQUFTLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QsNkJBQXdCLEdBQVcsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRCwrQkFBMEIsR0FBUyxJQUFJLFlBQVksRUFBTyxDQUFDO1FBQzNELCtCQUEwQixHQUFTLElBQUksWUFBWSxFQUFPLENBQUM7UUFDM0QsaUNBQTRCLEdBQU8sSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUMzRCxxQkFBZ0IsR0FBbUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUszQixDQUFDO0lBOUV4RSxJQUFJLFFBQVE7UUFDVixPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUQsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUQsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUF3RUQsZUFBZTtRQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkMsT0FBTztTQUNSO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBRXJCLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxPQUFPLGdCQUFnQixLQUFLLFdBQVcsRUFBRTtnQkFDaEUsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEdBQUcsRUFBRTtvQkFDbEMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN2QixDQUFDLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNyQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRW5CLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBRWpELGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQXNCLEVBQUUsRUFBRTtvQkFDbEQsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFO3dCQUNyQixNQUFNLE1BQU0sR0FBRyxLQUFLLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7d0JBRXBFLE1BQU0sZUFBZSxHQUFHLE1BQStCLENBQUM7d0JBQ3hELE1BQU0sZUFBZSxHQUFHLE1BQStCLENBQUM7d0JBRXhELElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBVSxDQUFDO3FCQUNyRTtnQkFDSCxDQUFDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ1IsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxFQUFFLEVBQUU7WUFDWCxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDO1NBQ3RCO1FBRUQsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtZQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBRU0sU0FBUztRQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXBELElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLHVCQUF1QjtRQUU5RCxJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsS0FBSyxJQUFJO1lBQzVELENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLElBQUksT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsS0FBSyxRQUFRO2dCQUNqRixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7Z0JBQ3ZGLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxvQkFBb0IsQ0FBQyxDQUFDLEVBQzNHO1lBQ0UsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLEVBQUUsQ0FBQztZQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFO2dCQUMxQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7Z0JBRS9DLElBQUksQ0FBQyxnQkFBZ0IsR0FBRztvQkFDdEIsRUFBRSxFQUFFLG9CQUFvQjtvQkFFeEIsWUFBWSxFQUFFLENBQUMsS0FBYSxFQUFFLFNBQWlCLEVBQUUsRUFBRTt3QkFDakQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO3dCQUU3RixRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzt3QkFFckYsSUFBSSxNQUFNLEdBQUcsZ0JBQWdCLFNBQVMsSUFBSSxTQUFTLG1CQUFtQixLQUFLLFdBQVcsQ0FBQzt3QkFFdkYsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFOzRCQUNmLE1BQU0sR0FBRyxnQkFBZ0IsU0FBUyxJQUFJLFNBQVMsa0JBQWtCLEtBQUssV0FBVyxDQUFDO3lCQUNuRjs2QkFBTSxJQUFJLEtBQUssS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEVBQUU7NEJBQzFDLE1BQU0sR0FBRyxnQkFBZ0IsU0FBUyxJQUFJLFNBQVMsaUJBQWlCLEtBQUssV0FBVyxDQUFDO3lCQUNsRjt3QkFFRCxPQUFPLGlEQUFpRCxLQUFLLEtBQUssTUFBTSxTQUFTLENBQUM7b0JBQ3BGLENBQUM7aUJBQ0YsQ0FBQzthQUNIO1lBRUQsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQzthQUNoRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzthQUM1RjtTQUNGO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBdUIsQ0FBQztJQUN0QyxDQUFDO0lBRU8sYUFBYTtRQUNuQixJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDckIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO1lBRXpCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUUxRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLEVBQUU7b0JBQ3JELFlBQVksR0FBRyxJQUFJLENBQUM7b0JBRXBCLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUMzQzthQUNGO1lBRUQsSUFBSSxZQUFZLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDckMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUM1QjtTQUNGO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0saUJBQWlCLENBQUMsS0FBYTtRQUNwQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLElBQUk7WUFDckUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFFBQVE7Z0JBQ3JFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztnQkFDM0UsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxFQUM3RjtZQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ25DO0lBQ0gsQ0FBQzs7OEVBbE9VLGVBQWUsb0dBb0doQixXQUFXLHdCQUNDLGFBQWE7b0RBckd4QixlQUFlOzt1QkFxQmYsZUFBZTs7Ozs7OztRQzFDNUIsaUNBQ0U7UUFBQSxpQ0FDRTtRQUFBLGtCQUFZO1FBQ2QsaUJBQU07UUFFTix5QkFBc007UUFFdE0seUJBQTBQO1FBQzFQLHlCQUF5UDtRQUV6UCw4QkFBb1Y7UUFBOUksK0ZBQVMsc0JBQWtCLDJCQUEyQixPQUFPLENBQUMsQ0FBQyxJQUFDLDhGQUFnQixzQkFBa0IsMkJBQTJCLE9BQU8sQ0FBQyxDQUFDLElBQXRFO1FBQXdFLGlCQUFNO1FBQ3RWLGlCQUFNOztRQVh5Qiw0Q0FBK0Isd0NBQUE7UUFBMkMsd0NBQXNCLG9CQUFBLDBCQUFBLGdDQUFBO1FBSy9GLGVBQWlLO1FBQWpLLCtaQUFpSztRQUUvSixlQUErSztRQUEvSywrYUFBK0s7UUFBQyxpREFBbUM7UUFDbk4sZUFBK0s7UUFBL0ssK2FBQStLO1FBQUMsZ0RBQWtDO1FBRW5OLGVBQXNLO1FBQXRLLHNhQUFzSzs7a0REVzFMLGVBQWU7Y0FWM0IsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSxRQUFRO2dCQUNsQixRQUFRLEVBQUUsV0FBVztnQkFDckIsV0FBVyxFQUFFLHlCQUF5QjtnQkFDdEMsU0FBUyxFQUFFO29CQUNULHdCQUF3QjtvQkFDeEIsbURBQW1EO2lCQUNwRDtnQkFDRCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTthQUN0QzsyRkFxRzRDLE1BQU07c0JBQTlDLE1BQU07dUJBQUMsV0FBVzs7c0JBQ2xCLFFBQVE7O3NCQUFJLE1BQU07dUJBQUMsYUFBYTt3QkE5RjFCLEtBQUs7a0JBQWIsS0FBSztZQUVHLFFBQVE7a0JBQWhCLEtBQUs7WUFFRyxXQUFXO2tCQUFuQixLQUFLO1lBRUcsTUFBTTtrQkFBZCxLQUFLO1lBRUcsY0FBYztrQkFBdEIsS0FBSztZQUVJLFdBQVc7a0JBQXBCLE1BQU07WUFFdUMsWUFBWTtrQkFBekQsU0FBUzttQkFBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1lBRUcsWUFBWTtrQkFBMUQsU0FBUzttQkFBQyxlQUFlLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1lBWU4sTUFBTTtrQkFBNUMsTUFBTTttQkFBQyxNQUFNO1lBQ3lCLGVBQWU7a0JBQXJELE1BQU07bUJBQUMsZUFBZTtZQUVnQixRQUFRO2tCQUE5QyxNQUFNO21CQUFDLFFBQVE7WUFDdUIsVUFBVTtrQkFBaEQsTUFBTTttQkFBQyxVQUFVO1lBQ3FCLFVBQVU7a0JBQWhELE1BQU07bUJBQUMsVUFBVTtZQUVxQixRQUFRO2tCQUE5QyxNQUFNO21CQUFDLFFBQVE7WUFDdUIsWUFBWTtrQkFBbEQsTUFBTTttQkFBQyxZQUFZO1lBQ21CLFlBQVk7a0JBQWxELE1BQU07bUJBQUMsWUFBWTtZQUNtQixhQUFhO2tCQUFuRCxNQUFNO21CQUFDLGFBQWE7WUFDa0IsY0FBYztrQkFBcEQsTUFBTTttQkFBQyxjQUFjO1lBRWlCLGVBQWU7a0JBQXJELE1BQU07bUJBQUMsZUFBZTtZQUNnQixTQUFTO2tCQUEvQyxNQUFNO21CQUFDLFNBQVM7WUFFc0IsWUFBWTtrQkFBbEQsTUFBTTttQkFBQyxZQUFZO1lBQ21CLGFBQWE7a0JBQW5ELE1BQU07bUJBQUMsYUFBYTtZQUVrQixjQUFjO2tCQUFwRCxNQUFNO21CQUFDLGNBQWM7WUFDaUIsZUFBZTtrQkFBckQsTUFBTTttQkFBQyxlQUFlO1lBRWdCLFVBQVU7a0JBQWhELE1BQU07bUJBQUMsVUFBVTtZQUNxQixRQUFRO2tCQUE5QyxNQUFNO21CQUFDLFFBQVE7WUFDdUIsVUFBVTtrQkFBaEQsTUFBTTttQkFBQyxVQUFVO1lBQ3FCLGdCQUFnQjtrQkFBdEQsTUFBTTttQkFBQyxnQkFBZ0I7WUFFZSxVQUFVO2tCQUFoRCxNQUFNO21CQUFDLFVBQVU7WUFDcUIsZUFBZTtrQkFBckQsTUFBTTttQkFBQyxlQUFlO1lBQ2dCLGNBQWM7a0JBQXBELE1BQU07bUJBQUMsY0FBYztZQUVpQixhQUFhO2tCQUFuRCxNQUFNO21CQUFDLGFBQWE7WUFDa0IsZUFBZTtrQkFBckQsTUFBTTttQkFBQyxlQUFlO1lBQ2dCLGdCQUFnQjtrQkFBdEQsTUFBTTttQkFBQyxnQkFBZ0I7WUFFZSxlQUFlO2tCQUFyRCxNQUFNO21CQUFDLGVBQWU7WUFDZ0IsZ0JBQWdCO2tCQUF0RCxNQUFNO21CQUFDLGdCQUFnQjtZQUNlLGlCQUFpQjtrQkFBdkQsTUFBTTttQkFBQyxpQkFBaUI7WUFFYyxnQkFBZ0I7a0JBQXRELE1BQU07bUJBQUMsZ0JBQWdCO1lBQ2UsZ0JBQWdCO2tCQUF0RCxNQUFNO21CQUFDLGdCQUFnQjtZQUVlLGtCQUFrQjtrQkFBeEQsTUFBTTttQkFBQyxrQkFBa0I7WUFDYSxrQkFBa0I7a0JBQXhELE1BQU07bUJBQUMsa0JBQWtCO1lBQ2EsZ0JBQWdCO2tCQUF0RCxNQUFNO21CQUFDLGdCQUFnQjtZQUNlLGdCQUFnQjtrQkFBdEQsTUFBTTttQkFBQyxnQkFBZ0I7WUFFZSxLQUFLO2tCQUEzQyxNQUFNO21CQUFDLFdBQVc7WUFDb0IsT0FBTztrQkFBN0MsTUFBTTttQkFBQyxhQUFhO1lBQ2tCLFdBQVc7a0JBQWpELE1BQU07bUJBQUMsaUJBQWlCO1lBQ2MsVUFBVTtrQkFBaEQsTUFBTTttQkFBQyxnQkFBZ0I7WUFDZSxXQUFXO2tCQUFqRCxNQUFNO21CQUFDLGlCQUFpQjtZQUNjLFlBQVk7a0JBQWxELE1BQU07bUJBQUMsa0JBQWtCO1lBQ2EsbUJBQW1CO2tCQUF6RCxNQUFNO21CQUFDLHlCQUF5QjtZQUNNLGVBQWU7a0JBQXJELE1BQU07bUJBQUMscUJBQXFCO1lBQ1UsaUJBQWlCO2tCQUF2RCxNQUFNO21CQUFDLHVCQUF1QjtZQUVRLHdCQUF3QjtrQkFBOUQsTUFBTTttQkFBQyx3QkFBd0I7WUFDTywwQkFBMEI7a0JBQWhFLE1BQU07bUJBQUMsMEJBQTBCO1lBQ0ssd0JBQXdCO2tCQUE5RCxNQUFNO21CQUFDLHdCQUF3QjtZQUNPLDBCQUEwQjtrQkFBaEUsTUFBTTttQkFBQywwQkFBMEI7WUFDSywwQkFBMEI7a0JBQWhFLE1BQU07bUJBQUMsMEJBQTBCO1lBQ0ssNEJBQTRCO2tCQUFsRSxNQUFNO21CQUFDLDRCQUE0QjtZQUNHLGdCQUFnQjtrQkFBdEQsTUFBTTttQkFBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdab25lLCBJbmplY3QsIE9wdGlvbmFsLCBFbGVtZW50UmVmLCBDb21wb25lbnQsXG4gIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLFxuICBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uLCBDaGFuZ2VEZXRlY3RvclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTd2lwZXJPcHRpb25zIH0gZnJvbSAnc3dpcGVyJztcblxuaW1wb3J0IHsgU3dpcGVyRGlyZWN0aXZlIH0gZnJvbSAnLi9zd2lwZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IFNXSVBFUl9DT05GSUcsIFN3aXBlckNvbmZpZywgU3dpcGVyRXZlbnROYW1lcywgU3dpcGVyRXZlbnQgfSBmcm9tICcuL3N3aXBlci5pbnRlcmZhY2VzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnc3dpcGVyJyxcbiAgZXhwb3J0QXM6ICduZ3hTd2lwZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vc3dpcGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXG4gICAgJy4vc3dpcGVyLmNvbXBvbmVudC5jc3MnLFxuICAgICcuLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3N3aXBlci1idW5kbGUuY3NzJ1xuICBdLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIFN3aXBlckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgbW86IE11dGF0aW9uT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcblxuICBwdWJsaWMgc3dpcGVyQ29uZmlnOiBhbnkgPSBudWxsO1xuICBwdWJsaWMgcGFnaW5hdGlvbkJhY2t1cDogYW55ID0gbnVsbDtcbiAgcHVibGljIHBhZ2luYXRpb25Db25maWc6IGFueSA9IG51bGw7XG5cbiAgQElucHV0KCkgaW5kZXg6IG51bWJlciB8IG51bGwgPSBudWxsO1xuXG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcGVyZm9ybWFuY2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBASW5wdXQoKSBjb25maWc/OiBTd2lwZXJPcHRpb25zO1xuXG4gIEBJbnB1dCgpIHVzZVN3aXBlckNsYXNzOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgaW5kZXhDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBAVmlld0NoaWxkKCdzd2lwZXJTbGlkZXMnLCB7IHN0YXRpYzogZmFsc2UgfSkgc3dpcGVyU2xpZGVzPzogRWxlbWVudFJlZjtcblxuICBAVmlld0NoaWxkKFN3aXBlckRpcmVjdGl2ZSwgeyBzdGF0aWM6IGZhbHNlIH0pIGRpcmVjdGl2ZVJlZj86IFN3aXBlckRpcmVjdGl2ZTtcblxuICBnZXQgaXNBdExhc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICghdGhpcy5kaXJlY3RpdmVSZWYgfHwgIXRoaXMuZGlyZWN0aXZlUmVmLnN3aXBlcigpKSA/XG4gICAgICBmYWxzZSA6IHRoaXMuZGlyZWN0aXZlUmVmLnN3aXBlcigpWydpc0VuZCddO1xuICB9XG5cbiAgZ2V0IGlzQXRGaXJzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKCF0aGlzLmRpcmVjdGl2ZVJlZiB8fCAhdGhpcy5kaXJlY3RpdmVSZWYuc3dpcGVyKCkpID9cbiAgICAgIGZhbHNlIDogdGhpcy5kaXJlY3RpdmVSZWYuc3dpcGVyKClbJ2lzQmVnaW5uaW5nJ107XG4gIH1cblxuICBAT3V0cHV0KCdpbml0JyAgICAgICAgICAgICAgICAgICAgICAgKSBTX0lOSVQgICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdiZWZvcmVEZXN0cm95JyAgICAgICAgICAgICAgKSBTX0JFRk9SRURFU1RST1kgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ3Njcm9sbCcgICAgICAgICAgICAgICAgICAgICApIFNfU0NST0xMICAgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ3Byb2dyZXNzJyAgICAgICAgICAgICAgICAgICApIFNfUFJPR1JFU1MgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ2tleVByZXNzJyAgICAgICAgICAgICAgICAgICApIFNfS0VZUFJFU1MgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgncmVzaXplJyAgICAgICAgICAgICAgICAgICAgICkgU19SRVNJWkUgICAgICAgICAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnYnJlYWtwb2ludCcgICAgICAgICAgICAgICAgICkgU19CUkVBS1BPSU5UICAgICAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnem9vbUNoYW5nZScgICAgICAgICAgICAgICAgICkgU19aT09NQ0hBTkdFICAgICAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnYWZ0ZXJSZXNpemUnICAgICAgICAgICAgICAgICkgU19BRlRFUlJFU0laRSAgICAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnYmVmb3JlUmVzaXplJyAgICAgICAgICAgICAgICkgU19CRUZPUkVSRVNJWkUgICAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdiZWZvcmVMb29wRml4JyAgICAgICAgICAgICAgKSBTX0JFRk9SRUxPT1BGSVggICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdsb29wRml4JyAgICAgICAgICAgICAgICAgICAgKSBTX0xPT1BGSVggICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ3NsaWRlck1vdmUnICAgICAgICAgICAgICAgICApIFNfU0xJREVSTU9WRSAgICAgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ3NsaWRlQ2hhbmdlJyAgICAgICAgICAgICAgICApIFNfU0xJREVDSEFOR0UgICAgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnc2V0VHJhbnNsYXRlJyAgICAgICAgICAgICAgICkgU19TRVRUUkFOU0xBVEUgICAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnc2V0VHJhbnNpdGlvbicgICAgICAgICAgICAgICkgU19TRVRUUkFOU0lUSU9OICAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdmcm9tRWRnZScgICAgICAgICAgICAgICAgICAgKSBTX0ZST01FREdFICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCd0b0VkZ2UnICAgICAgICAgICAgICAgICAgICAgKSBTX1RPRURHRSAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdyZWFjaEVuZCcgICAgICAgICAgICAgICAgICAgKSBTX1JFQUNIRU5EICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdyZWFjaEJlZ2lubmluZycgICAgICAgICAgICAgKSBTX1JFQUNIQkVHSU5OSU5HICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ2F1dG9wbGF5JyAgICAgICAgICAgICAgICAgICApIFNfQVVUT1BMQVkgICAgICAgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ2F1dG9wbGF5U3RhcnQnICAgICAgICAgICAgICApIFNfQVVUT1BMQVlTVEFSVCAgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ2F1dG9wbGF5U3RvcCcgICAgICAgICAgICAgICApIFNfQVVUT1BMQVlTVE9QICAgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgnaW1hZ2VzUmVhZHknICAgICAgICAgICAgICAgICkgU19JTUFHRVNSRUFEWSAgICAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnbGF6eUltYWdlTG9hZCcgICAgICAgICAgICAgICkgU19MQVpZSU1BR0VMT0FEICAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgnbGF6eUltYWdlUmVhZHknICAgICAgICAgICAgICkgU19MQVpZSU1BR0VSRUFEWSAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdzY3JvbGxEcmFnRW5kJyAgICAgICAgICAgICAgKSBTX1NDUk9MTERSQUdFTkQgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdzY3JvbGxEcmFnTW92ZScgICAgICAgICAgICAgKSBTX1NDUk9MTERSQUdNT1ZFICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdzY3JvbGxEcmFnU3RhcnQnICAgICAgICAgICAgKSBTX1NDUk9MTERSQUdTVEFSVCAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ25hdmlnYXRpb25IaWRlJyAgICAgICAgICAgICApIFNfTkFWSUdBVElPTkhJREUgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ25hdmlnYXRpb25TaG93JyAgICAgICAgICAgICApIFNfTkFWSUdBVElPTlNIT1cgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgQE91dHB1dCgncGFnaW5hdGlvblJlbmRlcicgICAgICAgICAgICkgU19QQUdJTkFUSU9OUkVOREVSICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgncGFnaW5hdGlvblVwZGF0ZScgICAgICAgICAgICkgU19QQUdJTkFUSU9OVVBEQVRFICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgncGFnaW5hdGlvbkhpZGUnICAgICAgICAgICAgICkgU19QQUdJTkFUSU9OSElERSAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcbiAgQE91dHB1dCgncGFnaW5hdGlvblNob3cnICAgICAgICAgICAgICkgU19QQUdJTkFUSU9OU0hPVyAgICAgICAgICAgICAgICAgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBAT3V0cHV0KCdzd2lwZXJUYXAnICAgICAgICAgICAgICAgICAgKSBTX1RBUCAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdzd2lwZXJDbGljaycgICAgICAgICAgICAgICAgKSBTX0NMSUNLICAgICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdzd2lwZXJEb3VibGVUYXAnICAgICAgICAgICAgKSBTX0RPVUJMRVRBUCAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdzd2lwZXJUb3VjaEVuZCcgICAgICAgICAgICAgKSBTX1RPVUNIRU5EICAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdzd2lwZXJUb3VjaE1vdmUnICAgICAgICAgICAgKSBTX1RPVUNITU9WRSAgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdzd2lwZXJUb3VjaFN0YXJ0JyAgICAgICAgICAgKSBTX1RPVUNIU1RBUlQgICAgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdzd2lwZXJUb3VjaE1vdmVPcHBvc2l0ZScgICAgKSBTX1RPVUNITU9WRU9QUE9TSVRFICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdzd2lwZXJUcmFuc2l0aW9uRW5kJyAgICAgICAgKSBTX1RSQU5TSVRJT05FTkQgICAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuICBAT3V0cHV0KCdzd2lwZXJUcmFuc2l0aW9uU3RhcnQnICAgICAgKSBTX1RSQU5TSVRJT05TVEFSVCAgICAgICAgICAgICAgICA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIEBPdXRwdXQoJ3NsaWRlUHJldlRyYW5zaXRpb25FbmQnICAgICApIFNfU0xJREVQUkVWVFJBTlNJVElPTkVORCAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCcgICApIFNfU0xJREVQUkVWVFJBTlNJVElPTlNUQVJUICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ3NsaWRlTmV4dFRyYW5zaXRpb25FbmQnICAgICApIFNfU0xJREVORVhUVFJBTlNJVElPTkVORCAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydCcgICApIFNfU0xJREVORVhUVFJBTlNJVElPTlNUQVJUICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZCcgICApIFNfU0xJREVDSEFOR0VUUkFOU0lUSU9ORU5EICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0JyApIFNfU0xJREVDSEFOR0VUUkFOU0lUSU9OU1RBUlQgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gIEBPdXRwdXQoJ29ic2VydmVyVXBkYXRlJyAgICAgICAgICAgICApIFNfT0JTRVJWRVJVUERBVEUgICAgICAgICAgICAgICAgID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSwgcHJpdmF0ZSBjZFJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBPYmplY3QsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChTV0lQRVJfQ09ORklHKSBwcml2YXRlIGRlZmF1bHRzOiBTd2lwZXJPcHRpb25zKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIWlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy51cGRhdGVDbGFzc2VzKCk7XG5cbiAgICAgIGlmICh0aGlzLnN3aXBlclNsaWRlcyAmJiB0eXBlb2YgTXV0YXRpb25PYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5tbyA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHtcbiAgICAgICAgICB0aGlzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tby5vYnNlcnZlKHRoaXMuc3dpcGVyU2xpZGVzLm5hdGl2ZUVsZW1lbnQsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuZGlyZWN0aXZlUmVmKSB7XG4gICAgICAgIHRoaXMuU19JTklULmVtaXQoKTtcblxuICAgICAgICB0aGlzLmRpcmVjdGl2ZVJlZi5pbmRleENoYW5nZSA9IHRoaXMuaW5kZXhDaGFuZ2U7XG5cbiAgICAgICAgU3dpcGVyRXZlbnROYW1lcy5mb3JFYWNoKChldmVudE5hbWU6IFN3aXBlckV2ZW50KSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuZGlyZWN0aXZlUmVmKSB7XG4gICAgICAgICAgICBjb25zdCBvdXRwdXQgPSBgU18ke2V2ZW50TmFtZS5yZXBsYWNlKCdzd2lwZXInLCAnJykudG9VcHBlckNhc2UoKX1gO1xuXG4gICAgICAgICAgICBjb25zdCBkaXJlY3RpdmVPdXRwdXQgPSBvdXRwdXQgYXMga2V5b2YgU3dpcGVyRGlyZWN0aXZlO1xuICAgICAgICAgICAgY29uc3QgY29tcG9uZW50T3V0cHV0ID0gb3V0cHV0IGFzIGtleW9mIFN3aXBlckNvbXBvbmVudDtcblxuICAgICAgICAgICAgdGhpcy5kaXJlY3RpdmVSZWZbZGlyZWN0aXZlT3V0cHV0XSA9IHRoaXNbY29tcG9uZW50T3V0cHV0XSBhcyBuZXZlcjtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIDApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubW8pIHtcbiAgICAgIHRoaXMubW8uZGlzY29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNvbmZpZyAmJiB0aGlzLnBhZ2luYXRpb25CYWNrdXApIHtcbiAgICAgIHRoaXMuY29uZmlnLnBhZ2luYXRpb24gPSB0aGlzLnBhZ2luYXRpb25CYWNrdXA7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldENvbmZpZygpOiBTd2lwZXJPcHRpb25zIHtcbiAgICB0aGlzLnN3aXBlckNvbmZpZyA9IG5ldyBTd2lwZXJDb25maWcodGhpcy5kZWZhdWx0cyk7XG5cbiAgICB0aGlzLnN3aXBlckNvbmZpZy5hc3NpZ24odGhpcy5jb25maWcpOyAvLyBDdXN0b20gY29uZmlndXJhdGlvblxuXG4gICAgaWYgKHRoaXMuc3dpcGVyU2xpZGVzICYmICh0aGlzLnN3aXBlckNvbmZpZy5wYWdpbmF0aW9uID09PSB0cnVlIHx8XG4gICAgICAgKHRoaXMuc3dpcGVyQ29uZmlnLnBhZ2luYXRpb24gJiYgdHlwZW9mIHRoaXMuc3dpcGVyQ29uZmlnLnBhZ2luYXRpb24gPT09ICdvYmplY3QnICYmXG4gICAgICAgKCF0aGlzLnN3aXBlckNvbmZpZy5wYWdpbmF0aW9uLnR5cGUgfHwgdGhpcy5zd2lwZXJDb25maWcucGFnaW5hdGlvbi50eXBlID09PSAnYnVsbGV0cycpICYmXG4gICAgICAgIXRoaXMuc3dpcGVyQ29uZmlnLnBhZ2luYXRpb24ucmVuZGVyQnVsbGV0ICYmIHRoaXMuc3dpcGVyQ29uZmlnLnBhZ2luYXRpb24uZWwgPT09ICcuc3dpcGVyLXBhZ2luYXRpb24nKSkpXG4gICAge1xuICAgICAgdGhpcy5jb25maWcgPSB0aGlzLmNvbmZpZyB8fMKge307XG5cbiAgICAgIGlmICghdGhpcy5wYWdpbmF0aW9uQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucGFnaW5hdGlvbkJhY2t1cCA9IHRoaXMuY29uZmlnLnBhZ2luYXRpb247XG5cbiAgICAgICAgdGhpcy5wYWdpbmF0aW9uQ29uZmlnID0ge1xuICAgICAgICAgIGVsOiAnLnN3aXBlci1wYWdpbmF0aW9uJyxcblxuICAgICAgICAgIHJlbmRlckJ1bGxldDogKGluZGV4OiBudW1iZXIsIGNsYXNzTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgY2hpbGRyZW4gPSB0aGlzLnN3aXBlclNsaWRlcyA/IEFycmF5LmZyb20odGhpcy5zd2lwZXJTbGlkZXMubmF0aXZlRWxlbWVudC5jaGlsZHJlbikgOiBbXTtcblxuICAgICAgICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5maWx0ZXIoKGNoaWxkOiBhbnkpID0+IGNoaWxkLmNsYXNzTGlzdC5jb250YWlucygnc3dpcGVyLXNsaWRlJykpO1xuXG4gICAgICAgICAgICBsZXQgYnVsbGV0ID0gYDxzcGFuIGNsYXNzPVwiJHtjbGFzc05hbWV9ICR7Y2xhc3NOYW1lfS1taWRkbGVcIiBpbmRleD1cIiR7aW5kZXh9XCI+PC9zcGFuPmA7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICBidWxsZXQgPSBgPHNwYW4gY2xhc3M9XCIke2NsYXNzTmFtZX0gJHtjbGFzc05hbWV9LWZpcnN0XCIgaW5kZXg9XCIke2luZGV4fVwiPjwvc3Bhbj5gO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbmRleCA9PT0gKGNoaWxkcmVuLmxlbmd0aCAtIDEpKSB7XG4gICAgICAgICAgICAgIGJ1bGxldCA9IGA8c3BhbiBjbGFzcz1cIiR7Y2xhc3NOYW1lfSAke2NsYXNzTmFtZX0tbGFzdFwiIGluZGV4PVwiJHtpbmRleH1cIj48L3NwYW4+YDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cInN3aXBlci1wYWdpbmF0aW9uLWhhbmRsZVwiIGluZGV4PVwiJHtpbmRleH1cIj4ke2J1bGxldH08L3NwYW4+YDtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnN3aXBlckNvbmZpZy5wYWdpbmF0aW9uID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLnBhZ2luYXRpb24gPSB0aGlzLnBhZ2luYXRpb25Db25maWc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNvbmZpZy5wYWdpbmF0aW9uID0gT2JqZWN0LmFzc2lnbih7fSAsIHRoaXMuY29uZmlnLnBhZ2luYXRpb24sIHRoaXMucGFnaW5hdGlvbkNvbmZpZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29uZmlnIGFzIFN3aXBlck9wdGlvbnM7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUNsYXNzZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc3dpcGVyU2xpZGVzKSB7XG4gICAgICBsZXQgdXBkYXRlTmVlZGVkID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IGNoaWxkcmVuID0gdGhpcy5zd2lwZXJTbGlkZXMubmF0aXZlRWxlbWVudC5jaGlsZHJlbjtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoL3N3aXBlci0uKi8udGVzdChjaGlsZHJlbltpXS5jbGFzc05hbWUpID09PSBmYWxzZSkge1xuICAgICAgICAgIHVwZGF0ZU5lZWRlZCA9IHRydWU7XG5cbiAgICAgICAgICBjaGlsZHJlbltpXS5jbGFzc0xpc3QuYWRkKCdzd2lwZXItc2xpZGUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodXBkYXRlTmVlZGVkICYmIHRoaXMuZGlyZWN0aXZlUmVmKSB7XG4gICAgICAgIHRoaXMuZGlyZWN0aXZlUmVmLnVwZGF0ZSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY2RSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICB9XG5cbiAgcHVibGljIG9uUGFnaW5hdGlvbkNsaWNrKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb25maWcgJiYgdGhpcy5kaXJlY3RpdmVSZWYgJiYgKHRoaXMuY29uZmlnLnBhZ2luYXRpb24gPT09IHRydWUgfHxcbiAgICAgICAodGhpcy5jb25maWcucGFnaW5hdGlvbiAmJiB0eXBlb2YgdGhpcy5jb25maWcucGFnaW5hdGlvbiA9PT0gJ29iamVjdCcgJiZcbiAgICAgICAoIXRoaXMuY29uZmlnLnBhZ2luYXRpb24udHlwZSB8fCB0aGlzLmNvbmZpZy5wYWdpbmF0aW9uLnR5cGUgPT09ICdidWxsZXRzJykgJiZcbiAgICAgICAodGhpcy5jb25maWcucGFnaW5hdGlvbi5jbGlja2FibGUgJiYgdGhpcy5jb25maWcucGFnaW5hdGlvbi5lbCA9PT0gJy5zd2lwZXItcGFnaW5hdGlvbicpKSkpXG4gICAge1xuICAgICAgdGhpcy5kaXJlY3RpdmVSZWYuc2V0SW5kZXgoaW5kZXgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiAjc3dpcGVyIGNsYXNzPVwicy13cmFwcGVyXCIgW2NsYXNzLnN3aXBlcl09XCJ1c2VTd2lwZXJDbGFzc1wiIFtjbGFzcy5zd2lwZXItY29udGFpbmVyXT1cInVzZVN3aXBlckNsYXNzXCIgW3N3aXBlcl09XCJnZXRDb25maWcoKVwiIFtpbmRleF09XCJpbmRleFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiIFtwZXJmb3JtYW5jZV09XCJwZXJmb3JtYW5jZVwiPlxuICA8ZGl2ICNzd2lwZXJTbGlkZXMgY2xhc3M9XCJzd2lwZXItd3JhcHBlclwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cInN3aXBlci1zY3JvbGxiYXJcIiBbaGlkZGVuXT1cIiFzd2lwZXJDb25maWc/LnNjcm9sbGJhciB8fCAoc3dpcGVyQ29uZmlnPy5zY3JvbGxiYXIgIT09IHRydWUgJiYgISFzd2lwZXJDb25maWc/LnNjcm9sbGJhcj8uZWwgJiYgc3dpcGVyQ29uZmlnPy5zY3JvbGxiYXI/LmVsICE9PSAnLnN3aXBlci1zY3JvbGxiYXInKVwiPjwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJzd2lwZXItYnV0dG9uLXByZXZcIiBbaGlkZGVuXT1cIiFzd2lwZXJDb25maWc/Lm5hdmlnYXRpb24gfHwgKHN3aXBlckNvbmZpZz8ubmF2aWdhdGlvbiAhPT0gdHJ1ZSAmJiAhIXN3aXBlckNvbmZpZz8ubmF2aWdhdGlvbj8ucHJldkVsICYmIHN3aXBlckNvbmZpZz8ubmF2aWdhdGlvbj8ucHJldkVsICE9PSAnLnN3aXBlci1idXR0b24tcHJldicpXCIgW2F0dHIuZGlzYWJsZWRdPVwiaXNBdEZpcnN0IHx8wqBudWxsXCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzd2lwZXItYnV0dG9uLW5leHRcIiBbaGlkZGVuXT1cIiFzd2lwZXJDb25maWc/Lm5hdmlnYXRpb24gfHwgKHN3aXBlckNvbmZpZz8ubmF2aWdhdGlvbiAhPT0gdHJ1ZSAmJiAhIXN3aXBlckNvbmZpZz8ubmF2aWdhdGlvbj8ubmV4dEVsICYmIHN3aXBlckNvbmZpZz8ubmF2aWdhdGlvbj8ubmV4dEVsICE9PSAnLnN3aXBlci1idXR0b24tbmV4dCcpXCIgW2F0dHIuZGlzYWJsZWRdPVwiaXNBdExhc3QgfHwgbnVsbFwiPjwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJzd2lwZXItcGFnaW5hdGlvblwiIFtoaWRkZW5dPVwiIXN3aXBlckNvbmZpZz8ucGFnaW5hdGlvbiB8fCAoc3dpcGVyQ29uZmlnPy5wYWdpbmF0aW9uICE9PSB0cnVlICYmICEhc3dpcGVyQ29uZmlnPy5wYWdpbmF0aW9uPy5lbCAmJiBzd2lwZXJDb25maWc/LnBhZ2luYXRpb24/LmVsICE9PSAnLnN3aXBlci1wYWdpbmF0aW9uJylcIiAoY2xpY2spPVwib25QYWdpbmF0aW9uQ2xpY2soJGV2ZW50LnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2luZGV4JykpXCIgKGtleXVwLmVudGVyKT1cIm9uUGFnaW5hdGlvbkNsaWNrKCRldmVudC50YXJnZXQuZ2V0QXR0cmlidXRlKCdpbmRleCcpKVwiPjwvZGl2PlxuPC9kaXY+XG4iXX0=