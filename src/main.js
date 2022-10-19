import "./css/index.css"
import IMask from "imask";

const ccBdColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path');
const ccBdColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path');
const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

function setCardType(type) {
  const colors = {
    visa: ['#2D57F2', '#436D99'],
    mastercard: ['#C69347', '#DF6F29'],
    elo: ['#EF4123', '#00A4E0'],
    hipercard: ['#FFFFFF', '#822124'],
    default: ['black', 'gray'],
  };

  ccBdColor01.setAttribute('fill', colors[type][1]);
  ccBdColor02.setAttribute('fill', colors[type][0]);
  ccLogo.setAttribute('src', `/cc-${type}.svg`);
}

globalThis.setCardType = setCardType;

const securityCodeInput = document.querySelector('#security-code');
const securityCodePattern = {
  mask: '0000',
};
const securityCodeMasked = IMask(securityCodeInput, securityCodePattern);

const expirationDateInput = document.querySelector('#expiration-date');
const expirationDatePattern = {
  mask: 'MM{/}YY',
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    YY: {
      mask: IMask.MaskedRange,
      from: 22,
      to: 32,
    },
  },
};
const expirationDateMasked = IMask(expirationDateInput, expirationDatePattern);

const cardNumberInput = document.querySelector('#card-number');
const cardNumberPattern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^(50(67(0[78]|1[5789]|2[012456789]|3[01234569]|4[0-7]|53|7[4-8])|9(0(0[0-9]|1[34]|2[013457]|3[0359]|4[0123568]|5[01456789]|6[012356789]|7[013]|8[123789]|9[1379])|1(0[34568]|4[6-9]|5[1245678]|8[36789])|2(2[02]|57|6[0-9]|7[1245689]|8[023456789]|9[1-6])|3(0[78]|5[78])|4(0[7-9]|1[012456789]|2[02]|5[7-9]|6[0-5]|8[45])|55[01]|636|7(2[3-8]|32|6[5-9])))|4(0117[89]|3(1274|8935)|5(1416|7(393|63[12])))|6(27780|36368|5(0(0(3[1258]|4[026]|69|7[0178])|4(0[67]|1[0-3]|2[2345689]|3[0568]|8[5-9]|9[0-9])|5(0[01346789]|1[01246789]|2[0-9]|3[0178]|5[2-9]|6[012356789]|7[01789]|8[0134679]|9[0-8])|72[0-7]|9(0[1-9]|1[0-9]|2[0128]|3[89]|4[6-9]|5[01578]|6[2356789]|7[01]))|16(5[236789]|6[025678]|7[013456789]|88)|50(0[01356789]|1[2568]|26|3[6-8]|5[1267]))))$/,
      cardType: 'elo',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /((^606282)|(^637095)|(^637599)|(^637568))\d{0,10}/,
      cardType: 'hipercard',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardType: 'mastercard',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardType: 'visa',
    },
    {
      mask: '0000 0000 0000 0000',
      cardType: 'default',
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '');
    const foundedMask = dynamicMasked.compiledMasks.find(({ regex }) => number.match(regex));

    setCardType(foundedMask.cardType);

    return foundedMask;
  }
};
const cardNumberMasked = IMask(cardNumberInput, cardNumberPattern);