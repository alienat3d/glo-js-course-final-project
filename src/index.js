import { headerPhonesAccordionFunc } from "./modules/header-phones-accordion";
import { headerMenuRolloutFunc } from "./modules/header-menu-rollout";
import { smoothScrollToFunc } from "./modules/smooth-scroll-to";
import { servicesPopupFunc } from "./modules/services-popup";
import { modifyPhoneInputsFunc } from "./modules/modify-phone-inputs";
import { sendFormFunc } from "./modules/send-form";
import { privacyPopupFunc } from "./modules/privacy-popup";
import { formulaTooltipsFunc } from "./modules/formula-tooltips";
import { sliderFunc } from "./modules/formula-slider";
import { repairTypesSliderFunc } from "./modules/repair-types-slider";

headerPhonesAccordionFunc();
headerMenuRolloutFunc();
smoothScrollToFunc();
servicesPopupFunc();
modifyPhoneInputsFunc();
sendFormFunc();
privacyPopupFunc();
formulaTooltipsFunc();
formulaSliderFunc('.formula-slider-wrap', '.formula-item');
repairTypesSliderFunc('.repair-types-slider', '.types-repair1');

// window.addEventListener("DOMContentLoaded", () => console.warn('Website is loaded.'));
