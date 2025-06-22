class ApiWebAnimeflv {
  static fetch = (url) => {
    return new Promise((resolve, reject) => {
      if (window.Android) {
        setTimeout(() => {
          resolve(Android.getPageContent(url));
        }, 1);
      } else {
        fetch(url)
          .then((res) => res.text())
          .then(resolve);
      }
    });
  };

  static search(parameteres) {
    return new Promise((resolve) => {
      function toArray(array) {
        return Array.isArray(array) ? array : [];
      }

      function toQuery(left, right) {
        return `${encodeURIComponent(left)}=${encodeURIComponent(right)}`;
      }

      const params = {
        page: Math.max(1, parameteres.page) || 1,
        genre: toArray(parameteres.genre),
        year: toArray(parameteres.year),
        type: toArray(parameteres.type),
        status: toArray(parameteres.status),
        order: "default",
        search: `${parameteres.search || ""}`.trim(),
      };

      const stringQuery = ["genre", "year", "type", "status"]
        .filter((query) => {
          if (parameteres.search) return false;
          return params[query].length;
        })
        .map((query) => {
          return params[query].map((q) => toQuery(`${query}[]`, q)).join("&");
        })
        .concat(
          params.search == ""
            ? toQuery(`order`, params.order)
            : toQuery(`q`, params.search)
        )
        .concat(toQuery(`page`, params.page))
        .join("&");

      const url = `https://m.animeflv.net/browse?${stringQuery}`;
      this.fetch(url)
        .then((text) => {
          try {
            const $text = document.createElement("html");
            $text.innerHTML = text;

            Array.from($text.querySelectorAll("img")).forEach((img) => {
              img.setAttribute("data-img-src", img.getAttribute("src"));
              img.removeAttribute("src");
              img.removeAttribute("srcset");
            });

            const $ul = $text.querySelector("ul.ListAnimes, ul.List-Animes");

            if ($ul) {
              const array = Array.from($ul.children).map((li) => {
                return {
                  identifier: li
                    .querySelector("a")
                    .getAttribute("href")
                    .split("/")
                    .pop(),
                  title: li.querySelector(".Title").textContent,
                  poster: `https://animeflv.net/${li
                    .querySelector("img")
                    .getAttribute("data-img-src")
                    .replace("https://animeflv.net/", "")}`,
                  type: li.querySelector(".Type").textContent,
                };
              });

              resolve(array);
            }

            resolve([]);
          } catch (error) {
            resolve([]);
          }
        })
        .catch(() => resolve([]));
    });
  }

  static identifier(identifier, episode = null) {
    return new Promise((resolve) => {
      if (!episode) {
        this.fetch(
          `https://m.animeflv.net/anime/${encodeURIComponent(identifier)}`
        )
          .then((text) => {
            try {
              const $text = document.createElement("div");
              $text.innerHTML = text;

              Array.from($text.querySelectorAll("img")).forEach((img) => {
                img.setAttribute("data-img-src", img.getAttribute("src"));
                img.removeAttribute("src");
                img.removeAttribute("srcset");
              });

              const [poster, type] = Array.from(
                $text.querySelector("figure.Image").children
              ).map((child, index) => {
                if (index == 0) {
                  return `https://m.animeflv.net${child.getAttribute(
                    "data-img-src"
                  )}`;
                }
                return child.innerText;
              });

              const [title, status, overview] = Array.from(
                $text.querySelector("article.Anime header").children
              ).map((child, index) => {
                const innerText = child.innerText;
                if (index > 0) {
                  return innerText
                    .slice(innerText.indexOf(":") + 1, Infinity)
                    .trim();
                }
                return innerText;
              });

              resolve({
                identifier,
                poster,
                type,
                title,
                status,
                overview,
                genres: [
                  ...$text.querySelectorAll("article.Anime footer a"),
                ].map((a) => a.innerText),
                nextEpisode:
                  $text
                    .querySelector("p.NxtPsd")
                    ?.textContent.split(":")
                    .at(-1)
                    .trim() ?? null,
                episodes: $text.querySelectorAll("div.List-Episodes li.Episode")
                  .length,
                related: Array.from(
                  $text.querySelectorAll("div.Carousel div.item.Anime")
                ).map((child) => {
                  const [poster, type] = Array.from(
                    child.querySelector("figure.Image").children
                  ).map((child, index) => {
                    if (index == 0) {
                      return `https://m.animeflv.net${child.getAttribute(
                        "data-img-src"
                      )}`;
                    }
                    return child.innerText;
                  });

                  return {
                    identifier: child.querySelector("a").href.split("/").pop(),
                    title: child.querySelector("h2.Title").textContent,
                    poster,
                    type,
                  };
                }),
              });
            } catch (error) {
              resolve(null);
            }
          })
          .then(() => resolve(null));
      } else {
        this.fetch(
          `https://m.animeflv.net/ver/${encodeURIComponent(
            identifier
          )}-${encodeURIComponent(episode)}`
        )
          .then((text) => {
            try {
              const $text = document.createElement("div");
              $text.innerHTML = text;

              Array.from($text.querySelectorAll("img")).forEach((img) => {
                img.setAttribute("data-img-src", img.getAttribute("src"));
                img.removeAttribute("src");
                img.removeAttribute("srcset");
              });

              Array.from($text.querySelectorAll("script")).forEach((script) => {
                if (script.innerHTML.includes("var anime_id =")) {
                  const callback = new Function(
                    [
                      script.innerHTML.slice(0, script.innerHTML.indexOf("$")),
                      "return videos",
                    ].join(";")
                  );

                  resolve(callback());
                }

                script.innerHTML = "";
              });

              resolve(null);
            } catch (error) {
              resolve(null);
            }
          })
          .then(() => resolve(null));
      }
    });
  }

  static home() {
    return new Promise((resolve) => {
      this.fetch("https://m.animeflv.net/")
        .then((text) => {
          try {
            const $text = document.createElement("div");
            $text.innerHTML = text;

            Array.from($text.querySelectorAll("img")).forEach((img) => {
              img.setAttribute("data-img-src", img.getAttribute("src"));
              img.removeAttribute("src");
              img.removeAttribute("srcset");
            });

            const episodes = Array.from(
              $text.querySelectorAll("ul.List-Episodes li.Episode:has(a)")
            ).map((li) => {
              const imgSrc = li
                .querySelector("img")
                .getAttribute("data-img-src");
              return {
                id: parseInt(imgSrc.split("/").pop()),
                identifier: li
                  .querySelector("a")
                  .href.split("/")
                  .pop()
                  .split("-")
                  .slice(0, -1)
                  .join("-"),
                title: li.querySelector(".Title").textContent,
                episode: li.querySelector("p span").innerText,
                poster: `https://animeflv.net${imgSrc}`,
              };
            });

            const animes = Array.from(
              $text.querySelectorAll("ul.List-Animes li.Anime:has(a)")
            ).map((li) => {
              const imgSrc = li
                .querySelector("img")
                .getAttribute("data-img-src");
              return {
                id: parseInt(imgSrc.split("/").pop()),
                identifier: li.querySelector("a").href.split("/").pop(),
                title: li.querySelector(".Title").textContent,
                type: li.querySelector(".Type").textContent,
                poster: `https://animeflv.net${imgSrc}`,
              };
            });

            resolve({ episodes, animes });
          } catch (error) {
            resolve({ animes: [], episodes: [] });
          }
        })
        .catch(() => resolve({ animes: [], episodes: [] }));
    });
  }
}
