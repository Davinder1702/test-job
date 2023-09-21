import { AUTH_TOKEN } from "./Constant";

function getAuthToken (){
    return AUTH_TOKEN;
}

function debounce(func, delay) {
  let timeoutId;

  function cancel() {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  }

  function debounced(...args) {
    cancel();
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  }

  debounced.cancel = cancel;

  return debounced;
}

export{
    getAuthToken,
    debounce
}