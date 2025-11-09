const uuid = "uuid-019a6ad5-350f-720c-8efc-50ac7245878b";
let id = null;

function $(query) {
  return document.querySelector(query) || document.createElement("div");
}

function mapped(array = []) {
  $("[tag-content-items]").innerHTML = array
    .map((_) => {
      return /*html*/ `
        <a class="a_q9xwdm6psh" href="${_.url}" data-id="${
        _.id
      }" tag-open-options>
            <div>
                <img src="" alt="">
                <p>${_.name[0].toUpperCase()}</p>
            </div>
            <span>${_.name}</span>
        </a>
        `;
    })
    .join("");

  return array;
}

function crearCanvasConLetra(letra, tamanoFuente) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Tamaño fijo del canvas
  canvas.width = 192;
  canvas.height = 192;

  // Fondo blanco
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Letra negra, negrita y sans-serif
  ctx.fillStyle = "black";
  ctx.font = `bold ${tamanoFuente}px sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Dibujar letra centrada
  ctx.fillText(letra, canvas.width / 2, canvas.height / 2);

  return canvas;
}

if (!localStorage.getItem(uuid)) {
  localStorage.setItem(
    uuid,
    JSON.stringify([
      {
        id: 1,
        name: "Peliculas",
        url: "https://vniox.github.io/app/streaming",
      },
    ])
  );
}

const items = JSON.parse(localStorage.getItem(uuid));
mapped(items);

$("[tag-open-modal-form]").addEventListener("click", () => {
  $("#modal-form").style.display = "";
  id = null;
});

$("#modal-form").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    $("#modal-form").style.display = "none";
  }
});

$("[tag-content-items]").addEventListener("contextmenu", (e) => {
  e.preventDefault();

  const a = e.target.closest("a");

  if (a) {
    $("#modal-options").style.display = "";
    id = a.dataset.id;
  }
});

$("#modal-options").addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    $("#modal-options").style.display = "none";
  }
});

$("[tag-action-delete]").addEventListener("click", () => {
  const items = JSON.parse(localStorage.getItem(uuid));
  const items2 = items.filter((item) => item.id != id);

  localStorage.setItem(uuid, JSON.stringify(items2));
  mapped(items2);
  $("#modal-options").style.display = "none";
});

$("[tag-action-edit]").addEventListener("click", () => {
  const items = JSON.parse(localStorage.getItem(uuid));
  const item = items.find((item) => item.id == id);
  $("#modal-options").style.display = "none";
  $("#modal-form").style.display = "";

  const form = $("[tag-form-add]");
  form.name.value = item.name;
  form.url.value = item.url;
});

$("[tag-form-search]").addEventListener("submit", (e) => {
  e.preventDefault();

  const url = e.currentTarget.search.value.trim();

  try {
    new URL(url);
    location.href = url;
  } catch (error) {
    location.href = `https://www.google.com/search?q=${encodeURIComponent(
      url
    )}`;
  }
});

$("[tag-form-add]").addEventListener("submit", (e) => {
  e.preventDefault();

  const items = JSON.parse(localStorage.getItem(uuid));

  if (id == null) {
    const items2 = [
      ...items,
      {
        id: Date.now(),
        name: e.currentTarget.name.value,
        url: e.currentTarget.url.value,
      },
    ];

    localStorage.setItem(uuid, JSON.stringify(items2));
    mapped(items2);
  } else {
    const items2 = items.map((item) => {
      if (item.id == id) {
        return {
          ...item,
          name: e.currentTarget.name.value,
          url: e.currentTarget.url.value,
        };
      }

      return item;
    });

    localStorage.setItem(uuid, JSON.stringify(items2));
    mapped(items2);
  }

  $("#modal-form").style.display = "none";
});

$("[tag-action-shorcut]").addEventListener("click", () => {
  if (typeof Android !== "undefined" && Android.createShortcut) {
    const items = JSON.parse(localStorage.getItem(uuid));
    const item = items.find((item) => item.id == id);

    try {
      new URL(item.url);
      const canvas = crearCanvasConLetra(item.name[0].toUpperCase(), 100);
      Android.createShortcut(item.name, item.url, canvas.toDataURL());
      alert("Agregado");
    } catch (error) {
      alert("La url no es valida");
    }
  }
});

// function android(callback) {
//   if (typeof Android !== "undefined" && Android) {
//     try {
//       callback?.(Android);
//     } catch (error) {}
//   }
// }

// document.body.append(crearCanvasConLetra("A", 100));
