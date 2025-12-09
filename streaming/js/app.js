'use strict';

var dataApp = () => {
  const mrc = window.MyResourceClass;

  const exp = {
    ta: "ta-019626a1-7528-79cb-9c04-14ee7055d7b4",

    routes: new mrc.RouteHashCallback(),
    auth: "auth_Mj8Q5q3",
    user: null,
    mediaPlayer: new MediaPlayer(
      document.createDocumentFragment(),
      "media-player-id-1741285515518"
    ),
    url: {
      server: (pathname = "") => {
        return `https://api.vniox.com/streaming/${mrc.MyString.trim(
          pathname
        ).left("/")}`;
      },
      img: (url) => {
        return `https://img.vniox.com/index.php?url=${encodeURIComponent(url)}`;
      },
      fetch: () => {
        return url;
      },
    },
    elements: {
      meta: {
        color: document.getElementById("meta-theme-color"),
      },
      style: {
        app: document.getElementById("style-app"),
      },
      custom: {
        requestDisableCors: document.querySelector("request-disable-cors"),
      },
    },
    values: {
      youtubeToken: null,
      hls: null,
    },
    functions: {
      scrollY: (parameters) => {
        let isDragging = false;
        let startX;
        let scrollLeft;

        const scrollContainer = parameters.target;

        scrollContainer?.addEventListener("mousedown", (e) => {
          isDragging = true;
          startX = e.pageX - scrollContainer.offsetLeft;
          scrollLeft = scrollContainer.scrollLeft;

          parameters?.events?.start?.(e);
        });

        scrollContainer?.addEventListener("mouseleave", (e) => {
          if (isDragging) {
            isDragging = false;
            parameters?.events?.end?.(e);
          }
        });

        scrollContainer?.addEventListener("mouseup", (e) => {
          if (isDragging) {
            isDragging = false;
            parameters?.events?.end?.(e);
          }
        });

        scrollContainer?.addEventListener("mousemove", (e) => {
          if (!isDragging) return;
          e.preventDefault();
          const x = e.pageX - scrollContainer.offsetLeft;
          const walk = x - startX;
          scrollContainer.scrollLeft = scrollLeft - walk;

          parameters?.events?.move?.(e);
        });
      },
      historyBack: ($element) => {
        $element?.addEventListener("click", (e) => {
          if (!Boolean(history.state?.start)) {
            e.preventDefault();
            history.back();
          }
        });
      },
      generateUUID: () => {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
          /[xy]/g,
          (char) => {
            const random = (Math.random() * 16) | 0; // Genera un número aleatorio entre 0 y 15
            const value = char === "x" ? random : (random & 0x3) | 0x8; // Usa 0x3 y 0x8 para asegurar la versión 4
            return value.toString(16); // Convierte a hexadecimal
          }
        );
      },
      formatTime: (seconds) => {
        seconds = parseInt(seconds) || 0;
        const h = Math.floor(seconds / 3600); // Calcular horas
        const m = Math.floor((seconds % 3600) / 60); // Calcular minutos

        const parts = [];
        if (h > 0) parts.push(`${h}h`);
        if (m > 0 || h > 0) parts.push(`${m}m`); // Mostrar minutos si hay horas
        // if (s > 0) parts.push(`${s}s`); // Mostrar minutos si hay horas

        return parts.join(" ");
      },
    },
    instances: {
      IntersectionObserver: new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            entry.target.dispatchEvent(
              new CustomEvent("_IntersectionObserver", {
                detail: {
                  entry,
                  observer,
                },
              })
            );
          });
        },
        { root: null, rootMargin: "0px", threshold: 0 }
      ),
    },
    fetchOptions: (options = {}) => {
      return {
        ...options,
        headers: {
          "Token-Auth": localStorage.getItem(
            "ta-019626a1-7528-79cb-9c04-14ee7055d7b4"
          ),
        },
        method: options?.method ?? "GET",
      };
    },

    iptv: {
      server: "https://593zona.live:8443",
      username: "CDSNJ7xstgS",
      password: "gkwT7heDNq",
    },

    events: (array, type, callback, options = null) => {
      const elements = Array.isArray(array) ? array : [array];

      return elements.map((element) => {
        try {
          element.addEventListener(type, callback, options);
          return () => {
            element.removeEventListener(type, callback, options);
          };
        } catch (error) {
          return () => {};
        }
      });
    },
    callbackIf: (value, callback) => {
      try {
        if (value && typeof callback == "function") {
          callback(value);
        }
      } catch (error) {}
    },
    promises: {
      genresMovies: new Promise((resolve) => {
        fetch(
          "https://api.themoviedb.org/3/genre/movie/list?api_key=ec4ff1b6182572d3e74735e74ca3a8ef&language=es-ES"
        )
          .then((res) => res.json())
          .then((json) => {
            resolve(Array.isArray(json?.genres) ? json?.genres : []);
          });
      }),
      genresSeries: new Promise((resolve) => {
        fetch(
          "https://api.themoviedb.org/3/genre/tv/list?api_key=ec4ff1b6182572d3e74735e74ca3a8ef&language=es-ES"
        )
          .then((res) => res.json())
          .then((json) => {
            resolve(Array.isArray(json?.genres) ? json?.genres : []);
          });
      }),
    },
  };

  return exp;
};

// import eleConfirm from "../includes/eleConfirm";

var navigate = () => {
  const mrc = window.MyResourceClass;
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myVal = {
    routes: new mrc.RouteHashCallback(),
    element: {
      textNode: document.createTextNode(""),
    },
  };

  const $element = mrf.createNodeElement(`
        <div class="div_kpAeq7EQQSpIEGP" >
            <div class="div_AzB9StLbTItJbDG">
                <div class="div_JJ29L3eoT4hcf1x">
                    <div id="links" class="div_ynsbf8jCYmc6NsK">
                        <a id="inicio" href="#/" class="button_vz3gd83JzdjM7pt">
                          ${svg("fi fi-rr-house-blank")}
                        </a>
                        <a id="search" href="#/search" class="button_vz3gd83JzdjM7pt">
                          ${svg("fi fi-rr-search")}
                        </a> 
                        <a id="collection" href="#/collection" class="button_vz3gd83JzdjM7pt">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-books"><path d="M23.786,19.492L16.713,1.836c-.624-1.529-2.376-2.269-3.911-1.645l-.925,.378c-.249,.102-.472,.244-.68,.402-.548-.594-1.326-.972-2.196-.972H3C1.346,0,0,1.346,0,3V21c0,1.654,1.346,3,3,3h6c1.654,0,3-1.346,3-3V8.895l5.304,13.242c.625,1.543,2.417,2.26,3.909,1.641l.926-.378c1.505-.574,2.286-2.434,1.647-3.907ZM13.574,7.446l2.778-1.132,4.171,10.412-2.778,1.132L13.574,7.446Zm-.942-5.025l.925-.378c.496-.206,1.097,.031,1.302,.543l.75,1.871-2.777,1.132-.747-1.866c-.208-.51,.038-1.095,.549-1.303ZM2,7h3v10H2V7Zm5,0h3v10h-3V7Zm3-4v2h-3V2h2c.551,0,1,.448,1,1ZM3,2h2v3H2V3c0-.552,.449-1,1-1Zm-1,19v-2h3v3H3c-.551,0-1-.448-1-1Zm7,1h-2v-3h3v2c0,.552-.449,1-1,1Zm12.929-.991c-.104,.247-.297,.438-.544,.539h0l-.926,.378c-.511,.206-1.095-.037-1.3-.54l-.669-1.671,2.778-1.132,.665,1.661c.102,.247,.101,.52-.003,.766Z"></path></svg>
                        </a>
                        <a id="profile" href="#/setting" class="button_vz3gd83JzdjM7pt">
                          ${svg("fi fi-rr-user")}
                        </a>
                    </div>
                </div>
            </div>
        </div>    
    `);
  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myVal.routes.set([
    { hash: "/", callback: () => $elements.inicio },
    { hash: "/collection", callback: () => $elements.collection },
    { hash: "/historial", callback: () => $elements.collection },
    { hash: "/search/*", callback: () => $elements.search },
    { hash: "/profile/*", callback: () => $elements.profile },
    { hash: "/setting/*", callback: () => $elements.profile },
    { hash: "/theme/*", callback: () => $elements.profile },
    { hash: "/login/*", callback: () => $elements.profile },
    { hash: "/register/*", callback: () => $elements.profile },
  ]);

  addEventListener("hashchange", () => {
    Array.from($elements.links.querySelectorAll("a.active")).forEach((a) =>
      a.classList.remove("active")
    );
    (myVal.routes.get() || document.createElement("a")).classList.add("active");
  });

  return $element;
};

var navigateBottom = () => {
  const mrc = window.MyResourceClass;
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;
  const myVal = {
    routes: new mrc.RouteHashCallback(),
    element: {
      textNode: document.createTextNode(""),
    },
  };

  const $element = mrf.createNodeElement(`
        <div class="div_U1rCCk1">
            <div id="links" class="div_ZnL3gfK">
                <a id="inicio" href="#/" data-icon="fi fi-rr-house-blank|fi fi-sr-house-blank"></a>
                <a id="search" href="#/search" data-icon="fi fi-rr-search|fi fi-sr-search"></a>
                <a id="collection" href="#/collection" data-icon="fi fi-rr-books|fi fi-sr-books"></a>
                <a id="profile" href="#/setting" data-icon="fi fi-rr-user|fi fi-sr-user"></a>
            </div>
        </div>
  `);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myVal.routes.set([
    { hash: "/", callback: () => $elements.inicio },
    { hash: "/collection", callback: () => $elements.collection },
    { hash: "/historial", callback: () => $elements.collection },
    { hash: "/search/*", callback: () => $elements.search },
    { hash: "/profile/*", callback: () => $elements.profile },
    { hash: "/setting/*", callback: () => $elements.profile },
    { hash: "/theme/*", callback: () => $elements.profile },
    { hash: "/login/*", callback: () => $elements.profile },
    { hash: "/register/*", callback: () => $elements.profile },
  ]);

  addEventListener("hashchange", () => {
    Array.from($elements.links.querySelectorAll("a")).forEach((a) => {
      a.innerHTML = svg(a.dataset.icon.split("|")[0]);
    });

    // const anchor = myVal.routes.get();

    // if (anchor) {
    //   anchor.innerHTML = svg(anchor.dataset.icon.split("|")[1]);
    // }

    Array.from($elements.links.querySelectorAll("a.active")).forEach((a) =>
      a.classList.remove("active")
    );
    (myVal.routes.get() || document.createElement("a")).classList.add("active");
  });

  return $element;
};

var auth = () => {
  return new Promise((resolve, reject) => {
    const mrf = window.MyResourceFunction;

    const myApp = window.dataApp;

    const encodeQueryString = mrf.encodeQueryObject({
      route: "token.auth",
    });

    
    if (localStorage.getItem(myApp.ta)) {
      return fetch(myApp.url.server(`/api.php?${encodeQueryString}`), {
        method: "GET",
        headers: {
          "Token-Auth": localStorage.getItem(myApp.ta),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          dispatchEvent(new CustomEvent("_auth", { detail: data }));
          resolve(data);
        })
        .catch(reject);
    }

    dispatchEvent(new CustomEvent("_auth", { detail: null }));
    resolve(null);
  });
};

var routesPrivate = (page = "") => {

  const myApp = window.dataApp;
  const $node = document.createTextNode("");

  auth().then((result) => {
    if (result?.status) {
      localStorage.setItem(myApp.ta, result.token);
      return $node.replaceWith(page());
    }

    location.hash = "/login";
  });

  return $node;
};

var routesPublic = (page = "") => {

  const myApp = window.dataApp;
  const $node = document.createTextNode("");

  auth().then((result) => {
    if (!result?.status) {
      localStorage.removeItem(myApp.ta);
      return $node.replaceWith(page());
    }

    location.hash = "/";
  });

  return $node;
};

var getMediaWeb = (url, resolve) => {
  const newURL = new URL(url);
  const hostSplit = newURL.host.split(".");
  const host = hostSplit.length == 3 ? hostSplit[1] : hostSplit[0];

  if (["streamwish"].includes(host)) {
    MediaWebUrl.streamwish({ url: url }).then(resolve);
  } else if (["voe"].includes(host)) {
    MediaWebUrl.voesx({ url: url }).then(resolve);
  } else if (["doodstream"].includes(host)) {
    MediaWebUrl.doodstream({ url: url }).then(resolve);
  } else if (["yourupload"].includes(host)) {
    MediaWebUrl.yourupload({ url: url }).then(resolve);
  } else {
    resolve({
      status: true,
      url: url,
    });
  }
};

var androidWebview = (callback) => {
  const android = window.Android;

  if (android) {
    try {
      callback(android);
    } catch (error) {}
  }
};

const mrc = window.MyResourceClass;
const mrf = window.MyResourceFunction;
const svg = window.iconSVG;

const htmlComponent = (component = "", callback) => {
  const node = document.createTextNode("");
  const input = document.createElement("input");
  const output = document.createElement("input");

  const emit = (input) => {
    return (type, data) => {
      input.dispatchEvent(
        new CustomEvent(`custom-event__${type}`, { detail: data })
      );
    };
  };

  const on = (input) => {
    return (type, callback) => {
      const trigger = ({ detail }) => callback(detail);

      input.addEventListener(`custom-event__${type}`, trigger);
      return () => removeEventListener(`custom-event__${type}`, trigger);
    };
  };

  if (!htmlComponent[component]) {
    htmlComponent[component] = new Promise((resolve) => {
      fetch(`./templates/${component}.ejs`)
        .then((res) => res.text())
        .then((text) => {
          const body = document.createElement("body");
          body.innerHTML = text;

          const style = body.querySelector("style");
          const template = body.querySelector("template");

          Array.from(template.content.querySelectorAll("svg-icon")).forEach(
            (element) => {
              element.outerHTML = svg(element.getAttribute("data-value"));
            }
          );

          document.head.append(style);
          resolve(template);
        });
    });
  }

  htmlComponent[component].then((template) => {
    const clone = template.content.cloneNode(true);

    const elements = mrf.createObjectElement(
      clone.querySelectorAll("[id]"),
      "id",
      true
    );

    node.replaceWith(clone);

    callback?.({ elements, emit: emit(output), on: on(input) });
  });

  return {
    fragment: node,
    emit: emit(input),
    on: on(output),
  };
};

var AddCollection = () => {
  return htmlComponent("components/addCollection", ({ elements, on, emit }) => {
    const myApp = window.dataApp;

    myApp.events(elements.container, "click", () => {
      //   alert("hola mundo");
      elements.container.style.display = "none";
    });

    myApp.events(elements.containerPrimary, "click", (e) => {
      e.stopPropagation();

      const button = e.target.closest("button");
    //   console.log(button);

      if (button) {
        const to = button.getAttribute("data-add-to");

        if (to != 0) {
          emit("add-collection", { collection_id: to });
        }
      }
    });

    on("open-modal", () => {
      elements.container.style.display = "";
    });
  });
};

var peliculaId = () => {
  return htmlComponent("pages/PeliculaId", ({ elements: $elements }) => {
    const myApp = window.dataApp;
    const myVal = {
      params: myApp.routes.params(),
      signals: {
        isFavorite: mrf.observeValue(false),
        isView: mrf.observeValue(false),
        episodes: mrf.observeValue([]),
      },
      functions: {},
      values: {
        video: null,
        isConnected: false,
        streaming: {},
        episode: -1,
        data_id: "",
        data: null,
        thisAnime: {},
      },
      url: {
        fetch: (url) => {
          return `https://fetch.vniox.com/get.php?url=${encodeURIComponent(
            url
          )}`;
        },
      },
      get: {},
      set: {},
    };

    const addCollection = AddCollection();

    myVal.signals.isFavorite.observe((boolean) => {
      $elements.favorite.innerHTML = svg(
        boolean ? "fi fi-sr-heart" : "fi fi-rr-heart"
      );

      $elements.favorite.setAttribute("data-action", boolean ? 1 : 0);
    });

    myVal.signals.isView.observe((boolean) => {
      $elements.inputView.checked = boolean;
    });

    myVal.functions.updateHistory = (currentTime, duration = 0) => {
      if (myVal.values.isConnected) {
        const encodeQueryString = mrf.encodeQueryObject({
          route: "update-history-view",
          episode: myVal.values.episode,
          time_view: currentTime,
          time_duration: duration,
          datetime: Date.now(),
          data_id: myVal.values.data_id,
          type: 1,
        });

        fetch(
          myApp.url.server(`/api.php?${encodeQueryString}`),
          myApp.fetchOptions({
            method: "GET",
          })
        );
      }
    };

    myVal.functions.updateHistoryVideo = () => {
      myApp.mediaPlayer.video((video) => {
        let times = {};
        let status = false;

        video.src = "";

        video.onloadedmetadata = () => {
          times = {};
          status = false;

          const currentTime =
            parseInt(
              myVal.values.streaming?.episodes?.[myVal.values.episode]
                ?.time_view
            ) || 0;

          video.currentTime = currentTime;
        };

        video.ontimeupdate = (e) => {
          if (status) {
            const num = Math.floor(e.target.currentTime);

            if (num > 0 && num % 30 == 0 && !times[num]) {
              times[num] = true;
              myVal.functions.updateHistory(
                num,
                Math.ceil(video.duration) || 0
              );
            }
          }
        };

        video.onseeked = () => {
          const currentTime = Math.floor(video.currentTime);
          myVal.functions.updateHistory(
            currentTime,
            Math.ceil(video.duration) || 0
          );

          times = {};
          times[currentTime] = true;

          status = true;
        };
      });
    };

    myApp.events($elements.episodes, "click", (e) => {
      const item = e.target.closest("[data-item]");
      const input = e.target.closest("input");

      if (item) {
        $elements.itemTrueOption.showPopover();

        $elements.itemTrueOptionVideos.setAttribute(
          "data-episode",
          item.dataset.episode
        );

        $elements.itemTrueOptionVideos.innerHTML =
          '<div class="loader-i m-auto g-col-full" style="--color:#fff; padding: 20px 0"></div>';

        ApiWebCuevana.peliculaId(myVal.params.id).then((data) => {
          const videos = data?.props?.pageProps?.thisMovie?.videos ?? {};

          $elements.itemTrueOptionVideos.innerHTML = Object.entries(videos)
            .map((data) => {
              let show = true;

              return data[1]
                .map((video) => {
                  if (video.result == "") return "";
                  if (!["streamwish"].includes(video.cyberlocker)) return "";

                  const visibility = show ? "" : "display:none";
                  show = false;

                  return `
                    <span 
                      class="span_eNUkEzu" 
                      style="${visibility}">
                      ${data[0].slice(0, 3).toUpperCase()}
                    </span>
                    <button 
                      class="button_NuUj5A6" 
                      data-type="" 
                      data-url="${video.result}" 
                      data-quality="">
                        
                        <div class="div_Z8bTLpN">
                            <span>${video.cyberlocker}</span>
                            <p>${video.quality}</p>
                        </div>
                        
                    </button>
                  `;
                })
                .join("");
            })
            .join("");

          if ($elements.itemTrueOptionVideos.innerHTML == "") {
            $elements.itemTrueOptionVideos.innerHTML =
              '<div class="g-col-full" style="--color:#fff; padding: 20px 0; text-align:center">~ Servidores no disponibles ~</div>';
          }
        });
      }

      if (input) {
        // myVal.values.episode = input.dataset.episode;

        const encodeQueryString = mrf.encodeQueryObject({
          route: "toggle-history-view",
          episode: input.dataset.episode,
          datetime: Date.now(),
          data_id: myVal.values.data_id,
          type: 2,
          action: input.checked ? 1 : 0,
        });

        fetch(
          myApp.url.server(`/api.php?${encodeQueryString}`),
          myApp.fetchOptions({
            method: "GET",
          })
        )
          .then((res) => res.json())
          .then((data) => {
            if (data?.status) {
              input.checked = data.type == 1;
            }
          });
      }
    });

    myApp.events($elements.favorite, "click", () => {
      myVal.signals.isFavorite.value = !myVal.signals.isFavorite.value;

      const encodeQueryString = mrf.encodeQueryObject({
        route: "toggle-favorites",
        data_id: myVal.values.data_id,
        type: 2,
        action: $elements.favorite.dataset.action,
        id_collection: 1,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      )
        .then((res) => res.json())
        .then((data) => {
          if (data == null) {
            location.hash = "#/login";
            return;
          }

          if (data?.status) {
            myVal.signals.isFavorite.value = data.type == 1;
          }
        });
    });

    myApp.events($elements.collection, "click", () => {
      addCollection.emit("open-modal");
      // const encodeQueryString = mrf.encodeQueryObject({
      //   route: "toggle-favorites",
      //   data_id: myVal.values.data_id,
      //   type: 2,
      //   action: $elements.inputView.checked ? 1 : 0,
      //   id_collection: 2,
      // });

      // fetch(
      //   myApp.url.server(`/api.php?${encodeQueryString}`),
      //   myApp.fetchOptions({
      //     method: "GET",
      //   })
      // )
      //   .then((res) => res.json())
      //   .then((data) => {
      //     if (data == null) {
      //       location.hash = "#/login";
      //       return;
      //     }

      //     if (data?.status) {
      //       myVal.signals.isView.value = data.type == 1;
      //     }
      //   });
    });

    myApp.events($elements.itemTrueOptionVideos, "click", (e) => {
      const button = e.target.closest("button");
      if (button) {
        $elements.itemTrueOption.hidePopover();
        $elements.loaderVideo.style.display = "";

        myVal.values.episode = $elements.itemTrueOptionVideos.dataset.episode;

        ApiWebCuevana.serverUrl(button.getAttribute("data-url")).then((url) => {
          setTimeout(() => {
            getMediaWeb(url, (res) => {
              $elements.loaderVideo.style.display = "none";
              if (res.status) {
                // Android.openWithDefault(res.url, "video/*");
                myApp.mediaPlayer.element().requestFullscreen();
                myApp.mediaPlayer.video((video) => {
                  const $video = video;
                  const videoSrc = res.url;

                  if (Hls.isSupported()) {
                    const hls = (myApp.values.hls = new Hls());

                    hls.loadSource(videoSrc);
                    hls.attachMedia($video);
                    hls.on(Hls.Events.MANIFEST_PARSED, function () {});
                  } else if (
                    $video.canPlayType("application/vnd.apple.mpegurl")
                  ) {
                    $video.src = videoSrc;
                  }
                });
              } else {
                alert("El video no esta disponible");
              }
            });
          });
        });
      }
    });

    myApp.events($elements.itemTrueOption, "click", (e) => {
      if (e.target === e.currentTarget) {
        $elements.itemTrueOption.hidePopover();
      }
    });

    myApp.events($elements["form-filter-type"], "change", () => {
      const value = $elements["form-filter-type"].key.value;

      const elements = {
        information: $elements.itemTrueInformation,
        chapter: $elements.itemTrueChapter,
        similar: $elements.itemTrueSimilar,
      };

      Object.entries(elements).forEach((entries) => {
        entries[1].style.display = entries[0] == value ? "" : "none";
      });
    });

    myApp.events($elements.selectSeason, "change", () => {
      myVal.set.dataTrueEpisodes($elements.selectSeason.value);
    });

    myApp.events($elements.buttonSeasonOrder, "click", () => {
      $elements.episodes.append(
        ...Array.from($elements.episodes.children).reverse()
      );
    });

    myVal.get.dataTrue = () => {
      return new Promise((resolve, reject) => {
        // fetch("/public/json/response.json")
        //   .then((res) => res.json())
        //   .then((json) => resolve(json));

        // ApiWebCuevana.peliculaId(myVal.params.id).then((data) => {
        //   resolve(data);
        // });

        fetch(
          `https://api.themoviedb.org/3/movie/${myVal.params.id}?api_key=ec4ff1b6182572d3e74735e74ca3a8ef&language=es-ES`
        )
          .then((res) => res.json())
          .then((json) => {
            resolve(json);
          });
      });
    };

    myVal.set.dataTrue = (data) => {
      const thisMovie = data;
      const fromSecondsToTime = mrf.fromSecondsToTime(thisMovie.runtime * 60);

      myVal.values.data = data;
      myVal.values.data_id = thisMovie.id;

      $elements.itemNull.style.display = "none";
      $elements.itemTrue.style.display = "";

      $elements.poster.onload = () => {
        if (!$elements.container.parentElement) return;

        $elements.poster.style.display = "";

        mrc.MyImage.canvas(myApp.url.img($elements.poster.src)).then(
          (result) => {
            const pixelData = result.ctx.getImageData(0, 0, 1, 1).data;
            const r = pixelData[0];
            const g = pixelData[1];
            const b = pixelData[2];

            const color = mrc.MyColor.toDark({ rgb: [r, g, b] }, 50);

            $elements.itemTrueOptionVideos.parentElement.style.background =
              mrc.MyColor.toDark({ rgb: [r, g, b] }, 60);

            myApp.elements.meta.color.setAttribute("content", color);
            $elements.container.style.background = color;

            document.documentElement.style.setProperty(
              "--app-poster-color",
              color
            );

            androidWebview((Android) => {
              Android.colorSystemBar(color);
            });
          }
        );
      };

      // renderInfo
      mrf.callbackTryCatch(() => {
        // $elements.poster.src = myApp.url.img(
        //   thisMovie.images.poster.replace("/original/", "/w342/")
        // );

        $elements.poster.src = `https://image.tmdb.org/t/p/w342${data.poster_path}`;

        $elements.title.textContent = thisMovie.title;
        $elements.overview.textContent = thisMovie.overview;
        $elements.genres.textContent = thisMovie.genres
          .map((genre) => genre.name)
          .join(", ");

        $elements.duration.textContent = `${fromSecondsToTime.hours}h ${fromSecondsToTime.minutes}min`;
        $elements.date.textContent = data.release_date;

        new Date(thisMovie.releaseDate).getFullYear();
      });

      // renderSeason
      mrf.callbackTryCatch(() => {
        $elements.selectSeason.parentElement.style.display = "none";
        $elements.selectSeason.innerHTML = `<option value="1-1">Temporada 1</option>`;

        myVal.set.dataTrueEpisodes($elements.selectSeason.value);
      });

      // renderSimiliar
      mrf.callbackTryCatch(() => {
        return;
      });

      myVal.get.dataTrueInfo().then(myVal.set.dataTrueInfo);
    };

    myVal.get.dataTrueInfo = () => {
      return new Promise((resolve, reject) => {
        const data = myVal.values.data;
        const data_id = myVal.values.data.id;

        const encodeQueryString = mrf.encodeQueryObject({
          route: "favorites-one",
          type: 2,
          data_id,
        });

        const body = {
          data_id: data_id,
          data_json: JSON.stringify(
            Object.entries(data).reduce((prev, curr) => {
              if (["TMDbId", "titles", "url", "images"].includes(curr[0])) {
                prev[curr[0]] = curr[1];
              }
              return prev;
            }, {})
          ),
          type: 2,
        };

        fetch(
          myApp.url.server(`/api.php?${encodeQueryString}`),
          myApp.fetchOptions({
            method: "POST",
            body: JSON.stringify(body),
          })
        )
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          });
      });
    };

    myVal.set.dataTrueInfo = (data) => {
      myVal.values.streaming = data;
      $elements.favorite.style.visibility = "";
      myVal.values.isConnected = Boolean(data);

      if (myVal.values.isConnected) {
        myVal.signals.isFavorite.value = Boolean(data?.favorite);
        myVal.signals.isView.value = Boolean(data?.view);
        myVal.set.dataTrueEpisodes($elements.selectSeason.value);
      }
    };

    myVal.set.dataTrueEpisodes = (string = "") => {
      const [from, to] = string.split("-").map(Number);
      const array = Array(to - from + 1)
        .fill()
        .map((_, i) => i + from);

      $elements.episodes.innerHTML = array
        .map((episode) => {
          const episodeInfo = myVal.values.streaming?.episodes?.[episode];

          const checked = episodeInfo != undefined ? "checked" : "";

          const displayInput = myVal.values.isConnected ? "" : "display:none";

          return `
              <div data-episode="${episode}" class="div_eGwK6I1">
                <button 
                  class="button_fk0VHgU" 
                  data-slug="${myVal.params.id}-${episode}" 
                  data-title="${myVal.params.id}" 
                  data-description="episodio ${episode}" 
                  data-episode="${episode}"
                  data-item>
                    <span>Episodio ${episode}</span>
                    <small>
                      ${
                        parseInt(episodeInfo?.time_view)
                          ? "visto ".concat(
                              myApp.functions.formatTime(episodeInfo.time_view)
                            )
                          : ""
                      }
                      ${
                        parseInt(episodeInfo?.time_duration)
                          ? "de ".concat(
                              myApp.functions.formatTime(
                                episodeInfo.time_duration
                              )
                            )
                          : ""
                      }
                    </small>
                </button>
                <label class="label_zjZIMnZ" style="${displayInput}">
                  <input type="checkbox" data-episode="${episode}" ${checked}>
                  <span style="display:flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-check"><path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z"></path></svg></span>
                </label>
              </div>
            `;
        })
        .join("");
    };

    myApp.functions.historyBack(
      $elements.container.querySelector("[data-history-back]")
    );
    myApp.elements.meta.color.setAttribute("content", "#000000");
    myVal.get.dataTrue().then(myVal.set.dataTrue);

    $elements.itemNull.style.display = "none";
    $elements.itemTrue.style.display = "";

    androidWebview((Android) => {
      Android.colorSystemBar("#000000");
    });

    // addCollection.emit("update-number", () => {});
    // addCollection.on("submmited", () => {});

    addCollection.on("add-collection", (data) => {
      // console.log(data);
      // $elements.favorite.click();

      if (data.collection_id == 1) {
        myVal.signals.isFavorite.value = !myVal.signals.isFavorite.value;
      }

      const encodeQueryString = mrf.encodeQueryObject({
        route: "toggle-favorites",
        data_id: myVal.values.data_id,
        type: 2,
        action: $elements.favorite.dataset.action,
        id_collection: data.collection_id,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      )
        .then((res) => res.json())
        .then((data) => {
          if (data == null) {
            location.hash = "#/login";
            return;
          }

          if (data?.status) {
            myVal.signals.isFavorite.value = data.type == 1;
          }
        });
    });

    document.documentElement.style.setProperty("--app-poster-color", "#000000");

    $elements.container.append(addCollection.fragment);
  }).fragment;
};

var serieId = () => {
  return htmlComponent("pages/SerieId", ({ elements: $elements }) => {
    const myApp = window.dataApp;
    const myVal = {
      params: myApp.routes.params(),
      signals: {
        isFavorite: mrf.observeValue(false),
        isView: mrf.observeValue(false),
        episodes: mrf.observeValue([]),
      },
      functions: {},
      values: {
        video: null,
        isConnected: false,
        streaming: {},
        episode: -1,
        data_id: "",
        data: null,
        thisAnime: {},
      },
      url: {
        fetch: (url) => {
          return `https://fetch.vniox.com/get.php?url=${encodeURIComponent(
            url
          )}`;
        },
      },
      get: {},
      set: {},
    };

    myVal.signals.isFavorite.observe((boolean) => {
      $elements.favorite.innerHTML = svg(
        boolean ? "fi fi-sr-heart" : "fi fi-rr-heart"
      );

      $elements.favorite.setAttribute("data-action", boolean ? 1 : 0);
    });

    myVal.signals.isView.observe((boolean) => {
      $elements.inputView.checked = boolean;
    });

    myVal.functions.updateHistory = (currentTime, duration = 0) => {
      if (myVal.values.isConnected) {
        const encodeQueryString = mrf.encodeQueryObject({
          route: "update-history-view",
          episode: myVal.values.episode,
          time_view: currentTime,
          time_duration: duration,
          datetime: Date.now(),
          data_id: myVal.values.data_id,
          type: 1,
        });

        fetch(
          myApp.url.server(`/api.php?${encodeQueryString}`),
          myApp.fetchOptions({
            method: "GET",
          })
        );
      }
    };

    myVal.functions.updateHistoryVideo = () => {
      myApp.mediaPlayer.video((video) => {
        let times = {};
        let status = false;

        video.src = "";

        video.onloadedmetadata = () => {
          times = {};
          status = false;

          const currentTime =
            parseInt(
              myVal.values.streaming?.episodes?.[myVal.values.episode]
                ?.time_view
            ) || 0;

          video.currentTime = currentTime;
        };

        video.ontimeupdate = (e) => {
          if (status) {
            const num = Math.floor(e.target.currentTime);

            if (num > 0 && num % 30 == 0 && !times[num]) {
              times[num] = true;
              myVal.functions.updateHistory(
                num,
                Math.ceil(video.duration) || 0
              );
            }
          }
        };

        video.onseeked = () => {
          const currentTime = Math.floor(video.currentTime);
          myVal.functions.updateHistory(
            currentTime,
            Math.ceil(video.duration) || 0
          );

          times = {};
          times[currentTime] = true;

          status = true;
        };
      });
    };

    myApp.events($elements.episodes, "click", (e) => {
      const item = e.target.closest("[data-item]");
      const input = e.target.closest("input");

      if (item) {
        $elements.itemTrueOption.showPopover();

        $elements.itemTrueOptionVideos.setAttribute(
          "data-episode",
          item.dataset.episode
        );

        $elements.itemTrueOptionVideos.innerHTML =
          '<div class="loader-i m-auto g-col-full" style="--color:#fff; padding: 20px 0"></div>';

        ApiWebCuevana.serieId(
          myVal.params.id,
          item.getAttribute("data-season"),
          item.getAttribute("data-episode")
        ).then((result) => {
          myVal.values.dataInfo = result;
          $elements.itemTrueOptionVideos.innerHTML = Object.entries(
            result.props.pageProps.episode.videos
          )
            .map((data) => {
              let show = true;

              return data[1]
                .map((video) => {
                  if (video.result == "") return "";
                  if (!["streamwish"].includes(video.cyberlocker)) return "";

                  const visibility = show ? "" : "display:none";
                  show = false;

                  return `
                        <span 
                          class="span_eNUkEzu" 
                          style="${visibility}">
                            ${data[0].slice(0, 3).toUpperCase()}
                        </span>
                        <button 
                          class="button_NuUj5A6" 
                          data-type="" 
                          data-url="${video.result}" 
                          data-quality="">
                            
                            <div class="div_Z8bTLpN">
                                <span>${video.cyberlocker}</span>
                                <p>${video.quality}</p>
                            </div>
                            
                        </button>
                    `;
                })
                .join("");
            })
            .join("");
        });
      }

      if (input) {
        // myVal.values.episode = input.dataset.episode;

        const encodeQueryString = mrf.encodeQueryObject({
          route: "toggle-history-view",
          episode: `${input.dataset.season}-${input.dataset.episode}`,
          datetime: Date.now(),
          data_id: myVal.values.data_id,
          type: 3,
          action: input.checked ? 1 : 0,
        });

        fetch(
          myApp.url.server(`/api.php?${encodeQueryString}`),
          myApp.fetchOptions({
            method: "GET",
          })
        )
          .then((res) => res.json())
          .then((data) => {
            if (data?.status) {
              input.checked = data.type == 1;
            }
          });
      }
    });

    myApp.events($elements.favorite, "click", () => {
      myVal.signals.isFavorite.value = !myVal.signals.isFavorite.value;

      const encodeQueryString = mrf.encodeQueryObject({
        route: "toggle-favorites",
        data_id: myVal.values.data_id,
        type: 3,
        action: $elements.favorite.dataset.action,
        id_collection: 1,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      )
        .then((res) => res.json())
        .then((data) => {
          if (data == null) {
            location.hash = "#/login";
            return;
          }

          if (data?.status) {
            myVal.signals.isFavorite.value = data.type == 1;
          }
        });
    });

    myApp.events($elements.inputView, "change", () => {
      const encodeQueryString = mrf.encodeQueryObject({
        route: "toggle-favorites",
        data_id: myVal.values.data_id,
        type: 3,
        action: $elements.inputView.checked ? 1 : 0,
        id_collection: 2,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      )
        .then((res) => res.json())
        .then((data) => {
          if (data == null) {
            location.hash = "#/login";
            return;
          }

          if (data?.status) {
            myVal.signals.isView.value = data.type == 1;
          }
        });
    });

    myApp.events($elements.itemTrueOptionVideos, "click", (e) => {
      const button = e.target.closest("button");
      if (button) {
        $elements.itemTrueOption.hidePopover();
        $elements.loaderVideo.style.display = "";

        myVal.values.episode = $elements.itemTrueOptionVideos.dataset.episode;

        ApiWebCuevana.serverUrl(button.getAttribute("data-url")).then((url) => {
          setTimeout(() => {
            getMediaWeb(url, (res) => {
              $elements.loaderVideo.style.display = "none";
              if (res.status) {
                // Android.openWithDefault(res.url, "video/*");

                myApp.mediaPlayer.element().requestFullscreen();
                myApp.mediaPlayer.video((video) => {
                  const $video = video;
                  const videoSrc = res.url;

                  if (Hls.isSupported()) {
                    const hls = (myApp.values.hls = new Hls());

                    hls.loadSource(videoSrc);
                    hls.attachMedia($video);
                    hls.on(Hls.Events.MANIFEST_PARSED, function () {});
                  } else if (
                    $video.canPlayType("application/vnd.apple.mpegurl")
                  ) {
                    $video.src = videoSrc;
                  }
                });
              } else {
                alert("El video no esta disponible");
              }
            });
          });
        });
      }
    });

    myApp.events($elements.itemTrueOption, "click", (e) => {
      if (e.target === e.currentTarget) {
        $elements.itemTrueOption.hidePopover();
      }
    });

    myApp.events($elements["form-filter-type"], "change", () => {
      const value = $elements["form-filter-type"].key.value;

      const elements = {
        information: $elements.itemTrueInformation,
        chapter: $elements.itemTrueChapter,
        similar: $elements.itemTrueSimilar,
      };

      Object.entries(elements).forEach((entries) => {
        entries[1].style.display = entries[0] == value ? "" : "none";
      });
    });

    myApp.events($elements.selectSeason, "change", () => {
      myVal.set.dataTrueEpisodes($elements.selectSeason.value);
    });

    myApp.events($elements.buttonSeasonOrder, "click", () => {
      const svg = $elements.buttonSeasonOrder.children[0];
      svg.classList.add("transition-rotate");
      svg.classList.toggle("active");

      $elements.episodes.append(
        ...Array.from($elements.episodes.children).reverse()
      );
    });
    myVal.get.dataTrue = () => {
      return new Promise((resolve, reject) => {
        fetch(
          `https://api.themoviedb.org/3/tv/${myVal.params.id}?api_key=ec4ff1b6182572d3e74735e74ca3a8ef&language=es-ES`
        )
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            resolve(json);
          });

        // ApiWebCuevana.serieId(myVal.params.id).then((data) => {
        //   resolve(data);
        // });
      });
    };

    myVal.set.dataTrue = (data) => {
      // return data;

      const thisSerie = data;

      myVal.values.data = data;
      myVal.values.data_id = myVal.params.id;

      $elements.itemNull.style.display = "none";
      $elements.itemTrue.style.display = "";

      $elements.poster.onload = () => {
        if (!$elements.container.parentElement) return;

        $elements.poster.style.display = "";

        mrc.MyImage.canvas(myApp.url.img($elements.poster.src)).then(
          (result) => {
            const pixelData = result.ctx.getImageData(0, 0, 1, 1).data;
            const r = pixelData[0];
            const g = pixelData[1];
            const b = pixelData[2];

            const color = mrc.MyColor.toDark({ rgb: [r, g, b] }, 50);

            $elements.itemTrueOptionVideos.parentElement.style.background =
              mrc.MyColor.toDark({ rgb: [r, g, b] }, 60);

            myApp.elements.meta.color.setAttribute("content", color);
            $elements.container.style.background = color;

            document.documentElement.style.setProperty(
              "--app-poster-color",
              color
            );

            androidWebview((Android) => {
              Android.colorSystemBar(color);
            });
          }
        );
      };

      // renderInfo
      mrf.callbackTryCatch(() => {
        // $elements.poster.src = myApp.url.img(
        //   thisSerie.images.poster.replace("/original/", "/w342/")
        // );

        $elements.poster.src = `https://image.tmdb.org/t/p/w342${data.poster_path}`;

        $elements.title.textContent = thisSerie.name;
        $elements.overview.textContent = thisSerie.overview;
        $elements.genres.textContent = thisSerie.genres
          .map((genre) => genre.name)
          .join(", ");

        $elements.duration.textContent = `${data.seasons.length} temporadas`;

        $elements.date.textContent = thisSerie.first_air_date;

        // new Date(thisSerie.first_air_date).getFullYear();
      });

      // renderSeason
      mrf.callbackTryCatch(() => {
        const seasons = data.seasons;

        // const seasons = thisSerie.seasons.filter(
        //   (season) => season.episodes.length
        // );

        $elements.selectSeason.innerHTML = seasons
          .map((season) => {
            const value = `1-${season.episode_count}-${season.season_number}`;

            return `
                <option value="${value}">Temporada ${season.season_number}</option>
              `;

            // const value = `1-${season.episodes.length}-${season.number}`;

            // return `
            //   <option value="${value}">Temporada ${season.number}</option>
            // `;
          })
          .join("");

        if ($elements.selectSeason.children.length == 1) {
          $elements.selectSeason.parentElement.style.pointerEvents = "none";
          $elements.selectSeason.parentElement.style.opacity = ".7";
        }

        if (
          $elements.selectSeason.children.length == 1 &&
          $elements.selectSeason.value == "1-1"
        ) {
          $elements.selectSeason.parentElement.style.display = "none";
        }

        myVal.set.dataTrueEpisodes($elements.selectSeason.value);
      });

      // renderSimiliar
      mrf.callbackTryCatch(() => {
        return;
      });

      myVal.get.dataTrueInfo().then(myVal.set.dataTrueInfo);
    };

    myVal.get.dataTrueInfo = (data) => {
      return new Promise((resolve, reject) => {
        const data = myVal.values.data;
        const data_id = myVal.values.data.id;

        const encodeQueryString = mrf.encodeQueryObject({
          route: "favorites-one",
          type: 3,
          data_id,
        });

        const body = {
          data_id: data_id,
          data_json: JSON.stringify(
            Object.entries(data).reduce((prev, curr) => {
              if (["TMDbId", "titles", "url", "images"].includes(curr[0])) {
                prev[curr[0]] = curr[1];
              }
              return prev;
            }, {})
          ),
          type: 3,
        };

        fetch(
          myApp.url.server(`/api.php?${encodeQueryString}`),
          myApp.fetchOptions({
            method: "POST",
            body: JSON.stringify(body),
          })
        )
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          });
      });
    };

    myVal.set.dataTrueInfo = (data) => {
      myVal.values.streaming = data;
      $elements.favorite.style.visibility = "";
      myVal.values.isConnected = Boolean(data);

      if (myVal.values.isConnected) {
        myVal.signals.isFavorite.value = Boolean(data?.favorite);
        myVal.signals.isView.value = Boolean(data?.view);
        myVal.set.dataTrueEpisodes($elements.selectSeason.value);
      }
    };

    myVal.set.dataTrueEpisodes = (string = "") => {
      const [from, to, season] = string.split("-").map(Number);
      const array = Array(to - from + 1)
        .fill()
        .map((_, i) => i + from);

      $elements.episodes.innerHTML = array
        .map((episode) => {
          const episodeInfo =
            myVal.values.streaming?.episodes?.[`${season}-${episode}`];

          const checked = episodeInfo != undefined ? "checked" : "";

          const displayInput = myVal.values.isConnected ? "" : "display:none";

          return `
              <div data-season="${season}" data-episode="${episode}" class="div_eGwK6I1">
                <button 
                  class="button_fk0VHgU" 
                  data-slug="${myVal.params.id}-${episode}" 
                  data-title="${myVal.params.id}" 
                  data-description="episodio ${episode}" 
                  data-season="${season}"
                  data-episode="${episode}"
                  data-item>
                    <span>Episodio ${episode}</span>
                    <small>
                      ${
                        parseInt(episodeInfo?.time_view)
                          ? "visto ".concat(
                              myApp.functions.formatTime(episodeInfo.time_view)
                            )
                          : ""
                      }
                      ${
                        parseInt(episodeInfo?.time_duration)
                          ? "de ".concat(
                              myApp.functions.formatTime(
                                episodeInfo.time_duration
                              )
                            )
                          : ""
                      }
                    </small>
                </button>
                <label class="label_zjZIMnZ" style="${displayInput}">
                  <input type="checkbox" data-season="${season}" data-episode="${episode}" ${checked}>
                  <span style="display:flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-check"><path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z"></path></svg></span>
                </label>
              </div>
            `;
        })
        .join("");

      $elements.buttonSeasonOrder.parentElement.style.display =
        array.length > 1 ? "" : "none";

      $elements.buttonSeasonOrder.children[0].classList.toggle("active", false);
    };

    myApp.functions.historyBack(
      $elements.container.querySelector("[data-history-back]")
    );
    myApp.elements.meta.color.setAttribute("content", "#000000");
    myVal.get.dataTrue().then(myVal.set.dataTrue);

    $elements.itemNull.style.display = "none";
    $elements.itemTrue.style.display = "";

    document.documentElement.style.setProperty("--app-poster-color", "#000000");

    androidWebview((Android) => {
      Android.colorSystemBar("#000000");
    });
  }).fragment;
};

var animeId = () => {
  return htmlComponent("pages/AnimeId", ({ elements: $elements }) => {
    const myApp = window.dataApp;
    const myVal = {
      params: myApp.routes.params(),
      signals: {
        isFavorite: mrf.observeValue(false),
        isView: mrf.observeValue(false),
        episodes: mrf.observeValue([]),
      },
      functions: {},
      values: {
        video: null,
        isConnected: false,
        streaming: {},
        episode: -1,
        data_id: "",
        data: null,
        thisAnime: {},
      },
      url: {
        fetch: (url) => {
          return `https://fetch.vniox.com/get.php?url=${encodeURIComponent(
            url
          )}`;
        },
      },
      get: {},
      set: {},
    };

    myVal.signals.isFavorite.observe((boolean) => {
      $elements.favorite.innerHTML = svg(
        boolean ? "fi fi-sr-heart" : "fi fi-rr-heart"
      );

      $elements.favorite.setAttribute("data-action", boolean ? 1 : 0);
    });

    myVal.signals.isView.observe((boolean) => {
      $elements.inputView.checked = boolean;
    });

    myVal.functions.updateHistory = (currentTime, duration = 0) => {
      if (myVal.values.isConnected) {
        const encodeQueryString = mrf.encodeQueryObject({
          route: "update-history-view",
          episode: myVal.values.episode,
          time_view: currentTime,
          time_duration: duration,
          datetime: Date.now(),
          data_id: myVal.values.data_id,
          type: 1,
        });

        fetch(
          myApp.url.server(`/api.php?${encodeQueryString}`),
          myApp.fetchOptions({
            method: "GET",
          })
        );
      }
    };

    myVal.functions.updateHistoryVideo = () => {
      myApp.mediaPlayer.video((video) => {
        let times = {};
        let status = false;

        video.src = "";

        video.onloadedmetadata = () => {
          times = {};
          status = false;

          const currentTime =
            parseInt(
              myVal.values.streaming?.episodes?.[myVal.values.episode]
                ?.time_view
            ) || 0;

          video.currentTime = currentTime;
        };

        video.ontimeupdate = (e) => {
          if (status) {
            const num = Math.floor(e.target.currentTime);

            if (num > 0 && num % 30 == 0 && !times[num]) {
              times[num] = true;
              myVal.functions.updateHistory(
                num,
                Math.ceil(video.duration) || 0
              );
            }
          }
        };

        video.onseeked = () => {
          const currentTime = Math.floor(video.currentTime);
          myVal.functions.updateHistory(
            currentTime,
            Math.ceil(video.duration) || 0
          );

          times = {};
          times[currentTime] = true;

          status = true;
        };
      });
    };

    myApp.events($elements.episodes, "click", (e) => {
      const item = e.target.closest("[data-item]");
      const input = e.target.closest("input");

      if (item) {
        $elements.itemTrueOption.showPopover();

        $elements.itemTrueOptionVideos.setAttribute(
          "data-episode",
          item.dataset.episode
        );

        $elements.itemTrueOptionVideos.innerHTML =
          '<div class="loader-i m-auto g-col-full" style="--color:#fff; padding: 20px 0"></div>';

        myApp.mediaPlayer.info({
          title: item.getAttribute("data-title").split("-").join(" "),
          description: item.getAttribute("data-description"),
        });

        myApp.mediaPlayer.controls({
          options: {
            not: ["download"],
          },
        });

        ApiWebAnimeflv.identifier(
          myVal.params.id,
          item.getAttribute("data-episode")
        ).then((videos) => {
          console.log(videos);
          $elements.itemTrueOptionVideos.innerHTML = Object.entries(videos)
            .map((data) => {
              let show = true;

              return data[1]
                .map((video, index) => {
                  // if (index == 0) return "";
                  if (!["sw"].includes(video.server)) return "";

                  const visibility = show ? "" : "display:none";
                  show = false;

                  return `
                      <span 
                        class="span_eNUkEzu" 
                        style="${visibility}">
                          ${data[0].slice(0, 3).toUpperCase()}
                      </span>
                      <button 
                        class="button_NuUj5A6" 
                        data-type="" 
                        data-url="${video.code}" 
                        data-quality="">
                          
                          <div class="div_Z8bTLpN">
                              <span>${video.title}</span>
                              <p>${video.server}</p>
                          </div>
                          
                      </button>
                  `;
                })
                .join("");
            })
            .join("");
        });
      }

      if (input) {
        // myVal.values.episode = input.dataset.episode;

        const encodeQueryString = mrf.encodeQueryObject({
          route: "toggle-history-view",
          episode: input.dataset.episode,
          datetime: Date.now(),
          data_id: myVal.values.data_id,
          type: 1,
          action: input.checked ? 1 : 0,
        });

        fetch(
          myApp.url.server(`/api.php?${encodeQueryString}`),
          myApp.fetchOptions({
            method: "GET",
          })
        )
          .then((res) => res.json())
          .then((data) => {
            if (data?.status) {
              input.checked = data.type == 1;
            }
          });
      }
    });

    myApp.events($elements.favorite, "click", () => {
      myVal.signals.isFavorite.value = !myVal.signals.isFavorite.value;

      const encodeQueryString = mrf.encodeQueryObject({
        route: "toggle-favorites",
        data_id: myVal.values.data_id,
        type: 1,
        action: $elements.favorite.dataset.action,
        id_collection: 1,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      )
        .then((res) => res.json())
        .then((data) => {
          if (data == null) {
            location.hash = "#/login";
            return;
          }

          if (data?.status) {
            myVal.signals.isFavorite.value = data.type == 1;
          }
        });
    });

    myApp.events($elements.inputView, "change", () => {
      const encodeQueryString = mrf.encodeQueryObject({
        route: "toggle-favorites",
        data_id: myVal.values.data_id,
        type: 1,
        action: $elements.inputView.checked ? 1 : 0,
        id_collection: 2,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      )
        .then((res) => res.json())
        .then((data) => {
          if (data == null) {
            location.hash = "#/login";
            return;
          }

          if (data?.status) {
            myVal.signals.isView.value = data.type == 1;
          }
        });
    });

    myApp.events($elements.itemTrueOptionVideos, "click", (e) => {
      const button = e.target.closest("button");
      if (button) {
        $elements.loaderVideo.style.display = "";

        myVal.values.episode = $elements.itemTrueOptionVideos.dataset.episode;

        $elements.itemTrueOption.hidePopover();

        setTimeout(() => {
          getMediaWeb(button.getAttribute("data-url"), (res) => {
            $elements.loaderVideo.style.display = "none";
            if (res.status) {
              // Android.openWithDefault(res.url, "video/*");

              myApp.mediaPlayer.element().requestFullscreen();
              myApp.mediaPlayer.video((video) => {
                const $video = video;
                const videoSrc = res.url;

                if (Hls.isSupported()) {
                  const hls = (myApp.values.hls = new Hls());

                  hls.loadSource(videoSrc);
                  hls.attachMedia($video);
                  hls.on(Hls.Events.MANIFEST_PARSED, function () {});
                } else if (
                  $video.canPlayType("application/vnd.apple.mpegurl")
                ) {
                  $video.src = videoSrc;
                }
              });
            } else {
              alert("El video no esta disponible");
            }
          });
        });

        // myApp.mediaPlayer.element().requestFullscreen();
        // myVal.functions.updateHistoryVideo();

        if ("mediaSession" in navigator) {
          navigator.mediaSession.metadata = new MediaMetadata({
            title: $elements.title.textContent,
            artist: `Episodio ${myVal.values.episode}`,
            album: "Anime",
            artwork: [
              {
                src: $elements.poster.src,
                sizes: "512x512",
                type: "image/png",
              },
            ],
          });
        }
      }
    });

    myApp.events($elements.itemTrueOption, "click", (e) => {
      if (e.target === e.currentTarget) {
        $elements.itemTrueOption.hidePopover();
      }
    });

    myApp.events($elements["form-filter-type"], "change", () => {
      const value = $elements["form-filter-type"].key.value;

      const elements = {
        information: $elements.itemTrueInformation,
        chapter: $elements.itemTrueChapter,
        similar: $elements.itemTrueSimilar,
      };

      Object.entries(elements).forEach((entries) => {
        entries[1].style.display = entries[0] == value ? "" : "none";
      });
    });

    myApp.events($elements.selectSeason, "change", () => {
      myVal.set.dataTrueEpisodes($elements.selectSeason.value);
    });

    myApp.events($elements.buttonSeasonOrder, "click", () => {
      const svg = $elements.buttonSeasonOrder.children[0];
      svg.classList.add("transition-rotate");
      svg.classList.toggle("active");

      $elements.episodes.append(
        ...Array.from($elements.episodes.children).reverse()
      );
    });

    myVal.get.dataTrue = () => {
      return new Promise((resolve, reject) => {
        ApiWebAnimeflv.identifier(myVal.params.id).then((data) => {
          resolve(data);

          // myVal.values.data = data;
          // myVal.values.thisAnime = data;
          // myVal.functions.dataRenderTrue(data);
        });
      });
    };

    myVal.set.dataTrue = (data) => {
      const episodesLength = data.episodes;

      myVal.values.data = data;
      myVal.values.data_id = parseInt(data.poster.split("/").pop());

      $elements.itemNull.style.display = "none";
      $elements.itemTrue.style.display = "";

      $elements.poster.onload = () => {
        if (!$elements.container.parentElement) return;

        $elements.poster.style.display = "";

        mrc.MyImage.canvas($elements.poster.src).then((result) => {
          const pixelData = result.ctx.getImageData(0, 0, 1, 1).data;
          const r = pixelData[0];
          const g = pixelData[1];
          const b = pixelData[2];

          const color = mrc.MyColor.toDark({ rgb: [r, g, b] }, 50);

          $elements.itemTrueOptionVideos.parentElement.style.background =
            mrc.MyColor.toDark({ rgb: [r, g, b] }, 60);

          myApp.elements.meta.color.setAttribute("content", color);
          $elements.container.style.background = color;

          // myApp.callbackIf(window.Android, (Android) => {
          //   Android.colorSystemBar(color);
          // });

          document.documentElement.style.setProperty(
            "--app-poster-color",
            color
          );

          androidWebview((Android) => {
            Android.colorSystemBar(color);
          });
        });
      };

      // renderInfo
      mrf.callbackTryCatch(() => {
        $elements.poster.src = myApp.url.img(data.poster);
        $elements.title.textContent = data.title;
        $elements.overview.textContent = data.overview;

        $elements.genres.textContent = data.genres
          .map((genre) => genre)
          .join(", ");
        $elements.duration.textContent = `${episodesLength} episodios`;
        $elements.date.textContent = data.status;
        $elements.nextEpisode.innerHTML = data.nextEpisode
          ? `(nuevo episodio el <b>${data.nextEpisode}<b>)`
          : "";
      });

      // renderSeason
      mrf.callbackTryCatch(() => {
        $elements.selectSeason.innerHTML = Array(
          Math.floor(episodesLength / 50) + 1
        )
          .fill(null)
          .map((_, index, array) => {
            const end =
              array[index + 1] !== undefined ? index * 50 + 50 : episodesLength;
            const start = index * 50 + 1;

            const value = `${start}-${end || 50}`;

            return `
                <option value="${value}">${value}</option>
              `;
          })
          .join("");

        if ($elements.selectSeason.children.length == 1) {
          $elements.selectSeason.parentElement.style.pointerEvents = "none";
          $elements.selectSeason.parentElement.style.opacity = ".7";
        }

        if (
          $elements.selectSeason.children.length == 1 &&
          $elements.selectSeason.value == "1-1"
        ) {
          $elements.selectSeason.parentElement.style.display = "none";
        }

        myVal.set.dataTrueEpisodes($elements.selectSeason.value);
      });

      // renderSimiliar
      mrf.callbackTryCatch(() => {
        $elements.similar.innerHTML = data.related
          .map((data) => {
            const url = myApp.url.img(data.poster);
            return `
                <a
                  href="#/anime/${data.identifier}"
                  class="div_SQpqup7" data-item>
                    <div class="div_fMC1uk6">
                      <img src="${url}" alt="">
                      <span>${data.type ?? ""}</span>
                    </div>
                    <div class="div_9nWIRZE">
                      <p>${data.title}</p>
                    </div>
                </a>
              `;
          })
          .join("");
      });

      myVal.get.dataTrueInfo().then(myVal.set.dataTrueInfo);
    };

    myVal.get.dataTrueInfo = (data) => {
      return new Promise((resolve, reject) => {
        const data = myVal.values.data;
        const data_id = myVal.values.data_id;

        // const data_id = parseInt(data.poster.split("/").pop());
        // myVal.values.data_id = data_id;

        const encodeQueryString = mrf.encodeQueryObject({
          route: "favorites-one",
          type: 1,
          data_id,
        });

        const body = {
          data_id: data_id,
          data_json: JSON.stringify(
            Object.entries(data).reduce(
              (prev, curr) => {
                if (
                  ["identifier", "title", "poster", "type"].includes(curr[0])
                ) {
                  prev[curr[0]] = curr[1];
                }
                return prev;
              },
              {
                id: data_id,
              }
            )
          ),
          type: 1,
        };

        fetch(
          myApp.url.server(`/api.php?${encodeQueryString}`),
          myApp.fetchOptions({
            method: "POST",
            body: JSON.stringify(body),
          })
        )
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          });
      });
    };

    myVal.set.dataTrueInfo = (data) => {
      myVal.values.streaming = data;
      $elements.favorite.style.visibility = "";
      myVal.values.isConnected = Boolean(data);

      if (myVal.values.isConnected) {
        myVal.signals.isFavorite.value = Boolean(data?.favorite);
        myVal.signals.isView.value = Boolean(data?.view);
        myVal.set.dataTrueEpisodes($elements.selectSeason.value);
      }
    };

    myVal.set.dataTrueEpisodes = (string = "") => {
      const [from, to] = string.split("-").map(Number);
      const array = Array(to - from + 1)
        .fill()
        .map((_, i) => i + from);

      $elements.episodes.innerHTML = array
        .map((episode) => {
          const episodeInfo = myVal.values.streaming?.episodes?.[episode];

          const checked = episodeInfo != undefined ? "checked" : "";

          const displayInput = myVal.values.isConnected ? "" : "display:none";

          return `
              <div data-episode="${episode}" class="div_eGwK6I1">
                <button 
                  class="button_fk0VHgU" 
                  data-slug="${myVal.params.id}-${episode}" 
                  data-title="${myVal.params.id}" 
                  data-description="episodio ${episode}" 
                  data-episode="${episode}"
                  data-item>
                    <span>Episodio ${episode}</span>
                    <small>
                      ${
                        parseInt(episodeInfo?.time_view)
                          ? "visto ".concat(
                              myApp.functions.formatTime(episodeInfo.time_view)
                            )
                          : ""
                      }
                      ${
                        parseInt(episodeInfo?.time_duration)
                          ? "de ".concat(
                              myApp.functions.formatTime(
                                episodeInfo.time_duration
                              )
                            )
                          : ""
                      }
                    </small>
                </button>
                <label class="label_zjZIMnZ" style="${displayInput}">
                  <input type="checkbox" data-episode="${episode}" ${checked}>
                  <span style="display:flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-check"><path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z"></path></svg></span>
                </label>
              </div>
            `;
        })
        .join("");

      $elements.buttonSeasonOrder.children[0].classList.remove("active");
      $elements.buttonSeasonOrder.parentElement.style.display =
        array.length > 1 ? "" : "none";
    };

    myApp.functions.historyBack(
      $elements.container.querySelector("[data-history-back]")
    );
    myApp.elements.meta.color.setAttribute("content", "#000000");

    try {
      myVal.get.dataTrue().then(myVal.set.dataTrue);
    } catch (error) {
      alert(error.message);
    }

    $elements.itemNull.style.display = "none";
    $elements.itemTrue.style.display = "";

    document.documentElement.style.setProperty("--app-poster-color", "#000000");

    androidWebview((Android) => {
      Android.colorSystemBar("#000000");
    });
  }).fragment;
};

var gendersAnime = [
  "Acción",
  "Artes Marciales",
  "Aventuras",
  "Carreras",
  "Ciencia Ficción",
  "Comedia",
  "Demencia",
  "Demonios",
  "Deportes",
  "Drama",
  "Ecchi",
  "Escolares",
  "Espacial",
  "Fantasía",
  "Harem",
  "Historico",
  "Infantil",
  "Josei",
  "Juegos",
  "Magia",
  "Mecha",
  "Militar",
  "Misterio",
  "Música",
  "Parodia",
  "Policía",
  "Psicológico",
  "Recuentos de la vida",
  "Romance",
  "Samurai",
  "Seinen",
  "Shoujo",
  "Shounen",
  "Sobrenatural",
  "Superpoderes",
  "Suspenso",
  "Terror",
  "Vampiros",
  "Yaoi",
  "Yuri",
];

var itemData = (p = {}) => {
  const f = window.MyResourceFunction;

  const myApp = window.dataApp;

  const $element = f.createNodeElement(/*html*/`
    <a
      href="${p.href}"
      class="div_SQpqup7"style="margin-bottom:auto" data-item>
        <div class="div_fMC1uk6" style="${p.style}">
          <img src="" alt="" data-src="${p.imgSrc}" style="display:none">
          ${Boolean(p.info) ? `<span style="font-size:11px">${p.info}</span>` : ""}
        </div>
        <div class="div_9nWIRZE scroll-h">
          <p class="text-overflow-ellipsis" style="font-size:12px">${p.title}</p>
        </div>
    </a>
  `);

  // const $elements = f.createObjectElement(
  //   $element.querySelectorAll("[id]"),
  //   "id",
  //   true
  // );

  if (p.intersectionObserver) {
    $element.addEventListener("_IntersectionObserver", ({ detail }) => {
      if (detail.entry.isIntersecting) {
        detail.observer.unobserve(detail.entry.target);
        const img = $element.querySelector("img");

        if (Boolean(img.dataset.src)) {
          img.onerror = () => {
            img.onerror = null;
            img.src = `https://img.vniox.com/index.php?url=${img.dataset.src}`;
          };

          img.onload = () => {
            img.onload = null;
            img.onerror = null;
            img.style.display = "";
          };

          img.src = img.dataset.src;
        }
      }
    });

    myApp.instances.IntersectionObserver.observe($element);
  }

  return $element;
};

var inicio = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;
  const myVal = {
    params: myApp.routes.params(),

    signals: {
      dataNull: mrf.observeValue(true),
      dataTrue: mrf.observeValue([]),
      dataTrueGender: mrf.observeValue([
        { value: "", string: "Todos" },
        { value: "-1", string: "Ultimos episodios" },
        { value: "-2", string: "Ultimos animes" },
        ...gendersAnime.map((string) => {
          return {
            value: string.split(" ").join("-").toLocaleLowerCase(),
            string,
          };
        }),
      ]),
    },
    values: {
      observes: [],
      activeIntersectionObserver: false,
      scrollTop: 0,
    },
    function: {
      dataLoad: () => {},
    },

    functions: {},
    promises: {
      genderPelicula: new Promise((resolve, reject) => {
        return resolve([]);
      }),
      genderSerie: new Promise((resolve, reject) => {
        return resolve([]);
      }),
      genderLive: new Promise((resolve, reject) => {
        return resolve([]);
      }),
    },

    get: {},
    set: {},
  };

  const $element = mrf.createNodeElement(
    ((_) => `

      <div class="div_Xu02Xjh">

        <header class="header_K0hs3I0">

            <div class="div_uNg74XS">
              <div class="div_sZZicpN">
                <h3 id="h3Title">Inicio</h3>
                <span id="genderText">todos</span>
              </div>
            </div>

            <div class="div_x0cH0Hq">
              <div class="div_klylpyg">
                <small>
                  ${svg("fi fi-rr-filter")}
                </small>
                <select id="selectGender">
                  <option selected>Todos</option>
                </select>
              </div>
            </div>

        </header>


        <div class="div_BIchAsC">

            <form class="app-form-label-checkbox" id="form-filter-type" name="form-filter-type">
              <label>
                <input type="radio" name="key" value="1" checked>
                <span>Animes</span>
              </label>
              <label>
                <input type="radio" name="key" value="2">
                <span>Peliculas</span>
              </label>
              <label>
                <input type="radio" name="key" value="3">
                <span>Series</span>
              </label>
              <label style="display:none">
                <input type="radio" name="key" value="4">
                <span>Peliculas II</span>
              </label>
              <label style="display:none">
                <input type="radio" name="key" value="5">
                <span>Series II</span>
              </label>
              <label style="display:none">
                <input type="radio" name="key" value="6">
                <span>Canales</span>
              </label>
            </form>
              
        </div>
    
        

        <div class="div_IsTCHpN">
            <div id="itemNull" class="loader-i" style="--color:var(--app-color-letter)"></div>
            <div id="itemFalse" class="div_b14S3dH" style="display:none">
                ${svg("fi fi-rr-search-alt")}
                <h3>sin resultados</h3>
            </div>
            <div id="itemTrue" class="div_qsNmfP3" style="display:none">
                <div id="itemTrueLoad" class="div_Qm4cPUn">
                    <div class="loader-i" style="--color:var(--app-color-letter)"></div>
                </div>
            </div>
        </div>

      </div>

  `)({
      href: ["#", "search", myVal.params.type, myVal.params.result].join("/"),
      title: "Inicio" ,
      description: myVal.params.type,
      hidden: "display:none",
    })
  );

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myApp.events(
    $elements.itemTrueLoad,
    "_IntersectionObserver",
    ({ detail }) => {
      if (detail.entry.isIntersecting) {
        detail.observer.unobserve(detail.entry.target);
        myVal.get.dataTrue().then(myVal.set.dataTrue);
      }
    }
  );

  myApp.events($elements.selectGender, "change", () => {
    $elements.itemTrue.innerHTML = "";
    myVal.signals.dataNull.value = true;
    $elements.genderText.textContent =
      $elements.selectGender.selectedOptions[0].innerText;
    myVal.get.dataTrue().then(myVal.set.dataTrue);
  });

  myApp.events($elements["form-filter-type"], "change", async (e) => {
    e.preventDefault();
    const type = $elements["form-filter-type"].key.value;

    $elements.itemTrue.innerHTML = "";
    myVal.signals.dataNull.value = true;

    const array = [{ value: "", string: "Todos" }];

    if (type == 1) {
      array.push(
        { value: "-1", string: "Ultimos episodios" },
        { value: "-2", string: "Ultimos animes" },
        ...gendersAnime.map((string) => {
          return {
            value: string.split(" ").join("-").toLocaleLowerCase(),
            string,
          };
        })
      );

      myVal.signals.dataTrueGender.value = array;
    }

    if (type == 2) {
      myApp.promises.genresMovies.then((genres) => {
        array.push(
          ...genres.map((gender) => {
            return {
              value: gender.id,
              string: gender.name,
            };
          })
        );
        myVal.signals.dataTrueGender.value = array;
      });
    }

    if (type == 3) {
      myApp.promises.genresSeries.then((genres) => {
        array.push(
          ...genres.map((gender) => {
            return {
              value: gender.id,
              string: gender.name,
            };
          })
        );
        myVal.signals.dataTrueGender.value = array;
      });
    }

    if (type == 4) {
      array.push(
        ...(await myVal.promises.genderPelicula)
          .map((string) => {
            return {
              value: string.category_id,
              string: string.category_name,
            };
          })
          .filter((object) => !["298", "193"].includes(object.value))
      );
    }

    if (type == 5) {
      array.push(
        ...(await myVal.promises.genderSerie).map((string) => {
          return {
            value: string.category_id,
            string: string.category_name,
          };
        })
      );
    }

    if (type == 6) {
      array.push(
        ...(await myVal.promises.genderLive)
          .map((string) => {
            return {
              value: string.category_id,
              string: string.category_name,
            };
          })
          .filter((object) => !["484", "34", "486"].includes(object.value))
      );
    }

    // myVal.signals.dataTrueGender.value = array;
    myVal.get.dataTrue().then(myVal.set.dataTrue);
  });

  myApp.events($elements.itemTrue, "click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      const data = JSON.parse(button.getAttribute("data-data"));
      Android.openWithDefault(
        `${myApp.iptv.server}/live/${myApp.iptv.username}/${myApp.iptv.password}/${data.stream_id}.m3u8`,
        "video/*"
      );
    }
  });

  myVal.signals.dataNull.observe((boolean) => {
    const dataItem = Boolean($elements.itemTrue.querySelector("[data-item]"));

    const render = {
      itemNull: boolean,
      itemFalse: !boolean && !dataItem,
      itemTrue: !boolean && dataItem,
    };

    Object.entries(render).forEach((entries) => {
      $elements[entries[0]].style.display = entries[1] ? "" : "none";
    });
  });

  myVal.signals.dataTrueGender.observe((array) => {
    $elements.selectGender.innerHTML = array
      .map((object) => {
        return `<option value="${object.value}">${object.string}</option>`;
      })
      .join("");

    $elements.genderText.textContent =
      $elements.selectGender.selectedOptions[0].innerText;
  });

  /** GET */
  myVal.get.dataTrueAnime = () => {
    return new Promise((resolve, reject) => {
      // return resolve([]);
      const page =
        Math.floor(
          $elements.itemTrue.querySelectorAll("[data-item]").length / 24
        ) + 1;

      const gender = $elements.selectGender.value;
      const genres = [gender].filter(Boolean);

      if (["-1", "-2"].includes(gender)) {
        return ApiWebAnimeflv.home().then((object) => {
          const array = gender == "-1" ? object.episodes : object.animes;
          resolve(
            array.map((data) => {
              return {
                href: `#/anime/${data.identifier}`,
                title: data.title,
                info: gender == "-1" ? `episodio ${data.episode}` : data.type,
                image: data.poster,
                style: gender == "-1" ? "aspect-ratio:3/2" : "",
              };
            })
          );
        });
      }

      ApiWebAnimeflv.search({ page, genre: genres }).then((array) => {
        resolve(
          array.map((data) => {
            return {
              href: `#/anime/${data.identifier}`,
              title: data.title,
              info: data.type,
              image: data.poster,
              style: "",
            };
          })
        );
      });
    });
  };

  myVal.get.dataTruePelicula = () => {
    return new Promise((resolve, reject) => {
      const page =
        Math.floor(
          $elements.itemTrue.querySelectorAll("[data-item]").length / 20
        ) + 1;

      const gender = $elements.selectGender.value;

      const queries = mrf.encodeQueryObject({
        api_key: "ec4ff1b6182572d3e74735e74ca3a8ef",
        language: "es-ES",
        include_adult: "false",
        page,
        with_genres: gender,
      });

      const url = Boolean(gender)
        ? `https://api.themoviedb.org/3/discover/movie?${queries}`
        : `https://api.themoviedb.org/3/movie/popular?${queries}`;

      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          resolve(
            json.results.map((data) => {
              const image = `https://image.tmdb.org/t/p/w185${data.poster_path}`;
              const type = "pelicula";

              return {
                href: `#/${type}/${data.id}`,
                title: data.title,
                info: "",
                image: image,
                style: "",
              };
            })
          );
        });

      // return;

      // ApiWebCuevana.pelicula(page, gender).then((data) => {
      //   const array = data?.props?.pageProps?.movies ?? [];

      //   resolve(
      //     array.map((data) => {
      //       const image = data.images.poster
      //         ? data.images.poster.replace("/original/", "/w185/")
      //         : "";

      //       const type = "pelicula";

      //       return {
      //         href: `#/${type}/${data.TMDbId}`,
      //         title: data.titles.name,
      //         info: "",
      //         image: image,
      //         style: "",
      //       };
      //     })
      //   );
      // });
    });
  };

  myVal.get.dataTrueSerie = () => {
    return new Promise((resolve, reject) => {
      const page =
        Math.floor(
          $elements.itemTrue.querySelectorAll("[data-item]").length / 20
        ) + 1;

      const gender = $elements.selectGender.value;

      const queries = mrf.encodeQueryObject({
        api_key: "ec4ff1b6182572d3e74735e74ca3a8ef",
        language: "es-ES",
        include_adult: "false",
        page,
        with_genres: gender,
      });

      const url = Boolean(gender)
        ? `https://api.themoviedb.org/3/discover/tv?${queries}`
        : `https://api.themoviedb.org/3/tv/popular?${queries}`;

      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          resolve(
            json.results.map((data) => {
              const image = `https://image.tmdb.org/t/p/w185${data.poster_path}`;
              const type = "serie";

              return {
                href: `#/${type}/${data.id}`,
                title: data.name,
                info: "",
                image: image,
                style: "",
              };
            })
          );
        });

      // ApiWebCuevana.serie(page).then((data) => {
      //   const array = data?.props?.pageProps?.movies ?? [];

      //   resolve(
      //     array.map((data) => {
      //       const image = data.images.poster
      //         ? data.images.poster.replace("/original/", "/w185/")
      //         : "";

      //       const type = "serie";

      //       return {
      //         href: `#/${type}/${data.TMDbId}`,
      //         title: data.titles.name,
      //         info: "",
      //         image: image,
      //         style: "",
      //       };
      //     })
      //   );
      // });
    });
  };

  myVal.get.dataTrueIptv = () => {
    return new Promise((resolve, reject) => {
      const types = {
        4: "pelicula",
        5: "serie",
        6: "live",
      };

      const gender = $elements.selectGender.value;
      const type = $elements["form-filter-type"].key.value;

      const length = $elements.itemTrue.querySelectorAll("[data-item]").length;

      const encodeQueryString = mrf.encodeQueryObject({
        route: types[type],
        category: gender,
        start: length,
        end: 50,
      });

      fetch(`https://api.vniox.com/iptv/api.php?${encodeQueryString}`)
        .then((res) => res.json())
        .then((data) => {
          resolve(Array.isArray(data) ? data : []);
        });
    });
  };

  /** SET */
  myVal.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      const type = $elements["form-filter-type"].key.value;

      const types = {
        1: myVal.get.dataTrueAnime,
        2: myVal.get.dataTruePelicula,
        3: myVal.get.dataTrueSerie,
        4: myVal.get.dataTrueIptv,
        5: myVal.get.dataTrueIptv,
        6: myVal.get.dataTrueIptv,
      };

      if (typeof types[type] == "function") {
        types[type]().then(resolve);
      }
    });
  };

  myVal.set.dataTrue = (array) => {
    const type = $elements["form-filter-type"].key.value;
    const gender = $elements.selectGender.value;

    myVal.values.activeIntersectionObserver = ((type) => {
      if (type == 1) {
        return array.length == 24 && !["-1", "-2"].includes(gender);
      }

      if (type == 2 || type == 3) {
        return array.length == 20;
      }

      return false;
    })(type);

    myVal.set.dataTrueBase(array);
    myVal.signals.dataNull.value = true;
    myVal.signals.dataNull.value = false;
  };

  myVal.set.dataTrueBase = (array) => {
    $elements.itemTrue.append(
      ...array.map((data) => {
        const child = itemData({
          href: data.href,
          title: data.title,
          info: data.info,
          style: data.style,
          imgSrc: data.image,
          intersectionObserver: true,
        });

        myVal.values.observes.push(child);

        return child;
      })
    );

    $elements.itemTrueLoad.remove();

    if (myVal.values.activeIntersectionObserver) {
      $elements.itemTrue.append($elements.itemTrueLoad);
      myApp.instances.IntersectionObserver.observe($elements.itemTrueLoad);
    }
  };

  $element.addEventListener("_unmounting", () => {
    myVal.values.scrollTop = $elements.itemTrue.parentElement.scrollTop;
  });

  $element.addEventListener("_mounted", () => {
    $elements.itemTrue.parentElement.scrollTop = myVal.values.scrollTop;
  });

  $element.addEventListener(
    "_mounting",
    () => {
      myVal.get.dataTrue().then(myVal.set.dataTrue);
    },
    { once: true }
  );

  // $elements.itemTrueLoad.remove();
  return $element;
};

var searchType = () => {
  if (!localStorage.getItem("search_history")) {
    localStorage.setItem("search_history", "[]");
  }

  const mrc = window.MyResourceClass;
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;
  const myVal = {
    params: myApp.routes.params(),
    signals: {
      dataNull: mrf.observeValue(true),
      dataTrue: mrf.observeValue([]),
    },
    function: {
      dataLoad: () => {},
    },
    functions: {},
  };

  const $element = mrf.createNodeElement(`

        <div class="div_Xu02Xjh">

            <header class="header_K0hs3I0 header_4scHSOs">
        
                <a 
                  class="a_t8K3Qpd" 
                  href="#/">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-angle-left"><path d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z"></path></svg>
                </a>
                <form id="form" class="form_r7mvBNn" autocomplete="off" >
                    <input 
                      type="search" 
                      name="search" 
                      value="${mrc.EncodeTemplateString.toInput(
                        decodeURIComponent(myApp.routes.params("result") || "")
                      )}" 
                      placeholder="buscar">
                    <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-arrow-right"><path d="M23.12,9.91,19.25,6a1,1,0,0,0-1.42,0h0a1,1,0,0,0,0,1.41L21.39,11H1a1,1,0,0,0-1,1H0a1,1,0,0,0,1,1H21.45l-3.62,3.61a1,1,0,0,0,0,1.42h0a1,1,0,0,0,1.42,0l3.87-3.88A3,3,0,0,0,23.12,9.91Z"></path></svg></button>
                </form>

            </header>
            <div class="div_IsTCHpN" style="padding:10px">
                <div id="itemNull" class="loader-i" style="--color:var(--app-color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${svg("fi fi-rr-search-alt")}
                    <h3></h3>
                </div>
                <div id="itemTrue" class="div_C2otGmQ"></div>
            </div>

        </div>

    `);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myVal.signals.dataNull.observe((boolean) => {
    const dataItem = $elements.itemTrue.querySelector("[data-item]");

    const render = {
      itemNull: boolean,
      itemFalse: !boolean && !dataItem,
      itemTrue: !boolean && !!dataItem,
    };

    Object.entries(render).forEach((entries) => {
      $elements[entries[0]].style.display = entries[1] ? "" : "none";
    });
  });

  myVal.signals.dataTrue.observe((array) => {
    $elements.itemTrue.innerHTML = array
      .map((data) => {
        const search = encodeURIComponent(data.search);
        return `
        <div class="div_ywmleK1" data-item>
            <button
              class="button_YqF7ZuC"
              data-id="${data.id}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-cross-small"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"></path></svg>
            </button>
            <a
            class="a_UrjAwYX"
            href="#/search/${search}/result">
                <div class="div_9OWid2W">
                    <p>${data.search}</p>
                    <span>${new Date(data.id).toLocaleString()}</span>
                </div>
                ${svg("fi fi-rr-angle-small-right")}
            </a>
        </div>
      `;
      })
      .join("");
  });

  myVal.functions.dataTrue = () => {
    myVal.signals.dataNull.value = true;
    myVal.signals.dataTrue.value = JSON.parse(
      localStorage.getItem("search_history")
    );
    myVal.signals.dataNull.value = false;
  };

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    location.hash = `/search/${encodeURIComponent(
      $elements.form.search.value.trim()
    )}/result`;

    const array = JSON.parse(localStorage.getItem("search_history"));

    if (
      !array.some((data) => data.search == $elements.form.search.value.trim())
    ) {
      array.push({
        id: Date.now(),
        search: $elements.form.search.value.trim(),
      });
    }

    localStorage.setItem("search_history", JSON.stringify(array));
  });

  $elements.itemTrue.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      const id = button.getAttribute("data-id");

      const array = JSON.parse(localStorage.getItem("search_history"));
      localStorage.setItem(
        "search_history",
        JSON.stringify(
          array.filter(
            (data) => data.id != id && data.type != myVal.params.type
          )
        )
      );

      button.closest("[data-item]").remove();
    }
  });

  myVal.functions.dataTrue();
  setTimeout(() => {
    $elements.form.search.focus();
  });

  return $element;
};

var searchTypeResult = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;
  const myVal = {
    params: myApp.routes.params(),
    signals: {
      dataNull: mrf.observeValue(true),
      dataTrue: mrf.observeValue([]),
      dataTrueGender: mrf.observeValue([
        { value: "", string: "Todos" },
        { value: "-1", string: "Ultimos episodios" },
        { value: "-2", string: "Ultimos animes" },
        ...gendersAnime.map((string) => {
          return {
            value: string.split(" ").join("-").toLocaleLowerCase(),
            string,
          };
        }),
      ]),
    },
    values: {
      observes: [],
      activeIntersectionObserver: false,
      scrollTop: 0,
    },
    function: {
      dataLoad: () => {},
    },
    functions: {},

    get: {},
    set: {},
  };

  const $element = mrf.createNodeElement(/*html*/ `
      <div class="div_Xu02Xjh">

        <header class="header_LOF628f">

            <a id="anchorHref" href="#/search" class="a_33g9UEa">
              <small class="small_rppYggX">
                ${svg("fi fi-rr-search")}
              </small>
              <h4 id="textSearch"></h4>
            </a>

        </header>


        <div class="div_BIchAsC">

            <form class="app-form-label-checkbox" id="form-filter-type" name="form-filter-type">
              <label>
                <input type="radio" name="key" value="1" checked>
                <span>Animes</span>
              </label>
              <label>
                <input type="radio" name="key" value="2">
                <span>Peliculas</span>
              </label>
              <label>
                <input type="radio" name="key" value="3">
                <span>Series</span>
              </label>
              <label style="display:none">
                <input type="radio" name="key" value="4">
                <span>Peliculas II</span>
              </label>
              <label style="display:none">
                <input type="radio" name="key" value="5">
                <span>Series II</span>
              </label>
              <label style="display:none">
                <input type="radio" name="key" value="6">
                <span>Canales</span>
              </label>
            </form>
              
        </div>
    
        <div class="div_IsTCHpN">
            <div id="itemNull" class="loader-i" style="--color:var(--app-color-letter)"></div>
            <div id="itemFalse" class="div_b14S3dH" style="display:none">
                ${svg("fi fi-rr-search-alt")}
                <h3>sin resultados</h3>
            </div>
            <div id="itemTrue" class="div_qsNmfP3" style="display:none">
                <div id="itemTrueLoad" class="div_Qm4cPUn">
                    <div class="loader-i" style="--color:var(--app-color-letter)"></div>
                </div>
            </div>
        </div>

      </div>

    `);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myApp.events(
    $elements.itemTrueLoad,
    "_IntersectionObserver",
    ({ detail }) => {
      if (detail.entry.isIntersecting) {
        detail.observer.unobserve(detail.entry.target);
        myVal.get.dataTrue().then(myVal.set.dataTrue);
      }
    }
  );

  myApp.events($elements.selectGender, "change", () => {
    $elements.itemTrue.innerHTML = "";
    myVal.signals.dataNull.value = true;
    $elements.genderText.textContent =
      $elements.selectGender.selectedOptions[0].innerText;
    myVal.get.dataTrue().then(myVal.set.dataTrue);
  });

  myApp.events($elements["form-filter-type"], "change", () => {
    $elements.itemTrue.innerHTML = "";
    myVal.signals.dataNull.value = true;

    myVal.get.dataTrue().then(myVal.set.dataTrue);
  });

  myApp.events($elements.itemTrue, "click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      const data = JSON.parse(button.getAttribute("data-data"));
      Android.openWithDefault(
        `${myApp.iptv.server}/live/${myApp.iptv.username}/${myApp.iptv.password}/${data.stream_id}.m3u8`,
        "video/*"
      );
    }
  });

  myVal.signals.dataNull.observe((boolean) => {
    const dataItem = Boolean($elements.itemTrue.querySelector("[data-item]"));

    const render = {
      itemNull: boolean,
      itemFalse: !boolean && !dataItem,
      itemTrue: !boolean && dataItem,
    };

    Object.entries(render).forEach((entries) => {
      $elements[entries[0]].style.display = entries[1] ? "" : "none";
    });
  });

  /** GET */
  myVal.get.dataTrueAnime = () => {
    return new Promise((resolve, reject) => {
      const page =
        Math.floor(
          $elements.itemTrue.querySelectorAll("[data-item]").length / 24
        ) + 1;

      ApiWebAnimeflv.search({
        page,
        search: decodeURIComponent(myVal.params.result),
      }).then((array) => {
        resolve(
          array.map((data) => {
            return {
              href: `#/anime/${data.identifier}`,
              title: data.title,
              info: data.type,
              image: data.poster,
              style: "",
            };
          })
        );
      });
    });
  };

  myVal.get.dataTruePelicula = () => {
    return new Promise((resolve, reject) => {
      const page =
        Math.floor(
          $elements.itemTrue.querySelectorAll("[data-item]").length / 20
        ) + 1;

      // const gender = $elements.selectGender.value;

      const queries = mrf.encodeQueryObject({
        api_key: "ec4ff1b6182572d3e74735e74ca3a8ef",
        language: "es-ES",
        include_adult: "false",
        query: myVal.params.result,
        page,
      });

      fetch(`https://api.themoviedb.org/3/search/movie?${queries}`)
        .then((res) => res.json())
        .then((json) => {
          resolve(
            json.results.map((data) => {
              const image = `https://image.tmdb.org/t/p/w185${data.poster_path}`;
              const type = "pelicula";

              return {
                href: `#/${type}/${data.id}`,
                title: data.title,
                info: "",
                image: image,
                style: "",
              };
            })
          );
        });

      // ApiWebCuevana.search(decodeURIComponent(myVal.params.result)).then(
      //   (datas) => {
      //     const array = datas?.props?.pageProps?.movies || [];

      //     resolve(
      //       array.map((data) => {
      //         const image = data.images.poster
      //           ? data.images.poster.replace("/original/", "/w185/")
      //           : "";

      //         const type = data.url.slug.startsWith("movies/")
      //           ? "pelicula"
      //           : "serie";

      //         return {
      //           href: `#/${type}/${data.TMDbId}`,
      //           title: data.titles.name,
      //           info: type,
      //           image: image,
      //           style: "",
      //         };
      //       })
      //     );
      //   }
      // );
    });
  };

  myVal.get.dataTrueSerie = () => {
    return new Promise((resolve, reject) => {
      const page =
        Math.floor(
          $elements.itemTrue.querySelectorAll("[data-item]").length / 20
        ) + 1;

      const queries = mrf.encodeQueryObject({
        api_key: "ec4ff1b6182572d3e74735e74ca3a8ef",
        language: "es-ES",
        include_adult: "false",
        query: myVal.params.result,
        page,
      });

      fetch(`https://api.themoviedb.org/3/search/tv?${queries}`)
        .then((res) => res.json())
        .then((json) => {
          resolve(
            json.results.map((data) => {
              const image = `https://image.tmdb.org/t/p/w185${data.poster_path}`;
              const type = "serie";

              return {
                href: `#/${type}/${data.id}`,
                title: data.name,
                info: "",
                image: image,
                style: "",
              };
            })
          );
        });
    });
  };

  myVal.get.dataTrueIptv = () => {
    return new Promise((resolve, reject) => {
      const types = {
        4: "pelicula",
        5: "serie",
        6: "live",
      };

      // const gender = $elements.selectGender.value;
      const type = types[$elements["form-filter-type"].key.value];

      const length = $elements.itemTrue.querySelectorAll("[data-item]").length;

      const encodeQueryString = mrf.encodeQueryObject({
        route: type,
        search: decodeURIComponent(myVal.params.result),
        start: length,
        end: 50,
      });

      fetch(`https://api.vniox.com/iptv/api.php?${encodeQueryString}`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data ?? []);
        });
    });
  };

  /** SET */

  myVal.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      const type = $elements["form-filter-type"].key.value;

      const types = {
        1: myVal.get.dataTrueAnime,
        2: myVal.get.dataTruePelicula,
        3: myVal.get.dataTrueSerie,
        4: myVal.get.dataTrueIptv,
        5: myVal.get.dataTrueIptv,
        6: myVal.get.dataTrueIptv,
      };

      types?.[type]?.()?.then(resolve);
    });
  };

  myVal.set.dataTrue = (array) => {
    const type = $elements["form-filter-type"].key.value;
    // myVal.values.activeIntersectionObserver = type == 1 && array.length == 24;
    // console.log(myVal.values.activeIntersectionObserver);

    myVal.values.activeIntersectionObserver = ((type) => {
      if (type == 1) {
        return array.length == 24 && !["-1", "-2"].includes(gender);
      }

      if (type == 2 || type == 3) {
        return array.length == 20;
      }

      return false;
    })(type);

    myVal.set.dataTrueBase(array);
    myVal.signals.dataNull.value = true;
    myVal.signals.dataNull.value = false;
  };

  myVal.set.dataTrueBase = (array) => {
    $elements.itemTrue.append(
      ...array.map((data) => {
        const child = itemData({
          href: data.href,
          title: data.title,
          info: data.info,
          style: data.style,
          imgSrc: data.image,
          intersectionObserver: true,
        });

        myVal.values.observes.push(child);

        return child;
      })
    );

    $elements.itemTrueLoad.remove();

    if (myVal.values.activeIntersectionObserver) {
      $elements.itemTrue.append($elements.itemTrueLoad);
      myApp.instances.IntersectionObserver.observe($elements.itemTrueLoad);
    }
  };

  $element.addEventListener("_unmounting", () => {
    myVal.values.scrollTop = $elements.itemTrue.parentElement.scrollTop;
  });

  $element.addEventListener("_mounted", () => {
    $elements.itemTrue.parentElement.scrollTop = myVal.values.scrollTop;
  });

  $element.addEventListener("_mounting", () => {
    const params = myApp.routes.params();

    if (params.result != myVal.params.result) {
      myVal.params = params;

      $elements.anchorHref.href = ["#", "search", myVal.params.result].join(
        "/"
      );

      $elements.textSearch.textContent = decodeURIComponent(
        myVal.params.result
      );

      $elements.itemTrue.innerHTML = "";
      myVal.signals.dataNull.value = true;

      myVal.get.dataTrue().then(myVal.set.dataTrue);
    }
  });

  return $element;
};

// import gendersAnime from "../data/gendersAnime";
// import gendersPelicula from "../data/gendersPelicula";

var collection = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;
  const myVal = {
    params: myApp.routes.params(),

    signals: {
      dataNull: mrf.observeValue(true),
      dataTrue: mrf.observeValue([]),
      dataTrueGender: mrf.observeValue([
        { value: "1", string: "Favoritos" },
        { value: "2", string: "Vistos" },
      ]),
    },
    values: {
      observes: [],
      types: {
        1: "favorites",
        2: "views",
        3: "history",
      },
      activeIntersectionObserver: false,
      scrollTop: 0,
    },
    function: {
      dataLoad: () => {},
    },
    functions: {},

    get: {},
    set: {},
  };

  const $element = mrf.createNodeElement(
    ((_) => `

      <div class="div_Xu02Xjh">

        <header class="header_K0hs3I0">

            <div class="div_uNg74XS">
              <div class="div_sZZicpN">
                <h3 id="h3Title">Coleccion</h3>
                <span id="genderText">todos</span>
              </div>
            </div>

            <div class="div_x0cH0Hq">
              <a href="#/historial" class="button_lvV6qZu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-time-past"><path d="M12,0A11.972,11.972,0,0,0,4,3.073V1A1,1,0,0,0,2,1V4A3,3,0,0,0,5,7H8A1,1,0,0,0,8,5H5a.854.854,0,0,1-.1-.021A9.987,9.987,0,1,1,2,12a1,1,0,0,0-2,0A12,12,0,1,0,12,0Z"></path><path d="M12,6a1,1,0,0,0-1,1v5a1,1,0,0,0,.293.707l3,3a1,1,0,0,0,1.414-1.414L13,11.586V7A1,1,0,0,0,12,6Z"></path></svg>
              </a>
              <div class="div_klylpyg">
                <small>
                  ${svg("fi fi-rr-filter")}
                </small>
                <select id="selectGender">
                  <option selected>Todos</option>
                </select>
              </div>
            </div>

        </header>


        <div class="div_BIchAsC">

            <form class="app-form-label-checkbox" id="form-filter-type" name="form-filter-type">
              <label>
                <input type="radio" name="key" value="1" checked>
                <span>Animes</span>
              </label>
              <label>
                <input type="radio" name="key" value="2">
                <span>peliculas</span>
              </label>
              <label>
                <input type="radio" name="key" value="3">
                <span>Series</span>
              </label>
            </form>
              
        </div>
    
        <div class="div_IsTCHpN">
            <div id="itemNull" class="loader-i" style="--color:var(--app-color-letter)"></div>
            <div id="itemFalse" class="div_b14S3dH" style="display:none">
                ${svg("fi fi-rr-search-alt")}
                <h3>sin resultados</h3>
            </div>
            <div id="itemTrue" class="div_qsNmfP3" style="display:none">
                <div id="itemTrueLoad" class="div_Qm4cPUn">
                    <div class="loader-i" style="--color:var(--app-color-letter)"></div>
                </div>
            </div>
        </div>

      </div>

  `)({
      href: ["#", "search", myVal.params.type, myVal.params.result].join("/"),
      title: "Inicio" ,
      description: myVal.params.type,
      hidden: "display:none",
    })
  );

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myApp.events(
    $elements.itemTrueLoad,
    "_IntersectionObserver",
    ({ detail }) => {
      if (detail.entry.isIntersecting) {
        detail.observer.unobserve(detail.entry.target);
        myVal.get.dataTrue().then(myVal.set.dataTrue);
      }
    }
  );

  myApp.events($elements.selectGender, "change", () => {
    $elements.itemTrue.innerHTML = "";
    myVal.signals.dataNull.value = true;

    $elements.genderText.textContent =
      $elements.selectGender.selectedOptions[0].innerText;

    myVal.get.dataTrue().then(myVal.set.dataTrue);
  });

  myApp.events($elements["form-filter-type"], "change", () => {
    $elements.itemTrue.innerHTML = "";
    myVal.signals.dataNull.value = true;

    myVal.get.dataTrue().then(myVal.set.dataTrue);
  });

  myVal.signals.dataNull.observe((load) => {
    const dataItem = Boolean($elements.itemTrue.querySelector("[data-item]"));

    const render = {
      itemNull: load,
      itemFalse: !load && !dataItem,
      itemTrue: !load && dataItem,
    };

    Object.entries(render).forEach((entries) => {
      $elements[entries[0]].style.display = entries[1] ? "" : "none";
    });
  });

  myVal.signals.dataTrueGender.observe((array) => {
    $elements.selectGender.innerHTML = array
      .map((object) => {
        return `<option value="${object.value}">${object.string}</option>`;
      })
      .join("");

    $elements.genderText.textContent =
      $elements.selectGender.selectedOptions[0].innerText;
  });

  myVal.get.dataTrue = () => {
    return new Promise((resolve) => {
      const type = $elements["form-filter-type"].key.value;

      const encodeQueryString = mrf.encodeQueryObject({
        route: "favorites",
        type: type,
        start: $elements.itemTrue.querySelectorAll("[data-item]").length,
        end: 30,
        id_collection: $elements.selectGender.value,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      )
        .then((res) => res.json())
        .then((data) => {
          resolve(
            Array.isArray(data)
              ? data.map((_) => {
                  const data = JSON.parse(_.data_json);

                  if (type == 1) {
                    return {
                      href: `#/anime/${data.identifier}`,
                      title: data.title,
                      info: data.type,
                      image: data.poster,
                      style: "",
                    };
                  }

                  const image = data.images.poster
                    ? data.images.poster.replace("/original/", "/w185/")
                    : "";

                  const type_ = data.url.slug.startsWith("movies/")
                    ? "pelicula"
                    : "serie";

                  return {
                    href: `#/${type_}/${data.TMDbId}`,
                    title: data.titles.name,
                    info: "",
                    image: image,
                    style: "",
                  };
                })
              : []
          );
        });
    });
  };

  myVal.set.dataTrue = (array) => {
    myVal.values.activeIntersectionObserver = array.length == 30;

    myVal.set.dataTrueBase(array);
    myVal.signals.dataNull.value = true;
    myVal.signals.dataNull.value = false;
  };

  myVal.set.dataTrueBase = (array) => {
    $elements.itemTrue.append(
      ...array.map((data) => {
        const child = itemData({
          href: data.href,
          title: data.title,
          info: data.info,
          style: data.style,
          imgSrc: data.image,
          intersectionObserver: true,
        });

        myVal.values.observes.push(child);

        return child;
      })
    );

    $elements.itemTrueLoad.remove();

    if (myVal.values.activeIntersectionObserver) {
      $elements.itemTrue.append($elements.itemTrueLoad);
      myApp.instances.IntersectionObserver.observe($elements.itemTrueLoad);
    }
  };

  $element.addEventListener("_unmounting", () => {
    myVal.values.scrollTop = $elements.itemTrue.parentElement.scrollTop;
  });

  $element.addEventListener("_mounted", () => {
    $elements.itemTrue.parentElement.scrollTop = myVal.values.scrollTop;
  });

  $element.addEventListener(
    "_mounting",
    () => {
      myVal.get.dataTrue().then(myVal.set.dataTrue);
    },
    { once: true }
  );

  return $element;
};

var historial = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;
  const myVal = {
    params: myApp.routes.params(),
    signals: {
      dataNull: mrf.observeValue(true),
      dataTrue: mrf.observeValue([]),
    },
    values: {
      observes: [],
      dates: {},
    },
    functions: {},

    get: {},
    set: {},

    fragment: (...childNodes) => {
      const fragment = document.createDocumentFragment();

      fragment.append(...childNodes);

      return fragment;
    },
  };

  const $element = mrf.createNodeElement(`

        <div class="div_Xu02Xjh">

            <header class="header_K0hs3I0">
 
                <div class="div_uNg74XS div_McPrYGP">
                    <a href="#/collection" class="button_lvV6qZu">
                      ${svg("fi fi-rr-angle-small-left")}
                    </a>
                    <div class="div_sZZicpN">  
                        <h3>Historial</h3>
                        <span style="display:none">${myVal.params.type}</span>
                    </div>
                </div>

            </header>

            <div class="div_BIchAsC">

                <form class="app-form-label-checkbox" id="form-filter-type" name="form-filter-type">
                  <label>
                    <input type="radio" name="key" value="1" checked>
                    <span>Animes</span>
                  </label>
                  <label>
                    <input type="radio" name="key" value="2">
                    <span>peliculas</span>
                  </label>
                  <label>
                    <input type="radio" name="key" value="3">
                    <span>Series</span>
                  </label>
                </form>
                  
            </div>

            <div class="div_BIchAsC" style="display:none">
                <div id="buttonsFocus" data-gender="Todos" class="div_O73RBqH">

                    ${Object.entries({
                      anime: "Animes",
                      pelicula: "peliculas",
                      serie: "series",
                    })
                      .map((entries, index) => {
                        return `
                        <button 
                          data-gender="${entries[0]}" 
                          class="${index == 0 ? "focus" : ""}">
                        ${entries[1]}
                        </button>`;
                      })
                      .join("")}
                </div>
            </div>
        
            <div class="div_IsTCHpN">
                <div id="itemNull" class="loader-i" style="--color:var(--app-color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH" style="display:none">
                  ${svg("fi fi-rr-search-alt")}
                  <h3>sin resultados</h3>
                </div>

                <div id="itemTrue" class="div_qsNmfP3" style="display:none">
                    <div id="itemTrueLoad" class="div_Qm4cPUn">
                        <div class="loader-i" style="--color:var(--app-color-letter)"></div>
                    </div>
                </div>
                
            </div>

        </div>

  `);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myVal.functions.unobserve = () => {
    for (const observe of myVal.values.observes) {
      myApp.instances.IntersectionObserver.unobserve(observe);
    }

    myVal.values.observes = [];
  };

  myVal.set.dataTrueAnime = (array) => {
    $elements.itemTrue.append(
      ...array.map((data, index, array) => {
        const date = new Date(data.other.datetime);
        const datePrevious =
          index != 0
            ? date.toLocaleDateString() !=
              new Date(array[index - 1].other.datetime).toLocaleDateString()
            : true;

        const url = data.poster;
        const episode = `E${data.other.episode.padStart(2, "0")}`;
        const aspectRatio = data.episode ? "aspect-ratio:3/2" : "";

        const child = itemData({
          href: `#/anime/${data.identifier}`,
          title: data.title,
          info: `${data.type ?? ""} | ${episode}`,
          style: aspectRatio,
          imgSrc: url,
          intersectionObserver: true,
        });

        myVal.values.observes.push(child);

        return myVal.fragment(
          datePrevious
            ? mrf.createNodeElement(`
          <h3 style="grid-column: 1 / -1; padding: 10px">
            ${date.toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h3>  
        `)
            : "",
          child
        );
      })
    );

    $elements.itemTrueLoad.remove();

    if (array.length == 25) {
      $elements.itemTrue.append($elements.itemTrueLoad);
      myApp.instances.IntersectionObserver.observe($elements.itemTrueLoad);
    }
  };

  myVal.set.dataTruePeliculaSerie = (array) => {
    $elements["form-filter-type"].key.value;

    $elements.itemTrue.append(
      ...array.map((data, index, array) => {
        if (data.images.poster == null) return "";

        const date = new Date(data.other.datetime);
        const datePrevious =
          index != 0
            ? date.toLocaleDateString() !=
              new Date(array[index - 1].other.datetime).toLocaleDateString()
            : true;

        const url = data.images.poster.replace("/original/", "/w185/");
        const type = data.url.slug.startsWith("movies/") ? "pelicula" : "serie";

        const [season, episode] = data.other.episode.split("-").concat("1-1");
        const info =
          type == "pelicula"
            ? ""
            : `
          T${season.padStart(2, "0")}
          E${episode.padStart(2, "0")}
        `;

        const child = itemData({
          href: `#/${type}/${data.TMDbId}`,
          title: data.titles.name,
          info: info,
          style: "",
          imgSrc: url,
          intersectionObserver: true,
        });

        myVal.values.observes.push(child);

        return myVal.fragment(
          datePrevious
            ? mrf.createNodeElement(`
          <h3 style="grid-column: 1 / -1; padding: 10px">
            ${date.toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h3>  
        `)
            : "",
          child
        );
      })
    );

    $elements.itemTrueLoad.remove();

    if (array.length == 25) {
      $elements.itemTrue.append($elements.itemTrueLoad);
      myApp.instances.IntersectionObserver.observe($elements.itemTrueLoad);
    }
  };

  myVal.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      const type = $elements["form-filter-type"].key.value;

      const encodeQueryString = mrf.encodeQueryObject({
        route: "history",
        type: type,
        start: $elements.itemTrue.querySelectorAll("[data-item]").length,
        end: 25,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      )
        .then((res) => res.json())
        .then((data) => {
          resolve(
            Array.isArray(data)
              ? data.map((data) => {
                  return {
                    ...JSON.parse(data.data_json),
                    other: {
                      episode: data.episode,
                      datetime: data.datetime,
                    },
                  };
                })
              : []
          );
        });
    });
  };

  myVal.set.dataTrue = (array) => {
    try {
      const type = $elements["form-filter-type"].key.value;

      const types = {
        1: myVal.set.dataTrueAnime,
        2: myVal.set.dataTruePeliculaSerie,
        3: myVal.set.dataTruePeliculaSerie,
      };

      types?.[type]?.(array);

      myVal.signals.dataNull.value = true;
      myVal.signals.dataNull.value = false;
    } catch (error) {
      alert(error.message);
    }
  };

  myVal.signals.dataNull.observe((boolean) => {
    const dataItem = Boolean($elements.itemTrue.querySelector("[data-item]"));

    const render = {
      itemNull: boolean,
      itemFalse: !boolean && !dataItem,
      itemTrue: !boolean && dataItem,
    };

    Object.entries(render).forEach(([key, value]) => {
      $elements[key].style.display = value ? "" : "none";
    });
  });

  myApp.events(
    $elements.itemTrueLoad,
    "_IntersectionObserver",
    ({ detail }) => {
      if (detail.entry.isIntersecting) {
        detail.observer.unobserve(detail.entry.target);
        myVal.get.dataTrue().then(myVal.set.dataTrue);
      }
    }
  );

  myApp.events($elements["form-filter-type"], "change", () => {
    $elements.itemTrue.innerHTML = "";
    myVal.signals.dataNull.value = true;

    myVal.get.dataTrue().then(myVal.set.dataTrue);
  });

  addEventListener(
    "hashchange",
    () => {
      myVal.functions.unobserve();
    },
    { once: true }
  );

  myVal.get.dataTrue().then(myVal.set.dataTrue);

  return $element;
};

var login = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;

  const $element = mrf.createNodeElement(`

    <div class="div_Xu02Xjh" style="position:fixed">

        <header class="header_K0hs3I0">

            <div class="div_uNg74XS">
                <a href="#/setting" class="button_lvV6qZu" data-history-back>
                  ${svg("fi fi-rr-angle-small-left")}
                </a>
                <h3 id="textTitle"></h3>
            </div>

        </header>

        <div class="div_IsTCHpN p-10px">
             
          <form id="form" class="div_SCqCUTo" autocomplete="off">
              <h2 style="padding: 0 20px;">Iniciar sesion</h2>
              <div class="div_Y85zRC0">
                  <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                      <input type="text" name="email" placeholder="">
                      <span>Correo</span>
                  </label>
                  <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                      <input type="password" name="password" placeholder="">
                      <span>Contraseña</span>
                  </label>
              </div>
              <a href="#/password-recover" class="a_c305F1l">¿Has olvidado tu contraseña?</a>
              <button id="buttonSubmit" class="button_WU25psx">
                  <span id="spanLoad">Ingresar</span>
                  ${svg("fi fi-rr-arrow-right")}
              </button>
              <a href="#/register" class="a_8hzaMUg">
                  <span>registro</span>
                  ${svg("fi fi-rr-arrow-right")}
              </a>
          </form>

        </div>

        <div id="loaderVideo" class="div_uzuovb5" style="display:none">
        
          <div class="div_x8birmo">
            <div class="loader-i" style="--color:var(--app-color-letter)"></div>
            <span>cargando...</span>
          </div>

        </div>

    </div>

`);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const body = {
      email: $elements.form.email.value.trim(),
      password: $elements.form.password.value.trim(),
    };

    // return alert(JSON.stringify(body));

    fetch(myApp.url.server("/api.php?route=auth.login"), {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Boolean(data?.status)) {
          alert(data?.message ?? "Intentelo nuevamente");
          return;
        }

        localStorage.setItem(myApp.ta, data.token);
        location.hash = "/";
      });
  });

  // myApp.functions.historyBack($element.querySelector("[data-history-back]"));
  return $element;
};

var register = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;

  const $element = mrf.createNodeElement(`

    <div class="div_Xu02Xjh" style="position:fixed">

        <header class="header_K0hs3I0">

            <div class="div_uNg74XS">
                <a href="#/setting" class="button_lvV6qZu">
                  ${svg("fi fi-rr-angle-small-left")}
                </a>
                <h3 id="textTitle"></h3>
            </div>

        </header>

        <div class="div_IsTCHpN p-10px">
             
          <form id="form" class="div_SCqCUTo" autocomplete="off">
              <h2 style="padding: 0 20px;">Registro</h2>
              <div class="div_Y85zRC0">
                  <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                      <input type="text" name="fullname" placeholder="">
                      <span>Nombre</span>
                  </label>
                  <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                      <input type="text" name="lastname" placeholder="" autocomplete="off">
                      <span>Apellido</span>
                  </label>
                  <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                      <input type="text" name="email" placeholder="" autocomplete="off">
                      <span>Correo</span>
                  </label>
                  <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                      <input type="password" name="password" placeholder="">
                      <span>Contraseña</span>
                  </label>
              </div>
              <button class="button_WU25psx">
                  <span id="spanLoad">Crear cuenta</span>
                  ${svg("fi fi-rr-arrow-right")}
              </button>
              <a href="#/login" class="a_8hzaMUg">
                  <span>Iniciar sesion</span>
                  ${svg("fi fi-rr-arrow-right")}
              </a>
          </form>

        </div>

    </div>

`);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const body = {
      fullname: $elements.form.fullname.value.trim(),
      lastname: $elements.form.lastname.value.trim(),
      email: $elements.form.email.value.trim(),
      password: $elements.form.password.value.trim(),
    };

    fetch(myApp.url.server("/api.php?route=auth.register"), {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!Boolean(data?.status)) {
          alert(data?.message ?? "Intentelo nuevamente");
          return;
        }

        localStorage.setItem(myApp.ta, data.token);
        location.hash = "/";
      });
  });

  return $element;
};

var profile = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;

  const $element = mrf.createNodeElement(`

        <div class="div_Xu02Xjh">

            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/setting" class="button_lvV6qZu">
                      ${svg("fi fi-rr-angle-small-left")}
                    </a>
                    <h3 id="textTitle">Actualizar datos</h3>
                </div>

            </header>

            <div class="div_IsTCHpN p-10px">
                 
              <form id="form" class="div_SCqCUTo" autocomplete="off">
                  <h2 style="padding: 0 20px;">Actualizar datos</h2>
                  <div class="div_Y85zRC0">
                      <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                          <input type="text" name="fullname" placeholder="" autocomplete="off">
                          <span>nombre</span>
                      </label>
                      <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                          <input type="text" name="lastname" placeholder="" autocomplete="off">
                          <span>apellido</span>
                      </label>
                  </div>
                  <button class="button_WU25psx">
                      <span id="spanLoad">Actualizar datos</span>
                      ${svg("fi fi-rr-arrow-right")}
                  </button>
                  <a href="#/register" id="aLogout" class="a_8hzaMUg">
                      <span>Cerrar sesion</span>
                      ${svg("fi fi-rr-arrow-right")}
                  </a>
              </form>

            </div>

        </div>

    `);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const encodeQueryString = mrf.encodeQueryObject({
      route: "user",
    });

    const body = {
      fullname: $elements.form.fullname.value.trim(),
      lsatname: $elements.form.lastname.value.trim(),
    };

    fetch(
      myApp.url.server(`/api.php?${encodeQueryString}`),
      myApp.fetchOptions({
        method: "PATCH",
        body: JSON.stringify(body),
      })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) alert("Datos actualizados");
        else alert("Ocurrio un error");
      });
  });

  fetch(
    myApp.url.server(`/api.php?route=user`),
    myApp.fetchOptions({
      method: "GET",
    })
  )
    .then((res) => res.json())
    .then((data) => {
      $elements.form.fullname.value = data?.fullname || "";
      $elements.form.lastname.value = data?.lastname || "";
    });

  $elements.aLogout.addEventListener("click", (e) => {
    e.preventDefault();

    if (confirm("¿Cerrar session?")) {
      const encodeQueryString = mrf.encodeQueryObject({
        route: "auth.logout",
        id: "one",
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "POST",
        })
      )
        .then((res) => res.json())
        .then((res) => {
          if (res?.status) {
            location.hash = "/login";
          }
        });
    }
  });

  return $element;
};

var theme = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;
  const myVal = {
    instances: {
      // abortController: new AbortController(),
    },
    values: {
      // themeCustom: mrf.callbackTryCatch(
      //   () => JSON.parse(localStorage.getItem("theme-custom")),
      //   {}
      // ),
    },
    functions: {},
    themes: {
      dark: {
        "--app-color-background": "#000000",
        "--app-color-background-second": "#000000",
        "--app-color-background-ii": "#000000",
        "--app-color-background-transparent": "rgb(255 255 255 / 0.1)",
        "--app-color-letter": "#ffffff",
        "--app-color-letter-second": "#ffffff",
        "--app-color-letter-ii": "#ffffff",
        "--app-color-item": "#1A1A1A",
        "--app-color-item-second": "#1A1A1A",
        "--app-color-item-ii": "#1A1A1A",
        "--app-color-item-third": "#1A1A1A",
        "--app-color-item-iii": "#1A1A1A",
      },
      light: {
        "--app-color-background": "#FFFFFF",
        "--app-color-background-second": "#FFFFFF",
        "--app-color-background-ii": "#FFFFFF",
        "--app-color-background-transparent": "rgb(0 0 0 / 0.1)",
        "--app-color-letter": "#000000",
        "--app-color-letter-second": "#ffffff",
        "--app-color-letter-ii": "#ffffff",
        "--app-color-item": "#F7F7F7",
        "--app-color-item-second": "#000000",
        "--app-color-item-ii": "#000000",
        "--app-color-item-third": "#F7F7F7",
        "--app-color-item-iii": "#F7F7F7",
      },
      system: {},
      custom: {},
    },
  };
  const $element = mrf.createNodeElement(`
        <div class="div_Xu02Xjh div_MN7ZWeX">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/setting" class="button_lvV6qZu button_YWxwK2P">
                        ${svg("fi fi-rr-angle-small-left")}
                    </a>
                    <h3 id="textTitle">Tema</h3>
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">
                
                <div class="div_cDfbXwR">
                    <div class="div_0p76jdM">
                        <label class="label_2F1ZTtw">
                            <span>Tema claro</span>
                            <input type="radio" name="name_Dokrc6U2gbEtz29wg2" data-theme="light" checked>
                        </label> 
                    </div>
                    <div class="div_0p76jdM">
                        <label class="label_2F1ZTtw">
                            <span>Tema oscuro</span>
                            <input type="radio" name="name_Dokrc6U2gbEtz29wg2" data-theme="dark">
                        </label> 
                    </div>
                    <div class="div_0p76jdM">
                        <label class="label_2F1ZTtw">
                            <span>Tema sistema</span>
                            <input type="radio" name="name_Dokrc6U2gbEtz29wg2" data-theme="system">
                        </label> 
                    </div>
                    <div class="div_0p76jdM" style="display:none">
                        <label class="label_2F1ZTtw">
                            <span>Tema personalizado</span>
                            <input type="radio" name="name_Dokrc6U2gbEtz29wg2" data-theme="custom">
                        </label>
                        <div class="div_VDMeCmA">
                            <div class="div_QKKEgOu">
                                <label class="label_2F1ZTtw">
                                    <span>color Fondo</span>
                                    <input type="color" data-color-custom="app-color-background">
                                </label>
                                <label class="label_2F1ZTtw">
                                    <span>color Fondo secundario</span>
                                    <input type="color" data-color-custom="app-color-background-second">
                                </label>
                                <label class="label_2F1ZTtw" >
                                    <span>color de items</span>
                                    <input type="color" data-color-custom="app-color-item">
                                </label>
                                <label class="label_2F1ZTtw">
                                    <span>color de items secundario</span>
                                    <input type="color" data-color-custom="app-color-item-second">
                                </label>
                                <label class="label_2F1ZTtw">
                                    <span>color de items tercero</span>
                                    <input type="color" data-color-custom="app-color-item-third">
                                </label>
                                <label class="label_2F1ZTtw">
                                    <span>color de letras</span>
                                    <input type="color" data-color-custom="app-color-letter">
                                </label>
                                <label class="label_2F1ZTtw">
                                    <span>color de letras secundario</span>
                                    <input type="color" data-color-custom="app-color-letter-second">
                                </label>
                            </div>
                        </div> 
                    </div>
                </div>
               
            </div>
        </div>
    `);

  myVal.functions.updateTheme = () => {
    $element.querySelectorAll("[data-theme]").forEach((element) => {
      element.addEventListener("change", () => {
        const theme = ((theme) => {
          if (theme == "light") return myVal.themes.light;
          if (theme == "dark") return myVal.themes.dark;
          if (theme == "system") {
            if (window.matchMedia("(prefers-color-scheme: light)").matches) {
              return myVal.themes.light;
            }

            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
              return myVal.themes.dark;
            }
          }

          return myVal.themes.light;
        })(element.getAttribute("data-theme"));

        Object.entries(theme).forEach((entries) => {
          document.documentElement.style.setProperty(entries[0], entries[1]);
        });

        myApp.elements.meta.color.setAttribute(
          "content",
          theme["--app-color-background"]
        );

        localStorage.setItem("theme", element.getAttribute("data-theme"));

        myApp.callbackIf(window.Android, (Android) => {
          Android.colorSystemBar(theme["--app-color-background"]);
        });
      });

      if (localStorage.getItem("theme") == element.getAttribute("data-theme")) {
        element.checked = true;
        element.dispatchEvent(new CustomEvent("change"));
      }
    });
  };

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      if (localStorage.getItem("theme") == "system") {
        const theme = e.matches ? myVal.themes.light : myVal.themes.dark;

        Object.entries(theme).forEach((entries) => {
          document.documentElement.style.setProperty(entries[0], entries[1]);
        });

        myApp.elements.meta.color.setAttribute(
          "content",
          theme["--app-color-background"]
        );

        Android.colorSystemBar(theme["--app-color-background"]);
      }
    });

  addEventListener("hashchange", myVal.functions.updateTheme);

  myVal.functions.updateTheme();
  //   $element.querySelectorAll("[data-color-custom]").forEach((element) => {
  //     element.value =
  //       myVal.values.themeCustom?.[element.getAttribute("data-color-custom")];
  //     element.addEventListener("change", () => {
  //       const themeCustom = JSON.parse(localStorage.getItem("theme-custom"));
  //       themeCustom[element.getAttribute("data-color-custom")] = element.value;
  //       localStorage.setItem("theme-custom", JSON.stringify(themeCustom));

  //       dispatchEvent(myApp.values.customEvents._theme);
  //     });
  //   });

  return $element;
};

var setting = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const $element = mrf.createNodeElement(`
      <div class="div_Xu02Xjh">
          <header class="header_K0hs3I0">

              <div class="div_uNg74XS">
                  <a href="#/" class="button_lvV6qZu">
                    ${svg("fi fi-rr-angle-small-left")}
                  </a>
                  <h3 id="textTitle">Configuracion</h3>
              </div>

          </header>
          <div class="div_guZ6yID" style="padding:10px;">
            <div class="div_gVQO1KR">
                <div class="div_cq16fYP">
                  <a 
                  href="#/profile"
                  class="app-style-var d-flex-center-y" style="--pd:10px; --g:10px; --h:60px;">
                    <small class="app-square-var d-flex-center">
                      ${svg("fi fi-rr-user")}
                    </small>
                    <span>Cuenta</span>
                  </a>
                  <a href="#/theme" class="app-style-var d-flex-center-y" style="--pd:10px; --g:10px; --h:60px;">
                    <small class="app-square-var d-flex-center">
                      ${svg("fi fi-rr-palette")}
                    </small>
                    <span>Tema</span>
                  </a>
                </div>
            </div>
          </div>
      </div>  
    `);

  return $element;
};

var iptvPeliculaId = () => {
  const mrc = window.MyResourceClass;
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;
  const myVal = {
    params: myApp.routes.params(),
    signals: {
      isFavorite: mrf.observeValue(false),
      isView: mrf.observeValue(false),
      episodes: mrf.observeValue([]),
    },
    functions: {},
    values: {
      video: null,
      isConnected: false,
      streaming: {},
      episode: -1,
      data_id: "",
      data: null,
      thisAnime: {},
    },
    url: {
      fetch: (url) => {
        return `https://fetch.vniox.com/get.php?url=${encodeURIComponent(url)}`;
      },
    },
    get: {},
    set: {},
  };

  const $element = mrf.createNodeElement(`
    <div class="div_Xu02Xjh div_mrXVL9t" style="position:fixed">

          <header class="header_K0hs3I0 header_RtX3J1X">

              <div class="div_uNg74XS">
                  <a href="#" class="button_lvV6qZu" data-history-back>
                    ${svg("fi fi-rr-angle-small-left")}
                  </a>
              </div>

              <h2 id="title" style="flex: 1; text-align:center; font-size: clamp(1rem, 2vw, 2rem);"></h2>

              <div class="div_x0cH0Hq">
                  <button id="favorite" class="button_lvV6qZu">
                    ${svg("fi fi-rr-heart")}
                  </button>
              </div>

          </header>

          <div class="div_guZ6yID div_DtSQApy">
              <div id="itemNull" class="loader-i" style="--color:var(--app-color-letter)"></div>
              <div id="itemFalse" class="div_b14S3dH" style="display:none">
                  ${svg("fi fi-rr-search-alt")}
                  <h3>La pelicula no existe</h3>
              </div>

              <div id="itemTrue" class="div_hqzh2NV" style="display:none; padding:15px">

                  <div class="div_cnJqhFl">
                    <div class="div_0JOSFlg" style="background: rgb(255 255 255 / .3)">
                      <img id="poster" src="" style="display:none">
                    </div>
                    <div class="div_cxFXOaL">
                      <label class="label_zjZIMnZ">
                        <input type="checkbox" id="inputView">
                        <span style="display:flex">
                          ${svg("fi fi-rr-check")}
                        </span>
                      </label>
                      <button id="play" class="button_bDfhQ4b" style="display:none">
                        <small></small>
                        <span>Play</span>
                      </button>
                    </div>
                  </div>

                  <hr class="hr_nTfcjTI">
                  <div class="div_BIchAsC">

                      <form class="app-form-label-checkbox" id="form-filter-type">
                        <label>
                          <input type="radio" name="key" value="information" checked>
                          <span>Detalles</span>
                        </label>
                        <label>
                          <input type="radio" name="key" value="chapter">
                          <span>Capitulos</span>
                        </label>
                        <label>
                          <input type="radio" name="key" value="similar">
                          <span>Otros</span>
                        </label>
                      </form>
                        
                  </div>
                  <hr class="hr_nTfcjTI">

                  <div id="itemTrueInformation" class="div_cnJqhFl" >
                    <div class="div_aSwP0zW">
                        <span id="nextEpisode"></span>
                        <span id="genres"></span>
                        <span id="duration"></span>
                        <span id="date"></span>
                    </div>
                    <p id="overview" style="font-size:14px"></p>
                  </div>

                  <div id="itemTrueChapter" class="div_692wB8" style="display:none">
                      <div class="div_mu7pmfs">
                        <div class="div_xesi90n">
                          <select id="selectSeason">
                            <option>Temporada 1</option>
                          </select>
                          <button id="buttonSeasonOrder">
                            ${svg("fi fi-rr-sort-alt")}
                          </button>
                        </div>
                      </div>
                      <div id="episodes" class="div_bi3qmqX"></div>
                  </div>

                  <div id="itemTrueSimilar" class="div_wNo9gA9" style="display:none; padding: 15px 0">
                    <div id="similar" class="div_qsNmfP3" style="padding: 0"></div>
                  </div>

              </div>
          </div>

          <div id="itemTrueOption" class="div_5Pe946IMjyL1Rs" popover>
              <div class="div_dsb3nhtCrFmUlSN p-10px">
                  <div class="div_cXaADrL pointer-on">
                      <div id="itemTrueOptionVideos" class="div_lm2WViG"></div>
                  </div>
              </div>
          </div>

          <div id="loaderVideo" class="div_uzuovb5" style="display:none">
        
            <div class="div_x8birmo">
              <div class="loader-i" style="--color:var(--app-color-letter)"></div>
              <span>cargando...</span>
            </div>

          </div>
      </div>
  `);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myVal.signals.isFavorite.observe((boolean) => {
    $elements.favorite.innerHTML = svg(
      boolean ? "fi fi-sr-heart" : "fi fi-rr-heart"
    );

    $elements.favorite.setAttribute("data-action", boolean ? 1 : 0);
  });

  myVal.signals.isView.observe((boolean) => {
    $elements.inputView.checked = boolean;
  });

  myVal.functions.updateHistory = (currentTime, duration = 0) => {
    if (myVal.values.isConnected) {
      const encodeQueryString = mrf.encodeQueryObject({
        route: "update-history-view",
        episode: myVal.values.episode,
        time_view: currentTime,
        time_duration: duration,
        datetime: Date.now(),
        data_id: myVal.values.data_id,
        type: 1,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      );
    }
  };

  myVal.functions.updateHistoryVideo = () => {
    myApp.mediaPlayer.video((video) => {
      let times = {};
      let status = false;

      video.src = "";

      video.onloadedmetadata = () => {
        times = {};
        status = false;

        const currentTime =
          parseInt(
            myVal.values.streaming?.episodes?.[myVal.values.episode]?.time_view
          ) || 0;

        video.currentTime = currentTime;
      };

      video.ontimeupdate = (e) => {
        if (status) {
          const num = Math.floor(e.target.currentTime);

          if (num > 0 && num % 30 == 0 && !times[num]) {
            times[num] = true;
            myVal.functions.updateHistory(num, Math.ceil(video.duration) || 0);
          }
        }
      };

      video.onseeked = () => {
        const currentTime = Math.floor(video.currentTime);
        myVal.functions.updateHistory(
          currentTime,
          Math.ceil(video.duration) || 0
        );

        times = {};
        times[currentTime] = true;

        status = true;
      };
    });
  };

  myApp.events($elements.episodes, "click", (e) => {
    const item = e.target.closest("[data-item]");
    const input = e.target.closest("input");

    if (item) {
      const [host, user, pass, id, ext] = [
        myApp.iptv.server,
        myApp.iptv.username,
        myApp.iptv.password,
        myVal.values.data.movie_data.stream_id,
        myVal.values.data.movie_data.container_extension,
      ];

      Android.openWithDefault(
        `${host}/movie/${user}/${pass}/${id}.${ext}`,
        "video/*"
      );
    }

    if (input) {
      // myVal.values.episode = input.dataset.episode;

      const encodeQueryString = mrf.encodeQueryObject({
        route: "toggle-history-view",
        episode: input.dataset.episode,
        datetime: Date.now(),
        data_id: myVal.values.data_id,
        type: 1,
        action: input.checked ? 1 : 0,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.status) {
            input.checked = data.type == 1;
          }
        });
    }
  });

  myApp.events($elements.favorite, "click", () => {
    myVal.signals.isFavorite.value = !myVal.signals.isFavorite.value;

    const encodeQueryString = mrf.encodeQueryObject({
      route: "toggle-favorites",
      data_id: myVal.values.data_id,
      type: 1,
      action: $elements.favorite.dataset.action,
    });

    fetch(
      myApp.url.server(`/api.php?${encodeQueryString}`),
      myApp.fetchOptions({
        method: "GET",
      })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data == null) {
          location.hash = "#/login";
          return;
        }

        if (data?.status) {
          myVal.signals.isFavorite.value = data.type == 1;
        }
      });
  });

  myApp.events($elements.inputView, "change", () => {
    const encodeQueryString = mrf.encodeQueryObject({
      route: "toggle-views",
      data_id: myVal.values.data_id,
      type: 1,
      action: $elements.inputView.checked ? 1 : 0,
    });

    fetch(
      myApp.url.server(`/api.php?${encodeQueryString}`),
      myApp.fetchOptions({
        method: "GET",
      })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data == null) {
          location.hash = "#/login";
          return;
        }

        if (data?.status) {
          myVal.signals.isView.value = data.type == 1;
        }
      });
  });

  myApp.events($elements.itemTrueOptionVideos, "click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      $elements.itemTrueOption.hidePopover();
      $elements.loaderVideo.style.display = "";

      myVal.values.episode = $elements.itemTrueOptionVideos.dataset.episode;

      ApiWebCuevana.serverUrl(button.getAttribute("data-url")).then((url) => {
        setTimeout(() => {
          getMediaWeb(url, (res) => {
            $elements.loaderVideo.style.display = "none";
            if (res.status) {
              Android.openWithDefault(res.url, "video/*");
            } else {
              alert("El video no esta disponible");
            }
          });
        });
      });
    }
  });

  myApp.events($elements.itemTrueOption, "click", (e) => {
    if (e.target === e.currentTarget) {
      $elements.itemTrueOption.hidePopover();
    }
  });

  myApp.events($elements["form-filter-type"], "change", () => {
    const value = $elements["form-filter-type"].key.value;

    const elements = {
      information: $elements.itemTrueInformation,
      chapter: $elements.itemTrueChapter,
      similar: $elements.itemTrueSimilar,
    };

    Object.entries(elements).forEach((entries) => {
      entries[1].style.display = entries[0] == value ? "" : "none";
    });
  });

  myApp.events($elements.selectSeason, "change", () => {
    const [start, end] = $elements.selectSeason.value
      .split("-")
      .map((str) => parseInt(str));

    //myVal.signals.episodes.value = mrc.MyArray.range(start, end);
    myVal.set.dataTrueEpisodes(mrc.MyArray.range(start, end));
  });

  myApp.events($elements.buttonSeasonOrder, "click", () => {
    $elements.episodes.append(
      ...Array.from($elements.episodes.children).reverse()
    );
  });

  myVal.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      fetch(
        "https://fetch.vniox.com/get.php?url=" +
          encodeURIComponent(
            `${myApp.iptv.server}/player_api.php?username=${myApp.iptv.username}&password=${myApp.iptv.password}&action=get_vod_info&vod_id=${myVal.params.id}`
          )
      )
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

  myVal.set.dataTrue = (data) => {
    const thisMovie = data.info;

    myVal.values.data = data;

    $elements.itemNull.style.display = "none";
    $elements.itemTrue.style.display = "";

    $elements.poster.onload = () => {
      $elements.poster.style.display = "";

      mrc.MyImage.canvas($elements.poster.src).then((result) => {
        const pixelData = result.ctx.getImageData(0, 0, 1, 1).data;
        const r = pixelData[0];
        const g = pixelData[1];
        const b = pixelData[2];

        const color = mrc.MyColor.toDark({ rgb: [r, g, b] }, 50);

        $elements.itemTrueOptionVideos.parentElement.style.background =
          mrc.MyColor.toDark({ rgb: [r, g, b] }, 60);

        myApp.elements.meta.color.setAttribute("content", color);
        $element.style.background = color;

        Android.colorSystemBar(color);
      });
    };

    // renderInfo
    mrf.callbackTryCatch(() => {
      $elements.poster.src = myApp.url.img(thisMovie.movie_image);

      $elements.title.textContent = thisMovie.name;
      $elements.overview.textContent = thisMovie.description;
      $elements.genres.textContent = thisMovie.genre;

      $elements.duration.textContent = `${duration[0]}h ${duration[1]}min`;
      $elements.date.textContent = thisMovie.releasedate?.split?.("-")[0] ?? "";
    });

    // renderSeason
    mrf.callbackTryCatch(() => {
      $elements.selectSeason.parentElement.style.display = "none";
      $elements.selectSeason.innerHTML = `<option value="1-1">Temporada 1</option>`;

      myVal.set.dataTrueEpisodes($elements.selectSeason.value);
    });

    // renderSimiliar
    mrf.callbackTryCatch(() => {
      return;
    });

    // mrf.get.dataTrueInfo().then(myVal.set.dataTrueInfo);
  };

  myVal.get.dataTrueInfo = (data) => {
    return new Promise((resolve, reject) => {
      const data_id = data.props.pageProps.thisMovie.TMDbId;
      myVal.values.data_id = data_id;

      const encodeQueryString = mrf.encodeQueryObject({
        route: "favorites-one",
        type: 2,
        data_id,
      });

      const body = {
        data_id: data_id,
        data_json: JSON.stringify(
          Object.entries(data).reduce((prev, curr) => {
            if (["TMDbId", "titles", "url", "images"].includes(curr[0])) {
              prev[curr[0]] = curr[1];
            }
            return prev;
          }, {})
        ),
        type: 2,
      };

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "POST",
          body: JSON.stringify(body),
        })
      )
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

  myVal.set.dataTrueInfo = (data) => {
    myVal.values.streaming = data;
    $elements.favorite.style.visibility = "";
    myVal.values.isConnected = Boolean(data);

    if (myVal.values.isConnected) {
      myVal.signals.isFavorite.value = Boolean(data?.favorite);
      myVal.signals.isView.value = Boolean(data?.view);
      myVal.set.dataTrueEpisodes(myVal.signals.episodes.value);
    }
  };

  myVal.set.dataTrueEpisodes = (string = "") => {
    const [from, to] = string.split("-").map(Number);
    const array = Array(to - from + 1)
      .fill()
      .map((_, i) => i + from);

    $elements.episodes.innerHTML = array
      .map((episode) => {
        const episodeInfo = myVal.values.streaming?.episodes?.[episode];

        const checked = episodeInfo != undefined ? "checked" : "";

        const displayInput = myVal.values.isConnected ? "" : "display:none";

        return `
          <div data-episode="${episode}" class="div_eGwK6I1">
            <button 
              class="button_fk0VHgU" 
              data-slug="${myVal.params.id}-${episode}" 
              data-title="${myVal.params.id}" 
              data-description="episodio ${episode}" 
              data-episode="${episode}"
              data-item>
                <span>Episodio ${episode}</span>
                <small>
                  ${
                    parseInt(episodeInfo?.time_view)
                      ? "visto ".concat(
                          myApp.functions.formatTime(episodeInfo.time_view)
                        )
                      : ""
                  }
                  ${
                    parseInt(episodeInfo?.time_duration)
                      ? "de ".concat(
                          myApp.functions.formatTime(episodeInfo.time_duration)
                        )
                      : ""
                  }
                </small>
            </button>
            <label class="label_zjZIMnZ" style="${displayInput}">
              <input type="checkbox" data-episode="${episode}" ${checked}>
              <span style="display:flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-check"><path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z"></path></svg></span>
            </label>
          </div>
        `;
      })
      .join("");
  };

  myApp.functions.historyBack($element.querySelector("[data-history-back]"));
  myApp.elements.meta.color.setAttribute("content", "#000000");
  myVal.get.dataTrue().then(myVal.set.dataTrue);

  mrf.callbackTryCatch(() => {
    Android.colorSystemBar("#000000");
  });

  $elements.itemNull.style.display = "none";
  $elements.itemTrue.style.display = "";

  return $element;
};

var iptvSerieId = () => {
  const mrc = window.MyResourceClass;
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;
  const myVal = {
    params: myApp.routes.params(),
    signals: {
      isFavorite: mrf.observeValue(false),
      isView: mrf.observeValue(false),
      episodes: mrf.observeValue([]),
    },
    functions: {},
    values: {
      video: null,
      isConnected: false,
      streaming: {},
      episode: -1,
      data_id: "",
      data: null,
      thisAnime: {},
    },
    url: {
      fetch: (url) => {
        return `https://fetch.vniox.com/get.php?url=${encodeURIComponent(url)}`;
      },
    },
    get: {},
    set: {},
  };

  const $element = mrf.createNodeElement(`
    <div class="div_Xu02Xjh div_mrXVL9t" style="position:fixed">

          <header class="header_K0hs3I0 header_RtX3J1X">

              <div class="div_uNg74XS">
                  <a href="#" class="button_lvV6qZu" data-history-back>
                    ${svg("fi fi-rr-angle-small-left")}
                  </a>
              </div>

              <h2 id="title" style="flex: 1; text-align:center; font-size: clamp(1rem, 2vw, 2rem);"></h2>

              <div class="div_x0cH0Hq">
                  <button id="favorite" class="button_lvV6qZu">
                    ${svg("fi fi-rr-heart")}
                  </button>
              </div>

          </header>

          <div class="div_guZ6yID div_DtSQApy">
              <div id="itemNull" class="loader-i" style="--color:var(--app-color-letter)"></div>
              <div id="itemFalse" class="div_b14S3dH" style="display:none">
                  ${svg("fi fi-rr-search-alt")}
                  <h3>La pelicula no existe</h3>
              </div>

              <div id="itemTrue" class="div_hqzh2NV" style="display:none; padding:15px">

                  <div class="div_cnJqhFl">
                    <div class="div_0JOSFlg" style="background: rgb(255 255 255 / .3)">
                      <img id="poster" src="" style="display:none">
                    </div>
                    <div class="div_cxFXOaL">
                      <label class="label_zjZIMnZ">
                        <input type="checkbox" id="inputView">
                        <span style="display:flex">
                          ${svg("fi fi-rr-check")}
                        </span>
                      </label>
                      <button id="play" class="button_bDfhQ4b" style="display:none">
                        <small></small>
                        <span>Play</span>
                      </button>
                    </div>
                  </div>

                  <hr class="hr_nTfcjTI">
                  <div class="div_BIchAsC">

                      <form class="app-form-label-checkbox" id="form-filter-type">
                        <label>
                          <input type="radio" name="key" value="information" checked>
                          <span>Detalles</span>
                        </label>
                        <label>
                          <input type="radio" name="key" value="chapter">
                          <span>Capitulos</span>
                        </label>
                        <label>
                          <input type="radio" name="key" value="similar">
                          <span>Otros</span>
                        </label>
                      </form>
                        
                  </div>
                  <hr class="hr_nTfcjTI">

                  <div id="itemTrueInformation" class="div_cnJqhFl" >
                    <div class="div_aSwP0zW">
                        <span id="nextEpisode"></span>
                        <span id="genres"></span>
                        <span id="duration"></span>
                        <span id="date"></span>
                    </div>
                    <p id="overview" style="font-size:14px"></p>
                  </div>

                  <div id="itemTrueChapter" class="div_692wB8" style="display:none">
                      <div class="div_mu7pmfs" style="display: flex; justify-content: space-between;">
                        <div class="div_xesi90n">
                          <select id="selectSeason" style="padding-right:10px">
                            <option>Temporada 1</option>
                          </select>  
                        </div>

                        <div class="div_xesi90n">
                          <button id="buttonSeasonOrder">
                            ${svg("fi fi-rr-sort-alt")}
                          </button>
                        </div>
                      </div>
                      <div id="episodes" class="div_bi3qmqX"></div>
                  </div>

                  <div id="itemTrueSimilar" class="div_wNo9gA9" style="display:none; padding: 15px 0">
                    <div id="similar" class="div_qsNmfP3" style="padding: 0"></div>
                  </div>

              </div>
          </div>

          <div id="itemTrueOption" class="div_5Pe946IMjyL1Rs" popover>
              <div class="div_dsb3nhtCrFmUlSN p-10px">
                  <div class="div_cXaADrL pointer-on">
                      <div id="itemTrueOptionVideos" class="div_lm2WViG"></div>
                  </div>
              </div>
          </div>

          <div id="loaderVideo" class="div_uzuovb5" style="display:none">
        
            <div class="div_x8birmo">
              <div class="loader-i" style="--color:var(--app-color-letter)"></div>
              <span>cargando...</span>
            </div>

          </div>
      </div>
  `);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  myVal.signals.isFavorite.observe((boolean) => {
    $elements.favorite.innerHTML = svg(
      boolean ? "fi fi-sr-heart" : "fi fi-rr-heart"
    );

    $elements.favorite.setAttribute("data-action", boolean ? 1 : 0);
  });

  myVal.signals.isView.observe((boolean) => {
    $elements.inputView.checked = boolean;
  });

  myVal.functions.updateHistory = (currentTime, duration = 0) => {
    if (myVal.values.isConnected) {
      const encodeQueryString = mrf.encodeQueryObject({
        route: "update-history-view",
        episode: myVal.values.episode,
        time_view: currentTime,
        time_duration: duration,
        datetime: Date.now(),
        data_id: myVal.values.data_id,
        type: 1,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      );
    }
  };

  myVal.functions.updateHistoryVideo = () => {
    myApp.mediaPlayer.video((video) => {
      let times = {};
      let status = false;

      video.src = "";

      video.onloadedmetadata = () => {
        times = {};
        status = false;

        const currentTime =
          parseInt(
            myVal.values.streaming?.episodes?.[myVal.values.episode]?.time_view
          ) || 0;

        video.currentTime = currentTime;
      };

      video.ontimeupdate = (e) => {
        if (status) {
          const num = Math.floor(e.target.currentTime);

          if (num > 0 && num % 30 == 0 && !times[num]) {
            times[num] = true;
            myVal.functions.updateHistory(num, Math.ceil(video.duration) || 0);
          }
        }
      };

      video.onseeked = () => {
        const currentTime = Math.floor(video.currentTime);
        myVal.functions.updateHistory(
          currentTime,
          Math.ceil(video.duration) || 0
        );

        times = {};
        times[currentTime] = true;

        status = true;
      };
    });
  };

  myApp.events($elements.episodes, "click", (e) => {
    const item = e.target.closest("[data-item]");
    const input = e.target.closest("input");

    if (item) {
      const data = JSON.parse(item.getAttribute("data-data"));

      const [host, user, pass, id, ext] = [
        myApp.iptv.server,
        myApp.iptv.username,
        myApp.iptv.password,
        data.id,
        data.container_extension,
      ];

      Android.openWithDefault(
        `${host}/movie/${user}/${pass}/${id}.${ext}`,
        "video/*"
      );
    }

    if (input) {
      // myVal.values.episode = input.dataset.episode;

      const encodeQueryString = mrf.encodeQueryObject({
        route: "toggle-history-view",
        episode: input.dataset.episode,
        datetime: Date.now(),
        data_id: myVal.values.data_id,
        type: 1,
        action: input.checked ? 1 : 0,
      });

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "GET",
        })
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.status) {
            input.checked = data.type == 1;
          }
        });
    }
  });

  myApp.events($elements.favorite, "click", () => {
    myVal.signals.isFavorite.value = !myVal.signals.isFavorite.value;

    const encodeQueryString = mrf.encodeQueryObject({
      route: "toggle-favorites",
      data_id: myVal.values.data_id,
      type: 1,
      action: $elements.favorite.dataset.action,
    });

    fetch(
      myApp.url.server(`/api.php?${encodeQueryString}`),
      myApp.fetchOptions({
        method: "GET",
      })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data == null) {
          location.hash = "#/login";
          return;
        }

        if (data?.status) {
          myVal.signals.isFavorite.value = data.type == 1;
        }
      });
  });

  myApp.events($elements.inputView, "change", () => {
    const encodeQueryString = mrf.encodeQueryObject({
      route: "toggle-views",
      data_id: myVal.values.data_id,
      type: 1,
      action: $elements.inputView.checked ? 1 : 0,
    });

    fetch(
      myApp.url.server(`/api.php?${encodeQueryString}`),
      myApp.fetchOptions({
        method: "GET",
      })
    )
      .then((res) => res.json())
      .then((data) => {
        if (data == null) {
          location.hash = "#/login";
          return;
        }

        if (data?.status) {
          myVal.signals.isView.value = data.type == 1;
        }
      });
  });

  myApp.events($elements.itemTrueOptionVideos, "click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      $elements.itemTrueOption.hidePopover();
      $elements.loaderVideo.style.display = "";

      myVal.values.episode = $elements.itemTrueOptionVideos.dataset.episode;

      ApiWebCuevana.serverUrl(button.getAttribute("data-url")).then((url) => {
        setTimeout(() => {
          getMediaWeb(url, (res) => {
            $elements.loaderVideo.style.display = "none";
            if (res.status) {
              Android.openWithDefault(res.url, "video/*");
            } else {
              alert("El video no esta disponible");
            }
          });
        });
      });

      // setTimeout(() => {
      //   getMediaWeb(button.getAttribute("data-url"), (res) => {
      //     $elements.loaderVideo.style.display = "none";
      //     if (res.status) {
      //       Android.openWithDefault(res.url, "video/*");
      //     } else {
      //       alert("El video no esta disponible");
      //     }
      //   });
      // });

      // myApp.mediaPlayer.element().requestFullscreen();
      // myVal.functions.updateHistoryVideo();

      return;
    }
  });

  myApp.events($elements.itemTrueOption, "click", (e) => {
    if (e.target === e.currentTarget) {
      $elements.itemTrueOption.hidePopover();
    }
  });

  myApp.events($elements["form-filter-type"], "change", () => {
    const value = $elements["form-filter-type"].key.value;

    const elements = {
      information: $elements.itemTrueInformation,
      chapter: $elements.itemTrueChapter,
      similar: $elements.itemTrueSimilar,
    };

    Object.entries(elements).forEach((entries) => {
      entries[1].style.display = entries[0] == value ? "" : "none";
    });
  });

  myApp.events($elements.selectSeason, "change", () => {
    myVal.set.dataTrueEpisodes($elements.selectSeason.value);
  });

  myApp.events($elements.buttonSeasonOrder, "click", () => {
    const svg = $elements.buttonSeasonOrder.children[0];
    svg.classList.add("transition-rotate");
    svg.classList.toggle("active");

    $elements.episodes.append(
      ...Array.from($elements.episodes.children).reverse()
    );
  });
  myVal.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      fetch(
        "https://fetch.vniox.com/get.php?url=" +
          encodeURIComponent(
            `${myApp.iptv.server}/player_api.php?username=${myApp.iptv.username}&password=${myApp.iptv.password}&action=get_series_info&series_id=${myVal.params.id}`
          )
      )
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

  myVal.set.dataTrue = (data) => {
    const thisSerie = data.info;
    myVal.values.data = data;

    $elements.itemNull.style.display = "none";
    $elements.itemTrue.style.display = "";

    $elements.poster.onload = () => {
      $elements.poster.style.display = "";

      mrc.MyImage.canvas($elements.poster.src).then((result) => {
        const pixelData = result.ctx.getImageData(0, 0, 1, 1).data;
        const r = pixelData[0];
        const g = pixelData[1];
        const b = pixelData[2];

        const color = mrc.MyColor.toDark({ rgb: [r, g, b] }, 50);

        $elements.itemTrueOptionVideos.parentElement.style.background =
          mrc.MyColor.toDark({ rgb: [r, g, b] }, 60);

        myApp.elements.meta.color.setAttribute("content", color);
        $element.style.background = color;

        Android.colorSystemBar(color);
      });
    };

    // renderInfo
    mrf.callbackTryCatch(() => {
      $elements.poster.src = myApp.url.img(thisSerie.cover);

      $elements.title.textContent = thisSerie.name;
      $elements.overview.textContent = thisSerie.plot;
      $elements.genres.textContent = thisSerie.genre;

      $elements.duration.textContent = `${
        thisSerie.seasons.at(-1).number
      } temporadas`;

      $elements.date.textContent = new Date(
        thisSerie.releaseDate
      ).getFullYear();
    });

    // renderSeason
    mrf.callbackTryCatch(() => {
      const seasons = thisSerie.seasons.filter(
        (season) => season.episodes.length
      );

      $elements.selectSeason.innerHTML = seasons
        .map((season) => {
          const value = `1-${season.episodes.length}-${season.number}`;

          return `
            <option value="${value}">Temporada ${season.number}</option>
          `;
        })
        .join("");

      if ($elements.selectSeason.children.length == 1) {
        $elements.selectSeason.parentElement.style.pointerEvents = "none";
        $elements.selectSeason.parentElement.style.opacity = ".7";
      }

      if (
        $elements.selectSeason.children.length == 1 &&
        $elements.selectSeason.value == "1-1"
      ) {
        $elements.selectSeason.parentElement.style.display = "none";
      }

      myVal.set.dataTrueEpisodes($elements.selectSeason.value);
    });

    // renderSimiliar
    mrf.callbackTryCatch(() => {
      return;
    });

    // mrf.get.dataTrueInfo().then(myVal.set.dataTrueInfo);
  };

  myVal.get.dataTrueInfo = (data) => {
    return new Promise((resolve, reject) => {
      const data_id = data.props.pageProps.thisSerie.TMDbId;
      myVal.values.data_id = data_id;

      const encodeQueryString = mrf.encodeQueryObject({
        route: "favorites-one",
        type: 3,
        data_id,
      });

      const body = {
        data_id: data_id,
        data_json: JSON.stringify(
          Object.entries(data).reduce((prev, curr) => {
            if (["TMDbId", "titles", "url", "images"].includes(curr[0])) {
              prev[curr[0]] = curr[1];
            }
            return prev;
          }, {})
        ),
        type: 3,
      };

      fetch(
        myApp.url.server(`/api.php?${encodeQueryString}`),
        myApp.fetchOptions({
          method: "POST",
          body: JSON.stringify(body),
        })
      )
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

  myVal.set.dataTrueInfo = (data) => {
    myVal.values.streaming = data;
    $elements.favorite.style.visibility = "";
    myVal.values.isConnected = Boolean(data);

    if (myVal.values.isConnected) {
      myVal.signals.isFavorite.value = Boolean(data?.favorite);
      myVal.signals.isView.value = Boolean(data?.view);
      myVal.set.dataTrueEpisodes(myVal.signals.episodes.value);
    }
  };

  myVal.set.dataTrueEpisodes = (string = "") => {
    const [from, to, season] = string.split("-").map(Number);
    const array = Array(to - from + 1)
      .fill()
      .map((_, i) => i + from);

    $elements.episodes.innerHTML = array
      .map((episode) => {
        const episodeInfo = myVal.values.streaming?.episodes?.[episode];

        const checked = episodeInfo != undefined ? "checked" : "";

        const displayInput = myVal.values.isConnected ? "" : "display:none";

        return `
          <div data-episode="${episode}" class="div_eGwK6I1">
            <button 
              class="button_fk0VHgU" 
              data-slug="${myVal.params.id}-${episode}" 
              data-title="${myVal.params.id}" 
              data-description="episodio ${episode}" 
              data-season="${season}"
              data-episode="${episode}"
              data-item>
                <span>Episodio ${episode}</span>
                <small>
                  ${
                    parseInt(episodeInfo?.time_view)
                      ? "visto ".concat(
                          myApp.functions.formatTime(episodeInfo.time_view)
                        )
                      : ""
                  }
                  ${
                    parseInt(episodeInfo?.time_duration)
                      ? "de ".concat(
                          myApp.functions.formatTime(episodeInfo.time_duration)
                        )
                      : ""
                  }
                </small>
            </button>
            <label class="label_zjZIMnZ" style="${displayInput}">
              <input type="checkbox" data-episode="${episode}" ${checked}>
              <span style="display:flex"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-check"><path d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z"></path></svg></span>
            </label>
          </div>
        `;
      })
      .join("");

    $elements.buttonSeasonOrder.parentElement.style.display =
      array.length > 1 ? "" : "none";

    $elements.buttonSeasonOrder.children[0].classList.toggle("active", false);
  };

  myApp.functions.historyBack($element.querySelector("[data-history-back]"));
  myApp.elements.meta.color.setAttribute("content", "#000000");
  myVal.get.dataTrue().then(myVal.set.dataTrue);

  // mrf.callbackTryCatch(() => {
  //   Android.colorSystemBar("#000000");
  // });

  $elements.itemNull.style.display = "none";
  $elements.itemTrue.style.display = "";
  return $element;
};

var passwordRecover = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;

  const $element = mrf.createNodeElement(`

    <div class="div_Xu02Xjh" style="position:fixed">

        <header class="header_K0hs3I0">

            <div class="div_uNg74XS">
                <a href="#/setting" class="button_lvV6qZu" data-history-back>
                  ${svg("fi fi-rr-angle-small-left")}
                </a>
                <h3 id="textTitle"></h3>
            </div>

        </header>

        <div class="div_IsTCHpN p-10px">
             
          <form id="form" class="div_SCqCUTo" autocomplete="off">
              <h2 style="padding: 0 20px;">Recuperar contraseña</h2>
              <div class="div_Y85zRC0">
                  <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                      <input type="text" name="email" placeholder="">
                      <span>Correo</span>
                  </label> 
              </div>
              <button id="buttonSubmit" class="button_WU25psx">
                  <span id="spanLoad">Enviar</span>
                  ${svg("fi fi-rr-arrow-right")}
              </button>
              <a href="#/login" class="a_8hzaMUg">
                  <span>Iniciar sesion</span>
                  ${svg("fi fi-rr-arrow-right")}
              </a>
          </form>

        </div>

        <div id="loaderVideo" class="div_uzuovb5" style="display:none">
        
          <div class="div_x8birmo">
            <div class="loader-i" style="--color:var(--app-color-letter)"></div>
            <span>cargando...</span>
          </div>

        </div>

    </div>

`);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const encodeQueryString = mrf.encodeQueryObject({
      route: "auth.password.recover-get",
    });

    const body = {
      email: $elements.form.email.value.trim(),
    };

    fetch(myApp.url.server(`/api.php?${encodeQueryString}`), {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data?.message ?? "Intentelo nuevamente");
      });
  }); 

  // myApp.functions.historyBack($element.querySelector("[data-history-back]"));
  return $element;
};

var passwordRecoverToken = () => {
  const mrf = window.MyResourceFunction;
  const svg = window.iconSVG;

  const myApp = window.dataApp;
  const myVal = {
    params: myApp.routes.params(),

    get: {},
    set: {},
  };

  const $element = mrf.createNodeElement(`

    <div class="div_Xu02Xjh" style="position:fixed">

        <header class="header_K0hs3I0">

            <div class="div_uNg74XS">
                <a href="#/setting" class="button_lvV6qZu" data-history-back>
                  ${svg("fi fi-rr-angle-small-left")}
                </a>
                <h3 id="textTitle"></h3>
            </div>

        </header>

        <div class="div_IsTCHpN p-10px">
             
          <div id="itemNull" class="loader-i" style="--color:var(--app-color-letter)"></div>
          <div id="itemFalse" class="div_b14S3dH" style="display:none">
              ${svg("fi fi-rr-search-alt")}
              <h3>El enlace ya no esta disponible</h3>
          </div>
          <form id="form" class="div_SCqCUTo" autocomplete="off" style="display:none">
              <h2 style="padding: 0 20px;">Actualizar contraseña</h2>
              <div class="div_Y85zRC0">
                  <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                      <input type="password" name="password1" placeholder="">
                      <span>Nueva contraseña</span>
                  </label>
                  <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                      <input type="password" name="password2" placeholder="">
                      <span>Repita la contraseña</span>
                  </label> 
              </div>
              <button id="buttonSubmit" class="button_WU25psx">
                  <span id="spanLoad">Actualizar</span>
                  ${svg("fi fi-rr-arrow-right")}
              </button>
              <a href="#/login" class="a_8hzaMUg">
                  <span>Iniciar sesion</span>
                  ${svg("fi fi-rr-arrow-right")}
              </a>
          </form>

        </div>

    </div>

`);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const encodeQueryString = mrf.encodeQueryObject({
      route: "auth.password.recover-set",
      token: myVal.params.token,
    });

    const body = {
      password1: $elements.form.password1.value.trim(),
      password2: $elements.form.password2.value.trim(),
    };

    if (body.password1.length < 6) {
      alert("La contraseña debe contener al menos 6 caracteres.");
      return;
    }

    if (body.password1 != body.password2) {
      alert("Las contraseñas no coinciden. Verifica que ambas sean iguales.");
      return;
    }

    fetch(myApp.url.server(`/api.php?${encodeQueryString}`), {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(JSON.stringify(data));
      });
  });

  myVal.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      const encodeQueryString = mrf.encodeQueryObject({
        route: "token.password-update",
        token: myVal.params.token,
      });

      fetch(myApp.url.server(`/api.php?${encodeQueryString}`))
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };

  myVal.set.dataTrue = (boolean) => {
    $elements.itemNull.style.display = "none";
    $elements.itemFalse.style.display = boolean ? "none" : "";
    $elements.form.style.display = boolean ? "" : "none";
  };

  myVal.get.dataTrue().then(myVal.set.dataTrue);

  // myApp.functions.historyBack($element.querySelector("[data-history-back]"));
  return $element;
};

var routes = () => {
  const myApp = window.dataApp;
  const myVal = {
    values: {
      pages: {},
    },
    element: {
      route: document.createElement("div"),
    },
    elements: {
      inicio: inicio(),
      theme: theme(),
      searchTypeResult: searchTypeResult(),
      collection: collection(),
    },
    customEvent: {
      _mounting: new CustomEvent("_mounting"),
      _mounted: new CustomEvent("_mounted"),
      _unmounting: new CustomEvent("_unmounting"),
      _unmounted: new CustomEvent("_unmounted"),
    },
    node: null,
  };

  myApp.routes.set([
    { hash: "/", callback: () => myVal.elements.inicio },
    { hash: "/login", callback: () => routesPublic(login) },
    { hash: "/register", callback: () => routesPublic(register) },
    { hash: "/password-recover", callback: passwordRecover },
    { hash: "/password-recover/:token", callback: passwordRecoverToken },

    // { hash: "/login/:key/:value", callback: () => routesPublic(loginKeyValue) },
    { hash: "/profile", callback: () => routesPrivate(profile) },

    { hash: "/pelicula/:id", callback: peliculaId },
    { hash: "/serie/:id", callback: serieId },
    { hash: "/anime/:id", callback: animeId },

    { hash: "/pelicula-ii/:id", callback: iptvPeliculaId },
    { hash: "/serie-ii/:id", callback: iptvSerieId },

    { hash: "/search", callback: searchType },
    { hash: "/search/:result", callback: searchType },
    {
      hash: "/search/:result/result",
      callback: () => myVal.elements.searchTypeResult,
    },

    { hash: "/collection", callback: () => myVal.elements.collection },
    { hash: "/historial", callback: historial },
    { hash: "/theme", callback: () => myVal.elements.theme },
    { hash: "/setting", callback: setting },
  ]);

  if (history.length <= 2 || history.state == null) {
    history.replaceState({ start: true }, null, location.href);
  }

  addEventListener("hashchange", (e) => {
    if (!Boolean(e instanceof CustomEvent) && history.state == null) {
      const uuid = history.state?.uuid ?? myApp.functions.generateUUID();
      history.replaceState({ start: false, uuid }, null, location.href);
    }

    if (myVal.node instanceof Node) {
      myVal.node.dispatchEvent(myVal.customEvent._unmounting);
      myVal.element.route.innerHTML = "";
      myVal.node.dispatchEvent(myVal.customEvent._unmounted);
    }

    myVal.node = myApp.routes.get();
    myVal.element.route.innerHTML = "";

    if (myVal.node instanceof Node) {
      myVal.node.dispatchEvent(myVal.customEvent._mounting);
      myVal.element.route.append(myVal.node);
      myVal.node.dispatchEvent(myVal.customEvent._mounted);
    }
  });

  return myVal.element.route;
};

class ElementMakeDrag {
  constructor(element) {
    this._element = element;
    this._events = {};
  }

  on = (type, callback) => {
    this._events[type] = callback;
  };

  start = () => {
    let draggable = this._element;
    let element = this._element;

    const startDragging = (e) => {
      if (typeof this._events.start == "function") {
        this._events.start({
          e,
          target: draggable,
        });
      }

      if (e.type === "mousedown") {
        e.preventDefault();
      }

      element.addEventListener("touchmove", drag, { passive: false });
      element.addEventListener("touchend", stopDragging);
      element.addEventListener("mousemove", drag);
      element.addEventListener("mouseup", stopDragging);
      element.addEventListener("mouseleave", stopDragging);
    };

    const drag = (e) => {
      if (typeof this._events.move == "function") {
        this._events.move({
          e,
          target: draggable,
        });
      }
    };

    const stopDragging = (e) => {
      // allowtouchstart = true;
      if (typeof this._events.end == "function") {
        this._events.end({
          e,
          target: draggable,
        });
      }

      if (e.touches && e.touches.length > 0) return;
      element.removeEventListener("touchmove", drag);
      element.removeEventListener("touchend", stopDragging);
      element.removeEventListener("mousemove", drag);
      element.removeEventListener("mouseup", stopDragging);
      element.removeEventListener("mouseleave", stopDragging);
    };

    draggable.addEventListener("touchstart", startDragging, {
      passive: false,
    });
    draggable.addEventListener("mousedown", startDragging);
  };
}

function calculateNewPosition(
  top,
  left,
  width,
  height,
  newWidth,
  newHeight
) {
  // Calcula la diferencia en tamaño para cada eje
  const deltaX = (newWidth - width) / 2;
  const deltaY = (newHeight - height) / 2;

  // Ajusta las posiciones de left y top para mantener el centro
  const newLeft = left - deltaX;
  const newTop = top - deltaY;

  return { top: newTop, left: newLeft };
}

var footerVideoPlayer = () => {
  const mrc = window.MyResourceClass;
  const mrf = window.MyResourceFunction;

  const myApp = window.dataApp;
  const myVal = {
    elements: {
      video: myApp.mediaPlayer.element("video"),
    },
    classes: {
      divPreview: null,
      divPrueba: null,
    },
    values: {
      pinch: {
        start: false,
        escala: 1,
        ultimaDistancia: 0,
      },
    },
  };

  const $element = mrf.createNodeElement(`
        <footer class="footer_rTzBt2c">

            <div id="divPrueba" class="div_MJ5Ba2C" style="pointer-events:none;">
              <div id="divPreview" class="div_wPiZgS6" style="display:none;">
                  <div id="divPreviewContent" class="d-grid">
                    <canvas id="canvasVideo" style="aspect-ratio: 16/9;"></canvas>
                    <div class="div_OZ6oAgh"><span id="spanBar"></span></div>
                    <div class="div_lq8dhAa">
                        <button id="buttonPlayPause"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-play"><path d="M20.494,7.968l-9.54-7A5,5,0,0,0,3,5V19a5,5,0,0,0,7.957,4.031l9.54-7a5,5,0,0,0,0-8.064Zm-1.184,6.45-9.54,7A3,3,0,0,1,5,19V5A2.948,2.948,0,0,1,6.641,2.328,3.018,3.018,0,0,1,8.006,2a2.97,2.97,0,0,1,1.764.589l9.54,7a3,3,0,0,1,0,4.836Z"></path></svg></button>
                        <button id="buttonPIP" style="display:none"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-svg-name="fi fi-rr-resize"><path d="m19 0h-8a5.006 5.006 0 0 0 -5 5v6h-1a5.006 5.006 0 0 0 -5 5v3a5.006 5.006 0 0 0 5 5h3a5.006 5.006 0 0 0 5-5v-1h6a5.006 5.006 0 0 0 5-5v-8a5.006 5.006 0 0 0 -5-5zm-8 16a3 3 0 0 1 -3-3 3 3 0 0 1 3 3zm0 3a3 3 0 0 1 -3 3h-3a3 3 0 0 1 -3-3v-3a3 3 0 0 1 3-3h1a5.006 5.006 0 0 0 5 5zm11-6a3 3 0 0 1 -3 3h-6a4.969 4.969 0 0 0 -.833-2.753l5.833-5.833v2.586a1 1 0 0 0 2 0v-3a3 3 0 0 0 -3-3h-3a1 1 0 0 0 0 2h2.586l-5.833 5.833a4.969 4.969 0 0 0 -2.753-.833v-6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3z"></path></svg></button>
                        <button id="buttonCloseVideo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-cross"><path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"></path></svg></button>
                    </div>
                  </div>
              </div>
            </div>
            
            <div class="div_rFbZYz7">
                <div id="elementVideo" class="div_DFHkIAJ pointer-on"></div>
            </div>
            
        </footer>
  `);

  const $elements = mrf.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const context = $elements.canvasVideo.getContext("2d");

  const draw = () => {
    const video = myVal.elements.video;
    const canvas = $elements.canvasVideo;
    if (!video.paused && !video.ended) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(draw);
    }
  };

  $elements.canvasVideo.addEventListener("click", () => {
    myApp.mediaPlayer.element().requestFullscreen();
  });

  $elements.buttonPlayPause.addEventListener("click", () => {
    if (myVal.elements.video.paused) myVal.elements.video.play();
    else myVal.elements.video.pause();
  });

  $elements.buttonPIP.addEventListener("click", () => {
    myVal.elements.video.requestPictureInPicture();
  });

  $elements.buttonCloseVideo.addEventListener("click", () => {
    $elements.divPreview.style.display = "none";
    myApp.mediaPlayer.video((video) => {
      video.src = "";
    });
  });

  myVal.elements.video.addEventListener("play", () => {
    $elements.buttonPlayPause.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-pause"><path d="M6.5,0A3.5,3.5,0,0,0,3,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,6.5,0ZM8,20.5a1.5,1.5,0,0,1-3,0V3.5a1.5,1.5,0,0,1,3,0Z"></path><path d="M17.5,0A3.5,3.5,0,0,0,14,3.5v17a3.5,3.5,0,0,0,7,0V3.5A3.5,3.5,0,0,0,17.5,0ZM19,20.5a1.5,1.5,0,0,1-3,0V3.5a1.5,1.5,0,0,1,3,0Z"></path></svg>';
    draw();
  });
  myVal.elements.video.addEventListener("pause", () => {
    $elements.buttonPlayPause.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-play"><path d="M20.494,7.968l-9.54-7A5,5,0,0,0,3,5V19a5,5,0,0,0,7.957,4.031l9.54-7a5,5,0,0,0,0-8.064Zm-1.184,6.45-9.54,7A3,3,0,0,1,5,19V5A2.948,2.948,0,0,1,6.641,2.328,3.018,3.018,0,0,1,8.006,2a2.97,2.97,0,0,1,1.764.589l9.54,7a3,3,0,0,1,0,4.836Z"></path></svg>';
  });

  myVal.elements.video.addEventListener("timeupdate", () => {
    $elements.spanBar.style.width =
      mrc.MyInt.percentage(
        myVal.elements.video.currentTime,
        myVal.elements.video.duration
      ) + "%";
  });

  myVal.elements.video.addEventListener("loadstart", () => {
    if (myVal.elements.video.getAttribute("src").trim()) {
      $elements.divPreview.style.display = "";
    }
  });

  myVal.elements.video.addEventListener("loadedmetadata", () => {
    $elements.canvasVideo.width = myVal.elements.video.videoWidth;
    $elements.canvasVideo.height = myVal.elements.video.videoHeight;
    $elements.canvasVideo.style.aspectRatio = "";
  });

  myVal.elements.video.addEventListener("error", (e) => {
    if (e.target.error.code == 3) {
      myApp.values.hls.recoverMediaError();
      e.target.play();
    }
  });

  myVal.elements.video.addEventListener("enterpictureinpicture", () => {
    $elements.divPreview.style.display = "none";
  });

  myVal.elements.video.addEventListener("leavepictureinpicture", () => {
    if (document.fullscreenElement) document.exitFullscreen();
    $elements.divPreview.style.display = "";
  });

  $elements.elementVideo.append(myApp.mediaPlayer.element());

  const function_pmgnvcdirebja = () => {
    const elementMakeDrag = new ElementMakeDrag($elements.divPrueba);
    const draggable = $elements.divPreview;

    const datapinch = {
      allow: false,
      startdistance: 0,
      lastdistance: 0,
      scale: 1,
    };

    const datamove = {
      allow: false,
      xy: {
        initial: {
          x: 0,
          y: 0,
        },
        current: {
          x: 0,
          y: 0,
        },
      },
    };

    elementMakeDrag.on("start", ({ e, target }) => {
      target.style.pointerEvents = "";

      if (e.touches) {
        if (!draggable.contains(e.touches[0].target)) return;
      }

      if (draggable.contains(e.target)) {
        datamove.allow = true;

        if (e.type === "touchstart") {
          const index = Array.from(e.touches).findIndex((touch) =>
            draggable.contains(touch.target)
          );

          datamove.xy.initial.x =
            e.touches[index].clientX - draggable.offsetLeft;
          datamove.xy.initial.y =
            e.touches[index].clientY - draggable.offsetTop;
        } else {
          datamove.xy.initial.x = e.clientX - draggable.offsetLeft;
          datamove.xy.initial.y = e.clientY - draggable.offsetTop;
        }

        if (e.touches && e.touches.length === 2) {
          datapinch.allow = true;
          datapinch.lastdistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
        }
      }
    });
    elementMakeDrag.on("move", ({ e }) => {
      if (datamove.allow) {
        $elements.divPreviewContent.style.pointerEvents = "none";

        if (e.type === "touchmove") {
          e.preventDefault();
          const index = Array.from(e.touches).findIndex((touch) =>
            draggable.contains(touch.target)
          );

          if (index != -1) {
            datamove.xy.current.x =
              e.touches[index].clientX - datamove.xy.initial.x;
            datamove.xy.current.y =
              e.touches[index].clientY - datamove.xy.initial.y;
          }
        } else {
          datamove.xy.current.x = e.clientX - datamove.xy.initial.x;
          datamove.xy.current.y = e.clientY - datamove.xy.initial.y;
        }

        const top = draggable.offsetHeight / 2;
        const left = draggable.offsetWidth / 2;

        const y = Math.max(
          top * -1,
          Math.min(
            datamove.xy.current.y,
            window.innerHeight - draggable.offsetHeight + top
          )
        );

        const x = Math.max(
          left * -1,
          Math.min(
            datamove.xy.current.x,
            window.innerWidth - draggable.offsetWidth + left
          )
        );

        draggable.style.top = `${y}px`;
        draggable.style.left = `${x}px`;

        draggable.style.right = "initial";
        draggable.style.bottom = "initial";
      }

      if (datapinch.allow) {
        if (e.touches && e.touches.length === 2) {
          const currentdistance = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );

          if (
            (currentdistance > datapinch.lastdistance &&
              parseInt(draggable.style.width) == 700) ||
            (currentdistance < datapinch.lastdistance &&
              parseInt(draggable.style.width) == 150)
          )
            return (datapinch.lastdistance = currentdistance);

          const scalerelative = currentdistance / datapinch.lastdistance;
          datapinch.scale *= scalerelative;

          datapinch.lastdistance = currentdistance;

          if (!draggable.getAttribute("data-width")) {
            draggable.setAttribute("data-width", draggable.offsetWidth);
          }

          draggable.style.width = `${Math.max(
            150,
            Math.min(
              parseInt(draggable.getAttribute("data-width")) * datapinch.scale,
              700
            )
          )}px`;
        }
      }
    });
    elementMakeDrag.on("end", ({ e, target }) => {
      if (datamove.allow && ((e.touches && !e.touches.length) || !e.touches)) {
        datamove.allow = false;
      }

      if (datapinch.allow && e.touches && e.touches.length != 2) {
        datapinch.allow = false;
      }

      if (e.touches && e.touches.length) return;

      target.style.pointerEvents = "none";
      $elements.divPreviewContent.style.pointerEvents = "";
    });

    draggable.addEventListener(
      "wheel",
      (e) => {
        e.preventDefault();

        const draggablegetBoundingClientRect =
          draggable.getBoundingClientRect();

        draggable.style.width = `${Math.max(
          150,
          Math.min(draggable.offsetWidth - (e.deltaY > 0 ? 10 : -10), 1000)
        )}px`;

        const draggablegetBoundingClientRect2 =
          draggable.getBoundingClientRect();

        const datasss = calculateNewPosition(
          draggablegetBoundingClientRect.top,
          draggablegetBoundingClientRect.left,
          draggablegetBoundingClientRect.width,
          draggablegetBoundingClientRect.height,
          draggablegetBoundingClientRect2.width,
          draggablegetBoundingClientRect2.height
        );

        draggable.style.left = `${datasss.left}px`;
        draggable.style.top = `${datasss.top}px`;

        draggable.style.right = "initial";
        draggable.style.bottom = "initial";
      },
      { passive: false }
    );

    addEventListener("resize", () => {
      if (draggable.style.left != "" || draggable.style.top != "") {
        draggable.style.top = "";
        draggable.style.left = "";
        draggable.style.right = "20px";
        draggable.style.bottom = "20px";
      }
    });

    elementMakeDrag.start();
  };

  function_pmgnvcdirebja();

  return $element;
};

addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

addEventListener("DOMContentLoaded", () => {
  const mrf = window.MyResourceFunction;

  const myApp = dataApp();
  window.dataApp = myApp;

  // return;
  document.getElementById("app").append(
    ...mrf.replaceNodeChildren(
      mrf.createNodeElement(
        `
          <div>
            <div class="container">
              <navigate></navigate>
              <element-route class="routes" class="routes"></element-route>
            </div>
            <navigate-bottom></navigate-bottom>
            <footer-player></footer-player>
          </div>
        `
      ),
      {
        navigate: navigate(),
        "navigate-bottom": navigateBottom(),
        "element-route": routes(),
        "footer-player": footerVideoPlayer(),
      }
    ).childNodes
  );

  dispatchEvent(new CustomEvent("hashchange"));
});
