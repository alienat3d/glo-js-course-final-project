import { headerPhonesAccordionFunc } from "./modules/header-phones-accordion";
import { headerMenuRolloutFunc } from "./modules/header-menu-rollout";
import { smoothScrollToFunc } from "./modules/smooth-scroll-to";
import { servicesPopupFunc } from "./modules/services-popup";
import { modifyPhoneInputsFunc } from "./modules/modify-phone-inputs";
import { sendFormFunc } from "./modules/send-form";
import { privacyPopupFunc } from "./modules/privacy-popup";
import { formulaTooltipsFunc } from "./modules/formula-tooltips";
import { formulaSliderFunc } from "./modules/formula-slider";
import { repairTypesSliderFunc } from "./modules/repair-types-slider";
import { tabsFunc } from "./modules/tabs";

headerPhonesAccordionFunc();
headerMenuRolloutFunc();
smoothScrollToFunc();
servicesPopupFunc();
modifyPhoneInputsFunc();
sendFormFunc();
privacyPopupFunc();
formulaTooltipsFunc();
formulaSliderFunc('.formula-slider-wrap', '.formula-item');
tabsFunc('.nav-list-repair', '.repair-types-slider');
repairTypesSliderFunc('.repair-types-slider-wrap', '.types-repair1 .repair-types-slider__slide');

// window.addEventListener("DOMContentLoaded", () => console.warn('Website is loaded.'));
