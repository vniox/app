class MediaWebUrl {
  static fetch = (url) => {
    return new Promise((resolve, reject) => {
      if (window.Android) {
        resolve(Android.getPageContent(url));
      } else {
        fetch(url)
          .then((res) => res.text())
          .then(resolve);
      }
    });
  };

  static doodstream = ({ url }) => {
    return new Promise((resolve, reject) => {
      this.fetch(url)
        .then((text) => {
          const $text = document.createElement("div");
          $text.innerHTML = text;

          const exist = Array.from($text.querySelectorAll("script")).some(
            (script) => {
              const scriptInnerHTML = script.innerHTML;

              if (scriptInnerHTML.includes("/pass_md5/")) {
                function makePlay() {
                  for (
                    var a = "",
                      t =
                        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
                      n = t.length,
                      o = 0;
                    10 > o;
                    o++
                  )
                    a += t.charAt(Math.floor(Math.random() * n));
                  return (
                    a + "?token=toqwl60pcjzfgur6cxqym5fz&expiry=" + Date.now()
                  );
                }

                let innerHTML = scriptInnerHTML.slice(
                  scriptInnerHTML.indexOf("/pass_md5/"),
                  Infinity
                );
                innerHTML = innerHTML.slice(0, innerHTML.indexOf("'"));

                this.fetch("https://d000d.com/" + innerHTML).then((text) => {
                  resolve({ status: true, url: text + makePlay() });
                });

                return true;
              }

              return false;
            }
          );

          if (!exist) resolve({ status: false, url: null });
        })
        .catch(() => resolve({ status: false, url: null }));
    });
  };
  static streamwish = ({ url }) => {
    return new Promise((resolve) => {
      const urlModify = `https://habetar.com/e/${url.split("/").pop()}`;

      this.fetch(urlModify)
        .then((text) => {
          const $text = document.createElement("div");
          $text.innerHTML = text;

          const script = Array.from($text.querySelectorAll("script")).find(
            (script) => script.innerHTML.includes("eval")
          );
          const script2 = script.innerHTML.slice(
            script.innerHTML.indexOf("}('") + 2,
            script.innerHTML.lastIndexOf("))")
          );

          const final = new Function(
            `const fn = (...p) => p; return fn(${script2})`
          );

          const validate = (p, a, c, k, e, d) => {
            console.log("entro aqui");
            while (c--)
              if (k[c]) {
                p = p.replace(
                  new RegExp("\\b" + c.toString(a) + "\\b", "g"),
                  k[c]
                );
              }

            return JSON.parse(`${p.slice(p.indexOf("{"), p.indexOf("}") + 1)}`);

            // const scriptFunction = new Function(
            //   `return ${p.slice(p.indexOf("{"), p.indexOf("}") + 1)}`
            // );

            // return scriptFunction();
          };

          resolve({ status: true, url: validate(...final()).hls2 });
        })
        .catch(() => resolve({ status: false, url: null }));
    });
  };
  static yourupload = ({ url }) => {
    return new Promise((resolve) => {
      this.fetch(url)
        .then((text) => {
          const $text = document.createElement("div");
          $text.innerHTML = text;

          Array.from($text.querySelectorAll("img")).forEach((img) =>
            img.removeAttribute("src")
          );

          const image = $text
            .querySelector('meta[property="og:image"]')
            .getAttribute("content");
          const url = $text
            .querySelector('meta[property="og:video"]')
            .getAttribute("content");

          this.fetch(url, { method: "HEAD" })
            .then((res) => {
              console.log(res);
              resolve({
                status: true,
                url: res.url,
                image: image,
              });
            })
            .catch(() => {
              resolve({
                status: false,
                url: null,
              });
            });
        })
        .catch(() => resolve({ status: false, url: null }));
    });
  };

  static voesx = ({ url }) => {
    return new Promise((resolve, reject) => {
      this.fetch(url)
        .then((text) => {
          const $text = document.createElement("div");
          $text.innerHTML = text;

          const match = text.match(/(https?:\/\/[^\s]+)/);

          this.fetch(match[0].slice(0, -2))
            .then((text) => {
              const $text = document.createElement("div");
              $text.innerHTML = text;
              const script = Array.from($text.querySelectorAll("script")).find(
                (script) => script.innerHTML.includes("https://delivery")
              );

              if (script) {
                resolve({
                  status: true,
                  url: script.innerHTML
                    .slice(
                      script.innerHTML.indexOf("https://delivery"),
                      Infinity
                    )
                    .split('"')
                    .at(0),
                });
              }

              resolve({ status: false, url: null });
            })
            .catch(() => resolve({ status: false, url: null }));
        })
        .catch(() => resolve({ status: false, url: null }));
    });
  };
}
