'use strict';

var buttons = () => {
  const f = window.MyResourceFunction;

  const a = window.dataApp;

  const $element = f.createNodeElement(`
    <div class="app-box-button">
        <button id="buttonChangeMethod" class="app-button">
            ${a.svgIcon("fi fi-rr-letter-case")} 
        </button>
        <hr>
        <button id="buttonSpaceLetter" class="app-button">
            ${a.svgIcon("fi fi-rr-keyboard-brightness-low")} 
        </button>
        <hr>
        <button id="buttonDelete" class="app-button">
            ${a.svgIcon("fi fi-rr-delete")} 
        </button>
    </div>
    `);

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.buttonChangeMethod.addEventListener("click", () => {
    Android.closeKeyboardDefault();
  });

  $elements.buttonSpaceLetter.addEventListener("click", () => {
    Android.sendTextToInput(" ");
  });

  $elements.buttonDelete.addEventListener("click", () => {
    Android.deleteLastChar();
  });

  $elements.buttonDelete.addEventListener("contextmenu", () => {
    Android.clearInput();
  });

  return $element;
};

var buttonsnavigate = () => {
  const f = window.MyResourceFunction;

  const a = window.dataApp;

  const $element = f.createNodeElement(`
    <div class="app-box-button">

        <button id="buttonList" class="app-button">
            ${a.svgIcon("fi fi-rr-list")} 
        </button>
        <hr>

        <button id="buttonTags" class="app-button">
            ${a.svgIcon("fi fi-rr-tags")} 
        </button>
        <hr>

        <button id="buttonKeyboard" class="app-button">
            ${a.svgIcon("fi fi-rr-keyboard")} 
        </button>
 
    </div>
    `);

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.buttonList.addEventListener("click", () => {
    location.hash = "/";
  });

  $elements.buttonTags.addEventListener("click", () => {
    location.hash = "/label";
  });


  $elements.buttonKeyboard.addEventListener("click", () => {
    location.hash = "/keyboard";
  });

  return $element;
};

var inicio = () => {
  const c = window.MyResourceClass;
  const f = window.MyResourceFunction;

  const a = window.dataApp;
  const t = {
    ovalues: {
      dataTrue: f.observeValue([]),
      dataNull: f.observeValue(true),
    },

    values: {
      dataTrue: [],
      item: null,
    },

    events: {},
    renders: {},
    functions: {},

    get: {},
    set: {},
  };

  const $element = c.MyElement.create(
    `
    <div class="div_Xu02Xjh">

        <header class="header_K0hs3I0">
          <div style="display:none;">
            <h3>Inicio</h3>
            <span id="spanLabel" style="font-size:13px">Todos</span>
          </div>
          <div style="display:flex;">
          <elementButtonNavigate></elementButtonNavigate>
          </div>
          <div style="display:flex;">
            <elementButton></elementButton>
            <div class="app-box-button" style="display:none">
              <div class="app-button" style="display:none">
                ${a.svgIcon("fi fi-rr-filter")} 
                <select id="selectLabel" class="app-select-option" my-event="change->changeLabel">
                  <option value>Todos</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        <div class="div_guZ6yID">

          <div id="itemNull" class="loader-i" style="display:none"></div>
          <div id="itemFalse" class="div_b14S3dH" style="display:none">
            <div>
              ${a.svgIcon("custom icon-coffee-question")}
            </div>
            <h3>~ Sin notas ~</h3>
          </div>
          <div id="itemTrue" class="div_3outgsh" my-event="click->openOptions"></div>

        </div>

        <div id="popoverOption" class="div_qNLM8GPMIK" popover>
          <div class="div_XSkmJF69Wy">
            <div class="div_NAhL0gSj9J">
              <div id="popoverOptionAction" class="div_2mkYWblFim">

                <button class="button_Ak0ukl04K8" data-action="delete">
                  <small>${a.svgIcon("fi fi-rr-ban")}</small>
                  <span>Eliminar</span>
                </button>

              </div>
            </div>
          </div>
        </div>
    
    </div>
  `
  ).one(($element) => {
    c.MyElement.replaceChildren($element, {
      elementButtonNavigate: buttonsnavigate(),
      elementButton: buttons(),
    });
  });

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  t.events.addNote = () => {
    location.hash = "/note/add";
  };

  t.events.openOptions = (e) => {
    const item = e.target.closest("[data-item]");

    if (item) {
      const button = e.target.closest("button");

      if (button) {
        const action = button.dataset.action;

        if (action == "open-options") {
          t.values.item = item;
          $elements.popoverOption.showPopover();
        }

        if (action == "send-text") {
          Android.sendTextToInput(button.dataset.value);
        }
      }
    }
  };

  t.events.changeLabel = (e) => {
    $elements.spanLabel.innerText = e.target.selectedOptions[0].innerText;

    t.ovalues.dataNull.value = true;
    $elements.itemTrue.innerHTML = "";
    t.get.dataTrue().then(t.set.dataTrue);
  };

  t.get.dataTrueLabel = () => {
    return new Promise((resolve, reject) => {
      const encodeQueryString = f.encodeQueryObject({
        route: "label",
      });

      fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
        .then((res) => res.json())
        .then((data) => {
          resolve(Array.isArray(data) ? data : []);
        });
    });
  };

  t.set.dataTrueLabel = (array) => {
    $elements.selectLabel.innerHTML = "<option value>Todos</option>";
    $elements.selectLabel.innerHTML += array
      .map((object) => {
        return `<option value="${object.id}">${object.name} (${object.count_notes})</option>`;
      })
      .join("");
  };

  t.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      const id_label = $elements.selectLabel.value;

      const encodeQueryString = f.encodeQueryObject({
        route: "note",
        query_where: JSON.stringify([id_label ? [0, 2, 0, id_label] : []]),
      });

      fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
        .then((res) => res.json())
        .then((data) => {
          resolve(Array.isArray(data) ? data : []);
        });
    });
  };

  t.set.dataTrue = (array) => {
    const template = document.createElement("div");
    template.innerHTML = array
      .map((object) => {
        const _ = {
          title: c.MyString.encode(object.title).toTextarea(),
          description: c.MyString.encode(
            object.description.slice(0, 50)
          ).toTextarea(),

          data: c.MyString.encode(
            JSON.stringify({
              id: object.id,
              id_label: object.id_label,
            })
          ).toInput(),
        };

        console.log(object.description);

        return `
          <div 
            class="div_nsmf6hz" 
            style="overflow:hidden" 
            data-data="${_.data}"
            data-item>
              <button 
                class="a_tx7pl15" 
                data-value="${object.description}"
                data-action="send-text">
                  <div>
                    <span>${_.title}</span>
                    <p>${Array(_?.description?.length ?? 0)
                      .fill("*")
                      .join("")}</p>
                  </div>
              </button>
              <button class="button_cm15sfh" data-action="open-options" style="display:none">
                ${a.svgIcon("fi fi-rr-menu-dots-vertical")}
              </button>
          </div>
        `;
      })
      .join("");

    $elements.itemTrue.append(
      ...Array.from(template.children).map((child) => {
        return child;
      })
    );

    t.ovalues.dataNull.value = true;
    t.ovalues.dataNull.value = false;
  };

  t.ovalues.dataNull.observe((boolean) => {
    const item = Boolean($elements.itemTrue.querySelector("[data-item]"));

    const entries = {
      itemNull: boolean,
      itemFalse: !boolean && !item,
      itemTrue: !boolean && item,
    };

    Object.entries(entries).forEach((entries) => {
      $elements[entries[0]].style.display = entries[1] ? "" : "none";
    });
  });

  a.popover.options($elements.popoverOption, (item) => {
    if (!t.values.item) {
      return true;
    }

    const $item = t.values.item;
    const data = JSON.parse($item.dataset.data);
    const action = item.dataset.action;

    if (action == "manage_shared") {
      location.hash = `/note/${data.id}/share`;
    }

    if (action == "edit") {
      location.hash = `/note/${data.id}`;
    }

    if (action == "delete") {
      if (confirm("¿Eliminar esta nota?")) {
        const encodeQueryString = f.encodeQueryObject({
          route: "note",
          id: data.id,
        });

        fetch(
          a.url.server(`api.php?${encodeQueryString}`),
          a.fetchOptions({
            method: "DELETE",
          })
        )
          .then((res) => res.json())
          .then((data) => {
            $item.remove();
          });
      }
    }

    return true;
  });

  a.myEvent($element, t.events);

  t.get.dataTrue().then(t.set.dataTrue);
  // t.get.dataTrueLabel().then(t.set.dataTrueLabel);

  return $element;
};

var keyboard = () => {
  const c = window.MyResourceClass;
  const f = window.MyResourceFunction;

  const a = window.dataApp;
  ({
    ovalues: {
      dataTrue: f.observeValue([]),
      dataNull: f.observeValue(true),
    },

    values: {
      item: null,
    },

    events: {},
    renders: {},
    functions: {},

    get: {},
    set: {},
  });

  const $element = c.MyElement.create(
    `
    <div class="div_Xu02Xjh">
    
        <header class="header_K0hs3I0">
          <div style="display:flex;">
          <elementButtonNavigate></elementButtonNavigate>
          </div>
          <div style="display:flex;">
            <elementButton></elementButton>
          </div>
        </header>

        <div class="div_guZ6yID" >



            <div tag__vvbr24irie id="keyboard">
            

                <div class="contendedor_teclas">
                
                    ${"qwertyuiop"
                      .split("")
                      .map((letter) => {
                        return `<button data-key="${letter}">${letter}</button>`;
                      })
                      .join("")}
                
                </div>

                <div class="contendedor_teclas">
                
                    ${"asdfghjklñ"
                      .split("")
                      .map((letter) => {
                        return `<button data-key="${letter}">${letter}</button>`;
                      })
                      .join("")}
                
                </div>

                <div class="contendedor_teclas">

                    <button id="lowercase" data-value="uppercase">${a.svgIcon(
                      "fi fi-rr-up"
                    )}</button>
                
                    ${"zxcvbnm"
                      .split("")
                      .map((letter) => {
                        return `<button data-key="${letter}">${letter}</button>`;
                      })
                      .join("")}

                    <button id="buttonDelete">
                    ${a.svgIcon("fi fi-rr-delete")}
                    </button>
                
                </div>

                <div class="contendedor_teclas">
                <button disabled>123</button>
                <button id="buttonComma">,</button>

                <button style="flex: 5;" id="buttonSpace"></button>


                <button id="buttonPeriod">.</button>
                <button id="buttonLineBreak">
                    ${a.svgIcon("fi fi-rr-arrow-turn-down-left")}
                </button>
                </div>

            </div>


        
        </div>
    
    </div>    
    `
  ).one(($element) => {
    c.MyElement.replaceChildren($element, {
      elementButtonNavigate: buttonsnavigate(),
      elementButton: buttons(),
    });
  });

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.lowercase.addEventListener("click", () => {
    const buttons = [...$element.querySelectorAll("button[data-key]")];

    buttons.forEach((button) => {
      button.innerText =
        $elements.lowercase.getAttribute("data-value") == "uppercase"
          ? String(button.innerText).toUpperCase()
          : String(button.innerText).toLowerCase();
    });

    $elements.lowercase.setAttribute(
      "data-value",
      $elements.lowercase.getAttribute("data-value") == "uppercase"
        ? "lowercase"
        : "uppercase"
    );

    // alert("intercalar");
  });

  $elements.keyboard.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    console.log(button);

    if (button) {
      if (button.getAttribute("data-key")) {
        // alert(button.innerText);
        Android.sendTextToInput(button.innerText);
      }
    }
  });

  $elements.buttonSpace.addEventListener("click", () => {
    Android.sendTextToInput(" ");
  });

  $elements.buttonDelete.addEventListener("click", () => {
    Android.deleteLastChar();
  });

  $elements.buttonDelete.addEventListener("contextmenu", () => {
    Android.clearInput();
  });

  $elements.buttonLineBreak.addEventListener("click", () => {
    Android.sendTextToInput("\n");
  });

  $elements.buttonPeriod.addEventListener("click", () => {
    Android.sendTextToInput(".");
  });

  $elements.buttonComma.addEventListener("click", () => {
    Android.sendTextToInput(",");
  });

  return $element;
};

var label = () => {
  const c = window.MyResourceClass;
  const f = window.MyResourceFunction;

  const a = window.dataApp;
  const t = {
    ovalues: {
      dataTrue: f.observeValue([]),
      dataNull: f.observeValue(true),
    },

    values: {
      item: null,
    },

    events: {},
    renders: {},
    functions: {},

    get: {},
    set: {},
  };

  const $element = c.MyElement.create(
    `
    <div class="div_Xu02Xjh">

        <header class="header_K0hs3I0">
          <div style="display:none;">
            <h3>Etiqueta</h3>
            <span id="spanTotalCount" style="font-size:13px">0 etiqueta(s)</span>
          </div>
          <div style="display:flex;">
          <elementButtonNavigate></elementButtonNavigate>
          </div>
          <div style="display:flex;">
            <elementButton></elementButton>
          </div>
        </header>

        <div class="div_guZ6yID">

          <div id="itemNull" class="loader-i" style="display:none"></div>
          <div id="itemFalse" class="div_b14S3dH" style="display:none">
            <div>
              ${a.svgIcon("custom icon-coffee-question")}
            </div>
            <h3>~ Sin etiquetas ~</h3>
            <button my-event="click->addLabel" style="display:none">
              <span>Crear Etiqueta</span>
              <small>${a.svgIcon("fi fi-rr-plus")}</small>
            </button>
          </div>
          <div id="itemTrue" class="div_3outgsh" my-event="click->openOptions"></div>

        </div>

        <div id="popoverOption" class="div_qNLM8GPMIK" popover>
          <div class="div_XSkmJF69Wy">
            <div class="div_NAhL0gSj9J">
              <div id="popoverOptionAction" class="div_2mkYWblFim">
                <button class="button_Ak0ukl04K8" data-action="edit">
                  <small>${a.svgIcon("fi fi-rr-pencil")}</small>
                  <span>Editar</span>
                </button>
                <button class="button_Ak0ukl04K8" data-action="delete">
                  <small>${a.svgIcon("fi fi-rr-ban")}</small>
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  `
  ).one(($element) => {
    c.MyElement.replaceChildren($element, {
      elementButtonNavigate: buttonsnavigate(),
      elementButton: buttons(),
    });
  });

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  t.events.addLabel = () => {
    const name = prompt("ingrese nombre de la etiqueta");

    if (Boolean(name.trim())) {
      const encodeQueryString = f.encodeQueryObject({
        route: "label",
      });

      const body = {
        name: name,
      };

      fetch(
        a.url.server(`api.php?${encodeQueryString}`),
        a.fetchOptions({
          method: "POST",
          body: JSON.stringify(body),
        })
      )
        .then((res) => res.json())
        .then(() => {
          $elements.itemTrue.innerHTML = "";
          t.get.dataTrue().then(t.set.dataTrue);
          t.get.dataTrueTotalCount().then(t.set.dataTrueTotalCount);
        });
    }
  };

  t.events.openOptions = (e) => {
    const item = e.target.closest("[data-item]");

    if (item) {
      t.values.item = item;
      $elements.popoverOption.showPopover();
    }
  };

  t.get.dataTrueTotalCount = () => {
    return new Promise((resolve, reject) => {
      const encodeQueryString = f.encodeQueryObject({
        route: "label",
        query: 1,
        query_limit: "one",
      });

      fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
        .then((res) => res.json())
        .then((data) => {
          resolve(Number(data.total_count) || 0);
        });
    });
  };

  t.set.dataTrueTotalCount = (number) => {
    $elements.spanTotalCount.innerText = `${number} etiqueta(s)`;
  };

  t.set.dataTrue = (array) => {
    const template = document.createElement("div");
    template.innerHTML = array
      .map((object) => {
        const _ = {
          name: c.MyString.encode(object.name).toTextarea(),
          count: object.count_notes,
        };

        return `
          <div 
            class="div_nsmf6hz" 
            data-id="${object.id}" 
            data-name="${object.name}" 
            data-item>
              <a href="#/label/${object.id}" class="a_tx7pl15">
                <div>
                  <span>${_.name}</span>
                  <p>${_.count} nota(s)</p>
                </div>
              </a>
              <button 
                class="button_cm15sfh" 
                data-action="open-option"
                style="display:none"
                >
                  ${a.svgIcon("fi fi-rr-menu-dots-vertical")}
            </button>
          </div>
        `;
      })
      .join("");

    $elements.itemTrue.append(
      ...Array.from(template.children).map((child) => {
        return child;
      })
    );

    t.ovalues.dataNull.value = true;
    t.ovalues.dataNull.value = false;
  };

  t.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      const encodeQueryString = f.encodeQueryObject({
        route: "label",
        limit: 40,
      });

      fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
        .then((res) => res.json())
        .then((data) => {
          resolve(Array.isArray(data) ? data : []);
        });
    });
  };

  t.ovalues.dataNull.observe((boolean) => {
    const item = Boolean($elements.itemTrue.querySelector("[data-item]"));

    const entries = {
      itemNull: boolean,
      itemFalse: !boolean && !item,
      itemTrue: !boolean && item,
    };

    Object.entries(entries).forEach((entries) => {
      $elements[entries[0]].style.display = entries[1] ? "" : "none";
    });
  });

  a.popover.options($elements.popoverOption, (button) => {
    if (!t.values.item) {
      return true;
    }

    const action = button.dataset.action;

    if (action == "delete") {
      if (confirm("¿Eliminar Etiqueta?")) {
        const encodeQueryString = f.encodeQueryObject({
          route: "label",
          id: t.values.item.dataset.id,
        });

        fetch(
          a.url.server(`api.php?${encodeQueryString}`),
          a.fetchOptions({
            method: "DELETE",
          })
        )
          .then((res) => res.json())
          .then((data) => {
            $elements.popoverOption.hidePopover();
            t.values.item = null;

            $elements.itemTrue.innerHTML = "";
            t.get.dataTrue().then(t.set.dataTrue);
            t.get.dataTrueTotalCount().then(t.set.dataTrueTotalCount);
            console.log(data);
          });
      }
    }

    if (action == "edit") {
      const name = prompt(
        "ingrese nombre de la etiqueta",
        t.values.item.dataset.name
      );

      if (Boolean(name.trim())) {
        const encodeQueryString = f.encodeQueryObject({
          route: "label",
          id: t.values.item.dataset.id,
        });

        const body = {
          name: name,
        };

        fetch(
          a.url.server(`api.php?${encodeQueryString}`),
          a.fetchOptions({
            method: "PATCH",
            body: JSON.stringify(body),
          })
        )
          .then((res) => res.json())
          .then(() => {
            $elements.popoverOption.hidePopover();
            t.values.item = null;

            $elements.itemTrue.innerHTML = "";
            t.get.dataTrue().then(t.set.dataTrue);
          });
      }
    }
  });

  a.myEvent($element, t.events);

  t.get.dataTrue().then(t.set.dataTrue);
  t.get.dataTrueTotalCount().then(t.set.dataTrueTotalCount);

  return $element;
};

var labelId = () => {
  const c = window.MyResourceClass;
  const f = window.MyResourceFunction;

  const a = window.dataApp;
  const t = {
    params: a.routes.params(),

    ovalues: {
      dataTrue: f.observeValue([]),
      dataNull: f.observeValue(true),
    },

    values: {
      dataTrue: [],
      item: null,
    },

    events: {},
    renders: {},
    functions: {},

    get: {},
    set: {},
  };

  const $element = c.MyElement.create(
    `
    <div class="div_Xu02Xjh">

        <header class="header_K0hs3I0">
          <div>

            <div class="app-box-button">
              <a href="#/label" id="buttonSpaceLetter" class="app-button">
                ${a.svgIcon("fi fi-rr-arrow-left")} 
              </a>
            </div>

            <div style="display:none;">
              <h3>Inicio</h3>
              <span id="spanLabel" style="font-size:13px">Todos</span>
            </div>
          </div>
          <div style="display:flex;">
            <elementButton></elementButton>
            <div class="app-box-button" style="display:none">
              <div class="app-button" style="display:none">
                ${a.svgIcon("fi fi-rr-filter")} 
                <select id="selectLabel" class="app-select-option" my-event="change->changeLabel">
                  <option value>Todos</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        <div class="div_guZ6yID">

          <div id="itemNull" class="loader-i" style="display:none"></div>
          <div id="itemFalse" class="div_b14S3dH" style="display:none">
            <div>
              ${a.svgIcon("custom icon-coffee-question")}
            </div>
            <h3>~ Lista vacia ~</h3>
          </div>
          <div id="itemTrue" class="div_3outgsh" my-event="click->openOptions"></div>

        </div>

        <div id="popoverOption" class="div_qNLM8GPMIK" popover>
          <div class="div_XSkmJF69Wy">
            <div class="div_NAhL0gSj9J">
              <div id="popoverOptionAction" class="div_2mkYWblFim">

                <button class="button_Ak0ukl04K8" data-action="delete">
                  <small>${a.svgIcon("fi fi-rr-ban")}</small>
                  <span>Eliminar</span>
                </button>

              </div>
            </div>
          </div>
        </div>
    
    </div>
  `
  ).one(($element) => {
    c.MyElement.replaceChildren($element, {
      elementButton: buttons(),
    });
  });

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  t.events.addNote = () => {
    location.hash = "/note/add";
  };

  t.events.openOptions = (e) => {
    const item = e.target.closest("[data-item]");

    if (item) {
      const button = e.target.closest("button");

      if (button) {
        const action = button.dataset.action;

        if (action == "open-options") {
          t.values.item = item;
          $elements.popoverOption.showPopover();
        }

        if (action == "send-text") {
          Android.sendTextToInput(button.dataset.value);
        }
      }
    }
  };

  t.events.changeLabel = (e) => {
    $elements.spanLabel.innerText = e.target.selectedOptions[0].innerText;

    t.ovalues.dataNull.value = true;
    $elements.itemTrue.innerHTML = "";
    t.get.dataTrue().then(t.set.dataTrue);
  };

  t.get.dataTrueLabel = () => {
    return new Promise((resolve, reject) => {
      const encodeQueryString = f.encodeQueryObject({
        route: "label",
      });

      fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
        .then((res) => res.json())
        .then((data) => {
          resolve(Array.isArray(data) ? data : []);
        });
    });
  };

  t.set.dataTrueLabel = (array) => {
    $elements.selectLabel.innerHTML = "<option value>Todos</option>";
    $elements.selectLabel.innerHTML += array
      .map((object) => {
        return `<option value="${object.id}">${object.name} (${object.count_notes})</option>`;
      })
      .join("");
  };

  t.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      const id_label = t.params.id;

      const encodeQueryString = f.encodeQueryObject({
        route: "note",
        query_where: JSON.stringify([id_label ? [0, 2, 0, id_label] : []]),
      });

      fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
        .then((res) => res.json())
        .then((data) => {
          resolve(Array.isArray(data) ? data : []);
        });
    });
  };

  t.set.dataTrue = (array) => {
    const template = document.createElement("div");
    template.innerHTML = array
      .map((object) => {
        const _ = {
          title: c.MyString.encode(object.title).toTextarea(),
          description: c.MyString.encode(
            object.description.slice(0, 50)
          ).toTextarea(),

          data: c.MyString.encode(
            JSON.stringify({
              id: object.id,
              id_label: object.id_label,
            })
          ).toInput(),
        };

        console.log(object.description);

        return `
          <div 
            class="div_nsmf6hz" 
            style="overflow:hidden" 
            data-data="${_.data}"
            data-item>
              <button 
                class="a_tx7pl15" 
                data-value="${object.description}"
                data-action="send-text">
                  <div>
                    <span>${_.title}</span>
                    <p>${_.description}</p>
                  </div>
              </button>
              <button class="button_cm15sfh" data-action="open-options" style="display:none">
                ${a.svgIcon("fi fi-rr-menu-dots-vertical")}
              </button>
          </div>
        `;
      })
      .join("");

    $elements.itemTrue.append(
      ...Array.from(template.children).map((child) => {
        return child;
      })
    );

    t.ovalues.dataNull.value = true;
    t.ovalues.dataNull.value = false;
  };

  t.ovalues.dataNull.observe((boolean) => {
    const item = Boolean($elements.itemTrue.querySelector("[data-item]"));

    const entries = {
      itemNull: boolean,
      itemFalse: !boolean && !item,
      itemTrue: !boolean && item,
    };

    Object.entries(entries).forEach((entries) => {
      $elements[entries[0]].style.display = entries[1] ? "" : "none";
    });
  });

  a.popover.options($elements.popoverOption, (item) => {
    if (!t.values.item) {
      return true;
    }

    const $item = t.values.item;
    const data = JSON.parse($item.dataset.data);
    const action = item.dataset.action;

    if (action == "manage_shared") {
      location.hash = `/note/${data.id}/share`;
    }

    if (action == "edit") {
      location.hash = `/note/${data.id}`;
    }

    if (action == "delete") {
      if (confirm("¿Eliminar esta nota?")) {
        const encodeQueryString = f.encodeQueryObject({
          route: "note",
          id: data.id,
        });

        fetch(
          a.url.server(`api.php?${encodeQueryString}`),
          a.fetchOptions({
            method: "DELETE",
          })
        )
          .then((res) => res.json())
          .then((data) => {
            $item.remove();
          });
      }
    }

    return true;
  });

  a.myEvent($element, t.events);

  t.get.dataTrue().then(t.set.dataTrue);
  // t.get.dataTrueLabel().then(t.set.dataTrueLabel);

  return $element;
};

var login = () => {
  const f = window.MyResourceFunction;

  const a = window.dataApp;

  const $element = f.createNodeElement(`
    <div class="div_7wOjGZ8 app-scroll-y">
        <form id="form" class="div_SCqCUTo" autocomplete="off">
            <h2 style="padding: 0 20px;">Iniciar sesion</h2>
            <div class="div_Y85zRC0">
                <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                  <input type="text" name="email" placeholder="">
                  <span>correo</span>
                </label>
                <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                  <input type="password" name="password" placeholder="" autocomplete="off">
                  <span>contraseña</span>
                </label>
            </div>
            <a href="#/password-recover" class="a_c305F1l">recuperar contraseña</a>
            <button class="button_WU25psx">
                <span id="spanLoad">Ingresar</span>
                ${a.svgIcon("fi fi-rr-arrow-right")}
            </button>
            <a href="#/register" class="a_8hzaMUg">
                <span>registro</span>
                ${a.svgIcon("fi fi-rr-arrow-right")}
            </a>
        </form>
    </div>   
  `);

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      email: $elements.form.email.value.trim(),
      password: $elements.form.password.value.trim(),
    };

    // if ([data.email, data.password].includes("")) {
    //   return dispatchEvent(
    //     new CustomEvent("_notification", {
    //       detail: {
    //         message: "Los campos estan vacios",
    //         name: "warning",
    //         duration: 3000,
    //       },
    //     })
    //   );
    // }

    const encodeQueryString = f.encodeQueryObject({
      route: "auth.login",
    });

    fetch(a.url.server(`/api.php?${encodeQueryString}`), {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        localStorage.setItem(a.ta, data.token);
        location.hash = "/";

        // if (data && data.status) {
        //   Cookie.set(a.auth, data.token, {
        //     lifetime: 60 * 60 * 24 * 7,
        //   });
        //   location.hash = "/";
        // } else {
        //   dispatchEvent(
        //     new CustomEvent("_notification", {
        //       detail: {
        //         message: data.message ?? "Ocurrio un error",
        //         name: "danger",
        //         duration: 3000,
        //       },
        //     })
        //   );
        // }
      });
  });

  return $element;
};

var noteId = () => {
  const f = window.MyResourceFunction;

  const a = window.dataApp;
  const t = {
    params: a.routes.params(),
    events: {},
    functions: {},

    get: {},
    set: {},
    values: {},
  };

  const $element = f.createNodeElement(`
    <div class="div_Xu02Xjh" style="position:fixed">

        <header class="header_K0hs3I0">
          <div style="display:flex;">
            <a href="#/" class="app-button">
              ${a.svgIcon("fi fi-rr-angle-left")} 
            </a>
          </div>
          <div style="display:grid; text-align:center; gap:5px">
            <select id="selectLabel" class="select_tstp0u9">
              <option value>-</option>
            </select>
            <span style="font-size:13px">15 de julio del 2024|5:00 pm</span>
          </div>
          <div style="display:flex;">
            <button class="app-button" my-event="click->openOptions">
              ${a.svgIcon("fi fi-rr-menu-dots-vertical")} 
            </button>
          </div>
        </header>

        <div class="div_guZ6yID">

          <div class="loader-i" style="display:none"></div>
          <div class="div_b14S3dH" style="display:none">
            <div>
              ${a.svgIcon("custom icon-coffee-question")}
            </div>
            <h3>~ La nota no existe ~</h3>
          </div>

          <div class="div_uuz7qkj">

            <form id="form" class="form_xmz68jo" autocomplete="off" my-event="submit->handleSubmit">

                <input type="text" name="title" placeholder="Titulo">
                <textarea name="content" placeholder="Contenido..." style="scrollbar-width: thin"></textarea>

                <button type="submit" class="app-button">
                  ${a.svgIcon("fi fi-rr-check")} 
                </button>

            </form>

          </div>
           
        </div>


        <div id="popoverOption" class="div_qNLM8GPMIK" popover>
          <div class="div_XSkmJF69Wy">
            <div class="div_NAhL0gSj9J">
              <div id="popoverOptionAction" class="div_2mkYWblFim">
                <a 
                  href="${location.hash}/share" 
                  class="button_Ak0ukl04K8" 
                  data-action="see">
                    <small>${a.svgIcon("fi fi-rr-link")}</small>
                  <span>Administrar enlaces</span>
                </a>
                <button class="button_Ak0ukl04K8" data-action="delete">
                  <small>${a.svgIcon("fi fi-rr-ban")}</small>
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>
  `);

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  t.events.handleSubmit = (e) => {
    e.preventDefault();

    const encodeQueryString = f.encodeQueryObject({
      route: "note",
      id: t.params.id,
    });

    const body = {
      id_label: $elements.selectLabel.value,
      title: $elements.form.title.value,
      description: $elements.form.content.value,
    };

    fetch(
      a.url.server(`api.php?${encodeQueryString}`),
      a.fetchOptions({
        method: t.params.id ? "PATCH" : "POST",
        body: JSON.stringify(body),
      })
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        if (t.params.id) {
          alert("actualizado");
        } else {
          location.hash = `/note/${data.table.columns.id}`;
        }
      });
  };

  t.events.openOptions = () => {
    $elements.popoverOption.showPopover();
  };

  t.get.dataTrueLabel = () => {
    return new Promise((resolve, reject) => {
      const encodeQueryString = f.encodeQueryObject({
        route: "label",
      });

      fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
        .then((res) => res.json())
        .then((data) => {
          resolve(Array.isArray(data) ? data : []);
        });
    });
  };

  t.set.dataTrueLabel = (array) => {
    $elements.selectLabel.innerHTML = "<option value>-</option>";
    $elements.selectLabel.innerHTML += array
      .map((object) => {
        return `<option value="${object.id}">${object.name} (${object.count_notes})</option>`;
      })
      .join("");
  };

  t.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      if (t.params.id) {
        const encodeQueryString = f.encodeQueryObject({
          route: "note",
          query: 1,
          query_limit: "one",
          query_where: JSON.stringify([[0, 0, 0, t.params.id]]),
        });

        fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
          .then((res) => res.json())
          .then((data) => {
            resolve(
              Object.entries(data).reduce((prev, curr) => {
                prev[curr[0]] = JSON.parse(curr[1]);
                return prev;
              }, {})
            );
          });
      } else {
        resolve({
          note: {
            title: "",
            description: "",
          },
          label: {
            id: null,
            name: "",
          },
        });
      }
    });
  };

  t.set.dataTrue = (object) => {
    console.log(object);
    $elements.selectLabel.value = object.note.id_label;

    $elements.form.title.value = object.note.title;
    $elements.form.content.value = object.note.description;
  };

  a.popover.options($elements.popoverOption, (item) => {
    const action = item.dataset.action;

    if (action == "delete") {
      if (confirm("¿Eliminar esta nota?")) {
        console.log("eliminar");

        const encodeQueryString = f.encodeQueryObject({
          route: "note",
          id: t.params.id,
        });

        fetch(
          a.url.server(`api.php?${encodeQueryString}`),
          a.fetchOptions({
            method: "DELETE",
          })
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      }
    }

    return true;
  });

  Promise.all([t.get.dataTrueLabel(), t.get.dataTrue()]).then((results) => {
    t.set.dataTrueLabel(results[0]);
    t.set.dataTrue(results[1]);
  });

  a.myEvent($element, t.events);

  return $element;
};

var noteIdShare = () => {
  const f = window.MyResourceFunction;

  const a = window.dataApp;
  const t = {
    params: a.routes.params(),

    events: {},
    renders: {},
    functions: {},

    get: {},
    set: {},

    ovalues: {
      dataNull: f.observeValue(true),
    },
    values: {
      dataTrue: [],
    },
  };

  const $element = f.createNodeElement(`
    <div class="div_Xu02Xjh" style="position:fixed">

        <header class="header_K0hs3I0">
          <div style="display:flex;">
            <a href="#/note/${t.params.id}" class="app-button">
              ${a.svgIcon("fi fi-rr-angle-left")} 
            </a>
          </div>
          <div>
            <h3>Administrar compartidos</h3>
          </div>
          <div style="display:flex;">
            <button class="app-button" my-event="click->addShare">
              ${a.svgIcon("fi fi-rr-plus")} 
            </button>
          </div>
        </header>

        <div class="div_guZ6yID">

          <div id="itemNull" class="loader-i" style="display:none"></div>
          <div id="itemFalse" class="div_b14S3dH" style="display:none">
            <div>
              ${a.svgIcon("custom icon-coffee-question")}
            </div>
            <h3>~ Lista vacia ~</h3>
            <button my-event="click->addShare">
              <span>Crear enlace</span>
              <small>${a.svgIcon("fi fi-rr-plus")}</small>
            </button>
          </div>
          <div id="itemTrue" class="div_3outgsh" my-event="click->deleteShare"></div>

        </div>
    
    </div>
  `);

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  t.events.addShare = () => {
    const encodeQueryString = f.encodeQueryObject({
      route: "share",
    });

    fetch(
      a.url.server(`api.php?${encodeQueryString}`),
      a.fetchOptions({
        method: "POST",
        body: JSON.stringify({
          id_note: t.params.id,
        }),
      })
    )
      .then((res) => res.json())
      .then((data) => {
        alert(data?.message ?? "");

        if (data?.status) {
          $elements.itemTrue.innerHTML = "";
          t.get.dataTrue().then(t.set.dataTrue);
        }
      });
  };

  t.events.deleteShare = (e) => {
    const button = e.target.closest("button");
    if (button) {
      if (confirm("¿Eliminar este enlace?")) {
        const encodeQueryString = f.encodeQueryObject({
          route: "share",
          id: button.dataset.id,
        });

        fetch(
          a.url.server(`api.php?${encodeQueryString}`),
          a.fetchOptions({
            method: "DELETE",
          })
        )
          .then((res) => res.json())
          .then((data) => {
            $elements.itemTrue.innerHTML = "";
            t.get.dataTrue().then(t.set.dataTrue);
          });
      }
    }
  };

  t.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      const encodeQueryString = f.encodeQueryObject({
        route: "share",
        query: 1,
        query_where: JSON.stringify([[0, 1, 0, t.params.id]]),
      });

      fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
        .then((res) => res.json())
        .then((data) => {
          resolve(t.set.dataTrue(Array.isArray(data) ? data : []));
        });
    });
  };

  t.set.dataTrue = (array = []) => {
    const template = document.createElement("div");
    template.innerHTML = array
      .map((object) => {
        return `
        <div class="div_nsmf6hz" style="overflow:hidden" data-item>
          <a 
            href="#/note/${object.id}" 
            class="a_tx7pl15" style="pointer-events:none">
              <div >
                <span>${object.id}</span>
                <p>2022/07/15 00:00</p>
              </div>
          </a>
          <button class="button_cm15sfh" data-id="${object.id}">
            ${a.svgIcon("fi fi-rr-link-slash")}
          </button>
        </div>
      `;
      })
      .join("");

    $elements.itemTrue.append(
      ...Array.from(template.children).map((child) => {
        return child;
      })
    );

    t.ovalues.dataNull.value = true;
    t.ovalues.dataNull.value = false;
    return array;
  };

  t.ovalues.dataNull.observe((boolean) => {
    const item = Boolean($elements.itemTrue.querySelector("[data-item]"));

    const entries = {
      itemNull: boolean,
      itemFalse: !boolean && !item,
      itemTrue: !boolean && item,
    };

    Object.entries(entries).forEach((entries) => {
      $elements[entries[0]].style.display = entries[1] ? "" : "none";
    });
  });

  a.myEvent($element, t.events);
  t.get.dataTrue().then(t.set.dataTrue());

  return $element;
};

var passwordRecover = () => {
  const f = window.MyResourceFunction;

  const a = window.dataApp;

  const $element = f.createNodeElement(`
          <div class="div_7wOjGZ8 app-scroll-y">
              <form id="form" class="div_SCqCUTo" autocomplete="off">
                  <h2 style="padding: 0 20px;">Recuperar contraseña</h2>
                  <div class="div_Y85zRC0">
                      <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                          <input type="text" name="email" placeholder="">
                          <span>correo</span>
                      </label>
                  </div>
                  <button class="button_WU25psx">
                      <span id="spanLoad">Enviar</span>
                      ${a.svgIcon("fi fi-rr-arrow-right")}
                  </button>
                  <a href="#/login" class="a_8hzaMUg">
                      <span>Iniciar sesion</span>
                      ${a.svgIcon("fi fi-rr-arrow-right")}
                  </a>
              </form>
          </div>   
      `);

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      email: $elements.form.email.value.trim(),
    };

    if ([data.email].includes("")) {
      return dispatchEvent(
        new CustomEvent("_notification", {
          detail: {
            message: "Los campos estan vacios",
            name: "warning",
            duration: 3000,
          },
        })
      );
    }

    const encodeQueryString = encodeQueryObject({
      route: "auth.password.recover",
    });

    fetch(a.url.server(`/api.php?${encodeQueryString}`), {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status)
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: "Revise su email para restablecer su contraseña",
                name: "info",
                duration: 7000,
              },
            })
          );
        else
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: res.message ?? "Ocurrio un error",
                name: "warning",
              },
            })
          );
      })
      .catch(() => {
        dispatchEvent(
          new CustomEvent("_notification", {
            detail: { message: "Ocurrio un error", name: "danger" },
          })
        );
      });
  });

  return $element;
};

var register = () => {
  const f = window.MyResourceFunction;

  const a = window.dataApp;

  const $element = f.createNodeElement(`
    <div class="div_7wOjGZ8 app-scroll-y">
        <form id="form" class="div_SCqCUTo" autocomplete="off">
            <h2 style="padding: 0 20px;">Registro</h2>
            <div class="div_Y85zRC0">
                <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                  <input type="text" name="fullname" placeholder="">
                  <span>Nombre</span>
                </label>
                <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                  <input type="text" name="lastname" placeholder="">
                  <span>Apellido</span>
                </label>
                <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                  <input type="text" name="email" placeholder="">
                  <span>Correo</span>
                </label>
                <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                  <input type="password" name="password" placeholder="" autocomplete="off">
                  <span>Contraseña</span>
                </label>
            </div>
            <button class="button_WU25psx">
                <span id="spanLoad">Crear cuenta</span>
                ${a.svgIcon("fi fi-rr-arrow-right")}
            </button>
            <a href="#/login" class="a_8hzaMUg">
                <span>Ingresar</span>
                ${a.svgIcon("fi fi-rr-arrow-right")}
            </a>
        </form>
    </div>   
  `);

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      fullname: $elements.form.fullname.value.trim(),
      lastname: $elements.form.lastname.value.trim(),
      email: $elements.form.email.value.trim(),
      password: $elements.form.password.value.trim(),
    };

    // if ([data.email, data.password].includes("")) {
    //   return dispatchEvent(
    //     new CustomEvent("_notification", {
    //       detail: {
    //         message: "Los campos estan vacios",
    //         name: "warning",
    //         duration: 3000,
    //       },
    //     })
    //   );
    // }

    const encodeQueryString = f.encodeQueryObject({
      route: "auth.register",
    });

    fetch(a.url.server(`/api.php?${encodeQueryString}`), {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // if (data && data.status) {
        //   Cookie.set(a.auth, data.token, {
        //     lifetime: 60 * 60 * 24 * 7,
        //   });
        //   location.hash = "/";
        // } else {
        //   dispatchEvent(
        //     new CustomEvent("_notification", {
        //       detail: {
        //         message: data.message ?? "Ocurrio un error",
        //         name: "danger",
        //         duration: 3000,
        //       },
        //     })
        //   );
        // }
      });
  });

  return $element;
};

var setting = () => {
  const f = window.MyResourceFunction;

  const a = window.dataApp;

  const $element = f.createNodeElement(`
      <div class="div_Xu02Xjh">
          <header class="header_K0hs3I0">

              <div class="div_uNg74XS" style="display:flex; align-items:center; gap: 10px">
                  <a href="#/" class="app-button button_YWxwK2P" style="border-radius:15px">
                    ${a.svgIcon("fi fi-rr-angle-small-left")}
                  </a>
                  <h3 id="textTitle">Configuracion</h3>
              </div>

          </header>
          <div class="div_guZ6yID" style="padding:10px;">
            <div class="div_gVQO1KR">
                <div class="div_cq16fYP">
                  <a 
                    href="#/profile"
                    class="app-style-var d-flex-center-y" style="--pd:10px; --g:10px; --h:60px; display:none">
                    <small class="app-square-var d-flex-center">
                      ${a.svgIcon("fi fi-rr-user")}
                    </small>
                    <span>Cuenta</span>
                  </a>
                  <a href="#/theme" class="app-style-var d-flex-center-y" style="--pd:10px; --g:10px; --h:60px;">
                    <small class="app-square-var d-flex-center">
                      ${a.svgIcon("fi fi-rr-palette")}
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

var share = () => {
  const c = window.MyResourceClass;
  const f = window.MyResourceFunction;

  const a = window.dataApp;
  const t = {
    ovalues: {
      dataTrue: f.observeValue([]),
      dataNull: f.observeValue(true),
    },
    values: {
      dataTrue: [],
    },

    events: {},
    renders: {},
    functions: {},

    get: {},
    set: {},
  };

  const $element = f.createNodeElement(`
    <div class="div_Xu02Xjh">

        <header class="header_K0hs3I0">
          <div>
            <h3>Compartidos</h3>
            <span id="spanTotalCount" style="font-size:13px">0 compartido(s)</span>
          </div>
          <div style="display:flex;">
            <button class="app-button" my-event="click->deleteShareAll">
              ${a.svgIcon("fi fi-rr-link-slash")} 
            </button>
          </div>
        </header>

        <div class="div_guZ6yID">

          <div id="itemNull" class="loader-i" style="display:none"></div>
          <div id="itemFalse" class="div_b14S3dH" style="display:none">
            <div>
              ${a.svgIcon("custom icon-coffee-question")}
            </div>
            <h3>~ No hay compartidos ~</h3>
          </div>
          <div id="itemTrue" class="div_3outgsh" my-event="click->deleteShare"></div>

        </div>
    
    </div>
  `);

  const $elements = f.createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  t.events.deleteShare = (e) => {
    const button = e.target.closest("button");
    if (button) {
      if (confirm("¿Eliminar este enlace?")) {
        const encodeQueryString = f.encodeQueryObject({
          route: "share",
          id: button.dataset.id,
        });

        fetch(
          a.url.server(`api.php?${encodeQueryString}`),
          a.fetchOptions({
            method: "DELETE",
          })
        )
          .then((res) => res.json())
          .then((data) => {
            $elements.itemTrue.innerHTML = "";

            t.get.dataTrue().then(t.set.dataTrue);
            t.get.dataTrueTotalCount().then(t.set.dataTrueTotalCount);
          });
      }
    }
  };

  t.events.deleteShareAll = () => {
    if (confirm("¿Eliminar todos los enlaces?")) {
      const encodeQueryString = f.encodeQueryObject({
        route: "share-all",
      });

      fetch(
        a.url.server(`api.php?${encodeQueryString}`),
        a.fetchOptions({
          method: "DELETE",
        })
      )
        .then((res) => res.json())
        .then(() => {
          $elements.itemTrue.innerHTML = "";

          t.get.dataTrue().then(t.set.dataTrue);
          t.get.dataTrueTotalCount().then(t.set.dataTrueTotalCount);
        });
    }
  };

  t.get.dataTrueTotalCount = () => {
    return new Promise((resolve, reject) => {
      const encodeQueryString = f.encodeQueryObject({
        route: "share",
        query: 2,
        query_limit: "one",
      });

      fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
        .then((res) => res.json())
        .then((data) => {
          resolve(Number(data.total_count) || 0);
        });
    });
  };

  t.set.dataTrueTotalCount = (number) => {
    $elements.spanTotalCount.innerText = `${number} compartido(s)`;
  };

  t.get.dataTrue = () => {
    return new Promise((resolve, reject) => {
      const encodeQueryString = f.encodeQueryObject({
        route: "share",
      });

      fetch(a.url.server(`api.php?${encodeQueryString}`), a.fetchOptions())
        .then((res) => res.json())
        .then((data) => {
          resolve(Array.isArray(data) ? data : []);
        });
    });
  };

  t.set.dataTrue = (array) => {
    const children = c.MyElement.create(
      array.map((object) => {
        const _ = {
          title: c.MyString.encode(object.title).toTextarea(),
          description: c.MyString.encode(
            object.description.slice(0, 50)
          ).toTextarea(),
        };

        console.log(_);
        // console.log(object);

        return `
          <div class="div_nsmf6hz" style="overflow:hidden" data-item>
            <a href="#/note/${object.id_note}" class="a_tx7pl15" >
              <div >
                <span>${_.title}</span>
                <p>${_.description}...</p>
              </div>
            </a>
            <button class="button_cm15sfh" data-id="${object.id}">
              ${a.svgIcon("fi fi-rr-link-slash")}
            </button>
          </div>
        `;
      })
    ).all();

    $elements.itemTrue.append(
      ...children.map((child) => {
        return child;
      })
    );

    t.ovalues.dataNull.value = true;
    t.ovalues.dataNull.value = false;
  };

  t.ovalues.dataNull.observe((boolean) => {
    const item = Boolean($elements.itemTrue.querySelector("[data-item]"));

    const entries = {
      itemNull: boolean,
      itemFalse: !boolean && !item,
      itemTrue: !boolean && item,
    };

    Object.entries(entries).forEach((entries) => {
      $elements[entries[0]].style.display = entries[1] ? "" : "none";
    });
  });

  a.myEvent($element, t.events);
  t.get.dataTrue().then(t.set.dataTrue);
  t.get.dataTrueTotalCount().then(t.set.dataTrueTotalCount);
  
  return $element;
};

var theme = () => {
  const f = window.MyResourceFunction;

  const useApp = window.dataApp;
  const useThis = {
    instances: {},
    values: {},
    functions: {},
    themes: {
      dark: {
        "--app-color-background": "#1A1A1A",
        "--app-color-background-second": "#000000",
        "--app-color-background-ii": "#000000",
        "--app-color-background-transparent": "rgb(255 255 255 / 0.1)",
        "--app-color-letter": "#ffffff",
        "--app-color-letter-second": "#ffffff",
        "--app-color-letter-ii": "#ffffff",
        "--app-color-item": "#000000",
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

  const $element = f.createNodeElement(`
        <div class="div_Xu02Xjh div_MN7ZWeX">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS" style="display:flex; align-items:center; gap: 10px">
                    <a href="#/setting" class="app-button button_YWxwK2P" style="border-radius:15px">
                        ${useApp.svgIcon("fi fi-rr-angle-small-left")}
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

  $element.querySelectorAll("[data-theme]").forEach((element) => {
    element.addEventListener("change", () => {
      const theme = ((theme) => {
        if (theme == "light") return useThis.themes.light;
        if (theme == "dark") return useThis.themes.dark;
        if (theme == "system") {
          if (window.matchMedia("(prefers-color-scheme: light)").matches) {
            return useThis.themes.light;
          }

          if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return useThis.themes.dark;
          }
        }

        return useThis.themes.light;
      })(element.getAttribute("data-theme"));

      Object.entries(theme).forEach((entries) => {
        document.documentElement.style.setProperty(entries[0], entries[1]);
      });

      useApp.elements.metaColor.setAttribute(
        "content",
        theme["--app-color-background"]
      );

      localStorage.setItem("theme", element.getAttribute("data-theme"));
    });

    if (localStorage.getItem("theme") == element.getAttribute("data-theme")) {
      element.checked = true;
      element.dispatchEvent(new CustomEvent("change"));
    }
  });

  window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => {
      if (localStorage.getItem("theme") == "system") {
        const theme = e.matches ? useThis.themes.light : useThis.themes.dark;

        Object.entries(theme).forEach((entries) => {
          document.documentElement.style.setProperty(entries[0], entries[1]);
        });

        useApp.elements.metaColor.setAttribute(
          "content",
          theme["--app-color-background"]
        );
      }
    });

  return $element;
};

var routes = () => {
  const useApp = window.dataApp;
  const $element = document.createElement("div");

  useApp.routes.set("hash", [
    { hash: "/", element: inicio, private: true },
    { hash: "/keyboard", element: keyboard, private: true },

    { hash: "/label", element: label, private: false },
    { hash: "/label/:id", element: labelId, private: false },
    { hash: "/share/list", element: share, private: true },

    { hash: "/note/add", element: noteId, private: true },
    { hash: "/note/:id", element: noteId, private: true },
    { hash: "/note/:id/share", element: noteIdShare, private: true },

    { hash: "/login", element: login, private: true },
    { hash: "/register", element: register, private: true },
    { hash: "/password-recover", element: passwordRecover, private: true },

    { hash: "/setting", element: setting, private: true },
    { hash: "/theme", element: theme(), static: true },
  ]);

  addEventListener("hashchange", () => {
    const route = useApp.routes.get(location.hash);

    $element.append(
      ((data) => {
        $element.innerHTML = "";

        if (!data) {
          return "";
        }

        if (data?.static) {
          return data.element;
        }

        return data.element() || "";
      })(route.data)
    );
  });

  return $element;
};

var dataApp = () => {

  const dataApp = {
    routes: new MatchRoutes(),
    ta: "ta-0195d3af-446f-777e-956e-e5270b55fa5f",

    url: {
      server: (path = "") => {
        return `https://api.vniox.com/note/${path}`;
      },
    },

    svgIcon: svgIcon(),
    instances: {},
    values: {},
    ovalues: {},

    elements: {
      metaColor: document.getElementById("meta-theme-color"),
      styleApp: document.getElementById("style-app"),
    },

    myEvent: ($element, events = {}) => {
      return Array.from($element.querySelectorAll("[my-event]")).map(
        (child) => {
          const split = child.getAttribute("my-event").split("->");
          const callback = events[split[1]];

          child.removeAttribute("my-event");
          child.addEventListener(split[0], callback);

          return () => child.removeEventListener(split[0], callback);
        }
      );
    },
    fetchOptions: (options = {}) => {
      return {
        ...options,
        headers: {
          "Token-Auth": localStorage.getItem(
            "ta-0195d3af-446f-777e-956e-e5270b55fa5f"
          ),

          ...(options?.headers ?? {}),
        },
        method: options?.method ?? "GET",
      };
    },

    popover: {
      options: ($popover, callback) => {
        $popover.addEventListener("click", (e) => {
          if (e.target === e.currentTarget) {
            e.currentTarget.hidePopover();
            return;
          }

          const button = e.target.closest("[data-action]");

          if (button) {
            if (Boolean(callback(button))) {
              e.currentTarget.hidePopover();
            }
          }
        });
      },
    },
  };

  // const callback = f.callbackHash(array).callback;

  return dataApp;
};

// import navigateBottom from "./assets/navigateBottom";
// import navigate from "./assets/navigate";

window.dataApp = dataApp();

addEventListener("DOMContentLoaded", () => {
  const c = window.MyResourceClass;

  document.getElementById("app").append(
    c.MyElement.create(
      `
        <div class="container">
          <routes class="routes"></routes>
        </div>
      `
    ).fragment((fragment) => {
      c.MyElement.replaceChildren(fragment, {
        routes: routes(),
        // navigatebottom: navigateBottom(),
        // navigate: navigate(),
      });
    })
  );

  dispatchEvent(new CustomEvent("hashchange"));
});
