import { phoneSymbolsOnly } from "./helpers";

export const modifyPhoneInputsFunc = () => {
  const phoneInputs = document.querySelectorAll('input[name="phone"]');

  phoneInputs.forEach(input =>
    input.addEventListener('input', () => phoneSymbolsOnly(input))
  );
}
