class ApiWebCuevana {
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

  static _fetchWebResolve(url, resolve) {
    this.fetch(url)
      .then((text) => {
        try {
          const $text = document.createElement("html");
          $text.innerHTML = text;

          Array.from($text.querySelectorAll("img")).forEach((img) => {
            img.setAttribute("srcset", "");
            img.setAttribute("src", "");
          });

          const $data = $text.querySelector("#__NEXT_DATA__");
          const dataJson = JSON.parse($data?.textContent);

          resolve(dataJson);
        } catch (error) {
          resolve(null);
        }
      })
      .catch(() => resolve(null));
  }

  static pelicula(page = 1, genre = "") {
    return new Promise((resolve) => {
      page = Math.max(1, page);

      const url = !genre
        ? `https://cuevana.is/peliculas/page/${page}`
        : `https://cuevana.is/genero/${genre}/page/${page}`;

      this._fetchWebResolve(url, resolve);
    });
  }

  static peliculaId(id) {
    return new Promise((resolve) => {
      const url = `https://cuevana.is/pelicula/${id}/${id}`;
      this._fetchWebResolve(url, resolve);
    });
  }

  static serie(page = 1) {
    return new Promise((resolve) => {
      page = Math.max(1, page);

      const url = `https://cuevana.is/series/page/${page}`;
      this._fetchWebResolve(url, resolve);
    });
  }

  static serieId(id, season = null, chapter = null) {
    return new Promise((resolve) => {
      let url = `https://cuevana.is/serie/${id}/${id}`;
      url +=
        season && chapter ? `/temporada/${season}/episodio/${chapter}` : "";

      this._fetchWebResolve(url, resolve);
    });
  }

  static search(search = "") {
    return new Promise((resolve) => {
      let url = `https://cuevana.is/search?q=${encodeURIComponent(search)}`;
      this._fetchWebResolve(url, resolve);
    });
  }

  static serverUrl(url) {
    return new Promise((resolve) => {
      try {
        new URL(url);

        this.fetch(url)
          .then((text) => {
            try {
              const $text = document.createElement("html");
              $text.innerHTML = text;

              Array.from($text.querySelectorAll("img")).forEach((img) => {
                img.setAttribute("srcset", "");
                img.setAttribute("src", "");
              });

              Array.from($text.querySelectorAll("script")).forEach((script) => {
                if (script.textContent.includes("var url =")) {
                  const callback = [
                    script.textContent.split(";").slice(0, 3).join(";"),
                    "return url",
                  ].join(";");

                  const fnctn = new Function(callback);
                  resolve(fnctn());
                }
              });
              resolve(null);
            } catch (error) {
              resolve(null);
            }
          })
          .catch(() => resolve(null));
      } catch (error) {
        resolve(null);
      }
    });
  }
}
