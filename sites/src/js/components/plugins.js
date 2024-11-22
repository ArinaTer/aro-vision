import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import Swiper, { Autoplay, Pagination, EffectFade, Navigation } from "swiper";
import { Viewer } from '@photo-sphere-viewer/core';
import { GyroscopePlugin } from '@photo-sphere-viewer/gyroscope-plugin';

export function plugins() {
    window.gsap = gsap;
    window.ScrollToPlugin = ScrollToPlugin;
    window.ScrollTrigger = ScrollTrigger;
    
	window.Swiper = Swiper;
	window.Navigation = Navigation;
	window.Autoplay = Autoplay;
	window.Pagination = Pagination;
	window.EffectFade = EffectFade;

	window.Viewer = Viewer;
    window.GyroscopePlugin = GyroscopePlugin;




    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

}