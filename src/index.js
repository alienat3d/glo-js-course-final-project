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
import { portfolioSliderFunc } from "./modules/portfolio-slider";
import { portfolioPopupSliderFunc } from "./modules/portfolio-popup-slider";
import { contractSliderFunc } from "./modules/contract-slider";
import { contractPopupSliderFunc } from "./modules/contract-popup-slider";
import { consultationPopupFunc } from "./modules/consultation-popup";
// import { testFunc } from "./modules/test";


headerPhonesAccordionFunc();
headerMenuRolloutFunc();
smoothScrollToFunc();
servicesPopupFunc();
modifyPhoneInputsFunc();
sendFormFunc();
privacyPopupFunc();
formulaTooltipsFunc();
formulaSliderFunc();
repairTypesSliderFunc();
portfolioSliderFunc();
portfolioPopupSliderFunc();
contractSliderFunc();
contractPopupSliderFunc();
consultationPopupFunc();
// testFunc();

window.addEventListener("DOMContentLoaded", () => console.info('Website is loaded.'));
