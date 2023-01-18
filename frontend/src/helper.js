import data from '@/Models/color-classification/data.json';
import * as modal from 'sweetalert2';

export const getColor = (params = {}) => {
  let color = data.filter((item) => item.color.toLowerCase() == params.name.toLowerCase());

  if (color.length > 0) {
    color = color[0];
  } else {
    color = { r: 0, g: 0, b: 0 };
  }

  if (params.type == 'rgba' || !params.type)
    return `rgba(${color.r}, ${color.g}, ${color.b}, ${params.transparency || 1})`;

  throw new Error('Invalid type');
};

export const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};

export const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export const randomHexColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const hslToHex = (h, s, l) => {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0'); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};

export const guideModal = (messages, messageId) => {
  const Toast = modal.mixin({
    showConfirmButton: true,
  });

  const isItLast = messageId == messages.length - 1;
  Toast.fire({
    title: messages[messageId].title,
    text: messages[messageId].text,
    didOpen: () => {
      if (isItLast) {
        messageId = 0;
      } else {
        messageId++;
      }
    },
    willClose: () => {
      if (!isItLast) {
        guideModal(messages, messageId);
      }
    },
    confirmButtonText: isItLast ? 'Close' : 'Next',
  })
}