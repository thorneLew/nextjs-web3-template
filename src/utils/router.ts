import { useRouter } from "next/router";
import { useCallback } from "react";

export const routes = {
  index: "/",
};

export function useTo() {
  const router = useRouter();

  const to = useCallback(
    (link: string, options?: any) => {
      const search = window.location.search;
      const newLink = link.replace("?lang=zh_CN", "");
      const hasParams = newLink.includes("?");
      const hasLanguage = RegExp(/lang=en_US/).test(search);
      const path = window.location.pathname + window.location.search;
      const oldUrl = path.replace("?lang=en_US", "").replace("&lang=en_US", "");
      let url = "";
      //有参数且有语言
      if (hasParams && hasLanguage) {
        url = `${newLink}&lang=en_US`;
      } else if (oldUrl == newLink) {
        //除语言外，路径一致
        url = `${newLink}`;
      } else if (!hasParams && hasLanguage) {
        //无参数且有语言
        url = `${newLink}?lang=en_US`;
      } else {
        url = newLink;
      }
      router.push(url, options);
    },
    [router]
  );
  return to;
}
