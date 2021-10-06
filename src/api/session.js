import cookie from 'js-cookie';

const utf8ToB64 = (str) => {
  return window.btoa(unescape(encodeURIComponent(str)));
};

const b64ToUtf8 = (str) => {
  return decodeURIComponent(escape(window.atob(str)));
};

function isJson(item) {
  item = typeof item !== 'string' ? JSON.stringify(item) : item;

  try {
    item = JSON.parse(item);
  } catch (e) {
    return false;
  }

  if (typeof item === 'object' && item !== null) {
    return true;
  }

  return false;
}

// Observemos que es necesario indicar la ubicación, en este caso "/".
// De otro modo, se pueden generar inconsistencias al momento de
// acceder o eliminar el cookie. La expiración está especificada en días.
export const setCookie = (key, value) => {
  if (process.browser) {
    let saveValue;

    if (isJson(value)) {
      saveValue = utf8ToB64(JSON.stringify(value));
    } else {
      saveValue = value;
    }
    cookie.set(key, saveValue, {
      expires: 1,
      path: '/',
      sameSite: 'Strict',
    });
  }
};

export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

// Esta función obtiene el cookie ya sea en el navegador
// o en el servidor.
export const getCookie = (key, req) => {
  // return process.browser
  //   ? getCookieFromBrowser(key)
  //   : getCookieFromServer(key, req);
  return getCookieFromBrowser(key);
};

function IsJsonString(str) {
  try {
    JSON.parse(b64ToUtf8(str));
  } catch (e) {
    return false;
  }
  return true;
}

const getCookieFromBrowser = (key) => {
  const cookieStr = cookie.get(key);
  let cookieResponse;
  if (IsJsonString(cookieStr)) {
    cookieResponse = JSON.parse(b64ToUtf8(cookieStr));//JSON.parse(cookieStr);
  } else {
    cookieResponse = cookieStr;
  }
  return cookieResponse;
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  const rawCookie = req.headers.cookie.split(';').find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};

export const isLogin = () => {
  const data = getCookie('_idsession');
  // if(data !== undefined){
  //   let user = JSON.parse(getCookie('_mefe'))
  // }

  return data !== undefined;
};

export const removeAllCookies = () => {
  Object.keys(cookie.get()).forEach((cookieName) => {
    const neededAttributes = {
      expires: 1,
      path: '/',
    };
    cookie.remove(cookieName, neededAttributes);
  });
};
