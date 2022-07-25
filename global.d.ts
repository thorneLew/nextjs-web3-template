import Tracker from "src/utils/tracker";

declare module 'swiper';

declare global {
    interface Window {
        tracker: Tracker
    }
}