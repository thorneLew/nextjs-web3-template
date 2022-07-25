import BigNumber from "bignumber.js";
import { fixedToInt, intToFixed } from "hipo-contract";
import { isNull } from "lodash";
import moment from "moment";
import { Alert } from "src/component/Alert";
import { getEnvConfig } from "./const";
export function getPath(pathStr: string) {
  const result = (process?.env?.NEXT_PUBLIC_BASEPATH || "") + pathStr;
  return result;
}

/**
 * get TokenIcon img
 * @param pathStr  string path
 * @returns {string}
 */
export function getImgToken(pathStr: string) {
  const result = (process?.env?.NEXT_PUBLIC_IMG_TOKEN_DOMAIN || "") + "/img/token" + pathStr;
  return result;
}

export function getDefaultImgToken() {
  const result = (process?.env?.NEXT_PUBLIC_IMG_TOKEN_DOMAIN || "") + "/img/token" + "/default.png";
  return result;
}

/**
 * 格式化hash
 * @example formatHash('123456789', 2, 3) -> '12...789';
 * @example formatHash('123456789', 2, null) -> '12...';
 * @param value {string} value - 值
 * @param startLen  {number} default: 12 | 省略号前面的值长度
 * @param endLen {number|null} default: 8 | 为number时，省略号后面展示位数，为null时，不展示省略号后面的值
 * @returns {string}
 */
export function formatHash(value: string, startLen?: number, endLen?: number | null): string {
  if (!value) {
    return value;
  }
  const start = startLen || 12;
  const end = endLen || 8;
  if (isNull(endLen)) {
    return `${value.slice(0, start)}...`;
  }
  return `${value.slice(0, start)}...${value.slice(-end)}`;
}

export function formatNumber(value?: string) {
  if (!value) {
    return "-";
  }
  const [int, dec] = `${value}`.split(".");
  if (!dec) {
    return int.replace(/\d{1,3}(?=(\d{3})+(\.|$))/g, "$&,");
  } else {
    return int.replace(/\d{1,3}(?=(\d{3})+(\.|$))/g, "$&,") + `.${dec}`;
  }
}

/**
 * @param value string
 * @returns {String}
 */
export function formatBrowserTitle(value: string) {
  return `${value} | Hipo NFT`;
}

export function getUploadPath(value: string) {
  const config = getEnvConfig()
  return config.uploadPath + value;
}

/**
 * Special fixes for making BigNumbers using web3 results
 * @param arg An arg or the result of a web3 call to turn into a BigNumber
 */
export function makeBigNumber(arg: number | string | BigNumber): BigNumber {
  // Zero sometimes returned as 0x from contracts
  if (arg === "0x") {
    arg = 0;
  }
  // fix "new BigNumber() number type has more than 15 significant digits"
  arg = arg.toString();
  return new BigNumber(arg);
}

export function feeToString(keys: string[], obj: any) {
  keys.forEach((key) => {
    obj[key] = obj[key].toString();
  });
}
export function feeToNumber(keys: string[], obj: any) {
  keys.forEach((key) => {
    obj[key] = Number(obj[key]);
  });
}

export function getCurrentTime() {
  return moment();
}

export function getAddDays(day: number): string {
  return getCurrentTime().add(day, "days").format("X");
}

export function copyText(text: string) {
  var input = document.createElement("input");
  document.body.appendChild(input);
  input.setAttribute("value", text);
  input.select();
  document.execCommand("copy");
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    Alert.success("Copied");
  }
  document.body.removeChild(input);
}

export function toGateScanTx(link: string) {
  const config = getEnvConfig()
  return `${config.gateScanDomain}/tx/${link}`;
}

export function toGateScanAddress(link: string) {
  const config = getEnvConfig()
  return `${config.gateScanDomain}/address/${link}`;
}

export function viewInt(value: string, decimal?: number): string {
  try {
    return intToFixed(value, 18);
  } catch (error) {
    return "0";
  }
}
export function formatBigNumber(value: string, decimal?: number): string {
  try {
    return fixedToInt(value, 18);
  } catch (error) {
    return "0";
  }
}

/**
 *
 * @param date String 2022-06-29T14:45:00+08:00
 * @returns String YYYY-MM-DD HH:mm:ss
 */
export function parseLocalDate(date: string) {
  if (!date || date === '0001-01-01T00:00:00Z') {
    return '--'
  }
  const format = "YYYY-MM-DD HH:mm:ss";
  return moment(date).local().format(format);
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function Numberspecification(value: number) {
  let number = "";
  if (value < 100000) {
    number = value.toFixed(1);
  } else if (value > 100000 || value === 100000 || value < 1000000) {
    number = value.toFixed(1) + "K";
  } else if (value > 1000000 || value === 1000000) {
    number = value.toFixed(1) + "M";
  }
  return number;
}

//  差价计算的方法
export function computeFloorPrice(offer: number, nft: number): string {
  return ((offer - nft) / nft * 100).toFixed(0) + "%";
}

export function diffmoment(time: string) {
  let present = moment().format("yyyy-MM-DD HH:mm:ss");
  let timevalue = "";
  let difftime = moment(present).diff(moment(time), "days")
  if (difftime < 1) {
    timevalue = "Today";
  } else if ((difftime > 1 || difftime === 1) && difftime < 2) {
    timevalue = "Yesterday";
  } else if ((difftime > 2 || difftime === 2) && difftime < 7) {
    timevalue = "This week";
  } else if ((difftime > 7 || difftime === 7) && difftime < 14) {
    timevalue = "Last week";
  } else if (difftime > 14 || difftime === 14) {
    timevalue = time;
  }
  return timevalue
}

export function expirationTimeDiff(expiration_time: string) {
  const expiration = moment(expiration_time);
  const diff = expiration.diff(new Date());
  const diffDuration = moment.duration(diff);
  let d = diffDuration.days();
  let h = diffDuration.hours();
  let m = diffDuration.minutes();
  let s = diffDuration.seconds();
  if (!d && !h) {
    return m + 'min ' + s + 's'
  } else if (!d && h) {
    return h + 'h ' + m + 'min'
  } else if (d) {
    return d + 'd ' + h + 'h'
  } else {
    return '---'
  }
}