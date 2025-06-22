'use strict';

var Font = [
  {
    name: "predeterminado",
    font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue'",
    link: "",
  },
  {
    name: "Montserrat",
    font: "'Montserrat', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Montserrat&display=swap",
  },
  {
    name: "Roboto",
    font: "'Roboto', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Roboto:ital@1&display=swap",
  },
  {
    name: "Lato",
    font: "'Lato', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Lato&display=swap",
  },
  {
    name: "Open Sans",
    font: "'Open Sans', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap",
  },
  {
    name: "Poppins",
    font: "'Poppins', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Poppins&display=swap",
  },
  {
    name: "Playfair Display",
    font: "'Playfair Display', serif",
    link: "https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap",
  },
  {
    name: "Raleway",
    font: "'Raleway', sans-serif",
    link: "https://fonts.googleapis.com/css2?family=Raleway&display=swap",
  },
];

var theme = ()=>{

    const useApp    = window.dataApp;

    addEventListener('_theme', ()=> {
        if( !localStorage.getItem('theme') )
            localStorage.setItem('theme', 'light');

        if( !localStorage.getItem('theme-chat') )
            localStorage.setItem('theme-chat', '#7C4DFF');
        
        if( !localStorage.getItem('font-family') )
            localStorage.setItem('font-family', Font[0].name);

        if( !localStorage.getItem('width-navigate') )
            localStorage.setItem('width-navigate', '80px');

        const font = Font.find( font => font.name == localStorage.getItem('font-family'));

        ({
            'color-background-transparent'  : 'rgb(0 0 0 / 0.1)',
            'color-background'  : '#F7F7F7',
            'color-item'        : '#FFFFFF',
            'color-letter'      : '#1C1C1E',
            'filter-img'        : 'initial',
            'color-chat'        : localStorage.getItem('theme-chat'),
            'font-family'       : font.font,
            'width-navigate'    : localStorage.getItem('width-navigate')
        });
        
        ({
            'color-background-transparent'  : 'rgb(255 255 255 / 0.1)',
            'color-background'  : '#1C1C1E',   
            'color-item'        : '#2C2C2E',   
            'color-letter'      : '#F7F7F7',
            'filter-img'        :'invert(82%) sepia(99%) saturate(0%) hue-rotate(102deg) brightness(111%) contrast(100%)',
            'color-chat'        : localStorage.getItem('theme-chat'),
            'font-family'       : font.font,
            'width-navigate'    : localStorage.getItem('width-navigate')
        });

        const themeDark_  = {
            'color-background-transparent'  : 'rgb(255 255 255 / 0.1)',
            'color-background'  : '#000000',   
            'color-item'        : '#1A1A1A',   
            'color-letter'      : '#F7F7F7',
            'filter-img'        :'invert(82%) sepia(99%) saturate(0%) hue-rotate(102deg) brightness(111%) contrast(100%)',
            'color-chat'        : localStorage.getItem('theme-chat'),
            'font-family'       : font.font,
            'width-navigate'    : localStorage.getItem('width-navigate')
        };

        const theme = themeDark_;//localStorage.getItem('theme') == 'light' ? themeLight : themeDark

        useApp.elements.meta.color.setAttribute('content', theme['color-background']);
        useApp.elements.style.app.innerHTML = `@import url("${ font.link }");\n:root {\n${ Object.keys(theme).map( key => `--${ key } : ${ theme[key] };\n` ).join('') }}`;
    });

    return document.createTextNode("")
};

var eleConfirm = (data = {}) => {
  const $element = createNodeElement(`
        <div class="div_JPq256o153cnJou">
            <div id="closeElement" class="div_OB5OjfKM9h37trb"></div>
            <div class="div_MOTVHQnePjBi13b scroll-y">
                <div class="div_bjK30KXuRq196kA">
                    <h3>${data.title ?? ""}</h3>
                    <button id="btnCloseElement"><i class="fi fi-rr-cross-small"></i></button>
                </div>
                <div class="div_jrf0YNBRjlfJtgq">
                    <p>${data.message ?? ""}</p>
                </div>
                <div class="div_vM8uRjaCFHrm0g2">
                    <button id="buttonCancel" class="button_8m7It5KUpV1th9m pointer">Cancelar</button>
                    <button id="buttonConfirm" class="button_8m7It5KUpV1th9m pointer dark">Confirmar</button>
                </div>
            </div>
        </div>
    `);

  const { closeElement, btnCloseElement, buttonCancel, buttonConfirm } =
    createObjectElement($element.querySelectorAll("[id]"), "id", true);

  const elementDispatchFalse = new CustomEvent("_click", {
    detail: { status: false },
  });
  const elementDispatchTrue = new CustomEvent("_click", {
    detail: { status: true },
  });

  Array.from([closeElement, btnCloseElement, buttonCancel]).forEach(
    (element) => {
      element.addEventListener("click", () => {
        $element.remove();
        $element.dispatchEvent(elementDispatchFalse);
      });
    }
  );

  buttonConfirm.addEventListener("click", () => {
    $element.remove();
    $element.dispatchEvent(elementDispatchTrue);
  });

  return $element;
};

var navigate = () => {
  const useApp = window.dataApp;
  const useThis = {
    routes: new RouteHashCallback(),
  };

  const $element = createNodeElement(`
        <div class="div_kpAeq7EQQSpIEGP" style="display:none">
            <div class="div_AzB9StLbTItJbDG">
                <div class="div_oMejC4uoPU6Yno">
                    <a id="itemProfile" href="#/profile" class="button_HBGW4tQbCUaCeQi">
                        <span id="spanAvatar" class="div_Hc2LDqQ"></span>
                        <img id="imgAvatar" src="" style="display:none">
                    </a>
                </div>
                <div class="div_JJ29L3eoT4hcf1x">
                    <div id="links" class="div_ynsbf8jCYmc6NsK">
                        <a id="inicio" href="#/" class="button_vz3gd83JzdjM7pt active">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                                width="512" height="512">
                                <path
                                    d="M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5ZM12,1.997c-.584,0-1.168,.172-1.678,.517L3.322,7.237c-.828,.558-1.322,1.487-1.322,2.486v9.276c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V9.724c0-.999-.494-1.929-1.321-2.486L13.678,2.514c-.51-.345-1.094-.517-1.678-.517Z" />
                            </svg>
                        </a>
                        <a id="catalogo" href="#/catalogo" class="button_vz3gd83JzdjM7pt">
                            <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 24 24"
                                width="512" height="512">
                                <path
                                    d="M11,6a1,1,0,0,1-1,1A1,1,0,0,0,9,8,1,1,0,0,1,7,8a3,3,0,0,1,3-3A1,1,0,0,1,11,6Zm3,1a1,1,0,0,0,0,2,1,1,0,0,1,1,1,1,1,0,0,0,2,0A3,3,0,0,0,14,7Zm7.923,6.486-1.3,6.5A5.013,5.013,0,0,1,15.721,24H8.279a5.013,5.013,0,0,1-4.9-4.019l-1.3-6.5a4.007,4.007,0,0,1-.05-6.953A4.007,4.007,0,0,1,5.311,3.06a3.456,3.456,0,0,1,3.7-2.016A3.517,3.517,0,0,1,14.66,2a3.479,3.479,0,0,1,2.392,1.115,4.011,4.011,0,0,1,4.921,3.414A4.007,4.007,0,0,1,21.923,13.486ZM8.484,22,8,16.062A2.019,2.019,0,0,0,6,14H4.22l1.117,5.588A3.029,3.029,0,0,0,8.484,22Zm4.972,0L14,15.978A2,2,0,0,0,10,16l.487,6Zm6.324-8H18a2,2,0,0,0-2,2l-.537,6a3.038,3.038,0,0,0,3.2-2.412ZM22,10a2,2,0,0,0-1.335-1.874A1,1,0,0,1,20,7.184a2.012,2.012,0,0,0-2.872-1.972,1,1,0,0,1-1.318-.42A1.5,1.5,0,0,0,14.5,4a1.13,1.13,0,0,1-1.529-.762,1.5,1.5,0,0,0-2.739-.526C9.788,3.43,9.122,3.1,8.5,3A1.5,1.5,0,0,0,7.03,4.2,1,1,0,0,1,5.958,5,2,2,0,0,0,4,7a1.047,1.047,0,0,1-.665,1.126A2,2,0,0,0,4,12H6a3.975,3.975,0,0,1,3,1.382,3.994,3.994,0,0,1,5.994-.007A4.008,4.008,0,0,1,18,12h2A2,2,0,0,0,22,10Z" />
                            </svg>
                        </a>
                        <a id="video" href="#/video" class="button_vz3gd83JzdjM7pt"><img src="./img/icons/icon-video.png"></a>
                    </div>
                </div>
            </div>
        </div>    
    `);
  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  useThis.routes.set([
    { hash: "/", callback: () => $elements.inicio },
    { hash: "/catalogo/*", callback: () => $elements.catalogo },
    { hash: "/video/*", callback: () => $elements.video },
  ]);

  addEventListener("_auth", (e) => {
    useApp.user.data = e.detail.data;
    if (useApp.user.data) {
      $element.style.display = "";

      $elements.spanAvatar.textContent =
        useApp.user.data.fullname[0].toUpperCase();

      $elements.imgAvatar.src = `https://img.vniox.com/get.php?id=${useApp.user.data.file_avatar}&index=2`;

      $elements.imgAvatar.onload = () => {
        $elements.imgAvatar.style.display = "";
      };

      $elements.imgAvatar.onerror = () => {
        $elements.imgAvatar.style.display = "none";
      };
    } else {
      $element.style.display = "none";
    }
  });

  addEventListener("hashchange", () => {
    Array.from($elements.links.querySelectorAll("a.active")).forEach((a) =>
      a.classList.remove("active")
    );
    (useThis.routes.get() || document.createElement("a")).classList.add(
      "active"
    );
  });

  return $element;
};

var header = ()=>{

    const auth = window.dataApp.auth;
    const icon = window.dataApp.icon;

    const $element = createNodeElement(`
        <header class="header_tvR3Va0">
        
            <button id="btnOpenNavigate" class="button_DmFLl8Y">${ icon.get('fi fi-rr-bars-sort') }</button>
            <a id="backPage" href="#" class="button_lvV6qZu">${ icon.get('fi fi-rr-angle-small-left') }</a>
            <h3 id="title">Inicio</h3>
            
        </header>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    // const render$elements   = new RenderObjectElement( $elements )
    const $elementReplace   = createNodeElement('<div style="display:none"></div>');
    $elements.btnOpenNavigate.addEventListener('click', ()=> {
        dispatchEvent( new CustomEvent('_navigate') );
    });
 
    addEventListener('popstate', ()=> {
        if( localStorage.getItem( auth ) == null ) {
            $element.replaceWith( $elementReplace );
            return
        }

        $elementReplace.replaceWith( $element );

        const hash = location.hash.slice(1).split('/')[1] ?? '';

        if( hash == '' ) {

            $element.append( $elements.btnOpenNavigate, $elements.title );
            $elements.backPage.remove();

        } else {

            const hashBack = location.hash.split('/').slice(0, -1).join('/') ?? '';

            $elements.backPage.setAttribute('href', hashBack);
            $element.append( $elements.backPage );

            $elements.btnOpenNavigate.remove();
            $elements.title.remove();
        }
    });

    return $elementReplace
};

var auth = () => {
  return new Promise((resolve, reject) => {
    const useApp = window.dataApp;

    const encodeQueryString = encodeQueryObject({
      route: "auth.session",
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "GET",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatchEvent(new CustomEvent("_auth", { detail: data }));
        resolve(data);
      })
      .catch(reject);
  });
};

var routesPublic = (page = "") => {
  const useApp = window.dataApp;
  const $node = document.createTextNode("");

  auth().then((result) => {
    if (!result?.status) {
      Cookie.remove(useApp.auth, {});
      return $node.replaceWith(page());
    }

    location.hash = "/";
  });

  return $node;
};

var routesPrivate = (page = "") => {
  const useApp = window.dataApp;
  const $node = document.createTextNode("");

  auth().then((result) => {
    if (result?.status) {
      Cookie.set(useApp.auth, result.token, {
        lifetime: 60 * 60 * 24 * 7,
      });
      return $node.replaceWith(page());
    }

    location.hash = "/login";
  });

  return $node;
};

var inicio = () => {
  const useThis = {
    functions: {},
  };

  const $element = createNodeElement(`
    <div class="div_guZ6yID" style="padding:10px">

        <div id="itemNull" class="loader-i" style="--color:var(--color-letter)"></div>
        <div id="itemFalse" class="div_b14S3dH">
            <i class="fi fi-rr-search-alt"></i>
            <h3>Lista vacia</h3>
        </div>
        <div id="itemTrue" class="div_pPbxc9j"></div>

    </div>
  `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  const renderObjectElement = new RenderObjectElement($elements, "display");

  renderObjectElement.set({
    itemNull: true,
    itemFalse: false,
    itemTrue: false,
  });

  useThis.functions.dataLoad = () => {
    fetch("./json/phrases.json")
      .then((res) => res.json())
      .then((data) => {
        renderObjectElement.set({
          itemNull: false,
          itemFalse: false,
          itemTrue: true,
        });

        $elements.itemTrue.innerHTML = data
          .map((data) => {
            return ` 
                  <div class="div_qbCyIzn">
                      <div class="div_KNhdwBt">
                          <img>
                      </div>
                      <p>${data.text}</p>
                  </div>
              `;
          })
          .join("");
      });
  };

  useThis.functions.dataLoad();

  return $element;
};

var login = () => {
  const useApp = window.dataApp;
  const useThis = {
    functions: {},
  };

  const $element = createNodeElement(`
        <div class="div_7wOjGZ8 children-hover scroll-y">
            <style>
            
              .dots::after {
                  content: '';           
                  animation: dots 1.5s steps(1, end) infinite;   
              }

              @keyframes dots {
                  0% { content: ''; }        
                  33% { content: '.'; }      
                  66% { content: '..'; }     
                  100% { content: '...'; }   
              }
                  
            </style>
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
                <a href="#/password/recover" class="a_c305F1l">recuperar contraseña</a>
                <button class="button_WU25psx">
                    <span id="spanLoad">Ingresar</span>
                    ${useApp.icon.get("fi fi-rr-arrow-right")}
                </button>
                <a href="#/register" class="a_8hzaMUg">
                    <span>registro</span>
                    ${useApp.icon.get("fi fi-rr-arrow-right")}
                </a>
            </form>
        </div>   
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    useThis.functions.submitLoad(e.submitter, true);

    const data = {
      email: $elements.form.email.value.trim(),
      password: $elements.form.password.value.trim(),
    };

    if ([data.email, data.password].includes("")) {
      useThis.functions.submitLoad(e.submitter, false);
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
      route: "/auth/login",
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "POST",
      body: JSON.stringify(data),
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        useThis.functions.submitLoad(e.submitter, false);
        console.log(data);
        if (data && data.status) {
          Cookie.set(useApp.auth, data.token, {
            lifetime: 60 * 60 * 24 * 7,
          });
          location.hash = "/";
        } else {
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: data.message ?? "Ocurrio un error",
                name: "danger",
                duration: 3000,
              },
            })
          );
        }
      })
      .catch(() => {
        useThis.functions.submitLoad(e.submitter, false);
      });
  });

  useThis.functions.submitLoad = (submitter, status) => {
    if (status) {
      submitter.style.pointerEvents = "none";
      $elements.spanLoad.textContent = ".";
      $elements.spanLoad.classList.add("dots");
    } else {
      submitter.style.pointerEvents = "";
      $elements.spanLoad.textContent = "Ingresar";
      $elements.spanLoad.classList.remove("dots");
    }
  };

  return $element;
};

var register = () => {
  const useApp = window.dataApp;
  const useThis = {
    functions: {},
  };

  const $element = createNodeElement(`
        <div class="div_7wOjGZ8 children-hover scroll-y">
            <style>
            
              .dots::after {
                  content: '';           
                  animation: dots 1.5s steps(1, end) infinite;   
              }

              @keyframes dots {
                  0% { content: ''; }        
                  33% { content: '.'; }      
                  66% { content: '..'; }     
                  100% { content: '...'; }   
              }
                  
            </style>
            <form id="form" class="div_SCqCUTo" autocomplete="off">
                <h2 style="padding: 0 20px;">Registro</h2>
                <div class="div_Y85zRC0">
                    <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                        <input type="text" name="fullname" placeholder="">
                        <span>nombre</span>
                    </label>
                    <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                        <input type="text" name="lastname" placeholder="">
                        <span>apellido</span>
                    </label>
                    <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                        <input type="text" name="email" placeholder="">
                        <span>correo</span>
                    </label>
                    <label class="label_ieXcceLhkyD2WGY label_0BFeKpk">
                        <input type="password" name="password" placeholder="">
                        <span>contraseña</span>
                    </label>
                </div>
                <button class="button_WU25psx">
                    <span id="spanLoad">Crear cuenta</span>
                    ${useApp.icon.get("fi fi-rr-arrow-right")}
                </button>
                <a href="#/login" class="a_8hzaMUg">
                    <span>Iniciar sesion</span>
                    ${useApp.icon.get("fi fi-rr-arrow-right")}
                </a>
            </form>
        </div>   
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    useThis.functions.submitLoad(e.submitter, true);

    const data = {
      fullname: $elements.form.fullname.value.trim(),
      lastname: $elements.form.lastname.value.trim(),
      email: $elements.form.email.value.trim(),
      password: $elements.form.password.value.trim(),
    };

    if ([data.email, data.password, data.fullname].includes("")) {
      useThis.functions.submitLoad(e.submitter, false);
      return dispatchEvent(
        new CustomEvent("_notification", {
          detail: {
            message: "Los campos estan vacios",
            name: "warning",
            duration: 4000,
          },
        })
      );
    }

    const encodeQueryString = encodeQueryObject({
      route: "/auth/register",
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "POST",
      // credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        useThis.functions.submitLoad(e.submitter, false);

        if (data && data.status) {
          Cookie.set(useApp.auth, data.token, {
            lifetime: 60 * 60 * 24 * 7,
          });

          location.hash = "/";
        } else {
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: data.message ?? "Ocurrio un error",
                name: "danger",
                duration: 4000,
              },
            })
          );
        }
      })
      .catch(() => {
        useThis.functions.submitLoad(e.submitter, false);
      });
  });

  useThis.functions.submitLoad = (submitter, status) => {
    if (status) {
      submitter.style.pointerEvents = "none";
      $elements.spanLoad.textContent = ".";
      $elements.spanLoad.classList.add("dots");
    } else {
      submitter.style.pointerEvents = "";
      $elements.spanLoad.textContent = "Crear cuenta";
      $elements.spanLoad.classList.remove("dots");
    }
  };

  return $element;
};

var password_recover = () => {
  const useApp = window.dataApp;
  const useThis = {
    functions: {},
  };

  const $element = createNodeElement(`
        <div class="div_7wOjGZ8 children-hover">
            <style>
            
              .dots::after {
                  content: '';           
                  animation: dots 1.5s steps(1, end) infinite;   
              }

              @keyframes dots {
                  0% { content: ''; }        
                  33% { content: '.'; }      
                  66% { content: '..'; }     
                  100% { content: '...'; }   
              }
                  
            </style>
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
                    ${useApp.icon.get("fi fi-rr-arrow-right")}
                </button>
                <a href="#/login" class="a_8hzaMUg">
                    <span>Iniciar sesion</span>
                    ${useApp.icon.get("fi fi-rr-arrow-right")}
                </a>
            </form>
        </div>   
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();
    useThis.functions.submitLoad(e.submitter, true);

    const data = {
      email: $elements.form.email.value.trim(),
    };

    if ([data.email].includes("")) {
      useThis.functions.submitLoad(e.submitter, false);

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

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        useThis.functions.submitLoad(e.submitter, false);

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
        useThis.functions.submitLoad(e.submitter, false);

        dispatchEvent(
          new CustomEvent("_notification", {
            detail: { message: "Ocurrio un error", name: "danger" },
          })
        );
      });
  });

  useThis.functions.submitLoad = (submitter, status) => {
    if (status) {
      submitter.style.pointerEvents = "none";
      $elements.spanLoad.textContent = ".";
      $elements.spanLoad.classList.add("dots");
    } else {
      submitter.style.pointerEvents = "";
      $elements.spanLoad.textContent = "Enviar";
      $elements.spanLoad.classList.remove("dots");
    }
  };

  return $element;
};

var password_update = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
  };

  const $element = createNodeElement(`
        <div class="div_7wOjGZ8 children-hover scroll-y">
            <div id="itemNull" class="div_TwxBw4R">
                <div class="element-loader"></div>
            </div>
            <div id="itemFalse" class="div_TwxBw4R">
                <div class="div_70M5Jpt">
                    <div class="div_b14S3dH">
                        <h3>El enlace ya no esta disponible</h3>
                    </div>
                </div>
                <a href="#/login" class="a_8hzaMUg">
                    <span>Iniciar sesion</span>
                    ${useApp.icon.get("fi fi-rr-arrow-right")}
                </a>
            </div>
            <form id="form" class="div_SCqCUTo"  autocomplete="off">
                <h2 style="padding: 0 20px;">Cambiar contraseña</h2>
                <div class="div_Y85zRC0">
                    <label class="label_L3539wR">
                        <input type="password" name="password" placeholder="" autocomplete="off">
                        <span>contraseña</span>
                    </label>
                    <label class="label_L3539wR">
                        <input type="password" name="password2" placeholder="" autocomplete="off">
                        <span>repita la contraseña</span>
                    </label>
                </div>
                <button class="button_WU25psx" >
                    <span>Cambiar</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </button>
                <a href="#/login" class="a_8hzaMUg">
                    <span>Iniciar sesion</span>
                    <i class="fi fi-rr-arrow-right"></i>
                </a>
            </form>
            
        </div>   
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  const render$elements = new RenderObjectElement($elements);

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const body = {
      password: $elements.form.password.value.trim(),
      password2: $elements.form.password2.value.trim(),
    };

    console.log(body);

    const encodeQueryString = encodeQueryObject({
      route: "/auth/password/update",
      token: useThis.params.token,
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        // dataLoad();
        console.log(res);
        console.log("vivir");

        if (res.status)
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: "Contraseña actualizada con exito",
                name: "success",
              },
            })
          );
        else
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: res.message ?? "Ocurrio un error",
                name: "danger",
              },
            })
          );
      });
  });

  const dataRender = (data = null) => {
    const render = {
      itemNull: data === 0,
      itemFalse: data === null,
      form: data === true,
    };

    render$elements.set(render);
  };

  const dataLoad = () => {
    const queries = {
      route: "/token",
      token: useThis.params.token + "__",
    };

    fetch(useApp.url.api(`/api.php?${encodeQueryObject(queries)}`))
      .then((res) => res.json())
      .then(dataRender);
  };

  dataRender(0);
  dataLoad();

  return $element;
};

var formVideo = (parameters = {}) => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
  };

  const $element = createNodeElement(`
        <div class="div_5Pe946IMjyL1Rs" popover>
            <div class="div_dsb3nhtCrFmUlSN">
                <div class="div_5S0v3rr pointer-on">
                    <div class="div_7u66WUf">
                        <button id="close" class="button_0530xdO"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-angle-left"><path d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z"></path></svg></button>
                        <h3>${
                          parameters.from == "add" ? "Agregar" : "Actualizar"
                        }</h3>
                    </div>
                    <form id="form" class="form_Wjg689O" autocomplete="off">
                        <div class="div_N3sU6W3">
                            ${parameters.inputs
                              .map(
                                (input) => `
                                    <label class="label_ieXcceLhkyD2WGY" style="background:var(--color-item)">
                                        <input type="text" name="${input.key}" value="${input.value}" placeholder="" autocomplete="off" data-input="${input.key}">
                                        <span>${input.title}</span>
                                    </label>
                                `
                              )
                              .join("")}
                            
                        </div>
                        <div class="div_jmyxzzW">
                            <button type="submit" class="focus">${
                              parameters.from == "add"
                                ? "Agregar"
                                : "Actualizar"
                            }</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.close.addEventListener("click", () => {
    $element.hidePopover();
  });

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    $element.hidePopover();

    if (parameters.from == "add") {
      const encodeQueryString = encodeQueryObject({
        route: "/room",
        token: useApp.user.token,
        id: useThis.params.id,
      });

      const body = {
        name: $elements.form.name.value,
        datetime_add: Date.now(),
      };

      fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
        method: "POST",
        headers: {
          "Token-Auth": Cookie.get(useApp.auth),
        },
        // credentials: "include",
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          $element.dispatchEvent(
            new CustomEvent("_submit", {
              detail: {
                res,
                body,
              },
            })
          );
        });
    } else if (parameters.from == "edit") {
      dispatchEvent(
        new CustomEvent("_video", {
          detail: {
            header: {
              from: "loadedmetadata",
            },
            body: {
              video: {
                url: $elements.form.url.value.trim(),
              },
              detail: {
                title: null,
                description: null,
                image: null,
                url: null,
                video: {
                  server: "",
                  url: $elements.form.url.value.trim(),
                },
                body_chat: false,
              },
            },
          },
        })
      );
    }
  });

  $element.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) $element.hidePopover();
  });

  return $element;
};

var formVideoLinkJoin = ()=>{

    const $element = createNodeElement(`
        <div class="div_5Pe946IMjyL1Rs" popover>
            <div class="div_dsb3nhtCrFmUlSN">
                <div class="div_5S0v3rr pointer-on">
                    <div class="div_7u66WUf">
                        <button id="close" class="button_0530xdO"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-angle-left"><path d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z"></path></svg></button>
                        <h3>Ingresar</h3>
                    </div>
                    <form id="form" class="form_Wjg689O" autocomplete="off">
                        <div class="div_N3sU6W3">
                            <label class="label_ieXcceLhkyD2WGY" style="background:var(--color-item)">
                                <input type="text" name="code" value="" placeholder="" autocomplete="off">
                                <span>codigo</span>
                            </label>
                        </div>
                        <div class="div_jmyxzzW">
                            <button type="submit" class="focus">Ingresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `);

    const $elements         = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    // const $elements$render  = new RenderObjectElement( $elements  )


    $elements.close.addEventListener('click', ()=> {
        $element.hidePopover();
    });

    $element.addEventListener('click', (e) => {
        if( e.target === e.currentTarget ) $element.hidePopover();
    });

    $elements.form.code.addEventListener('input', ()=> {
        $elements.form.code.value = $elements.form.code.value.replaceAll(" ", "");
    });
    
    $elements.form.addEventListener('submit', e => {
        e.preventDefault();

        const code = $elements.form.code.value.trim();
        $elements.form.code.value = '';

        if( !code ) return
        location.hash = `/video/link/${ code }`;

    });

    return $element
};

var video = () => {
  const useApp = window.dataApp;
  const useThis = {
    reactivity: {
      dataNull: defineVal(true),
      dataTrue: defineVal([]),
    },
    values: {
      dataTrue: [],
    },
  };

  const $element = replaceNodeChildren(
    createNodeElement(`
        <div class="div_sUQTlMzJWysnrlN div_1TgYFMj" style="position:absolute">
            <header class="header_hbN5Ha3C9tx2pG4 header_oMr76Fi">
                <div class="div_n64i96I">
                    <a href="#/" class="button_Ygi1XTBzBs4wCXV button-icon" style="display:none;">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle">Video</h3>
                </div>
                <div class="div_n64i96I">
                    <button id="btnOpenFormJoin" class="button_Ygi1XTBzBs4wCXV button-icon">${useApp.icon.get(
                      "fi fi-rr-portal-enter"
                    )}</button>
                    <button id="btnOpenform" class="button_Ygi1XTBzBs4wCXV button-icon" style="display:none;">${useApp.icon.get(
                      "fi fi-rr-plus"
                    )}</button>
                    <a href="#/video/add" class="button_Ygi1XTBzBs4wCXV button-icon">${useApp.icon.get(
                      "fi fi-rr-plus"
                    )}</a>
                </div>
            </header>
            <div class="div_nUAQnHkhCrVhFEk" style="padding: 10px;">

                <div id="itemNull" class="loader-i" style="--pixel:60px;"></div>

                <div id="itemFalse" class="div_uLpB1pckiSEJgCU" style="display:none">

                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path
                            d="M19.949,5.536,16.465,2.05A6.958,6.958,0,0,0,11.515,0H7A5.006,5.006,0,0,0,2,5V19a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V10.485A6.951,6.951,0,0,0,19.949,5.536ZM18.535,6.95A4.983,4.983,0,0,1,19.316,8H15a1,1,0,0,1-1-1V2.684a5.01,5.01,0,0,1,1.051.78ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V5A3,3,0,0,1,7,2h4.515c.164,0,.323.032.485.047V7a3,3,0,0,0,3,3h4.953c.015.162.047.32.047.485Z" />
                    </svg>
                    <h3>No se encontraron resultados</h3>

                </div>

                <div id="itemTrue" class="div_W3MAKlpobTKx7BU" style="display:none"></div>

            </div>
            <div data-node-children="formVideo" id="formVideo"></div>
            <div data-node-children="formVideoLinkJoin" id="formVideoLinkJoin"  ></div>
        </div>
    `),
    {
      formVideo: formVideo({
        from: "add",
        inputs: [{ title: "nombre", key: "name", value: "" }],
      }),
      formVideoLinkJoin: formVideoLinkJoin(),
    },
    true
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const renderObjectElement = new RenderObjectElement($elements, "display");

  useThis.reactivity.dataNull.observe((value) => {
    renderObjectElement.set({
      itemNull: value,
      itemFalse: !value && !Object.keys(useThis.values.dataTrue).length,
      itemTrue: !value && !!Object.keys(useThis.values.dataTrue).length,
    });
  });

  useThis.reactivity.dataTrue.observe((datas) => {
    const fragment = document.createDocumentFragment();
    fragment.append(document.createTextNode(""));
    fragment.append(
      ...datas.map((data) => {
        data.data_room = JSONparse(data.data_room);
        data.data_room.detail = JSONparse(data.data_room.detail);
        data.data_room.detail_video = JSONparse(data.data_room.detail_video);

        const $element = createNodeElement(`
                <a href="#/video/${data.id_room}" class="div_q97S60f">
                    ${
                      data.data_room.detail_video.image
                        ? `<img src="${data.data_room.detail_video.image}">`
                        : `<div class="div_9Mn2LAx"><span>${(data.data_room
                            .name ||
                            "•")[0].toUpperCase()}</span><img style="display:none"></div>`
                    }
                    <div class="div_RbqUyx3">
                        <span class="text-ellipsis">${
                          data.data_room.name || "•"
                        }</span>
                        <p class="text-ellipsis">${
                          (data.data_room.detail_video.title &&
                            data.data_room.detail_video.title +
                              " / " +
                              data.data_room.detail_video.description) ||
                          (data.owned == 1 ? "propio" : "invitado")
                        }</p>
                    </div>
                    ${useApp.icon.get("fi fi-rr-angle-small-right")}
                </a>
            `);

        return $element;
      })
    );

    $elements.itemTrue.append(fragment);

    if (datas.length > 49) ;
  });

  const dataLoad = () => {
    const encodeQueryString = encodeQueryObject({
      route: "/room/user",
      query: 1,
      query_limit: [$elements.itemTrue.children.length, 50].join(","),
      query_where: JSON.stringify([
        // [0,1,0, useApp.user.data.id]
      ]),
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "GET",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const array = Array.isArray(data) ? data : [];
        useThis.values.dataTrue = useThis.values.dataTrue.concat(array);

        useThis.reactivity.dataNull.value = true;
        useThis.reactivity.dataTrue.value = array;
        useThis.reactivity.dataNull.value = false;
      });
  };

  $elements.btnOpenform.addEventListener("click", () => {
    $elements.formVideo.showPopover();
  });

  $elements.btnOpenFormJoin.addEventListener("click", () => {
    $elements.formVideoLinkJoin.showPopover();
  });

  $elements.formVideo.addEventListener("_submit", dataLoad);

  dataLoad();
  return $element;
};

var videoId = ()=>{

    const useApp = window.dataApp;
    const useThis = {
        params : useApp.routes.params()
    };

    if( useApp.val.videoId != useThis.params.id ) {
        
        addEventListener('_hashchange', ()=> {
            useApp.val.videoId = useThis.params.id;
            dispatchEvent( new CustomEvent('customFooterVideoPlayer') );
            addEventListener('_hashchange', ()=> useApp.val.videoId = null, { once : true });
        }, { once : true });

        dispatchEvent( new CustomEvent('_hashchange') );
        
    }

    useApp.elements.meta.color.setAttribute('content', '#000000');
    return document.createTextNode("")
};

var videoIdEdit = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      dataNull: defineVal(true),
      dataTrue: defineVal({}),
    },
    values: {
      dataTrue: [],
    },
    functions: {},
    elements: {},
  };

  const $element = replaceNodeChildren(
    createNodeElement(`
        <div class="div_sUQTlMzJWysnrlN div_1TgYFMj" style="position:absolute">
            <header class="header_hbN5Ha3C9tx2pG4 header_oMr76Fi">
                <div class="div_n64i96I">
                    <a href="#/video/${
                      useThis.params.id || ""
                    }" class="button_Ygi1XTBzBs4wCXV button-icon">${useApp.icon.get(
      "fi fi-rr-angle-small-left"
    )}</a>
                    <h3>${useThis.params.id ? "Actualizar" : "Agregar"}</h3>
                </div>
                <div id="buttonOption" class="div_n64i96I">
                    <a href="#/video/${
                      useThis.params.id
                    }/users" class="button_Ygi1XTBzBs4wCXV button-icon">${useApp.icon.get(
      "fi fi-rr-users"
    )}</a>
                    <button id="buttonConfirmDelete" class="button_Ygi1XTBzBs4wCXV button-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-trash"><path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z"></path><path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z"></path><path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"></path></svg></button>
                </div>
            </header>
            <div class="div_nUAQnHkhCrVhFEk" style="padding: 10px;">

                <div id="itemNull" class="loader-i" style="--pixel:60px;"></div>

                <div id="itemFalse" class="div_uLpB1pckiSEJgCU">

                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path
                            d="M19.949,5.536,16.465,2.05A6.958,6.958,0,0,0,11.515,0H7A5.006,5.006,0,0,0,2,5V19a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V10.485A6.951,6.951,0,0,0,19.949,5.536ZM18.535,6.95A4.983,4.983,0,0,1,19.316,8H15a1,1,0,0,1-1-1V2.684a5.01,5.01,0,0,1,1.051.78ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V5A3,3,0,0,1,7,2h4.515c.164,0,.323.032.485.047V7a3,3,0,0,0,3,3h4.953c.015.162.047.32.047.485Z" />
                    </svg>
                    <h3>No se encontraron resultados</h3>

                </div>

                <div id="itemTrue" class="div_guZ6yID" style="">
                    <form id="form" class="form_uHZJJwl">
                        <div class="div_QXbmy52">
                            <label class="label_RRjPQLY">
                                <span>nombre</span>
                                <input type="text" name="name" value="" autocomplete="off">
                            </label>
                        </div>
                        <div class="div_jmyxzzW">
                            <button type="submit" class="focus">${
                              useThis.params.id ? "Actualizar" : "Agregar"
                            }</button>
                        </div>
                    </form>
                </div>

            </div>
            <div data-node-children="formVideo" id="formVideo" style="display:none"></div>
            <div data-node-children="formVideoLinkJoin" id="formVideoLinkJoin" style="display:none"></div>
        </div>
    `)
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  const renderObjectElement = new RenderObjectElement($elements, "display");

  useThis.reactivity.dataNull.observe((value) => {
    renderObjectElement.set({
      itemNull: value,
      itemFalse: !value && !Object.keys(useThis.values.dataTrue).length,
      itemTrue: !value && !!Object.keys(useThis.values.dataTrue).length,
      buttonOption: !value && !!Object.keys(useThis.values.dataTrue).length,
    });
  });

  useThis.reactivity.dataTrue.observe((data) => {
    if (Object.keys(data ?? {}).length) {
      data.data_room = JSONparse(data.data_room);
      $elements.form.name.value = data.data_room.name;

      $elements.buttonConfirmDelete.style.display =
        data.id_user === data.data_room.id_user ? "" : "none";

      if (!useThis.elements.confirm) {
        useThis.elements.confirm = eleConfirm({
          title: "eliminar",
          message: "¿ eliminar todo ?",
        });
        useThis.elements.confirm.addEventListener("_click", (e) => {
          if (e.detail.status) {
            const encodeQueryString = encodeQueryObject({
              route: "/room",
              token: useApp.user.token,
              id: useThis.params.id,
            });

            const body = {
              status: 0,
            };

            fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
              method: "PATCH",
              headers: {
                "Token-Auth": Cookie.get(useApp.auth),
              },
              body: JSON.stringify(body),
              // credentials: "include",
            })
              .then((res) => res.json())
              .then((res) => {
                if (res && res.status) {
                  location.reload();
                }
              });
          }
        });
      }
    }
  });

  useThis.functions.dataLoad = () => {
    if (useThis.params.id) {
      const encodeQueryString = encodeQueryObject({
        route: "/room/user",
        query: 1,
        query_limit: "one",
        query_where: JSON.stringify([
          [0, 1, 0, useApp.user.data.id],
          [0, 2, 0, useThis.params.id],
        ]),
      });

      fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
        method: "GET",
        headers: {
          "Token-Auth": Cookie.get(useApp.auth),
        },
        // credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          useThis.values.dataTrue = useThis.values.dataTrue.concat(data);

          useThis.reactivity.dataNull.value = true;
          useThis.reactivity.dataTrue.value = data;
          useThis.reactivity.dataNull.value = false;
        });
    } else {
      useThis.values.dataTrue = useThis.values.dataTrue.concat({});

      useThis.reactivity.dataNull.value = true;
      useThis.reactivity.dataTrue.value = {
        data_room: {
          name: "",
        },
      };
      useThis.reactivity.dataNull.value = false;
    }
  };

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const encodeQueryString = encodeQueryObject({
      route: "/room",
      token: useApp.user.token,
      id: useThis.params.id,
    });

    const body = {
      name: $elements.form.name.value,
    };

    if (useThis.params.id) {
      fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
        method: "PATCH",
        headers: {
          "Token-Auth": Cookie.get(useApp.auth),
        },
        body: JSON.stringify(body),
        // credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.status) {
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: {
                  message: "Actualizado",
                  name: "success",
                  duration: 3000,
                },
              })
            );
          } else {
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: {
                  message: data.message ?? "Ocurrio un error",
                  name: "danger",
                  duration: 3000,
                },
              })
            );
          }
        });
    } else {
      console.log("agregar");
      body.datetime_add = Date.now();
      fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
        method: "POST",
        headers: {
          "Token-Auth": Cookie.get(useApp.auth),
        },
        // credentials: "include",
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data && data.status) {
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: {
                  message: "Agregado",
                  name: "success",
                  duration: 3000,
                },
              })
            );
          } else {
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: {
                  message: data.message ?? "Ocurrio un error",
                  name: "danger",
                  duration: 3000,
                },
              })
            );
          }
        });
    }
  });

  $elements.buttonConfirmDelete.addEventListener("click", () => {
    $element.append(useThis.elements.confirm || "");
  });

  useThis.functions.dataLoad();
  return $element;
};

var formVideoLinkGenerate = (parameters = {}) => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    functions: {},
  };

  const $element = createNodeElement(`
        <div class="div_sEdLI3d">
            <div id="closeThis" class="div_FG8f1fQ"></div>
            <div class="div_5S0v3rr">
                <div class="div_7u66WUf">
                    <button id="close" class="button_0530xdO"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-angle-left"><path d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z"></path></svg></button>
                    <h3>Tiempo</h3>
                </div>
                <form id="form" class="form_Wjg689O" autocomplete="off">
                    <div class="div_sh8NsKX">
                        <label class="label_RRjPQLY" style="pointer-events:none">
                            <span>codigo</span>
                            <input type="text" name="code" value="-" autocomplete="off">
                        </label>
                        <label class="label_ZdF0kpx" style="background:var(--color-item)" >
                            <input type="checkbox" name="status">
                        </label>
                    </div>
                    <div class="div_BjGHxQ8">
                        <button id="copy" type="button">${useApp.icon.get(
                          "fi fi-rr-copy"
                        )}</button>
                        <button id="share" type="button">${useApp.icon.get(
                          "fi fi-rr-share"
                        )}</button>
                    </div>
                </form>
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const renderObjectElement = new RenderObjectElement($elements, "display");

  useThis.functions.removeLink = () => {
    const encodeQueryString = encodeQueryObject({
      route: "/room/link",
      //   token: useApp.user.token,
      id_room: useThis.params.id,
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "DELETE",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status) $elements.form.code.value = "-";
        else $elements.form.status.checked = true;
      });
  };

  useThis.functions.setLink = () => {
    const encodeQueryString = encodeQueryObject({
      route: "/room/link",
      //   token: useApp.user.token,
      id_room: useThis.params.id,
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "POST",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status) useThis.functions.getLink();
        else $elements.form.status.checked = false;
      });
  };

  useThis.functions.getLink = () => {
    const encodeQueryString = encodeQueryObject({
      route: "/room/link",
      //   token: useApp.user.token,
      query: 0,
      query_limit: "one",
      query_where: JSON.stringify([[0, 2, 0, useThis.params.id]]),
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "GET",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        $elements.form.status.checked = false;
        if (Boolean(Object.keys(data ?? {}).length)) {
          $elements.form.code.value = data.code;
          $elements.form.status.checked = true;
        }
      });
  };

  $elements.closeThis.addEventListener("click", () => {
    $element.remove();
  });

  $elements.close.addEventListener("click", () => {
    $element.remove();
  });

  $elements.form.status.addEventListener("change", () => {
    if ($elements.form.status.checked) useThis.functions.setLink();
    else useThis.functions.removeLink();
  });

  $elements.copy.addEventListener("click", () => {
    copyToClipboard($elements.form.code.value);
    dispatchEvent(
      new CustomEvent("_notification", {
        detail: { message: "copiado", name: "info" },
      })
    );
  });

  $elements.share.addEventListener("click", () => {
    if (navigator.share) {
      navigator
        .share({
          title: parameters.name,
          text: "",
          url: `${location.origin}/#/video/link/${$elements.form.code.value}`,
        })
        .then(() => console.log("Contenido compartido con éxito"))
        .catch((error) => console.log("Error al compartir:", error));
    } else {
      // Manejar el caso en que la API no esté disponible
      console.log("La API de compartir no está soportada en este navegador");
    }
  });

  renderObjectElement.set({
    share: !!navigator.share,
  });

  useThis.functions.getLink();
  return $element;
};

var videoIdUsers = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      dataNull: defineVal(true),
      dataTrue: defineVal([]),
    },
    values: {
      dataTrue: [],
    },
    elements: {
      formGenerate: formVideoLinkGenerate(),
    },
    functions: {},
  };

  const $element = replaceNodeChildren(
    createNodeElement(`
        <div class="div_sUQTlMzJWysnrlN div_1TgYFMj" style="position:absolute">
            <header class="header_hbN5Ha3C9tx2pG4 header_oMr76Fi">
                <div class="div_n64i96I">
                    <a href="#/video/${
                      useThis.params.id
                    }" class="button_Ygi1XTBzBs4wCXV button-icon">${useApp.icon.get(
      "fi fi-rr-angle-small-left"
    )}</a>
                    <h3 id="textTitle">Video</h3>
                </div>
                <div class="div_n64i96I">
                    <button id="btnOpenFormInvite" class="button_Ygi1XTBzBs4wCXV button-icon">${useApp.icon.get(
                      "fi fi-rr-user-add"
                    )}</button>
                    <a href="#/video/${
                      useThis.params.id
                    }/edit" class="button_Ygi1XTBzBs4wCXV button-icon">${useApp.icon.get(
      "fi fi-rr-pencil"
    )}</a>
                </div>
            </header>
            <div class="div_nUAQnHkhCrVhFEk" style="padding: 10px;">

                <div id="itemNull" class="loader-i" style="--pixel:60px;"></div>

                <div id="itemFalse" class="div_uLpB1pckiSEJgCU">

                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path
                            d="M19.949,5.536,16.465,2.05A6.958,6.958,0,0,0,11.515,0H7A5.006,5.006,0,0,0,2,5V19a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V10.485A6.951,6.951,0,0,0,19.949,5.536ZM18.535,6.95A4.983,4.983,0,0,1,19.316,8H15a1,1,0,0,1-1-1V2.684a5.01,5.01,0,0,1,1.051.78ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V5A3,3,0,0,1,7,2h4.515c.164,0,.323.032.485.047V7a3,3,0,0,0,3,3h4.953c.015.162.047.32.047.485Z" />
                    </svg>
                    <h3>No se encontraron resultados</h3>

                </div>

                <div id="itemTrue" class="div_W3MAKlpobTKx7BU" style=""></div>

            </div>
            <div data-node-children="formVideo" id="formVideo" style="display:none"></div>
            <div data-node-children="formVideoLinkJoin" id="formVideoLinkJoin" style="display:none"></div>
        </div>
    `),
    {
      formVideo: formVideo({
        from: "add",
        inputs: [{ title: "nombre", key: "name", value: "" }],
      }),
      formVideoLinkJoin: formVideoLinkJoin(),
    },
    true
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  const renderObjectElement = new RenderObjectElement($elements);

  useThis.reactivity.dataNull.observe((value) => {
    renderObjectElement.set({
      itemNull: value,
      itemFalse: !value && !Object.keys(useThis.values.dataTrue).length,
      itemTrue: !value && !!Object.keys(useThis.values.dataTrue).length,
      buttons: !value && !!Object.keys(useThis.values.dataTrue).length,
    });
  });

  useThis.reactivity.dataTrue.observe(() => {
    const fragment = document.createDocumentFragment();
    fragment.append(
      ...useThis.reactivity.dataTrue.value.map((data) => {
        const $element = createNodeElement(`
                <a href="#/video/${useThis.params.id}" class="div_q97S60f">
                    <div class="div_Fxol8YY">
                        <span>${data.fullname[0].toUpperCase()}</span>
                        <img src="https://img.vniox.com/get.php?id=${
                          data.file_avatar
                        }&index=2" style="display:none">
                    </div>
                    <div class="div_RbqUyx3">
                        <span class="text-ellipsis">${data.fullname} ${
          data.lastname
        }</span>
                        <p class="text-ellipsis">${
                          data.owned == 1 ? "propio" : "invitado"
                        }</p>
                    </div>
                    ${useApp.icon.get("fi fi-rr-angle-small-right")}
                </a>
            `);

        $element.querySelector("img").onload = (e) => {
          e.target.style.display = "";
        };

        return $element;
      })
    );

    $elements.itemTrue.append(fragment);

    // if (useThis.reactivity.dataTrue.value.length > 49) {
    //   console.log("activar observador");
    // }
  });

  useThis.functions.dataLoad = () => {
    const encodeQueryString = encodeQueryObject({
      route: "/room/user",
      id_room: useThis.params.id,
      query: 3,
      query_limit: 50,
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "GET",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        useThis.values.dataTrue = useThis.values.dataTrue.concat(data);

        useThis.reactivity.dataNull.value = true;
        useThis.reactivity.dataTrue.value = data;
        useThis.reactivity.dataNull.value = false;
      });
  };
  useThis.functions.dataLoad();

  $elements.btnOpenFormInvite.addEventListener("click", () => {
    $element.append(useThis.elements.formGenerate);
  });

  return $element;
};

var videoLinkId = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
  };

  const encodeQueryString = encodeQueryObject({
    route: "/room/user",
    code: useThis.params.id,
  });

  fetch(useApp.url.api(`/api.php?${encodeQueryObject(encodeQueryString)}`), {
    method: "POST",
    headers: {
      "Token-Auth": Cookie.get(useApp.auth),
    },
    // credentials: "include",f
  })
    .then((res) => res.json())
    .then(() => {
      location.hash = "/video";
    });

  return document.createTextNode("");
};

var Month = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
];

var Gender = [
    { id : 1, name : 'Masculino' },
    { id : 2, name : 'Femenino' },
];

var profile = () => {
  const useApp = window.dataApp;
 
  const $element = createNodeElement(`
        <div class="div_5Zz84Ni  ">
            <div class="div_pB6zzvH">
                <a href="#/">${useApp.icon.get("fi fi-rr-angle-small-left")}</a>
                <button id="logout">${useApp.icon.get("fi fi-rr-exit")}</button>
            </div>
            <div class="div_HtXs42z scroll-y" >
                <div class="div_9d2AH62"><img src="" id="img"allpaper" style="display:none"></div>
                <div class="div_e6dR5Cp">
                    <div class="div_g90gE7g"> 
                        <div class="div_7exS891">
                            <div class="div_Y6670k2">
                                <div class="div_rwsKT2P">
                                    <span id="spanAvatar">${useApp.user.data.fullname[0].toUpperCase()}</span>
                                    <img src="" id="imgAvatar" style="display:none">
                                </div>
                                <button class="button_57zh9xb" style="display:none"><i class="fi fi-rr-pencil"></i></button>
                            </div>
                            <div class="div_w23w1hQ">
                                <div class="div_q9SpFZJ"></div>
                                <div class="div_751XNwm">
                                    <div class="div_LSlRYXR">
                                        <h4 data-render-text="fullname">-</h4>
                                        <span data-render-text="biography">-</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="div_MV6T05n">
                        <div class="div_FW1pCy1">
                            <div class="div_7soD7Ah">
                                <h4 class="h4_8jdxYE0">Informacion Personal</h4>
                                <div class="div_43dhiC8">
                                    <button class="button_4tqA7O4">
                                        ${useApp.icon.get("fi fi-rr-gift")}
                                        <div>
                                            <span>Cumpleaños</span>
                                            <h4 class="text-ellipsis" data-render-text="birthdate">-</h4>
                                        </div>
                                    </button>
                                    <div class="button_4tqA7O4">
                                        ${useApp.icon.get(
                                          "fi fi-rr-venus-mars"
                                        )}
                                        <div>
                                            <span>Genero</span>
                                            <h5 class="text-ellipsis" data-render-text="gender">-</h5>
                                        </div>
                                    </div>
                                    <div class="button_4tqA7O4">
                                        ${useApp.icon.get("fi fi-rr-envelope")}
                                        <div>
                                            <span>Correo</span>
                                            <h5 class="text-ellipsis" data-render-text="email">-</h5>
                                        </div>
                                    </div>
                                    <div class="button_4tqA7O4">
                                        ${useApp.icon.get(
                                          "fi fi-rr-phone-flip"
                                        )}
                                        <div>
                                            <span>Telefono</span>
                                            <h5 class="text-ellipsis" data-render-text="phone">-</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 class="h4_8jdxYE0">Configuracion</h4>
                        <div class="div_FW1pCy1">
                            <a href="#/avatar" class="a_K6KH1Ba">
                                ${useApp.icon.get("fi fi-rr-camera")}
                                <div>
                                    <span>Avatar</span>
                                </div>
                            </a>
                            <a href="#/cuenta" class="a_K6KH1Ba">
                                ${useApp.icon.get("fi fi-rr-user")}
                                <div>
                                    <span>Cuenta</span>
                                </div>
                            </a>
                            <a href="#/seguridad" class="a_K6KH1Ba">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="m18.573,2.126L12.314.051c-.203-.068-.426-.068-.629,0l-6.259,2.075c-2.05.68-3.427,2.587-3.427,4.746v5.171c0,6.563,7.005,10.577,9.152,11.65,0,0,.43.307.85.307s.791-.24.791-.24c2.16-.869,9.207-4.281,9.207-11.717v-5.171c0-2.159-1.377-4.066-3.427-4.746Zm1.427,9.917c0,6.182-6.088,9.111-7.953,9.861-1.889-.944-8.047-4.444-8.047-9.861v-5.171c0-1.295.826-2.439,2.056-2.848l5.944-1.971,5.944,1.971c1.229.408,2.056,1.553,2.056,2.848v5.171Zm-5.5-2.543c0,1.025-.617,1.906-1.5,2.291v3.209c0,.553-.447,1-1,1s-1-.447-1-1v-3.209c-.883-.386-1.5-1.266-1.5-2.291,0-1.381,1.119-2.5,2.5-2.5s2.5,1.119,2.5,2.5Z"></path></svg>
                                <div>
                                    <span>seguridad</span>
                                </div>
                            </a>
                            <a href="#/apariencia" class="a_K6KH1Ba">
                                ${useApp.icon.get("fi fi-rr-palette")}
                                <div>
                                    <span>Apariencia</span>
                                </div>
                            </a>
                            <a href="#/permission" class="a_K6KH1Ba">
                                ${useApp.icon.get("fi fi-rr-key")}
                                <div>
                                    <span>permisos</span>
                                </div>
                            </a>
                            <a href="#/stiker" class="a_K6KH1Ba" style="display:none">
                                ${useApp.icon.get("fi fi-rr-sticker")}
                                <div>
                                    <span>Stiker</span>
                                </div>
                            </a>
                        </div> 
                        <div class="div_FW1pCy1" style="display:none">
                            <button href="#/stiker" class="a_K6KH1Ba logout pointer">
                                ${useApp.icon.get("fi fi-rr-exit")}
                                <div>
                                    <span>Cerrar Sesion</span>
                                </div>
                            </button>
                        </div>
                        <span style="color:var(--color-letter); text-align:center; padding: 15px; opacity: .5">NV-19.1728939527965</span>
                    </div>
                </div>
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const image = new Image();
  image.src = `https://img.vniox.com/get.php?id=${useApp.user.data.file_avatar}&index=3`;
  image.onload = () => {
    $element.querySelectorAll("img").forEach((img) => {
      img.src = image.src;
      img.style.display = "";
    });
  };

  $element.querySelectorAll("[data-render-text]").forEach((element) => {
    const key = element.getAttribute("data-render-text");
    const value =
      useApp.user.data[element.getAttribute("data-render-text")] ?? "-";
    let render = value;

    if (key == "birthdate") {
      const date = new Date(value);
      render = `${date.getDate()} ${
        Month[date.getMonth()]
      } ${date.getFullYear()}`;
    } else if (key == "gender") {
      const gender = Gender.find((gender) => gender.id == value) ?? {};
      render = gender.name ?? "-";
    }

    element.textContent = render;
    element.removeAttribute("data-render-text");
  });

  $elements.logout.addEventListener("click", () => {
    const logoutConfirm = eleConfirm({
      title: "Salir",
      message: "¿cerrar sesion?",
    });
    logoutConfirm.addEventListener(
      "_click",
      (e) => {
        if (e.detail.status) {
          const encodeQueryString = encodeQueryObject({
            route: "/auth/logout",
            id: "one",
          });

          fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
            method: "POST",
            headers: {
              "Token-Auth": Cookie.get(useApp.auth),
            },
            // credentials: "include",
          })
            .then((res) => res.json())
            .then((res) => {
              // console.log(res);
              if (res && res.status) {
                location.hash = "/login";
                dispatchEvent(
                  new CustomEvent("_notification", {
                    detail: { message: "session cerrada", name: "success" },
                  })
                );
              } else
                dispatchEvent(
                  new CustomEvent("_notification", {
                    detail: { message: "Ocurrio un error", name: "danger" },
                  })
                );
            });
        }
      },
      { once: true }
    );

    $element.append(logoutConfirm);
  });

  return $element;
};

var apariencia = () => {
  const useApp = window.dataApp;
  const useThis = {
    values: {
      theme: localStorage.getItem("theme"),
      themeChat: localStorage.getItem("theme-chat"),
      fontFamily: localStorage.getItem("font-family"),
    },
  };

  const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/profile" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle">Apariencia</h3>
                </div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px">
                <div class="div_DCTrK3U">
                    <div class="div_98E12uW"><h3>Chat</h3></div>
                    <div class="div_FRs55rt">
                        <div class="div_AYs8msi"> 
                            <div class="div_w1AIy8F">
                                <label class="label_NWRrl70">
                                    <input type="color" value="#ffffff">
                                    <span>Hola?</span>
                                </label>
                                <label class="label_NWRrl70 right">
                                    <input type="color" id="chat" value="${
                                      useThis.values.themeChat
                                    }">
                                    <span>Adiós?</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="div_98E12uW"><h3>Fuente</h3></div>
                    <div class="div_FRs55rt">
                        <div id="elementFont" class="div_xAJ4fl5">
                            ${Font.map((font) => {
                              return `<button class="button_j5G8e0D ${
                                font.name == useThis.values.fontFamily
                                  ? "focus"
                                  : ""
                              }" data-name="${font.name}"><span>${
                                font.name
                              }</span>${useApp.icon.get(
                                "fi fi-rr-check"
                              )}</button>`;
                            }).join("")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.chat.addEventListener("change", (e) => {
    localStorage.setItem("theme-chat", e.target.value);
    dispatchEvent(new CustomEvent("_theme"));
  });

  $elements.elementFont.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      const buttonFocus =
        $elements.elementFont.querySelector("button.focus") ||
        document.createElement("button");
      buttonFocus.classList.remove("focus");
      button.classList.add("focus");

      localStorage.setItem("font-family", button.getAttribute("data-name"));
      dispatchEvent(new CustomEvent("_theme"));
    }
  });

  return $element;
};

var seguridad = () => {
  const useApp = window.dataApp;
  const useThis = {
    reactivity: {
      dataNull: defineVal(true),
      dataTrue: defineVal([]),
    },
    value: {
      dataTrue: [],
    },
    functions: {},
  };

  const $element = createNodeElement(`
        <div class="div_Xu02Xjh" style="position:fixed">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/profile" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle">Seguridad</h3>
                </div>
                <div class="div_n64i96I">
                    <a href="#/password/change" class="button_lvV6qZu"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-key"><path d="M7.505,24A7.5,7.5,0,0,1,5.469,9.283,7.368,7.368,0,0,1,9.35,9.235l7.908-7.906A4.5,4.5,0,0,1,20.464,0h0A3.539,3.539,0,0,1,24,3.536a4.508,4.508,0,0,1-1.328,3.207L22,7.415A2.014,2.014,0,0,1,20.586,8H19V9a2,2,0,0,1-2,2H16v1.586A1.986,1.986,0,0,1,15.414,14l-.65.65a7.334,7.334,0,0,1-.047,3.88,7.529,7.529,0,0,1-6.428,5.429A7.654,7.654,0,0,1,7.505,24Zm0-13a5.5,5.5,0,1,0,5.289,6.99,5.4,5.4,0,0,0-.1-3.3,1,1,0,0,1,.238-1.035L14,12.586V11a2,2,0,0,1,2-2h1V8a2,2,0,0,1,2-2h1.586l.672-.672A2.519,2.519,0,0,0,22,3.536,1.537,1.537,0,0,0,20.465,2a2.52,2.52,0,0,0-1.793.743l-8.331,8.33a1,1,0,0,1-1.036.237A5.462,5.462,0,0,0,7.5,11ZM5,18a1,1,0,1,0,1-1A1,1,0,0,0,5,18Z"></path></svg></a>
                    <button id="btnLogoutAll" class="button_lvV6qZu button-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-exit"><path d="M22.829,9.172,18.95,5.293a1,1,0,0,0-1.414,1.414l3.879,3.879a2.057,2.057,0,0,1,.3.39c-.015,0-.027-.008-.042-.008h0L5.989,11a1,1,0,0,0,0,2h0l15.678-.032c.028,0,.051-.014.078-.016a2,2,0,0,1-.334.462l-3.879,3.879a1,1,0,1,0,1.414,1.414l3.879-3.879a4,4,0,0,0,0-5.656Z"></path><path d="M7,22H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2H7A1,1,0,0,0,7,0H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H7a1,1,0,0,0,0-2Z"></path></svg></button>
                </div>
            </header>
           
            <div class="div_guZ6yID" style="padding:10px">
              
                <div id="itemNull" class="loader-i" style="--color:var(--color-letter); padding: 20px"></div>
                <div id="itemFalse" class="div_uLpB1pckiSEJgCU" style="display:none">

                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path
                            d="M19.949,5.536,16.465,2.05A6.958,6.958,0,0,0,11.515,0H7A5.006,5.006,0,0,0,2,5V19a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V10.485A6.951,6.951,0,0,0,19.949,5.536ZM18.535,6.95A4.983,4.983,0,0,1,19.316,8H15a1,1,0,0,1-1-1V2.684a5.01,5.01,0,0,1,1.051.78ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V5A3,3,0,0,1,7,2h4.515c.164,0,.323.032.485.047V7a3,3,0,0,0,3,3h4.953c.015.162.047.32.047.485Z" />
                    </svg>
                    <h3>Sin sessiones por mostrar</h3>

                </div>
                <div id="itemTrue" class="div_P7wEgDd" style="display:none"></div>
                
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const elements = {
    confirm: eleConfirm({ title: "Salir", message: "¿cerrar esta sesion?" }),
    confirmAll: eleConfirm({
      title: "Salir",
      message: "¿cerrar todas las sesiones? (menos la actual)",
    }),
  };

  let sessionId = null;
  let sessionItem = null;

  useThis.reactivity.dataNull.observe((load) => {
    const render = {
      itemNull: load,
      itemFalse: !load && !Object.keys(useThis.value.dataTrue).length,
      itemTrue: !load && !!Object.keys(useThis.value.dataTrue).length,
    };

    Object.entries(render).forEach((keyvalue) => {
      $elements[keyvalue[0]].style.display = keyvalue[1] ? "" : "none";
    });
  });

  useThis.reactivity.dataTrue.observe((datas) => {
    $elements.itemTrue.innerHTML = datas
      .map((data) => {
        const datetime = new Date(data.datetime_add);
        return `
                    <div class="div_evdDBf6" data-item>
                        <span>${datetime.toLocaleString()}</span>
                        <button data-id="${data.id}">${useApp.icon.get(
          "fi fi-rr-exit"
        )}</button>
                    </div>
                `;
      })
      .join("");
  });

  useThis.functions.dataLoad = () => {
    const encodeQueryString = encodeQueryObject({
      route: "/session",
      token: useApp.user.token,
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "GET",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        useThis.value.dataTrue = useThis.value.dataTrue.concat(
          Array.isArray(data) ? data : []
        );

        useThis.reactivity.dataNull.value = true;
        useThis.reactivity.dataTrue.value = Array.isArray(data) ? data : [];
        useThis.reactivity.dataNull.value = false;
      });
  };

  $elements.itemTrue.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      sessionId = button.getAttribute("data-id");
      sessionItem = button.closest("[data-item]");
      $element.append(elements.confirm);
    }
  });

  elements.confirm.addEventListener("_click", (e) => {
    if (e.detail.status) {
      const encodeQueryString = encodeQueryObject({
        route: "/auth/logout",
        // token: useApp.user.token,
        id: sessionId,
      });

      fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
        method: "POST",
        headers: {
          "Token-Auth": Cookie.get(useApp.auth),
        },
        // credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res && res.status) {
            sessionItem.remove();
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: { message: "session cerrada", name: "success" },
              })
            );
          } else
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: { message: "Ocurrio un error", name: "danger" },
              })
            );
        });
    }
  });

  elements.confirmAll.addEventListener("_click", (e) => {
    if (e.detail.status) {
      const encodeQueryString = encodeQueryObject({
        route: "/auth/logout",
        id: "all",
      });

      fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
        method: "POST",
        headers: {
          "Token-Auth": Cookie.get(useApp.auth),
        },
        // credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res && res.status) {
            dispatchEvent(new CustomEvent("hashchange"));
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: { message: "sessiones cerrada", name: "success" },
              })
            );
          } else
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: { message: "Ocurrio un error", name: "danger" },
              })
            );
        });
    }
  });

  $elements.btnLogoutAll.addEventListener("click", () => {
    $element.append(elements.confirmAll);
  });

  useThis.functions.dataLoad();
  return $element;
};

var permission = () => {
  const useApp = window.dataApp;

  const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover" style="position:fixed">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/profile" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle">Permisos</h3>
                </div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px;">

                <div id="itemTrue" class="div_IlRTzcd">
                    <div class="div_xIghAwU5okdjsxD item-list">
                        <label class="label_SeaRSWt">
                            <span>Notificacion push</span>
                            <input id="permissionNotificationPush" type="checkbox">
                        </label>
                    </div>

                    <div class="div_xIghAwU5okdjsxD item-list">
                         <label class="label_SeaRSWt">
                            <span>Microfono</span>
                            <input id="permissionMicrophone" type="checkbox">
                        </label>
                    </div>

                </div>

            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const serviceWorkerReady = new Promise((resolve, reject) => {
    if (!navigator.serviceWorker) resolve(null);
    else navigator.serviceWorker.ready.then(resolve).catch(reject);
  });

  const permissionMicrophone = (response) => {
    if (response.state == "granted") {
      $elements.permissionMicrophone.parentElement.style.pointerEvents = "none";
      $elements.permissionMicrophone.checked = true;
    } else if (response.state == "denied") {
      $elements.permissionMicrophone.parentElement.style.pointerEvents = "";
      $elements.permissionMicrophone.checked = false;
    }
  };

  const permissionNotificationPush = (status) => {
    $elements.permissionNotificationPush.parentElement.style.pointerEvents = "";
    $elements.permissionNotificationPush.checked = Boolean(status);
  };

  $elements.permissionMicrophone.addEventListener("change", () => {
    $elements.permissionMicrophone.checked =
      !$elements.permissionMicrophone.checked;

    navigator.permissions.query({ name: "microphone" }).then((response) => {
      if (response.state == "prompt") {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          stream.getTracks().forEach((track) => track.stop());
        });
      }
    });
  });

  $elements.permissionNotificationPush.addEventListener("change", () => {
    if ($elements.permissionNotificationPush.checked) {
      serviceWorkerReady.then((reg) => {
        if (reg) {
          fetch("https://notification.victor01sp.com/get.php")
            .then((res) => res.arrayBuffer())
            .then((key) => {
              reg.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: new Uint8Array(key),
                })
                .then((res) => res.toJSON())
                .then((suscripcion) => {
                  permissionNotificationPush(true);

                  const encodeQueryString = encodeQueryObject({
                    route: "/notification",
                    token: useApp.user.token,
                  });

                  const body = JSON.stringify({
                    suscription: JSON.stringify(suscripcion),
                  });

                  fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
                    method: "POST",
                    headers: {
                      "Token-Auth": Cookie.get(useApp.auth),
                    },
                    // credentials: "include",
                    body,
                  })
                    .then((res) => res.json())
                    .then(console.log);
                });
            });
        }
      });
    } else {
      serviceWorkerReady.then((reg) => {
        reg.pushManager.getSubscription().then((subs) => {
          if (subs)
            subs.unsubscribe().then(() => permissionNotificationPush(false));
        });
      });
    }

    $elements.permissionNotificationPush.parentElement.style.pointerEvents =
      "none";

    $elements.permissionNotificationPush.checked =
      !$elements.permissionNotificationPush.checked;
  });

  navigator.permissions.query({ name: "microphone" }).then((response) => {
    permissionMicrophone(response);
    response.onchange = () => permissionMicrophone(response);
  });

  serviceWorkerReady.then((reg) => {
    reg.pushManager.getSubscription().then(permissionNotificationPush);
  });

  return $element;
};

var eleCalendar = (parameters = {}) => {
  const Month = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const Day = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];

  const $element = createNodeElement(`
      <div class="div_Ed0WWt537MU926D" popover>
          <div id="elementClose" class="div_xAeKmwifq7Ajpip">
            <div class="div_zkdwut55cOC4757">
                <div class="div_Shm089Y0yC25009">
                    <div class="div_Acqf9bTDjZOoLpI">
                        <button id="btnCancel"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z"></path></svg></button>
                        <h4>${parameters.title}</h4>
                    </div>
                    <div class="div_iJVaX1Vhq90V6K2">
                        <div id="dayText">-</div>
                        <div id="monthText" class="half">-</div>
                        <div id="yearText">-</div>
                    </div>
                    <div class="div_UjWKiVEMyqduyH">
                        <div id="containerDate" class="div_4qg39xR95L71RiS ">
                            <div id="elementDay" class="div_afO4579AKSm7b8q"></div>
                            <div id="containerYearMonth" class="div_Hd4V1BgCSOSCL5J">
                                <div id="elementYear" class="div_w17wYdh13YdIUnI year"></div>
                                <div id="elementMonth" class="div_w17wYdh13YdIUnI month"></div>
                            </div>
                        </div>
                        <button id="btnSubmit" class="button_jzYwCtYodSEB">Elegir</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
  `);

  const $elements = Array.from($element.querySelectorAll("[id]")).reduce(
    (prev, curr) => {
      prev[curr.getAttribute("id")] = curr;
      curr.removeAttribute("id");
      return prev;
    },
    {}
  );

  const date = parameters.value ? new Date(parameters.value) : new Date();

  const datetimeDinamic = {
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate(),
  };

  datetimeDinamic.dayLimit = new Date(
    datetimeDinamic.year,
    datetimeDinamic.month + 1,
    0
  ).getDate();

  $elements.dayText.addEventListener("click", () => {
    $elements.containerYearMonth.remove();
  });

  $elements.monthText.addEventListener("click", () => {
    $elements.containerYearMonth.textContent = "";
    $elements.containerYearMonth.append($elements.elementMonth);
    $elements.containerDate.append($elements.containerYearMonth);

    const focus = $elements.elementMonth.querySelector(".focus");
    if (focus) focus.scrollIntoView({ block: "center", inline: "center" });
  });

  $elements.yearText.addEventListener("click", () => {
    $elements.containerYearMonth.textContent = "";
    $elements.containerYearMonth.append($elements.elementYear);
    $elements.containerDate.append($elements.containerYearMonth);

    const focus = $elements.elementYear.querySelector(".focus");
    if (focus) focus.scrollIntoView({ block: "center", inline: "center" });
  });

  $elements.elementDay.addEventListener("click", (e) => {
    const span = e.target.closest("span");

    if (span) {
      const _date = parseInt(span.getAttribute("data-data"));
      const up = _date > datetimeDinamic.day;

      if (_date == datetimeDinamic.day) return;
      datetimeDinamic.day = _date;

      const spanfocus = $elements.elementDay.querySelector("span.focus");
      if (spanfocus) spanfocus.classList.remove("focus");
      span.classList.add("focus");

      $elements.dayText.innerHTML = `<h3 class="${up ? "up" : "down"}">${
        span.textContent
      }</h3>`;

      // $elements.btnSubmit.click();
    }
  });

  $elements.elementMonth.addEventListener("click", (e) => {
    const span = e.target.closest("span");

    if (span) {
      $elements.containerYearMonth.remove();
      const _date = parseInt(span.getAttribute("data-data"));
      const up = _date > datetimeDinamic.month;

      if (_date == datetimeDinamic.month) return;
      datetimeDinamic.month = _date;

      const spanfocus = $elements.elementMonth.querySelector("span.focus");
      if (spanfocus) spanfocus.classList.remove("focus");
      span.classList.add("focus");

      $elements.monthText.innerHTML = `<h3 class="${up ? "up" : "down"}">${
        span.textContent
      }</h3>`;

      datetimeDinamic.dayLimit = new Date(
        datetimeDinamic.year,
        datetimeDinamic.month + 1,
        0
      ).getDate();

      if (datetimeDinamic.dayLimit < datetimeDinamic.day) {
        $elements.dayText.textContent = ("0" + datetimeDinamic.dayLimit).slice(
          -2
        );
        datetimeDinamic.day = datetimeDinamic.dayLimit;
      }

      renderDatetime("day");
    }
  });

  $elements.elementYear.addEventListener("click", (e) => {
    const span = e.target.closest("span");

    if (span) {
      $elements.containerYearMonth.remove();
      const _date = parseInt(span.getAttribute("data-data"));
      const up = _date > datetimeDinamic.year;

      if (_date == datetimeDinamic.year) return;
      datetimeDinamic.year = _date;

      const spanfocus = $elements.elementYear.querySelector("span.focus");
      if (spanfocus) spanfocus.classList.remove("focus");
      span.classList.add("focus");

      $elements.yearText.innerHTML = `<h3 class="${up ? "up" : "down"}">${
        span.textContent
      }</h3>`;

      datetimeDinamic.dayLimit = new Date(
        datetimeDinamic.year,
        datetimeDinamic.month + 1,
        0
      ).getDate();

      if (datetimeDinamic.dayLimit < datetimeDinamic.day) {
        $elements.dayText.textContent = ("0" + datetimeDinamic.dayLimit).slice(
          -2
        );
        datetimeDinamic.day = datetimeDinamic.dayLimit;
      }

      renderDatetime("day");
    }
  });

  $elements.btnSubmit.addEventListener("click", () => {
    const datetime = new Date(
      datetimeDinamic.year,
      datetimeDinamic.month,
      datetimeDinamic.day,
      0,
      0,
      0,
      0
    ).getTime();
    $element.dispatchEvent(
      new CustomEvent("_change", { detail: { datetime } })
    );
    $element.hidePopover();
  });
  $element.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) $element.hidePopover();
  });

  $elements.btnCancel.addEventListener("click", () => {
    $element.hidePopover();
  });

  const renderDatetime = (change = "*") => {
    if (["year", "*"].includes(change)) {
      $elements.elementYear.innerHTML = Array.from(
        Array(new Date().getFullYear() + 15 - 1970).keys()
      )
        .map((num) => {
          const date = 1970 + num;

          const focus = datetimeDinamic.year == date;

          if (focus) $elements.yearText.innerHTML = `<h3>${date}</h3>`;
          return `<span class="${
            focus ? "focus" : ""
          }" data-data="${date}">${date}</span>`;
        })
        .join("");
    }

    if (["month", "*"].includes(change)) {
      $elements.elementMonth.innerHTML = Array.from(Array(Month.length).keys())
        .map((num) => {
          const numtext = Month[num];
          const focus = datetimeDinamic.month == num;

          if (focus) $elements.monthText.innerHTML = `<h3>${numtext}</h3>`;
          return `<span class="${
            focus ? "focus" : ""
          }" data-data="${num}">${numtext}</span>`;
        })
        .join("");
    }

    if (["day", "*"].includes(change)) {
      const tempDate = new Date(
        datetimeDinamic.year,
        datetimeDinamic.month,
        1,
        0,
        0,
        0,
        0
      );

      $elements.elementDay.innerHTML = [
        ...Day.concat(Array(tempDate.getDay()).fill(" ")).map(
          (num) => `<span class="off">${num[0]}</span>`
        ),
        ...Array.from(Array(datetimeDinamic.dayLimit).keys()).map((num) => {
          ++num;

          const numtext = num;
          const focus = datetimeDinamic.day == num;
          if (focus) $elements.dayText.innerHTML = `<h3>${numtext}</h3>`;
          return `<span class="${
            focus ? "focus" : ""
          }" data-data="${num}">${numtext}</span>`;
        }),
      ].join("");
    }
  };

  $elements.containerYearMonth.remove();
  renderDatetime();

  return $element;
};

var cuenta = () => {
  const useApp = window.dataApp;
  const useThis = {
    options: {
      gender:
        Gender.find((gender) => gender.id == useApp.user.data.gender) ?? {},
    },
  };

  const $element = replaceNodeChildren(
    createNodeElement(`
        <div class="div_Xu02Xjh" style="position:fixed">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/profile" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle">Cuenta</h3>
                </div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px">
                <form id="form" class="form_uHZJJwl">
                    <div class="div_QXbmy52">
                        <label class="label_RRjPQLY">
                            <span>nombre</span>
                            <input type="text" name="fullname" value="${
                              useApp.user.data.fullname ?? ""
                            }" autocomplete="off">
                        </label>
                        <label class="label_RRjPQLY">
                            <span>apellido</span>
                            <input type="text" name="lastname" value="${
                              useApp.user.data.lastname ?? ""
                            }" autocomplete="off">
                        </label>
                        <label class="label_RRjPQLY">
                            <span>usuario</span>
                            <input type="text" name="username" value="${
                              useApp.user.data.username ?? ""
                            }" autocomplete="off">
                        </label>
                        <label class="label_RRjPQLY">
                            <span>correo</span>
                            <input type="text" name="email" value="${
                              useApp.user.data.email ?? ""
                            }" autocomplete="off">
                        </label>
                        <label class="label_RRjPQLY">
                            <span>telefono</span>
                            <input type="text" name="phone" value="${
                              useApp.user.data.phone ?? ""
                            }" autocomplete="off">
                        </label>
                        <label class="label_RRjPQLY">
                            <span>biografia</span>
                            <input type="text" name="biography" value="${
                              useApp.user.data.biography ?? ""
                            }" autocomplete="off">
                        </label>
                        <label class="label_RLkFTU2uXJoKahS">
                            <input type="text" name="gender" placeholder="" value="${
                              useThis.options.gender.name ?? "-"
                            }" data-value="${
      useThis.options.gender.id ?? 0
    }" readonly>
                            <span>genero</span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" ><path d="M18.71,8.21a1,1,0,0,0-1.42,0l-4.58,4.58a1,1,0,0,1-1.42,0L6.71,8.21a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.59,4.59a3,3,0,0,0,4.24,0l4.59-4.59A1,1,0,0,0,18.71,8.21Z" /></svg></span>
                        </label>
                        <label class="label_RLkFTU2uXJoKahS">
                            <input type="text" name="birthdate" placeholder="" value="${new Date(
                              useApp.user.data.birthdate
                            ).toLocaleDateString()}" data-value="${
      useApp.user.data.birthdate
    }" readonly>
                            <span>Fecha de Nacimiento</span>
                            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-calendar-day"><path d="m8,12h-2c-1.103,0-2,.897-2,2v2c0,1.103.897,2,2,2h2c1.103,0,2-.897,2-2v-2c0-1.103-.897-2-2-2Zm-2,4v-2h2v2s-2,0-2,0ZM19,2h-1v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-8v-1c0-.552-.447-1-1-1s-1,.448-1,1v1h-1C2.243,2,0,4.243,0,7v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V7c0-2.757-2.243-5-5-5Zm-14,2h14c1.654,0,3,1.346,3,3v1H2v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3v-9h20v9c0,1.654-1.346,3-3,3Z"></path></svg></span>
                        </label>
                    </div>
                    <div class="div_jmyxzzW">
                        <button type="submit" class="focus">Actualizar</button>
                    </div>
                </form>
            </div>
            <div id="optionGenres" class="div_MAZ9BVyhJE4O9HF" style="display:none">
                <div id="optionGenresClose" class="div_P0rWhOxhX0Wlz"></div>
                <div class="div_00eYHleYM5CcmWw">
                    <div class="div_j2E4qpFKf5mTqyf">
                        <div id="genres" class="div_TwR0YoQl6BlKpR">
                            <button data-type="0" data-name="Ninguno">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-ban"><path d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm0,2a9.949,9.949,0,0,1,6.324,2.262L4.262,18.324A9.992,9.992,0,0,1,12,2Zm0,20a9.949,9.949,0,0,1-6.324-2.262L19.738,5.676A9.992,9.992,0,0,1,12,22Z"></path></svg>
                                <span>-</span>
                            </button>
                            <button data-type="1" data-name="Masculino">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" data-svg-name="fi fi-rr-mars"><path d="M448.249,0H341.999c-11.736,0-21.25,9.53-21.25,21.285s9.514,21.285,21.25,21.285h97.453L294.271,187.991  c-78.572-62.08-192.511-48.605-254.488,30.097S-8.742,410.916,69.83,472.996s192.511,48.605,254.488-30.097  c51.91-65.917,51.91-158.893,0-224.81L469.5,72.668v97.614c0,11.756,9.514,21.285,21.25,21.285s21.25-9.53,21.25-21.285V63.856  C512,28.589,483.458,0,448.249,0z M182.622,468.275c-76.285,0-138.126-61.943-138.126-138.354s61.841-138.354,138.126-138.354  s138.126,61.943,138.126,138.354C320.655,406.293,258.868,468.181,182.622,468.275z"></path></svg>
                                <span>Masculino</span>
                            </button>
                            <button data-type="2" data-name="Femenino">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-venus"><path d="M20,8a8,8,0,1,0-9,7.931V19H9a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V21h2a1,1,0,0,0,0-2H13V15.931A8.008,8.008,0,0,0,20,8ZM6,8a6,6,0,1,1,6,6A6.006,6.006,0,0,1,6,8Z"></path></svg>
                                <span>Femenino</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div replace-node-children="eleCalendar" id="eleCalendar"></div>
        </div>
    `),
    {
      eleCalendar: eleCalendar({
        title: "Fecha de Nacimiento",
        value: useApp.user.data.birthdate,
      }),
    }
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const encodeQueryString = encodeQueryObject({
      route: "/user",
    });

    const body = {
      fullname: $elements.form.fullname.value,
      lastname: $elements.form.lastname.value,
      username: $elements.form.username.value,
      email: $elements.form.email.value,
      phone: $elements.form.phone.value,
      biography: $elements.form.biography.value,
      gender: $elements.form.gender.getAttribute("data-value"),
      birthdate: $elements.form.birthdate.getAttribute("data-value"),
    };

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "PATCH",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      // credentials: "include",
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: "Actualizado",
                name: "success",
                duration: 3000,
              },
            })
          );
        } else {
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: data.message ?? "Ocurrio un error",
                name: "danger",
                duration: 3000,
              },
            })
          );
        }
      });
  });

  $elements.genres.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      $elements.optionGenres.style.display = "none";
      $elements.form.gender.setAttribute(
        "data-value",
        button.getAttribute("data-type")
      );
      $elements.form.gender.setAttribute(
        "value",
        button.getAttribute("data-name")
      );
    }
  });

  $elements.optionGenresClose.addEventListener("click", () => {
    $elements.optionGenres.style.display = "none";
  });

  $elements.form.gender.addEventListener("focus", () => {
    $elements.optionGenres.style.display = "";
  });

  $elements.form.birthdate.addEventListener("focus", () => {
    $elements.form.birthdate.blur();
    $elements.eleCalendar.showPopover();
  });

  $elements.eleCalendar.addEventListener("_change", (e) => {
    $elements.form.birthdate.setAttribute("data-value", e.detail.datetime);
    $elements.form.birthdate.setAttribute(
      "value",
      new Date(e.detail.datetime).toLocaleDateString()
    );
  });

  return $element;
};

var formAvatar = (parameters = {}) => {
  const useApp = window.dataApp;
  const useThis = {
    reactivity: {
      from: defineVal(parameters.from),
    },
    values: {
      imageBlob: null,
    },
  };

  const $element = createNodeElement(`
        <div class="div_5Pe946IMjyL1Rs" popover>
            <div class="div_dsb3nhtCrFmUlSN" >
                <div class="div_z2dvj15 pointer-on">
                    <div class="div_EgbyUD9">
                        <img id="imageView" src="${parameters.url ?? ""}">
                    </div>
                    <footer class="footer_fC41OH">
                        <label id="upload" >
                            <input id="image" type="file" accept="image/*" class="d-none">
                            ${useApp.icon.get("fi fi-rr-upload")}
                        </label>
                        <button id="delete">${useApp.icon.get(
                          "fi fi-rr-trash"
                        )}</button>
                        <button id="wallpaper"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-user-forbidden"><path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12,12-5.383,12-12S18.617,0,12,0Zm0,22c-1.422,0-2.774-.303-4-.841v-.159c0-1.921,1.375-3.65,3.199-4.02,.541-.11,.891-.638,.781-1.179-.109-.54-.632-.888-1.18-.781-2.469,.502-4.33,2.542-4.718,5.023-2.47-1.822-4.083-4.744-4.083-8.043,0-2.398,.85-4.6,2.262-6.324l14.062,14.062c-1.725,1.412-3.927,2.262-6.324,2.262Zm-1.962-13.376c.176-.924,.986-1.624,1.962-1.624,1.105,0,2,.895,2,2,0,.976-.699,1.786-1.624,1.962l-2.338-2.338Zm9.7,9.7l-5.817-5.817c1.265-.693,2.079-2.033,2.079-3.507,0-2.206-1.794-4-4-4-1.474,0-2.814,.814-3.507,2.079l-2.817-2.817c1.725-1.412,3.927-2.262,6.324-2.262,5.514,0,10,4.486,10,10,0,2.398-.85,4.6-2.262,6.324Z"></path></svg></button>
                        <button id="avatar">${useApp.icon.get(
                          "fi fi-rr-circle-user"
                        )}</button>
                    </footer>
                </div>
            </div> 
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  const renderObjectElement = new RenderObjectElement($elements, "display");

  useThis.reactivity.from.observe((from) => {
    renderObjectElement.set({
      upload: ["upload", "choose_upload"].includes(from),
      delete: ["choose_cloud"].includes(from),
      wallpaper: ["choose_upload", "choose_ramdom", "choose_cloud"].includes(
        from
      ),
      avatar: ["choose_upload", "choose_ramdom", "choose_cloud"].includes(from),
    });
  });

  $elements.image.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!!file) {
      useThis.values.imageBlob = file;
      $elements.imageView.setAttribute("src", URL.createObjectURL(file));
      useThis.reactivity.from.value = "choose_upload";

      styleElement($elements.imageView, { visibility: "" });
    }
  });

  $elements.delete.addEventListener("click", () => {
    if (!parameters.id) return console.log("no hay id");

    const queries = {
      route: "/files",
      token: useApp.user.token,
      id: parameters.id,
      name: parameters.url.split("/").slice(-1)[0],
    };

    fetch(useApp.url.api(`/api.php?${encodeQueryObject(queries)}`), {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          // $element.remove()
          dispatchEvent(new CustomEvent("hashchange"));
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: { message: "Eliminado", name: "success", duration: 3000 },
            })
          );
        } else {
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: data.message ?? "Ocurrio un error",
                name: "danger",
                duration: 3000,
              },
            })
          );
        }
      });
  });

  $elements.wallpaper.addEventListener("click", () => {
    const encodeQueryString = encodeQueryObject({
      route: "/user",
    });

    const body = {
      id_file_avatar: null,
    };

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "PATCH",
      body: JSON.stringify(body),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.status) {
          dispatchEvent(new CustomEvent("hashchange"));
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: "Actualizado",
                name: "success",
                duration: 3000,
              },
            })
          );
        } else {
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: data.message ?? "Ocurrio un error",
                name: "danger",
                duration: 3000,
              },
            })
          );
        }
      });
  });

  $elements.avatar.addEventListener("click", () => {
    $elements.avatar.style.pointerEvents = "none";
    if (useThis.reactivity.from.value == "choose_upload") {
      const formData = new FormData();
      const urlBlob = URL.createObjectURL(useThis.values.imageBlob);

      const image = new Image();
      image.src = urlBlob;

      image.onload = () => {
        const resizes = [
          { both: 50 },
          { both: 100 },
          { both: 500 },
          { both: 1000 },
        ];

        resizeCanvasImage(urlBlob, resizes).then(async (data) => {
          const blobs = await Promise.all(
            data.images.map((image) => {
              return new Promise((resolve) => {
                image.canvas.toBlob((blob) => {
                  resolve(new File([blob], "file.webp", { type: blob.type }));
                }, "image/webp");
              });
            })
          );

          Array.from([useThis.values.imageBlob, ...blobs]).forEach((file) => {
            formData.append("file[]", file);
          });

          fetch(
            "https://img.vniox.com/set.php?folder=FOLDER_17272_HFCET_1372_AVJIH_6149_MYMQM",
            { method: "POST", body: formData }
          )
            .then((res) => res.json())
            .then((res) => {
              const encodeQueryString = encodeQueryObject({
                route: "/files",
                token: useApp.user.token,
              });

              const body = {
                file: res[0],
                type: 1,
              };

              fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
                method: "POST",
                headers: {
                  "Token-Auth": Cookie.get(useApp.auth),
                },
                // credentials: "include",
                body: JSON.stringify(body),
              })
                .then((res) => res.json())
                .then((data) => {
                  $elements.avatar.style.pointerEvents = "";

                  if (data && data.status) {
                    dispatchEvent(new CustomEvent("hashchange"));
                    dispatchEvent(
                      new CustomEvent("_notification", {
                        detail: {
                          message: "Imagen subida",
                          name: "success",
                          duration: 3000,
                        },
                      })
                    );
                  } else {
                    dispatchEvent(
                      new CustomEvent("_notification", {
                        detail: {
                          message: data.message ?? "Ocurrio un error",
                          name: "danger",
                          duration: 3000,
                        },
                      })
                    );
                  }
                });
            });
        });
      };
    } else if (useThis.reactivity.from.value == "choose_cloud") {
      const encodeQueryString = encodeQueryObject({
        route: "/user",
        token: useApp.user.token,
      });

      const body = {
        id_file_avatar: parameters.id,
      };

      fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
        method: "PATCH",
        body: JSON.stringify(body),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          $elements.avatar.style.pointerEvents = "";

          if (data && data.status) {
            dispatchEvent(new CustomEvent("hashchange"));
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: {
                  message: "Actualizado",
                  name: "success",
                  duration: 3000,
                },
              })
            );
          } else {
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: {
                  message: data.message ?? "Ocurrio un error",
                  name: "danger",
                  duration: 3000,
                },
              })
            );
          }
        });
    }
  });

  $element.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) $element.hidePopover();
  });

  styleElement($elements.imageView, {
    visibility: isURL(parameters.url) ? "" : "hidden",
  });

  setTimeout(() => $element.showPopover());
  return $element;
};

var avatar = () => {
  const useApp = window.dataApp;
  const useThis = {
    reactivity: {
      dataNull: defineVal(true),
      dataTrue: defineVal([]),
    },
    values: {
      dataTrue: [],
    },
    functions: {},
  };

  const $element = createNodeElement(`
        <div class="div_Xu02Xjh children-hover" style="position:fixed">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/profile" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle">Avatar</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="loadImage" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-plus"
                    )}</button>
                </div>

            </header>
            <div class="div_BIchAsC">
                <div id="buttonsFocus" data-type="upload" class="div_O73RBqH">
                    <button data-type="upload" class="focus">subidas</button>
                    <button data-type="book" style="display:none">libros</button>
                    <button data-type="cartoon" style="display:none">animados</button>
                    <button data-type="ramdom" style="display:none">aleatorias</button>
                </div>
            </div>
            <div id="item" class="div_guZ6yID" style="padding:10px">

                <div id="itemNull" class="loader-i" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${useApp.icon.get("fi fi-rr-search-alt")}
                    <h3>Lista vacia</h3>
                </div>
                <div id="itemTrue" class="div_vSY5XFY"></div>

            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  const renderObjectElement = new RenderObjectElement($elements, "display");

  useThis.reactivity.dataNull.observe((value) => {
    renderObjectElement.set({
      itemNull: value,
      itemFalse: !value && !useThis.values.dataTrue.length,
      itemTrue: !value && !!useThis.values.dataTrue.length,
    });
  });

  useThis.reactivity.dataTrue.observe((value) => {
    const fragment = document.createDocumentFragment();
    fragment.append(
      ...value.map((data) => {
        const $element = createNodeElement(`
                <div class="div_XcNczgb" data-id="${
                  data.id
                }"  data-files="${encodeInput(
          JSON.stringify(data.files)
        )}" data-file="${data.file}" data-item>
                    <div id="itemNull" class="loader-i" style="--color:var(--color-letter)"></div>
                </div>
            `);

        const image = new Image();
        image.src = `https://img.vniox.com/get.php?id=${data.file}&index=3`;
        image.onload = () => {
          $element.innerHTML = "";
          $element.append(image);
        };

        return $element;
      })
    );

    $elements.itemTrue.append(fragment);
  });

  useThis.functions.dataLoad = () => {
    const encodeQueryString = encodeQueryObject({
      route: "/files",
      query: 0,
      query_limit: [$elements.itemTrue.children.length, 50].join(","),
      query_order: [0, 1].join(","),
      //   query_where: JSON.stringify([[0, 1, 0, useApp.user.data.id]]),
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "GET",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        useThis.values.dataTrue = useThis.values.dataTrue.concat(data);

        useThis.reactivity.dataNull.value = true;
        useThis.reactivity.dataTrue.value = data;
        useThis.reactivity.dataNull.value = false;
      });
  };

  $elements.itemTrue.addEventListener("click", (e) => {
    const item = e.target.closest("[data-item]");

    if (item) {
      const from = "choose_cloud";
      const id = item.getAttribute("data-id");
      const file = item.getAttribute("data-file");

      $element.append(
        formAvatar({
          id,
          from,
          url: `https://img.vniox.com/get.php?id=${file}&index=4`,
        })
      );
    }
  });

  $elements.loadImage.addEventListener("click", () => {
    $element.append(formAvatar({ from: "upload", url: "" }));
  });

  useThis.functions.dataLoad();

  return $element;
};

var catalogo = ()=>{

    const useApp = window.dataApp;
     
    const $element  = createNodeElement(`
        <div class="div_Xu02Xjh">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <button id="theme" class="button_lvV6qZu" style="display:none"></button>
                    <h3 id="textTitle">Inicio</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <a href="#/catalogo/search/pelicula" class="button_lvV6qZu">${ useApp.icon.get('fi fi-rr-search') }</a>
                </div>

            </header>
            <div id="item" class="div_guZ6yID" style="padding:10px">
                <div class="div_Ph0Tbeb">
                    <a href="#/catalogo/anime" class="a_lW7dgpk">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-face-awesome"><path d="M6,11c-.55,0-1-.45-1-1v-1c0-1.65,1.35-3,3-3s3,1.35,3,3v1c0,.55-.45,1-1,1s-1-.45-1-1v-.65c-.15,.09-.31,.15-.5,.15-.55,0-1-.45-1-1,0-.15,.04-.28,.09-.41-.35,.16-.59,.5-.59,.91v1c0,.55-.45,1-1,1Z"></path><path d="M19,9v1c0,.55-.45,1-1,1s-1-.45-1-1v-.65c-.15,.09-.31,.15-.5,.15-.55,0-1-.45-1-1,0-.15,.04-.28,.09-.41-.35,.16-.59,.5-.59,.91v1c0,.55-.45,1-1,1s-1-.45-1-1v-1c0-1.65,1.35-3,3-3s3,1.35,3,3Z"></path><g><path d="M12,0C5.38,0,0,5.38,0,12s5.38,12,12,12,12-5.38,12-12S18.62,0,12,0Zm0,22c-5.51,0-10-4.49-10-10S6.49,2,12,2s10,4.49,10,10-4.49,10-10,10Z"></path><path d="M18.08,13.32H5.92c-.59,0-1.05,.56-.88,1.13,.88,3.02,3.66,5.22,6.97,5.22s6.08-2.21,6.97-5.22c.17-.57-.29-1.13-.88-1.13Zm-6.08,4.54s-.02,0-.04,0c.49-1.57,1.94-2.72,3.67-2.72,.38,0,.73,.01,1.04,.05-.95,1.6-2.68,2.67-4.67,2.67Z"></path></g></svg>
                        <span>Anime</span>
                        ${ useApp.icon.get('fi fi-rr-angle-small-right') }
                    </a>
                    <a href="#/catalogo/pelicula" class="a_lW7dgpk">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-clapperboard-play"><path d="m19,1H5C2.243,1,0,3.243,0,6v12c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5V6c0-2.757-2.243-5-5-5Zm3,6h-3.894l3.066-3.066c.512.538.828,1.266.828,2.066v1Zm-2.734-3.988l-3.973,3.973s-.009.01-.014.015h-3.423l4-4h3.144c.09,0,.178.005.266.012Zm-6.238-.012l-3.764,3.764c-.071.071-.13.151-.175.236h-3.483l4-4h3.422Zm-8.028,0h1.778L2.778,7h-.778v-1c0-1.654,1.346-3,3-3Zm14,18H5c-1.654,0-3-1.346-3-3v-9h20v9c0,1.654-1.346,3-3,3Zm-3.953-5.2l-4.634,2.48c-.622.373-1.413-.075-1.413-.8v-4.961c0-.725.791-1.173,1.413-.8l4.634,2.48c.604.362.604,1.238,0,1.6Z"></path></svg>
                        <span>Pelicula</span>
                        ${ useApp.icon.get('fi fi-rr-angle-small-right') }
                    </a>
                    <a href="#/catalogo/serie" class="a_lW7dgpk">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-tv-retro"><path d="m19,6h-4.865l3.633-4.36c.354-.424.296-1.055-.128-1.408s-1.054-.296-1.408.128l-4.232,5.078L7.768.36c-.354-.424-.984-.482-1.408-.128-.424.354-.481.984-.128,1.408l3.633,4.36h-4.865c-2.757,0-5,2.243-5,5v8c0,2.757,2.243,5,5,5h14c2.757,0,5-2.243,5-5v-8c0-2.757-2.243-5-5-5Zm3,13c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3v-8c0-1.654,1.346-3,3-3h14c1.654,0,3,1.346,3,3v8Zm-9-9h-7c-1.103,0-2,.897-2,2v6c0,1.103.897,2,2,2h7c1.103,0,2-.897,2-2v-6c0-1.103-.897-2-2-2Zm-7,8v-6h7v6s-7,0-7,0Zm14-5.5c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Zm0,5c0,.828-.672,1.5-1.5,1.5s-1.5-.672-1.5-1.5.672-1.5,1.5-1.5,1.5.672,1.5,1.5Z"></path></svg>
                        <span>Serie</span>
                        ${ useApp.icon.get('fi fi-rr-angle-small-right') }
                    </a>
                    <a href="#/catalogo/youtube" class="a_lW7dgpk" style="display:none">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve" data-svg-name="fi fi-brands-youtube"><g><path d="M23.498,6.186c-0.276-1.039-1.089-1.858-2.122-2.136C19.505,3.546,12,3.546,12,3.546s-7.505,0-9.377,0.504   C1.591,4.328,0.778,5.146,0.502,6.186C0,8.07,0,12,0,12s0,3.93,0.502,5.814c0.276,1.039,1.089,1.858,2.122,2.136   C4.495,20.454,12,20.454,12,20.454s7.505,0,9.377-0.504c1.032-0.278,1.845-1.096,2.122-2.136C24,15.93,24,12,24,12   S24,8.07,23.498,6.186z M9.546,15.569V8.431L15.818,12L9.546,15.569z"></path></g></svg>
                        <span>Youtube</span>
                        ${ useApp.icon.get('fi fi-rr-angle-small-right') }
                    </a>
                    <a href="#/catalogo/coleccion" class="a_lW7dgpk" style="display:none">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-album-collection"><path d="M19,24H5c-2.76,0-5-2.24-5-5v-6c0-2.76,2.24-5,5-5h14c2.76,0,5,2.24,5,5v6c0,2.76-2.24,5-5,5ZM5,10c-1.65,0-3,1.35-3,3v6c0,1.65,1.35,3,3,3h14c1.65,0,3-1.35,3-3v-6c0-1.65-1.35-3-3-3H5Zm18.66-2.9c.41-.37,.45-1,.09-1.41-.95-1.08-2.32-1.69-3.75-1.69H4c-1.43,0-2.8,.62-3.75,1.69-.37,.41-.33,1.05,.09,1.41,.41,.36,1.05,.33,1.41-.09,.57-.65,1.39-1.02,2.25-1.02H20c.86,0,1.68,.37,2.25,1.02,.2,.22,.47,.34,.75,.34,.23,0,.47-.08,.66-.25Zm0-4c.41-.37,.45-1,.09-1.41-.95-1.08-2.32-1.69-3.75-1.69H4C2.57,0,1.2,.62,.25,1.69c-.37,.41-.33,1.05,.09,1.41,.41,.36,1.05,.33,1.41-.09,.57-.65,1.39-1.02,2.25-1.02H20c.86,0,1.68,.37,2.25,1.02,.2,.22,.47,.34,.75,.34,.23,0,.47-.08,.66-.25ZM12,20c-3.98,0-8-1.37-8-4s4.02-4,8-4,8,1.37,8,4-4.02,4-8,4Zm0-6c-3.72,0-6,1.29-6,2s2.28,2,6,2,6-1.29,6-2-2.28-2-6-2Zm0,3c.83,0,1.5-.45,1.5-1s-.67-1-1.5-1-1.5,.45-1.5,1,.67,1,1.5,1Z"></path></svg>
                        <span>Coleccion</span>
                        ${ useApp.icon.get('fi fi-rr-angle-small-right') }
                    </a>
                </div> 
            </div>
        </div>
    `);

    const $elements = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );

    const theme = defineVal( localStorage.getItem('theme') );
    theme.observe( theme => {
        $elements.theme.innerHTML = useApp.icon.get( theme == 'dark' ? 'fi fi-rr-sun' : 'fi fi-rr-moon' ); 
    });  

    $elements.theme.addEventListener('click', ()=> {

        theme.value = theme.value != 'light' ? 'light' : 'dark';
        localStorage.setItem('theme', theme.value);
        dispatchEvent( new CustomEvent('_theme') );

    });
    
    return $element
};

var youtube = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      load: defineVal(true),
      Data: defineVal([]),
    },
    functions: {},
  };

  const $element = createNodeElement(`

        <div class="div_Xu02Xjh">

            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/catalogo/" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle">YT Videos</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <a href="#/catalogo/search/youtube" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-search"
                    )}</a>
                </div>
  
            </header>

            <div class="div_BIchAsC">
                <div id="buttonsFocus" data-gender="Todos" class="div_O73RBqH">
                    <button data-gender="Todos" class="focus">Todos</button>
                    <button data-gender="Favoritos">Favoritos</button>
                </div>
            </div>
            
            <div class="div_IsTCHpN">
                <div id="itemNull" class="element-loader" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${useApp.icon.get("fi fi-rr-search-alt")}
                    <h3>sin resultados</h3>
                </div>
                <div id="itemTrue" class="div_FtxwFbU"></div>
            </div>

        </div>

    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  useThis.reactivity.load.observe((load) => {
    const render = {
      itemNull: load,
      itemFalse: !load && !Object.keys(useThis.reactivity.Data.value).length,
      itemTrue: !load && !!Object.keys(useThis.reactivity.Data.value).length,
    };

    Object.entries(render).forEach((keyvalue) => {
      $elements[keyvalue[0]].style.display = keyvalue[1] ? "" : "none";
    });
  });

  useThis.reactivity.Data.observe((Data) => {
    $elements.itemTrue.innerHTML = Data.map((data) => {
      return `
                <a href="#/catalogo/youtube/${
                  data.videoId
                }" class="div_EJlRW2l" data-id="${data.videoId}" data-item>

                    <div class="div_zcWgA0o">
                        <img src="${data.thumbnail.thumbnails[0].url}" alt="">
                    </div>
                    <div class="div_9nWIRZE">
                        <span>${
                          data.author || data.ownerText.runs[0].text
                        }</span>
                        <p>${
                          data.title.runs ? data.title.runs[0].text : data.title
                        }</p>
                    </div>
    
                </a>
            `;
    })
      .concat(" ")
      .join("");
  });

  useThis.functions.dataLoad = () => {
    setTimeout(() => {
      if ($elements.buttonsFocus.getAttribute("data-gender") == "Favoritos") {
        useThis.reactivity.Data.value = JSON.parse(
          localStorage.getItem("favorite_yt_video")
        );
        useThis.reactivity.load.value = false;
        return;
      }

      fetch(
        useApp.url.fetch(
          `https://www.youtube.com/results?search_query=${encodeURIComponent(
            "dibujos animados"
          )}`
        )
      )
        .then((res) => res.text())
        .then((text) => {
          const $text = document.createElement("div");
          $text.innerHTML = text;

          Array.from($text.querySelectorAll("script, style")).forEach(
            (script) => {
              if (script.innerHTML.includes("var ytInitialData =")) {
                const index = script.innerHTML.indexOf("{");
                const lastIndex = script.innerHTML.lastIndexOf("}");

                const output = JSON.parse(
                  script.innerHTML.slice(index, lastIndex + 1)
                );
                const contents =
                  output.contents.twoColumnSearchResultsRenderer.primaryContents
                    .sectionListRenderer.contents[0].itemSectionRenderer
                    .contents;

                useThis.reactivity.load.value = true;
                useThis.reactivity.Data.value = contents
                  .filter((content) => content.videoRenderer)
                  .map((content) => content.videoRenderer);
                useThis.reactivity.load.value = false;
              }
            }
          );
        });
    });
  };

  $elements.buttonsFocus.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      $elements.buttonsFocus
        .querySelectorAll(".focus")
        .forEach((element) => element.classList.remove("focus"));
      button.classList.add("focus");
      $elements.buttonsFocus.setAttribute(
        "data-gender",
        button.getAttribute("data-gender")
      );

      useThis.reactivity.load.value = true;
      $elements.itemTrue.innerHTML = "";
      useThis.functions.dataLoad();
    }
  });

  // $elements.itemTrue.addEventListener('click', (e)=> {
  //     e.preventDefault()
  //     console.log(e.target);
  // })

  useThis.functions.dataLoad();
  return $element;
};

var youtubeId = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      data: defineVal({}),
      load: defineVal(true),
    },
    value: {
      datas: [],
      reload: true,
    },
    functions: {},
  };

  const $element = replaceNodeChildren(
    createNodeElement(`
        <div class="div_Xu02Xjh children-hover">
            <header class="header_K0hs3I0 header_26DlSFi">

                <div class="div_uNg74XS">
                    <a href="#/catalogo/youtube" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="favorite" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-heart"
                    )}</button>
                    <button id="openOption" class="button_lvV6qZu" data-id="${
                      useThis.params.id
                    }">${useApp.icon.get("fi fi-rr-settings-sliders")}</button>
                </div>

            </header>
            <div class="div_guZ6yID" style="padding:10px">
                <div id="itemNull" class="element-loader" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH" style="display:none;">
                    ${useApp.icon.get("fi fi-rr-search-alt")}
                    <h3>La pelicula no existe</h3>
                </div>
                <div id="itemTrue" class="div_4Be1MfB" style="display:none;">

                    <div class="div_cTj4aRP">
                        <div class="div_cv0TOQj">
                            <img id="poster" src="">
                        </div>
                        <div class="div_tzdsifu">
                            <span id="title"></span>
                            <p id="author"></p>
                        </div>
                    </div>
                    <hr class="hr_QTLItLB">
                    <div class="div_IPio5Py"></div>
                </div>
            </div>
            <div id="itemTrueOption" class="div_5Pe946IMjyL1Rs" popover>
              <div class="div_dsb3nhtCrFmUlSN">
              
                <div class="div_cXaADrL pointer-on">
                  <div id="itemTrueOptionVideos" class="div_lm2WViG">
                  <div class="element-loader" style="--color:var(--color-letter); margin: 30px 0; grid-column: 1 / -1;"></div>
                  </div>
                </div>

              </div>
            </div>
        </div>
    `)
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  useThis.reactivity.load.observe((load) => {
    const render = {
      itemNull: load,
      itemFalse: !load && !Object.keys(useThis.value.datas).length,
      itemTrue: !load && !!Object.keys(useThis.value.datas).length,
    };

    Object.entries(render).forEach((keyvalue) => {
      $elements[keyvalue[0]].style.display = keyvalue[1] ? "" : "none";
    });
  });

  useThis.reactivity.data.observe((data) => {
    if (Object.keys(data).length) {
      $elements.poster.src = useApp.url.img.index(data.thumbnail_url);
      $elements.title.textContent = data.title;
      $elements.author.textContent = data.author_name;
    }
  });

  useThis.functions.dataLoad = () => {
    fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${useThis.params.id}&format=json`
    )
      .then((res) => res.json())
      .then((data) => {
        useThis.value.datas = useThis.value.datas.concat(data);

        useThis.reactivity.load.value = true;
        useThis.reactivity.data.value = data;
        useThis.reactivity.load.value = false;
      });
  };

  useThis.functions.dataLoadQuality = () => {
    const tokenYT = new Promise((resolve, reject) => {
      if (useApp.data.token.youtube) return resolve(useApp.data.token.youtube);
      fetchWebElement(
        useApp.url.fetch("https://y2meta.app/es29/converter-youtube")
      ).then(($text) => {
        Array.from($text.querySelectorAll("img")).forEach((img) =>
          img.removeAttribute("src")
        );
        Array.from($text.querySelectorAll("script")).forEach((script) => {
          if (script.innerHTML.includes("var client_token=")) {
            const scriptFunction = new Function(
              [script.innerHTML, "return client_token"].join(";")
            );
            const client_token = scriptFunction();
            resolve(client_token);
          }
        });
      });
    });

    tokenYT.then((token) => {
      useApp.data.token.youtube = token;

      const formData = new FormData();
      formData.append(
        "url",
        `https://www.youtube.com/watch?v=${useThis.params.id}`
      );
      formData.append("q_auto", "1");
      formData.append("ajax", "1");
      formData.append("token", token);

      fetch(useApp.url.fetch(`rl=https://y2meta.app/converter/ajax`), {
        method: "POST",
        headers: {
          headers: JSON.stringify([
            "Content-Type: application/x-www-form-urlencoded",
            "X-Requested-Key: de0cfuirtgf67a",
            "X-Requested-With: XMLHttpRequest",
          ]),
        },
        body: formData,
      })
        .then((res) => res.json())
        .then((json) => {
          const $text = document.createElement("div");
          $text.innerHTML = json.result;
          Array.from($text.querySelectorAll("img")).forEach((img) => {
            img.removeAttribute("src");
          });

          const formatList = Array.from($text.querySelectorAll("tbody")).map(
            (tbody) => {
              return Array.from(tbody.children)
                .filter((tr) => tr.children.length == 3)
                .map((tr) => {
                  const childSize = tr.children[1];
                  const button = tr.querySelector("button");

                  return {
                    title: tr
                      .querySelector("a")
                      .innerText.split(" ")
                      .map((string) => string.trim())
                      .filter((string) => string)
                      .join(" "),
                    size: childSize.textContent,
                    type: button.getAttribute("data-ftype"),
                    quality: button.getAttribute("data-fquality"),
                  };
                });
            }
          );

          // qualities.value = [].concat(...formatList);

          let type = null;

          $elements.itemTrueOptionVideos.innerHTML = []
            .concat(...formatList)
            .map((data) => {
              const visibility = data.type != type;
              type = data.type;

              return `
              <span class="span_eNUkEzu" style="${
                visibility ? "" : "display:none"
              }">${data.type}</span>
                <button class="button_NuUj5A6" data-type="${
                  data.type
                }" data-quality="${data.quality}">
                    
                    <div class="div_Z8bTLpN">
                        <span>${data.title}</span>
                        <p>${data.size}</p>
                    </div>
                
                </button>
            `;
            })
            .join("");
        });
    });
  };

  $elements.itemTrueOptionVideos.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      $elements.itemTrueOption.hidePopover();

      dispatchEvent(
        new CustomEvent("_notification", {
          detail: {
            message: "cargando...",
            name: "info",
            duration: 1500,
          },
        })
      );

      fetch(
        useApp.link.rr(
          `/request.php?${encodeQueryObject({
            from: "youtube",
            id: useThis.params.id,
            type: button.getAttribute("data-type"),
            quality: button.getAttribute("data-quality"),
          })}`
        )
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          if (data && !data.status) {
            dispatchEvent(
              new CustomEvent("_notification", {
                detail: {
                  message: "Video no disponible",
                  name: "danger",
                  duration: 3000,
                },
              })
            );
          } else {
            const url = data.url ?? data.result ?? data.d_url;

            resizeCanvasImage($elements.poster.src, [{ both: 50 }]).then(
              (response) => {
                dispatchEvent(
                  new CustomEvent("_video", {
                    detail: {
                      header: {
                        from: "loadedmetadata",
                      },
                      body: {
                        video: {
                          url: url,
                        },
                        detail: {
                          title: $elements.title.textContent,
                          description: $elements.author.textContent,
                          image: response.images[0].url("image/webp"),
                          poster: $elements.poster.getAttribute("src"),
                          // url         : doodstream,
                          video: {
                            server: "",
                            url: url,
                          },
                        },
                        body_chat: {
                          detail: {
                            id: useThis.params.id,
                            type: 4,
                            path: `/youtube/${useThis.params.id}`,
                          },
                          body: [
                            "Youtube",
                            $elements.title.textContent,
                            $elements.author.textContent,
                          ],
                        },
                      },
                    },
                  })
                );
              }
            );
          }
        });
    }
  });

  $elements.openOption.addEventListener("click", () => {
    $elements.itemTrueOption.showPopover();
    if (useThis.value.reload) {
      useThis.value.reload = false;
      useThis.functions.dataLoadQuality();
    }
  });

  $elements.poster.addEventListener("click", () => {
    $elements.itemTrueOption.showPopover();
    if (useThis.value.reload) {
      useThis.value.reload = false;
      useThis.functions.dataLoadQuality();
    }
  });

  $elements.itemTrueOption.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      $elements.itemTrueOption.hidePopover();
    }
  });

  useThis.functions.dataLoad();
  return $element;
};

var genders$1 = [
  "Accion",
  "Aventura",
  "Animacion",
  "Ciencia ficcion",
  "Crimen",
  "Drama",
  "Familia",
  "Fantasia",
  "Misterio",
  "Romance",
  "Suspense",
  "Terror",
];

var pelicula = ()=>{

    const useApp    = window.dataApp;
    const useThis   = {
        params      : useApp.routes.params(),
        reactivity  : {
            load    : defineVal( true ),
            Data    : defineVal( [] ),
        },
        functions   : {}
    };

    const $element = createNodeElement(`

        <div class="div_Xu02Xjh">


            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/catalogo/" class="button_lvV6qZu">${ useApp.icon.get('fi fi-rr-angle-small-left') }</a>
                    <h3 id="textTitle">Pelicula</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <a href="#/catalogo/search/pelicula" class="button_lvV6qZu">${ useApp.icon.get('fi fi-rr-search') }</a>
                </div>

            </header>
 
            <div class="div_BIchAsC">
                <div id="buttonsFocus" data-gender="Todos" class="div_O73RBqH">
                    <button data-gender="Todos" class="focus">Todos</button>
                    <button data-gender="Favoritos">Favoritos</button>
                    ${ genders$1.map( gender => {
                        return `<button data-gender="${ gender }" >${ gender }</button>`
                    }).join('') }
                </div>
            </div>

            <div class="div_IsTCHpN">
                <div id="itemNull" class="element-loader" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${ useApp.icon.get('fi fi-rr-search-alt') }
                    <h3>sin resultados</h3>
                </div>
                <div id="itemTrue" class="div_qsNmfP3">
                    <div id="itemTrueLoad" class="div_Qm4cPUn">
                        <div class="element-loader" style="--color:var(--color-letter)"></div>
                    </div>
                </div>
            </div>

        </div>

    `);

    const $elements = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );

    const intersectionObserver = new IntersectionObserver(( entries, observer ) => {

        entries.forEach(entry => {
            if( entry.isIntersecting ) {
                observer.unobserve( entry.target );
                useThis.functions.dataLoad();
            }
        });

    }, { root: null, rootMargin: '0px', threshold: 0 });

    useThis.reactivity.load.observe( load => {

        const render = {
            itemNull    : load,
            itemFalse   : !load && !Object.keys( useThis.reactivity.Data.value ).length,
            itemTrue    : !load && !!Object.keys( useThis.reactivity.Data.value ).length, 
        };

        Object.entries( render ).forEach( keyvalue => {
            $elements[ keyvalue[0] ].style.display = keyvalue[1] ? '' : 'none';
        });

    });

    useThis.reactivity.Data.observe(Data => {
        
        const fragment = document.createDocumentFragment();
        fragment.append( document.createTextNode("") );
        fragment.append( ...Data.map( data => {

            const slug = data.url.slug.split('/').map( (name, index) => {
                if( index == 0 ) {
                    if( name == 'movies' ) return 'pelicula'
                    else if( name == 'series' ) return 'serie'
                }
                return name

            }).join('/'); 
            
            if( data.images.poster == null ) return ''
            
            const url = useApp.url.img.index(`https://cuevana.biz/_next/image?url=${ data.images.poster }&w=256&q=50`);

            const element = createNodeElement(`
                <a href="#/catalogo/${ slug.split('/')[0] }/${ data.TMDbId }" class="div_SQpqup7" data-item>
                     
                    <div class="picture_fMC1uk6">
                        <img src="" alt="" data-src="${url}">
                    </div>
                    <div class="div_9nWIRZE">
                        <span>${ slug.split('/')[0] }</span>
                        <p>${ data.titles.name }</p>
                    </div>
    
                </a>    
            `);

            IntersectionObserverImage.load( element.querySelector('img'), true );
            
            return element

        }));

        $elements.itemTrue.append( fragment );
        $elements.itemTrueLoad.remove();

        if( Data.length > 23 ) {

            $elements.itemTrue.append( $elements.itemTrueLoad );
            intersectionObserver.observe( $elements.itemTrueLoad );

        }
        
    });

    useThis.functions.dataLoad =()=>{

        setTimeout(()=> {

            const page = Math.floor($elements.itemTrue.querySelectorAll('[data-item]').length / 24) + 1;

            let url = '';

            if( $elements.buttonsFocus.getAttribute('data-gender') == 'Favoritos' ) {
                useThis.reactivity.Data.value  = JSON.parse( localStorage.getItem('favorite_pelicula') );
                useThis.reactivity.load.value  = false;
                return
            }

            else if( $elements.buttonsFocus.getAttribute('data-gender') != 'Todos' ) {
                const gender = $elements.buttonsFocus.getAttribute('data-gender').split(' ').join('-').toLowerCase().trim();
                url = `https://cuevana.biz/genero/${ gender }/page/${page}`;
            }
    
            else {
                url = `https://cuevana.biz/peliculas/page/${page}`;
            }

            fetch( useApp.url.fetch(url) )
                .then( res => res.text() )
                .then( text => {
        
                    if( text.trim() == '' ) {
                        useThis.reactivity.Data.value = [];
                        useThis.reactivity.load.value = false;
                        return
                    }

                    const $text = document.createElement('div');
                    $text.innerHTML = text;

                    Array.from( $text.querySelectorAll('img') ).forEach( img => {
                        img.removeAttribute('src');
                        img.removeAttribute('srcset');
                    });

                    const datas     = JSON.parse(  $text.querySelector('#__NEXT_DATA__').textContent );
                   
                    useThis.reactivity.load.value = true;
                    useThis.reactivity.Data.value = datas.props.pageProps.movies;
                    useThis.reactivity.load.value = false;
 
                });

        });
     
    };

    

    $elements.buttonsFocus.addEventListener('click', e => {
        const button = e.target.closest('button');

        if( button ) {
            $elements.buttonsFocus.querySelectorAll('.focus').forEach( element => element.classList.remove('focus'));
            button.classList.add('focus');
            $elements.buttonsFocus.setAttribute('data-gender', button.getAttribute('data-gender'));

            useThis.reactivity.load.value = true;
            $elements.itemTrue.innerHTML = '';
            useThis.functions.dataLoad();

            button.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        }
    });

    useThis.functions.dataLoad();
    return $element
};

var peliculaId = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      isFavorite: defineVal(false),
      load: defineVal(true),
      data: defineVal({}),
      episodes: defineVal([]),
    },
    functions: {},
  };

  const $element = replaceNodeChildren(
    createNodeElement(`
        <div class="div_Xu02Xjh children-hover div_mrXVL9t">
             
            <header class="header_K0hs3I0 header_RtX3J1X">

                <div class="div_uNg74XS">
                    <a href="#/catalogo/pelicula" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="favorite" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-heart"
                    )}</button>
                    <button id="play" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-play"
                    )}</button>
                </div>

            </header>
            <div id="item" class="div_guZ6yID div_DtSQApy">
                <div id="itemNull" class="element-loader" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${useApp.icon.get("fi fi-rr-search-alt")}
                    <h3>La pelicula no existe</h3>
                </div> 
                <div id="itemTrue" class="div_hqzh2NV">

                    <div class="div_rCXoNm8">
                        <div class="div_vm3LkIt">
                            <img id="backdrop" src="">
                        </div>
                        <div class="div_y6ODhoe">
                            <picture class="picture_BLSEWfU"><img id="poster" src=""></picture>
                            <div class="div_K2RbOsL" >
                                <h2 id="title"></h2>
                                <p id="overview"></p>
                                <div class="div_aSwP0zW">
                                    <span id="genres"></span>
                                    <span id="duration"></span>
                                    <span id="date"></span>
                                </div>
                            </div>
                        </div>
                    </div>
 
                    <div class="div_wNo9gA9" style="display:none">
                        <div class="div_WslendP" >
                            <div id="season" class="div_z0PiH0E" data-season="0" data-data="[]" >
                                <button class="focus" data-index=""><span>Todo</span></button>
                                <button data-index="relatedMovies"><span>Relacionadas</span></button>
                                <button data-index="topMoviesDay"><span>Destacadas del dia</span></button>
                                <button data-index="topMoviesWeek"><span>Destacadas de la semana</span></button>
                                <button data-index="otherMovies"><span>Otros</span></button>
                            </div>
                        </div>
                        <div id="episodes" class="div_EafBfGo"></div>
                    </div>

                </div>
            </div>
            
            <div id="itemTrueOption" class="div_5Pe946IMjyL1Rs" popover>
                <div class="div_dsb3nhtCrFmUlSN">
                    <div class="div_cXaADrL pointer-on">
                        <div id="itemTrueOptionVideos" class="div_lm2WViG"></div>
                    </div>
                </div>
            </div>
        </div>
    `),
    {},
    true
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  useThis.reactivity.isFavorite.observe((isFavorite) => {
    $elements.favorite.innerHTML = useApp.icon.get(
      isFavorite ? "fi fi-sr-heart" : "fi fi-rr-heart"
    );
  });

  useThis.reactivity.load.observe((load) => {
    const render = {
      itemNull: load,
      itemFalse: !load && !Object.keys(useThis.reactivity.data.value).length,
      itemTrue: !load && !!Object.keys(useThis.reactivity.data.value).length,
    };

    Object.entries(render).forEach((keyvalue) => {
      $elements[keyvalue[0]].style.display = keyvalue[1] ? "" : "none";
    });
  });

  useThis.reactivity.data.observe((data) => {
    if (Boolean(Object.keys(data).length)) {
      const slug = data.url.slug
        .split("/")
        .map((name, index) => {
          if (name == "movies") return "pelicula";
          else if (name == "series") return "serie";
          else if (name == "seasons") return "temporada";
          else if (name == "episodes") return "episodio";
          return name;
        })
        .join("/");

      const _convertSecondsToTime = convertSecondsToTime(data.runtime * 60);

      $elements.backdrop.src = useApp.url.img.index(
        `https://cuevana.biz/_next/image?url=${data.images.backdrop}&w=828&q=75`
      );
      $elements.poster.src = useApp.url.img.index(
        `https://cuevana.biz/_next/image?url=${data.images.poster}&w=256&q=45`
      );
      $elements.title.textContent = data.titles.name;
      $elements.overview.textContent = data.overview;
      $elements.genres.textContent = data.genres
        .map((genre) => genre.name)
        .join(", ");
      $elements.duration.textContent = `${_convertSecondsToTime.hours}h ${_convertSecondsToTime.minutes}min`;
      $elements.date.textContent = new Date(data.releaseDate).getFullYear();

      $elements.itemTrue.append(document.createTextNode(""));

      $elements.play.setAttribute("data-data", JSON.stringify(data));
      $elements.play.setAttribute("data-slug", `https://cuevana.biz/${slug}`);

      useThis.reactivity.isFavorite.value = JSON.parse(
        localStorage.getItem("favorite_pelicula")
      ).some((video) => video.TMDbId == data.TMDbId);
      $elements.itemTrue.append(document.createTextNode(""));

      // useApp.mediaPlayer.settings({
      //     title: data.titles.name,
      //     description: data.genres.map( genre => genre.name).join(', '),
      //     controls: {
      //         includesYes: ['*'],
      //         includesNot: ['lock', 'chromecast', 'download'],
      //     }
      // })

      const image = new Image();
      image.src = $elements.poster.src;
      image.onload = () => {
        styleElement($elements.poster, {
          aspectRatio: `${image.width}/${image.height}`,
        });
      };

      otherMovies.value = Object.values(data.movies).flat();
    }
  });

  const otherMovies = defineVal([]);
  otherMovies.observe((otherMovies) => {
    return;
  });

  useThis.functions.getServerAditional = (reference) => {
    return new Promise((resolve, reject) => {
      return resolve({});
    });
  };

  useThis.functions.getLinkDoodstream = (url) => {
    const newURL = new URL(url);
    const hostSplit = newURL.host.split(".");
    const host = hostSplit.length == 3 ? hostSplit[1] : hostSplit[0];
    useApp.mediaPlayer;

    resizeCanvasImage($elements.poster.src, [{ both: 50 }]).then((response) => {
      dispatchEvent(
        new CustomEvent("_video", {
          detail: {
            header: {
              from: "loadedmetadata",
            },
            body: {
              video: {
                url: url,
              },
              detail: {
                title: $elements.title.textContent,
                description: $elements.genres.textContent,
                image: response.images[0].url("image/webp"),
                poster: $elements.poster.getAttribute("src"),
                // url         : doodstream,
                video: {
                  server: host,
                  url: url,
                },
              },
              body_chat: {
                // detail: {
                //   id: useThis.params.id,
                //   type: 1,
                //   path: `/pelicula/${useThis.params.id}`,
                // },
                // body: [
                //   "Pelicula",
                //   $elements.title.textContent,
                //   $elements.genres.textContent,
                // ],
                body: {
                  id: useThis.params.id,
                  title: $elements.title.textContent,
                  genres: $elements.genres.textContent,
                  type: 1,
                },
              },
            },
          },
        })
      );
    });

    // console.log("enviar este link" + url);

    // if(['streamwish'].includes( host )) {
    //     MediaWebUrl.streamwish( { url : url } ).then( res => {
    //         if(res.status) mediaPlayer.open({ url : res.url, Hls : window.Hls });
    //         else alert('Video no disponible')
    //     })
    // }

    // else if(['voe'].includes( host )) {
    //     MediaWebUrl.voesx( { url : url } ).then( res => {
    //         if(res.status) mediaPlayer.open({ url : res.url, Hls : window.Hls });
    //         else alert('Video no disponible')
    //     })
    // }

    // else if(['doodstream'].includes( host )) {
    //     MediaWeb.doodstream({ url : url }).then( res => {
    //         if(res.body.status) mediaPlayer.open({ url : res.body.url });
    //         else alert('Video no disponible')
    //     })
    // }
  };

  useThis.functions.getLinkVideo = (slug) => {
    console.log(slug);
    const newURL = new URL(slug);

    if (newURL.host != "player.cuevana.biz") {
      return useThis.functions.getLinkDoodstream(slug);
    }

    fetch(useApp.url.fetch(slug))
      .then((res) => res.text())
      .then((text) => {
        const $text = document.createElement("div");
        $text.innerHTML = text;

        Array.from($text.querySelectorAll("img")).forEach((img) => {
          img.removeAttribute("src");
          img.removeAttribute("srcset");
        });

        Array.from($text.querySelectorAll("script")).forEach((script) => {
          if (script.innerHTML.includes("var url =")) {
            const scriptFunction = new Function(
              [
                script.innerHTML.split(";").slice(0, 2).join(";").trim(),
                "return url",
              ].join(";")
            );
            const url = scriptFunction();

            useThis.functions.getLinkDoodstream(url);
          }
        });
      });
  };

  useThis.functions.dataLoad = () => {
    fetch(
      useApp.url.fetch(
        [
          "https://cuevana.biz",
          "pelicula",
          useThis.params.id,
          useThis.params.id,
        ].join("/")
      )
    )
      .then((res) => res.text())
      .then((content) => {
        const pageElement = document.createElement("div");
        pageElement.innerHTML = content;

        Array.from(pageElement.querySelectorAll("img")).forEach((img) => {
          img.removeAttribute("src");
          img.removeAttribute("srcset");
        });

        const datas = JSON.parse(
          pageElement.querySelector("#__NEXT_DATA__").textContent
        );

        if (datas.props.pageProps.thisMovie) {
          // load.value = false
          useThis.reactivity.data.value = {
            ...datas.props.pageProps.thisMovie,
            movies: Object.keys(datas.props.pageProps).reduce((prev, curr) => {
              const array = datas.props.pageProps[curr];
              if (Array.isArray(array)) prev[curr] = array;
              return prev;
            }, {}),
          };

          useThis.reactivity.load.value = false;
        }
      });
  };

  $elements.season.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      $elements.season
        .querySelectorAll("button.focus")
        .forEach((element) => element.classList.remove("focus"));
      button.classList.add("focus");

      const dataIndex = button.getAttribute("data-index");
      $elements.season.setAttribute("data-index", dataIndex);
      otherMovies.value =
        dataIndex == ""
          ? Object.values(useThis.reactivity.data.value.movies).flat()
          : useThis.reactivity.data.value.movies[dataIndex];
    }
  });

  $elements.play.addEventListener("click", () => {
    const data = JSON.parse($elements.play.getAttribute("data-data"));
    $elements.itemTrueOption.showPopover();

    $elements.itemTrueOptionVideos.innerHTML =
      '<div class="element-loader" style="--color:var(--color-letter); padding: 30px 0; grid-column: 1 / -1;"></div>';

    Promise.all([
      useThis.functions.getServerAditional(data.TMDbId),
      data.videos,
    ]).then((res) => {
      const mergedObject = res.reduce((acc, obj) => ({ ...acc, ...obj }), {});

      $elements.itemTrueOptionVideos.innerHTML = Object.entries(mergedObject)
        .map((data) => {
          let show = true;

          return data[1]
            .map((video) => {
              // console.log(video);

              if (video.result == "") return "";
              if (
                !["doodstream", "streamwish", "voesx"].includes(
                  video.cyberlocker
                )
              )
                return "";

              const visibility = show ? "" : "display:none";
              show = false;

              return `
                        <span class="span_eNUkEzu" style="${visibility}">${data[0]
                .slice(0, 3)
                .toUpperCase()}</span>
                        <button class="button_NuUj5A6" data-type="" data-url="${
                          video.result
                        }" data-quality="">
                            
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
  });

  $elements.favorite.addEventListener("click", () => {
    const favorite = JSON.parse(localStorage.getItem("favorite_pelicula"));
    const index = favorite.findIndex(
      (video) => video.TMDbId == useThis.reactivity.data.value.TMDbId
    );

    if (index == -1) favorite.push(useThis.reactivity.data.value);
    else favorite.splice(index, 1);

    useThis.reactivity.isFavorite.value = index == -1;
    localStorage.setItem("favorite_pelicula", JSON.stringify(favorite));
  });

  $elements.itemTrueOptionVideos.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      $elements.itemTrueOption.hidePopover();
      useThis.functions.getLinkVideo(button.getAttribute("data-url"));
      // useApp.mediaPlayer.element().requestFullscreen()
      // console.log(button.getAttribute('data-url'));
    }
  });

  $elements.itemTrueOption.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      $elements.itemTrueOption.hidePopover();
    }
  });

  useApp.elements.meta.color.setAttribute("content", "#000000");
  useThis.functions.dataLoad();
  return $element;
};

var serie = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      load: defineVal(true),
      Data: defineVal([]),
    },
    functions: {},
  };

  const $element = createNodeElement(`

        <div class="div_Xu02Xjh">

            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/catalogo/" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle">Series</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <a href="#/catalogo/search/serie" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-search"
                    )}</a>
                </div>

            </header>

            <div class="div_BIchAsC">
                <div id="buttonsFocus" data-gender="Todos" class="div_O73RBqH">
                    <button data-gender="Todos" class="focus">Todos</button>
                    <button data-gender="Favoritos">Favoritos</button>
                </div>
            </div>

            <div class="div_IsTCHpN">
                <div id="itemNull" class="element-loader" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${useApp.icon.get("fi fi-rr-search-alt")}
                    <h3>sin resultados</h3>
                </div>
                <div id="itemTrue" class="div_qsNmfP3">
                    <div id="itemTrueLoad" class="div_Qm4cPUn">
                        <div class="element-loader" style="--color:var(--color-letter)"></div>
                    </div>
                </div>
            </div>

        </div>

    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const intersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          useThis.functions.dataLoad();
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0 }
  );

  useThis.reactivity.load.observe((load) => {
    const render = {
      itemNull: load,
      itemFalse: !load && !Object.keys(useThis.reactivity.Data.value).length,
      itemTrue: !load && !!Object.keys(useThis.reactivity.Data.value).length,
    };

    Object.entries(render).forEach((keyvalue) => {
      $elements[keyvalue[0]].style.display = keyvalue[1] ? "" : "none";
    });
  });

  useThis.reactivity.Data.observe((Data) => {
    const fragment = document.createDocumentFragment();
    fragment.append(document.createTextNode(""));
    fragment.append(
      ...Data.map((data) => {
        const slug = data.url.slug
          .split("/")
          .map((name, index) => {
            if (index == 0) {
              if (name == "movies") return "pelicula";
              else if (name == "series") return "serie";
            }
            return name;
          })
          .join("/");

        const url = useApp.url.img.index(
          `https://cuevana.biz/_next/image?url=${data.images.poster}&w=256&q=50`
        );

        const element = createNodeElement(`
                <a href="#/catalogo/${slug.split("/")[0]}/${
          data.TMDbId
        }" class="div_SQpqup7" data-item>

                    <div class="div_fMC1uk6">
                        <img src="" alt="" data-src="${url}">
                    </div>
                    <div class="div_9nWIRZE">
                        <span>${slug.split("/")[0]}</span>
                        <p>${data.titles.name}</p>
                    </div>
    
                </a>
            `);

        IntersectionObserverImage.load(element.querySelector("img"), true);

        return element;
      })
    );

    $elements.itemTrue.append(fragment);
    $elements.itemTrueLoad.remove();

    if (Data.length > 23) {
      $elements.itemTrue.append($elements.itemTrueLoad);
      intersectionObserver.observe($elements.itemTrueLoad);
    }
  });

  useThis.functions.dataLoad = () => {
    setTimeout(() => {
      const page =
        Math.floor(
          $elements.itemTrue.querySelectorAll("[data-item]").length / 24
        ) + 1;

      let url = "";

      if ($elements.buttonsFocus.getAttribute("data-gender") == "Favoritos") {
        useThis.reactivity.Data.value = JSON.parse(
          localStorage.getItem("favorite_serie")
        );
        useThis.reactivity.load.value = false;
        return;
      } else if (
        $elements.buttonsFocus.getAttribute("data-gender") != "Todos"
      ) {
        const gender = $elements.buttonsFocus
          .getAttribute("data-gender")
          .split(" ")
          .join("-")
          .toLowerCase()
          .trim();
        url = `https://cuevana.biz/genero/${gender}/page/${page}`;
      } else {
        url = `https://cuevana.biz/series/page/${page}`;
      }

      fetch(useApp.url.fetch(url))
        .then((res) => res.text())
        .then((text) => {
          if (text.trim() == "") {
            useThis.reactivity.Data.value = [];
            useThis.reactivity.load.value = false;
            return;
          }

          const $text = document.createElement("div");
          $text.innerHTML = text;

          Array.from($text.querySelectorAll("img")).forEach((img) => {
            img.removeAttribute("src");
            img.removeAttribute("srcset");
          });

          const datas = JSON.parse(
            $text.querySelector("#__NEXT_DATA__").textContent
          );

          useThis.reactivity.load.value = true;
          useThis.reactivity.Data.value = datas.props.pageProps.movies;
          useThis.reactivity.load.value = false;
        });
    });
  };

  useThis.functions.dataLoad();

  $elements.buttonsFocus.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      $elements.buttonsFocus
        .querySelectorAll(".focus")
        .forEach((element) => element.classList.remove("focus"));
      button.classList.add("focus");
      $elements.buttonsFocus.setAttribute(
        "data-gender",
        button.getAttribute("data-gender")
      );

      useThis.reactivity.load.value = true;
      $elements.itemTrue.innerHTML = "";
      useThis.functions.dataLoad();
    }
  });

  return $element;
};

var serieId = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    functions: {},
    val: {
      dataInfo: null,
    },
    reactivity: {
      isFavorite: defineVal(false),
      load: defineVal(true),
      data: defineVal({}),
      episodes: defineVal([]),
    },
  };

  const $element = replaceNodeChildren(
    createNodeElement(`
        <div class="div_Xu02Xjh children-hover div_mrXVL9t">
            <header class="header_K0hs3I0 header_XpmKRuK header_RtX3J1X">

                <div class="div_uNg74XS">
                    <a href="#/catalogo/serie" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="favorite" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-heart"
                    )}</button>
                </div>

            </header>
 
            <div id="item" class="div_guZ6yID div_DtSQApy" >
                <div id="itemNull" class="element-loader" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${useApp.icon.get("fi fi-rr-search-alt")}
                    <h3>La pelicula no existe</h3>
                </div>
                <div id="itemTrue" class="div_4MNvoOW">

                    <div class="div_rCXoNm8">
                        <div class="div_vm3LkIt">
                            <img id="backdrop" src="">
                        </div>
                        <div class="div_y6ODhoe">
                            <picture class="picture_BLSEWfU"><img id="poster" src=""></picture>
                            <div class="div_K2RbOsL">
                                <h2 id="title"></h2>
                                <p id="overview"></p>
                                <div class="div_aSwP0zW">
                                    <span id="genres"></span>
                                    <span id="duration"></span>
                                    <span id="date"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="div_rJOqfX3">
                        <div class="div_WslendP" >
                            <div id="season" class="div_z0PiH0E" data-season="0" data-data="[]" ></div>
                        </div>
                        <div id="episodes" class="div_2cD7Iqb"></div>
                    </div>
                    
                </div>
            </div>
           
            <div id="itemTrueOption" class="div_5Pe946IMjyL1Rs" popover>
                <div class="div_dsb3nhtCrFmUlSN">
                    <div class="div_cXaADrL pointer-on">
                        <div id="itemTrueOptionVideos" class="div_lm2WViG"></div>
                    </div>
                </div>
            </div>
        </div>
    `),
    {},
    true
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const isFavorite = defineVal(false);
  isFavorite.observe((isFavorite) => {
    $elements.favorite.innerHTML = useApp.icon.get(
      isFavorite ? "fi fi-sr-heart" : "fi fi-rr-heart"
    );
  });

  useThis.reactivity.isFavorite.observe((isFavorite) => {
    $elements.favorite.innerHTML = useApp.icon.get(
      isFavorite ? "fi fi-sr-heart" : "fi fi-rr-heart"
    );
  });

  useThis.reactivity.load.observe((load) => {
    const render = {
      itemNull: load,
      itemFalse: !load && !Object.keys(useThis.reactivity.data.value).length,
      itemTrue: !load && !!Object.keys(useThis.reactivity.data.value).length,
    };

    Object.entries(render).forEach((keyvalue) => {
      $elements[keyvalue[0]].style.display = keyvalue[1] ? "" : "none";
    });
  });

  useThis.reactivity.data.observe((data) => {
    if (Boolean(Object.keys(data).length)) {
      $elements.backdrop.src = useApp.url.img.index(
        `https://cuevana.biz/_next/image?url=${data.images.backdrop}&w=828&q=75`
      );
      $elements.poster.src = useApp.url.img.index(
        `https://cuevana.biz/_next/image?url=${data.images.poster}&w=256&q=45`
      );
      $elements.title.textContent = data.titles.name;
      $elements.overview.textContent = data.overview;
      $elements.genres.textContent = data.genres
        .map((genre) => genre.name)
        .join(", ");
      $elements.duration.textContent = `${
        data.seasons.at(-1).number
      } temporadas`;
      $elements.date.textContent = new Date(data.releaseDate).getFullYear();

      const seasons = data.seasons.filter((season) => season.episodes.length);

      $elements.season.innerHTML = seasons
        .map((season, index) => {
          if (!season.episodes.length) return "";
          return `<button data-season="${index}" class="${
            index == 0 ? "focus" : ""
          }"><span>temporada ${season.number}</span></button>`;
        })
        .join("");

      $elements.season.setAttribute("data-data", JSON.stringify(seasons));
      useThis.functions.renderSeason();

      useThis.reactivity.isFavorite.value = JSON.parse(
        localStorage.getItem("favorite_serie")
      ).some((video) => video.TMDbId == data.TMDbId);
      $elements.itemTrue.append(document.createTextNode(""));
    }
  });

  useThis.functions.renderSeason = () => {
    const index = parseInt($elements.season.getAttribute("data-season"));
    const seasons = JSON.parse($elements.season.getAttribute("data-data"));
    const episodes = seasons[index].episodes;

    const array =
      localStorage.getItem("episodes_direction") == 0
        ? episodes
        : episodes.reverse();

    $elements.episodes.innerHTML = array
      .map((episode) => {
        const slug = episode.url.slug
          .split("/")
          .map((name, index) => {
            if (name == "movies") return "pelicula";
            else if (name == "series") return "serie";
            else if (name == "seasons") return "temporada";
            else if (name == "episodes") return "episodio";
            return name;
          })
          .join("/");

        const url = useApp.url.img.index(
          `https://cuevana.biz/_next/image?url=${episode.image}&w=384&q=75`
        );

        return `
                <div class="div_LKjl9J4" data-slug="https://cuevana.biz/${slug}" data-data="${encodeInput(
          JSON.stringify(episode)
        )}" data-item>
                    <div class="div_nmcQ0GU">
                        <img src="" data-src="${url}">
                        <button class="button_HMIA4Fe" >${useApp.icon.get(
                          "fi fi-rr-play"
                        )}</button>
                    </div>
                    <div class="div_6jf5Ond">
                        <p>${episode.title}</p>
                        <span>serie</span>
                    </div>
                </div> 
            `;
      })
      .join("");

    Array.from($elements.episodes.querySelectorAll("img")).forEach((img) =>
      IntersectionObserverImage.load(img, false)
    );

    if (!episodes.length) {
      $elements.episodes.innerHTML = `
                <div class="div_Qm4cPUn">
                    <div id="itemFalse" class="div_b14S3dH">
                        ${useApp.icon.get("fi fi-rr-search-alt")}
                        <h3>No hay capitulos</h3>
                    </div>
                </div>
            `;
    }
  };

  useThis.functions.getReference = (reference) => {
    return new Promise((resolve, reject) => {
      return resolve({});
    });
  };

  useThis.functions.setLinkServer = (url) => {
    const newURL = new URL(url);
    const hostSplit = newURL.host.split(".");
    const host = hostSplit.length == 3 ? hostSplit[1] : hostSplit[0];

    useApp.mediaPlayer;

    resizeCanvasImage($elements.poster.src, [{ both: 50 }]).then((response) => {
      dispatchEvent(
        new CustomEvent("_video", {
          detail: {
            header: {
              from: "loadedmetadata",
            },
            body: {
              video: {
                url: url,
              },
              detail: {
                title: $elements.title.textContent,
                description: $elements.genres.textContent,
                image: response.images[0].url("image/webp"),
                poster: $elements.poster.getAttribute("src"),
                // url         : doodstream,
                video: {
                  server: host,
                  url: url,
                },
              },
              body_chat: {
                // detail: {
                //   id: useThis.params.id,
                //   type: 2,
                //   path: `/serie/${useThis.params.id}`,
                // },
                // body: [
                //   "Serie",
                //   $elements.title.textContent,
                //   $elements.genres.textContent,
                // ],
                body: {
                  id: useThis.params.id,
                  title: $elements.title.textContent,
                  genres: $elements.genres.textContent,
                  type: 2,
                },
              },
            },
          },
        })
      );
    });

    // if(['streamwish'].includes( host )) {
    //     MediaWebUrl.streamwish( { url : url } ).then( res => {
    //         if(res.status) mediaPlayer.open({ url : res.url, Hls : window.Hls });
    //         else alert('Video no disponible')
    //     })
    // }

    // else if(['voe'].includes( host )) {
    //     MediaWebUrl.voesx( { url : url } ).then( res => {
    //         if(res.status) mediaPlayer.open({ url : res.url, Hls : window.Hls });
    //         else alert('Video no disponible')
    //     })
    // }

    // else if(['doodstream'].includes( host )) {
    //     MediaWeb.doodstream({ url : url }).then( res => {
    //         if(res.body.status) mediaPlayer.open({ url : res.body.url });
    //         else alert('Video no disponible')
    //     })
    // }

    // else if(['yourupload'].includes( host )) {
    //     MediaWeb.yourupload({ url: url }).then(res => {
    //         if(res.body.status) mediaPlayer.open({ url : res.body.url });
    //         else alert('Video no disponible')
    //     })
    // }
  };

  useThis.functions.dataLoad = () => {
    fetch(
      useApp.url.fetch(
        [
          "https://cuevana.biz",
          "serie",
          useThis.params.id,
          useThis.params.id,
        ].join("/")
      )
    )
      .then((res) => res.text())
      .then((text) => {
        const $text = document.createElement("div");
        $text.innerHTML = text;

        Array.from($text.querySelectorAll("img")).forEach((img) => {
          img.removeAttribute("src");
          img.removeAttribute("srcset");
        });

        const datas = JSON.parse(
          $text.querySelector("#__NEXT_DATA__").textContent
        );
        if (datas.props.pageProps.thisSerie) {
          useThis.reactivity.data.value = datas.props.pageProps.thisSerie;
          useThis.reactivity.load.value = false;
        }
      });
  };
  useThis.functions.dataLoad();

  $elements.season.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      if (button.classList.contains("focus")) {
        localStorage.setItem(
          "episodes_direction",
          localStorage.getItem("episodes_direction") ^ 1
        );
        $elements.episodes.append(
          ...Array.from($elements.episodes.children).reverse()
        );
      } else {
        $elements.season
          .querySelectorAll(".focus")
          .forEach((element) => element.classList.remove("focus"));
        button.classList.add("focus");
        $elements.season.setAttribute(
          "data-season",
          button.getAttribute("data-season")
        );

        useThis.functions.renderSeason();
      }
    }
  });

  $elements.episodes.addEventListener("click", (e) => {
    const item = e.target.closest("[data-item]");

    if (item) {
      $elements.itemTrueOption.showPopover();
      $elements.itemTrueOptionVideos.innerHTML =
        '<div class="element-loader" style="--color:var(--color-letter); padding: 20px 0; grid-column: 1 / -1;"></div>';

      fetchWebElement(useApp.url.fetch(item.getAttribute("data-slug"))).then(
        ($result) => {
          Array.from($result.querySelectorAll("img")).forEach((img) => {
            img.removeAttribute("src");
            img.removeAttribute("srcset");
          });

          try {
            const response = JSON.parse(
              $result.querySelector("#__NEXT_DATA__").textContent
            );

            useThis.val.dataInfo = response;

            useThis.functions
              .getReference(response.props.pageProps.episode.TMDbId)
              .then((res) => {
                const mergedObject = [
                  res,
                  response.props.pageProps.episode.videos,
                ].reduce((acc, obj) => ({ ...acc, ...obj }), {});
                $elements.itemTrueOptionVideos.innerHTML = Object.entries(
                  mergedObject
                )
                  .map((data) => {
                    let show = true;

                    return data[1]
                      .map((video) => {
                        if (video.result == "") return "";
                        if (
                          !["doodstream", "streamwish", "voesx"].includes(
                            video.cyberlocker
                          )
                        )
                          return "";

                        const visibility = show ? "" : "display:none";
                        show = false;

                        return `
                                    <span class="span_eNUkEzu" style="${visibility}">${data[0]
                          .slice(0, 3)
                          .toUpperCase()}</span>
                                    <button class="button_NuUj5A6" data-type="" data-url="${
                                      video.result
                                    }" data-quality="">
                                        
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
          } catch (error) {
            // console.log(error);
          }
        }
      );
    }
  });

  $elements.favorite.addEventListener("click", () => {
    const favorite = JSON.parse(localStorage.getItem("favorite_serie"));
    const index = favorite.findIndex(
      (video) => video.TMDbId == useThis.reactivity.data.value.TMDbId
    );

    if (index == -1) favorite.push(useThis.reactivity.data.value);
    else favorite.splice(index, 1);

    useThis.reactivity.isFavorite.value = index == -1;
    localStorage.setItem("favorite_serie", JSON.stringify(favorite));
  });

  $elements.itemTrueOptionVideos.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      const url = button.getAttribute("data-url");

      $elements.itemTrueOption.hidePopover();
      // useApp.mediaPlayer.element().requestFullscreen()

      // useApp.mediaPlayer.settings({
      //     title: useThis.val.dataInfo.props.pageProps.episode.title,
      //     description: useThis.val.dataInfo.props.pageProps.serie.genres.map( genre => genre.name).join(', '),
      //     controls: {
      //         includesYes: ['*'],
      //         includesNot: ['lock', 'chromecast', 'download'],
      //     }
      // })

      const newURL = new URL(url);

      if (newURL.host != "player.cuevana.biz") {
        return useThis.functions.setLinkServer(slug);
      }

      // ResponseCuevana.server( `https://api-fetch.victor01sp.com/get.php?url=${ encodeURIComponent(newURL.href) }` ).then( useThis.functions.setLinkServer )

      fetch(url)
        .then((res) => res.text())
        .then((text) => {
          const $text = document.createElement("div");
          $text.innerHTML = text;

          Array.from($text.querySelectorAll("img")).forEach((img) => {
            img.removeAttribute("src");
            img.removeAttribute("srcset");
          });

          Array.from($text.querySelectorAll("script")).forEach((script) => {
            if (script.innerHTML.includes("var url =")) {
              const scriptFunction = new Function(
                [
                  script.innerHTML.split(";").slice(0, 2).join(";").trim(),
                  "return url",
                ].join(";")
              );
              useThis.functions.setLinkServer(scriptFunction());
            }
          });
        });
      // .then(reject);
    }
  });

  $elements.itemTrueOption.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      $elements.itemTrueOption.hidePopover();
    }
  });

  useApp.elements.meta.color.setAttribute("content", "#000000");
  return $element;
};

var genders = [
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

var anime = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      load: defineVal(true),
      Data: defineVal([]),
    },
    functions: {
      url: {
        fetch: (url) => {
          return `https://fetch.vniox.com/get.php?url=${encodeURIComponent(
            url
          )}`;
        },
      },
    },
  };

  const $element = createNodeElement(`

        <div class="div_Xu02Xjh">

            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/catalogo/" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle">Animes</h3>
                </div>

                <div class="div_x0cH0Hq">
                    <a href="#/catalogo/search/anime" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-search"
                    )}</a>
                </div>
               
            </header>

            <div class="div_BIchAsC">
                <div id="buttonsFocus" data-gender="" class="div_O73RBqH">
                    <button data-gender="" class="focus">Todos</button>
                    <button data-gender="Favoritos">Favoritos</button>
                    ${genders
                      .map((gender) => {
                        return `<button data-gender="${gender
                          .split(" ")
                          .join("-")
                          .toLocaleLowerCase()}" >${gender}</button>`;
                      })
                      .join("")} 
                </div>
            </div>

            <div class="div_IsTCHpN">
                <div id="itemNull" class="loader-i" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${useApp.icon.get("fi fi-rr-search-alt")}
                    <h3>sin resultados</h3>
                </div>
                <div id="itemTrue" class="div_qsNmfP3">
                    <div id="itemTrueLoad" class="div_Qm4cPUn">
                        <div class="loader-i" style="--color:var(--color-letter)"></div>
                    </div>
                </div>
            </div>

        </div>

    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const intersectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          useThis.functions.dataLoad();
        }
      });
    },
    { root: null, rootMargin: "0px", threshold: 0 }
  );

  useThis.reactivity.load.observe((load) => {
    const render = {
      itemNull: load,
      itemFalse: !load && !Object.keys(useThis.reactivity.Data.value).length,
      itemTrue: !load && !!Object.keys(useThis.reactivity.Data.value).length,
    };

    Object.entries(render).forEach((keyvalue) => {
      $elements[keyvalue[0]].style.display = keyvalue[1] ? "" : "none";
    });
  });

  useThis.reactivity.Data.observe((Data) => {
    const fragment = document.createDocumentFragment();
    fragment.append(document.createTextNode(""));
    fragment.append(
      ...Data.map((content) => {
        const url = content.poster;
        console.log(content);

        const element = createNodeElement(`
                <a href="#/catalogo/anime/${
                  content.identifier
                }" class="div_SQpqup7" data-item>

                    <div class="div_fMC1uk6">
                        <img src="" alt="" data-src="${url}">
                    </div>
                    <div class="div_9nWIRZE">
                        <span>${content.type ?? ""}</span>
                        <p>${content.title}</p>
                    </div>
    
                </a>
            `);

        IntersectionObserverImage.load(element.querySelector("img"), true);
        return element;
      })
    );

    $elements.itemTrue.append(fragment);
    $elements.itemTrueLoad.remove();

    if (Data.length > 23) {
      $elements.itemTrue.append($elements.itemTrueLoad);
      intersectionObserver.observe($elements.itemTrueLoad);
    }
  });

  useThis.functions.dataLoad = () => {
    const page =
      Math.floor(
        $elements.itemTrue.querySelectorAll("[data-item]").length / 24
      ) + 1;

    ApiWebAnimeflv.search({
      page,
      genre: [$elements.buttonsFocus.getAttribute("data-gender")].filter(
        Boolean
      ),
    }).then((result) => {
      useThis.reactivity.load.value = true;
      useThis.reactivity.Data.value = result;
      useThis.reactivity.load.value = false;
    });
  };

  $elements.buttonsFocus.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      $elements.buttonsFocus
        .querySelectorAll(".focus")
        .forEach((element) => element.classList.remove("focus"));
      button.classList.add("focus");
      $elements.buttonsFocus.setAttribute(
        "data-gender",
        button.getAttribute("data-gender")
      );

      useThis.reactivity.load.value = true;
      $elements.itemTrue.innerHTML = "";
      useThis.functions.dataLoad();

      button.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  });

  useThis.functions.dataLoad();
  return $element;
};

var animeId = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      isFavorite: defineVal(false),
      load: defineVal(true),
      data: defineVal({}),
      episodes: defineVal([]),
    },
    functions: {
      url: {
        fetch: (url) => {
          return `https://fetch.vniox.com/get.php?url=${encodeURIComponent(
            url
          )}`;
        },
      },
    },
  };

  const $element = replaceNodeChildren(
    createNodeElement(`
        <div class="div_Xu02Xjh children-hover div_mrXVL9t">

            <header class="header_K0hs3I0 header_RtX3J1X">

                <div class="div_uNg74XS">
                    <a href="#/catalogo/anime" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle"></h3>
                </div>

                <div class="div_x0cH0Hq">
                    <button id="favorite" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-heart"
                    )}</button>
                </div>

            </header>
 
            <div id="item" class="div_guZ6yID div_DtSQApy">
                <div id="itemNull" class="loader-i" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${useApp.icon.get("fi fi-rr-search-alt")}
                    <h3>La pelicula no existe</h3>
                </div>
                <div id="itemTrue" class="div_QMnON7f" style="display:none">
                    <div class="div_pJyDdxi">
                        <div class="div_abYDxbm"></div>
                        <div class="div_QeWCJmo">
                            <h2 id="title"></h2>
                            <p id="overview"></p>
                        </div>
                    </div>
                    <div class="div_692wB8">
                        <div id="episodes" class="div_bi3qmqX"></div>
                    </div>
                </div>
                <div class="div_4MNvoOW" style="display:none">

                    <div class="div_rJOqfX3">
                        <div class="div_WslendP" >
                            <div id="season" class="div_z0PiH0E" data-season="0" data-data="[]" ></div>
                        </div>
                        <div  class="div_2cD7Iqb"></div>
                    </div>
                    
                </div>

                <div id="itemTrue" class="div_4MNvoOW">

                    <div class="div_rCXoNm8">
                        <div class="div_vm3LkIt">
                            <img id="backdrop" src="">
                        </div>
                        <div class="div_y6ODhoe">
                            <picture class="picture_BLSEWfU"><img id="poster" src=""></picture>
                            <div class="div_K2RbOsL">
                                <h2 id="title"></h2>
                                <p id="overview"></p>
                                <div class="div_aSwP0zW">
                                    <span id="genres"></span>
                                    <span id="duration"></span>
                                    <span id="date"></span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="div_692wB8">
                        <div class="div_WslendP" >
                            <div id="episodes_range" class="div_z0PiH0E" data-season="0" data-data="[]"></div>
                        </div>
                        <div id="episodes" class="div_bi3qmqX"></div>
                    </div>

                </div>
            </div>

            <div id="itemTrueOption" class="div_5Pe946IMjyL1Rs" popover>
                <div class="div_dsb3nhtCrFmUlSN">
                    <div class="div_cXaADrL pointer-on">
                        <div id="itemTrueOptionVideos" class="div_lm2WViG"></div>
                    </div>
                </div>
            </div>
        </div>
    `),
    {},
    true
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  useThis.reactivity.isFavorite.observe((isFavorite) => {
    $elements.favorite.innerHTML = useApp.icon.get(
      isFavorite ? "fi fi-sr-heart" : "fi fi-rr-heart"
    );
  });

  useThis.reactivity.load.observe((load) => {
    const render = {
      itemNull: load,
      itemFalse: !load && !Object.keys(useThis.reactivity.data.value).length,
      itemTrue: !load && !!Object.keys(useThis.reactivity.data.value).length,
    };

    Object.entries(render).forEach((keyvalue) => {
      $elements[keyvalue[0]].style.display = keyvalue[1] ? "" : "none";
    });
  });

  useThis.reactivity.data.observe((data) => {
    if (Boolean(Object.keys(data).length)) {
      const episode_length = data.episodes.length;
      $elements.backdrop.src = useApp.url.img.index(data.poster);
      $elements.poster.src = useApp.url.img.index(data.poster);
      $elements.title.textContent = data.title;
      $elements.overview.textContent = data.description;

      $elements.genres.textContent = data.genres
        .map((genre) => genre)
        .join(", ");
      $elements.duration.textContent = `${episode_length} episodios`;
      $elements.date.textContent = data.progress;

      useThis.reactivity.isFavorite.value = JSON.parse(
        localStorage.getItem("favorite_anime")
      ).some((video) => video.id == data.id);
      $elements.itemTrue.append(document.createTextNode(""));

      $elements.episodes_range.innerHTML = Array(
        Math.floor(episode_length / 50) + 1
      )
        .fill(null)
        .map((_, index, array) => {
          const end =
            array[index + 1] !== undefined ? index * 50 + 50 : episode_length;
          const start = index * 50 + 1;
          return `<button data-season="${index}" class="${
            index == 0 ? "focus" : ""
          }">
                    <span>${start} - ${end || 50}</span>
                </button>`;
        })
        .join("");

      useThis.reactivity.episodes.value = data.episodes
        .reverse()
        .slice(0, 50)
        .reverse();
    }
  });

  useThis.reactivity.episodes.observe((episodes) => {
    const array =
      localStorage.getItem("episodes_direction") == 0
        ? episodes.reverse()
        : episodes;

    $elements.episodes.innerHTML = array
      .map((episode) => {
        return `
                <button class="button_fk0VHgU" data-item data-slug="${useThis.params.id}-${episode[0]}" data-title="${useThis.params.id}" data-description="episodio ${episode[0]}">${episode[0]}</button> 
            `;
      })
      .join("");
  });

  useThis.functions.setLinkServer = (url) => {
    const newURL = new URL(url);
    const hostSplit = newURL.host.split(".");
    const host = hostSplit.length == 3 ? hostSplit[1] : hostSplit[0];
    useApp.mediaPlayer;

    resizeCanvasImage($elements.poster.src, [{ both: 50 }]).then((response) => {
      dispatchEvent(
        new CustomEvent("_video", {
          detail: {
            header: {
              from: "loadedmetadata",
            },
            body: {
              video: {
                url: url,
              },
              detail: {
                title: $elements.title.textContent,
                description: $elements.genres.textContent,
                image: response.images[0].url("image/webp"),
                poster: $elements.poster.getAttribute("src"),
                // url         : doodstream,
                video: {
                  server: host,
                  url: url,
                },
              },
              body_chat: {
                // detail: {
                //   id: useThis.params.id,
                //   type: 3,
                //   path: `/anime/${useThis.params.id}`,
                // },
                // body: [
                //   "Anime",
                //   $elements.title.textContent,
                //   $elements.genres.textContent,
                // ],
                body: {
                  id: useThis.params.id,
                  title: $elements.title.textContent,
                  genres: $elements.genres.textContent,
                  type: 3,
                },
              },
            },
          },
        })
      );
    });
    // if(['streamwish'].includes( host )) {
    //     MediaWebUrl.streamwish( { url : url } ).then( res => {
    //         if(res.status) mediaPlayer.open({ url : res.url, Hls : window.Hls });
    //         else alert('Video no disponible')
    //     })
    //     // MediaWeb.streamwish({ url : url }).then( res => {
    //     //     if(res.body.status) mediaPlayer.open({ url : res.body.url, Hls : window.Hls });
    //     //     else alert('Video no disponible')
    //     // })
    // }

    // else if(['doodstream'].includes( host )) {
    //     MediaWeb.doodstream({ url : url }).then( res => {
    //         if(res.body.status) mediaPlayer.open({ url : res.body.url });
    //         else alert('Video no disponible')
    //     })
    // }

    // else if(['yourupload'].includes( host )) {
    //         MediaWeb.yourupload({ url: url }).then(res => {
    //             if(res.body.status) mediaPlayer.open({ url : res.body.url });
    //             else alert('Video no disponible')
    //         })
    // }
  };

  useThis.functions.dataLoad = () => {

    ApiWebAnimeflv.identifier(useThis.params.id).then( result => {
      useThis.reactivity.load.value = true;
      useThis.reactivity.data.value = result;
      useThis.reactivity.load.value = false;
    });


    return
  };

  $elements.episodes_range.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      if (button.classList.contains("focus")) {
        localStorage.setItem(
          "episodes_direction",
          localStorage.getItem("episodes_direction") ^ 1
        );
        $elements.episodes.append(
          ...Array.from($elements.episodes.children).reverse()
        );
      } else {
        $elements.episodes_range
          .querySelectorAll("button.focus")
          .forEach((element) => element.classList.remove("focus"));
        button.classList.add("focus");
        $elements.season.setAttribute(
          "data-season",
          button.getAttribute("data-season")
        );

        const index = parseInt(button.getAttribute("data-season"));
        const start = index * 50;
        const end = start + 50;

        useThis.reactivity.episodes.value =
          useThis.reactivity.data.value.episodes.slice(start, end).reverse();
      }
    }
  });

  $elements.episodes.addEventListener("click", (e) => {
    const item = e.target.closest("[data-item]");

    if (item) {
      const slug = item.getAttribute("data-slug");

      $elements.itemTrueOption.showPopover();
      $elements.itemTrueOptionVideos.innerHTML =
        '<div class="loader-i" style="--color:var(--color-letter); padding: 30px 0; grid-column: 1 / -1;"></div>';

      // useApp.mediaPlayer.settings({
      //     title: item.getAttribute('data-title').split('-').join(' '),
      //     description: item.getAttribute('data-description'),
      //     controls: {
      //         includesYes: ['*'],
      //         includesNot: ['lock', 'chromecast', 'download'],
      //     }
      // })

      fetch(
        useThis.functions.url.fetch(`https://www3.animeflv.net/ver/${slug}`)
      )
        .then((res) => res.text())
        .then((text) => {
          const $text = document.createElement("div");
          $text.innerHTML = text;

          Array.from($text.querySelectorAll("script")).forEach((script) => {
            const scriptInnerHTML = script.innerHTML;

            if (scriptInnerHTML.includes("var anime_id")) {
              const string1 = scriptInnerHTML.slice(
                0,
                scriptInnerHTML.indexOf("$(document)")
              );
              const string2 = [
                "const data = {}",
                string1.split("var").join("data . "),
                "return data",
              ].join(";");

              const scriptFunction = new Function(string2);
              const scriptReturn = scriptFunction();

              $elements.itemTrueOptionVideos.innerHTML = Object.entries(
                scriptReturn.videos
              )
                .map((data) => {
                  console.log(data);
                  let show = true;

                  return data[1]
                    .map((video, index) => {
                      if (index == 0) return "";
                      if (!["yu", "sw"].includes(video.server)) return "";

                      const visibility = show ? "" : "display:none";
                      show = false;

                      return `
                                        <span class="span_eNUkEzu" style="${visibility}">${data[0]
                        .slice(0, 3)
                        .toUpperCase()}</span>
                                        <button class="button_NuUj5A6" data-type="" data-url="${
                                          video.code
                                        }" data-quality="">
                                            
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
            }
          });

          Array.from($text.querySelectorAll("img")).forEach((img) =>
            img.removeAttribute("src")
          );
        });
    }
  });

  $elements.favorite.addEventListener("click", () => {
    const favorite = JSON.parse(localStorage.getItem("favorite_anime"));
    const index = favorite.findIndex(
      (video) => video.id == useThis.reactivity.data.value.id
    );

    if (index == -1) favorite.push(useThis.reactivity.data.value);
    else favorite.splice(index, 1);

    useThis.reactivity.isFavorite.value = index == -1;
    localStorage.setItem("favorite_anime", JSON.stringify(favorite));
  });

  $elements.itemTrueOptionVideos.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      $elements.itemTrueOption.hidePopover();
      useThis.functions.setLinkServer(button.getAttribute("data-url"));
      // useApp.mediaPlayer.element().requestFullscreen()
    }
  });

  $elements.itemTrueOption.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      $elements.itemTrueOption.hidePopover();
    }
  });

  useApp.elements.meta.color.setAttribute("content", "#000000");
  useThis.functions.dataLoad();

  return $element;
};

var searchType = ()=>{

    const useApp    = window.dataApp;
    const useThis   = {
        params      : useApp.routes.params(),
        reactivity  : {
            load    : defineVal(true),
            Data    : defineVal([])
        },
        function        : {
            dataLoad    : ()=> {}
        }
    };

    const $element = createNodeElement(`

        <div class="div_Xu02Xjh">

            <header class="header_K0hs3I0 header_4scHSOs">
        
                <a class="a_t8K3Qpd" href="#/catalogo/${useThis.params.type}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-angle-left"><path d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z"></path></svg></a>
                <form id="form" class="form_r7mvBNn" autocomplete="off" >
                    <input type="search" name="search" placeholder="buscar">
                    <button type="submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-search"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"></path></svg></button>
                </form>

            </header>
        
            <div class="div_IsTCHpN" style="padding:10px">
                <div id="itemNull" class="element-loader" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${ useApp.icon.get('fi fi-rr-search-alt') }
                    <h3></h3>
                </div>
                <div id="itemTrue" class="div_C2otGmQ"></div>
            </div>

        </div>

    `);

    const $elements = createObjectElement( $element.querySelectorAll('[id]'), 'id', true );
    const renderObjectElement = new RenderObjectElement( $elements );

    useThis.reactivity.load.observe( load => {
        renderObjectElement.set({
            itemNull    : load,
            itemFalse   : !load && !useThis.reactivity.Data.value.length && !$elements.itemTrue.children.length,
            itemTrue    : (!load && !!useThis.reactivity.Data.value.length) || !!$elements.itemTrue.children.length
        });
    });

    useThis.reactivity.Data.observe( Data => {
        $elements.itemTrue.innerHTML = Data.map( data => {
            return `
                <div class="div_ywmleK1" data-item>
                    <button class="button_YqF7ZuC" data-id="${data.id}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-cross-small"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"></path></svg></button>
                    <a class="a_UrjAwYX" href="#/catalogo/search/${data.type}/${encodeURIComponent(data.search)}">
                        <div class="div_9OWid2W">
                            <p>${data.search}</p>
                            <span>${data.type}</span>
                        </div>
                        ${ useApp.icon.get('fi fi-rr-angle-small-right') }
                    </a>
                </div>
            `
        }).join('');
    });

    useThis.function.dataLoad = () => {
        useThis.reactivity.Data.value   = JSON.parse(localStorage.getItem('search_history'));
        useThis.reactivity.load.value   = false;
    };
    
    $elements.form.addEventListener('submit', (e)=> {
        e.preventDefault();

        location.hash = `/catalogo/search/${useThis.params.type}/${encodeURIComponent($elements.form.search.value.trim())}`;
        
        storageJSON( localStorage, 'search_history', (Data = []) => {
            if( !Data.some((data)=> data.search == $elements.form.search.value.trim()) ) {
                Data.push({
                    id      : Date.now(),
                    type    : useThis.params.type,
                    search  : $elements.form.search.value.trim()
                });
            }

            return Data
        });
    
    });

 

    $elements.itemTrue.addEventListener('click', (e)=> {
        const button = e.target.closest('button');
        if( button ) {

            const id = button.getAttribute('data-id');

            storageJSON( localStorage, 'search_history', (Data = []) => {
                return Data.filter( data => data.id != id && data.type != useThis.params.type)
            });

            button.closest('[data-item]').remove();

        }
    });
 
    useThis.function.dataLoad();
    setTimeout(()=> $elements.form.search.focus());
    // useApp.elements.meta.color.setAttribute('content', localStorage.getItem('theme') == 'light' ? '#ffffff' : '#292929')
    return $element
};

var searchTypeResult = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      load: defineVal(true),
      Data: defineVal([]),
    },
    function: {
      dataLoad: () => {},
    },
  };

  const $element = createNodeElement(`

        <div class="div_Xu02Xjh">

            <header class="header_K0hs3I0">
 
                <div class="div_uNg74XS div_McPrYGP">
                    <a href="#/catalogo/search/${
                      useThis.params.type
                    }" class="button_lvV6qZu">${useApp.icon.get(
    "fi fi-rr-angle-small-left"
  )}</a>
                    <div class="div_sZZicpN">
                        <h3>${decodeURIComponent(useThis.params.result)}</h3>
                        <span style="display:none">${useThis.params.type}</span>
                    </div>
                </div>

            </header>

            <div class="div_BIchAsC">
                <div id="buttonsFocus" data-gender="Todos" class="div_O73RBqH">

                    ${Object.entries({
                      anime: "Animes",
                      pelicula: "peliculas",
                      serie: "series",
                      youtube: "YT Videos",
                    })
                      .map((entries) => {
                        return `<button data-gender="${entries[0]}" class="${
                          entries[0] == useThis.params.type ? "focus" : ""
                        }">${entries[1]}</button>`;
                      })
                      .join("")}
                </div>
            </div>
        
            <div class="div_IsTCHpN">
                <div id="itemNull" class="element-loader" style="--color:var(--color-letter)"></div>
                <div id="itemFalse" class="div_b14S3dH">
                    ${useApp.icon.get("fi fi-rr-search-alt")}
                    <h3>sin resultados</h3>
                </div>

                <div id="itemTrue" class="">
                    <div id="itemTrueLoad" class="div_Qm4cPUn">
                        <div class="element-loader" style="--color:var(--color-letter)"></div>
                    </div>
                </div>
                
            </div>

        </div>

    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  new RenderObjectElement($elements);

  useThis.reactivity.load.observe((load) => {
    const render = {
      itemNull: load,
      itemFalse: !load && !Object.keys(useThis.reactivity.Data.value).length,
      itemTrue: !load && !!Object.keys(useThis.reactivity.Data.value).length,
    };

    Object.entries(render).forEach((entries) => {
      $elements[entries[0]].style.display = entries[1] ? "" : "none";
    });
  });

  useThis.reactivity.Data.observe((Data) => {
    const type = $elements.buttonsFocus
      .querySelector("button.focus")
      .getAttribute("data-gender");

    const fragment = document.createDocumentFragment();
    fragment.append(document.createTextNode(""));
    fragment.append(
      ...Data.map((data) => {
        if (["pelicula", "serie"].includes(type)) {
          const slug = data.url.slug
            .split("/")
            .map((name, index) => {
              if (index == 0) {
                if (name == "movies") return "pelicula";
                else if (name == "series") return "serie";
              }
              return name;
            })
            .join("/");

          if (data.images.poster == null) return "";

          const url = useApp.url.img.index(
            `https://cuevana.biz/_next/image?url=${data.images.poster}&w=256&q=50`
          );

          const element = createNodeElement(`
                    <a href="#/catalogo/${slug.split("/")[0]}/${
            data.TMDbId
          }" class="div_SQpqup7" data-item>

                        <div class="div_fMC1uk6">
                            <img src="" alt="" data-src="${url}">
                        </div>
                        <div class="div_9nWIRZE">
                            <span>${slug.split("/")[0]}</span>
                            <p>${data.titles.name}</p>
                        </div>
        
                    </a>    
                `);

          IntersectionObserverImage.load(element.querySelector("img"), false);

          return element;
        }

        if (type == "anime") {
          const url = useApp.url.img.index(data.poster);

          const element = createNodeElement(`
                    <a href="#/catalogo${
                      data.href
                    }" class="div_SQpqup7" data-item>
    
                        <div class="div_fMC1uk6">
                            <img src="" alt="" data-src="${url}">
                        </div>
                        <div class="div_9nWIRZE">
                            <span>${data.type ?? ""}</span>
                            <p>${data.title}</p>
                        </div>
        
                    </a>
                `);

          IntersectionObserverImage.load(element.querySelector("img"), true);
          return element;
        }

        if (type == "youtube") {
          return createNodeElement(`
                    <a href="#/catalogo/youtube/${
                      data.videoId
                    }" class="div_EJlRW2l" data-item>

                        <div class="div_zcWgA0o">
                            <img src="${
                              data.thumbnail.thumbnails[0].url
                            }" alt="">
                        </div>
                        <div class="div_9nWIRZE">
                            <span>${
                              data.author || data.ownerText.runs[0].text
                            }</span>
                            <p>${
                              data.title.runs
                                ? data.title.runs[0].text
                                : data.title
                            }</p>
                        </div>
        
                    </a>
                `);
        }
      })
    );

    $elements.itemTrue.append(fragment);
    $elements.itemTrueLoad.remove();
  });

  useThis.function.dataLoad = () => {
    const type = $elements.buttonsFocus
      .querySelector("button.focus")
      .getAttribute("data-gender");

    $elements.itemTrue.setAttribute(
      "class",
      ["anime", "pelicula", "serie"].includes(type)
        ? "div_qsNmfP3"
        : "div_FtxwFbU"
    );

    if (["pelicula", "serie"].includes(type)) {
      return fetch(
        useApp.url.fetch(
          `https://cuevana.biz/search?q=${useThis.params.result}`
        )
      )
        .then((res) => res.text())
        .then((text) => {
          const $text = document.createElement("div");
          $text.innerHTML = text;

          Array.from($text.querySelectorAll("img")).forEach((img) => {
            img.removeAttribute("src");
            img.removeAttribute("srcset");
          });

          const datas = JSON.parse(
            $text.querySelector("#__NEXT_DATA__").textContent
          );

          useThis.reactivity.load.value = true;
          useThis.reactivity.Data.value = datas.props.pageProps.movies;
          useThis.reactivity.load.value = false;
        });
    }

    if (type == "anime") {
      return fetch(
        useApp.url.fetch(
          `https://www3.animeflv.net/browse?q=${useThis.params.result}`
        )
      )
        .then((res) => res.text())
        .then((page) => {
          const elementPage = document.createElement("div");
          elementPage.innerHTML = page;

          const lis = Array.from(
            elementPage.querySelector(".ListAnimes.AX.Rows.A03.C02.D02")
              .children
          );

          useThis.reactivity.load.value = true;
          useThis.reactivity.Data.value = lis.map((li) => {
            return {
              href: li.querySelector("a").getAttribute("href"),
              title: li.querySelector(".Title").textContent,
              poster: li.querySelector("img").src,
              type: li.querySelector(".Type").textContent,
            };
          });
          useThis.reactivity.load.value = false;

          Array.from(elementPage.querySelectorAll("img")).forEach((img) =>
            img.removeAttribute("src")
          );
        });
    }

    if (type == "youtube") {
      return fetch(
        useApp.url.fetch(
          `https://www.youtube.com/results?search_query=${useThis.params.result}`
        )
      )
        .then((res) => res.text())
        .then((text) => {
          const $text = document.createElement("div");
          $text.innerHTML = text;

          Array.from($text.querySelectorAll("script, style")).forEach(
            (script) => {
              if (script.innerHTML.includes("var ytInitialData =")) {
                const index = script.innerHTML.indexOf("{");
                const lastIndex = script.innerHTML.lastIndexOf("}");

                const output = JSON.parse(
                  script.innerHTML.slice(index, lastIndex + 1)
                );
                const contents =
                  output.contents.twoColumnSearchResultsRenderer.primaryContents
                    .sectionListRenderer.contents[0].itemSectionRenderer
                    .contents;

                useThis.reactivity.load.value = true;
                useThis.reactivity.Data.value = contents
                  .filter((content) => content.videoRenderer)
                  .map((content) => content.videoRenderer);
                useThis.reactivity.load.value = false;
              }
            }
          );
        });
    }
  };

  $elements.buttonsFocus.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      Array.from(
        $elements.buttonsFocus.querySelectorAll("button.focus")
      ).forEach((button) => button.classList.remove("focus"));
      button.classList.add("focus");

      useThis.reactivity.load.value = true;
      $elements.itemTrue.innerHTML = "";

      useThis.function.dataLoad();
    }
  });

  useThis.function.dataLoad();
  return $element;
};

var password_change = () => {
  const useApp = window.dataApp;
  ({
    params: useApp.routes.params(),
  });

  const $element = createNodeElement(`
        <div class="div_Xu02Xjh" style="position:fixed">
            <header class="header_K0hs3I0">

                <div class="div_uNg74XS">
                    <a href="#/seguridad" class="button_lvV6qZu">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle">Cambiar contraseña</h3>
                </div>
                
            </header>
            <div class="div_guZ6yID" style="padding:10px">
        
                <form id="form" class="div_SCqCUTo"  autocomplete="off">
                    <h2 style="padding: 0 20px;">Cambiar contraseña</h2>
                    <div class="div_Y85zRC0">
                        <label class="label_L3539wR">
                            <input type="password" name="password" placeholder="" autocomplete="off">
                            <span>contraseña</span>
                        </label>
                        <label class="label_L3539wR">
                            <input type="password" name="password2" placeholder="" autocomplete="off">
                            <span>repita la contraseña</span>
                        </label>
                    </div>
                    <button class="button_WU25psx" >
                        <span>Cambiar</span>
                        <i class="fi fi-rr-arrow-right"></i>
                    </button>
                
                </form>
                
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const encodeQueryString = encodeQueryObject({
      route: "/auth/password/change",
    });

    const body = {
      password: $elements.form.password.value.trim(),
    };

    // $elements.form.password.value = "";

    if (body.password.length < 6) {
      return dispatchEvent(
        new CustomEvent("_notification", {
          detail: {
            message: "La contraseña debe ser minimo de 6 caracteres",
            name: "warning",
            duration: 5000,
          },
        })
      );
    }

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "POST",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return;
      });
  });

  return $element;
};

var routes = () => {
  const useApp = window.dataApp;

  const $element = createNodeElement(`<div class="routes"></div>`);

  const routes = [
    { hash: "/", callback: () => routesPrivate(inicio) },
    { hash: "/login", callback: () => routesPublic(login) },
    { hash: "/register", callback: () => routesPublic(register) },
    {
      hash: "/password/recover",
      callback: () => routesPublic(password_recover),
    },
    {
      hash: "/password/update/:token",
      callback: () => routesPublic(password_update),
    },
    { hash: "/video", callback: () => routesPrivate(video) },
    { hash: "/video/add", callback: () => routesPrivate(videoIdEdit) },
    { hash: "/video/:id", callback: () => routesPrivate(videoId) },
    { hash: "/video/:id/edit", callback: () => routesPrivate(videoIdEdit) },
    { hash: "/video/:id/users", callback: () => routesPrivate(videoIdUsers) },
    { hash: "/video/link/:id", callback: () => routesPrivate(videoLinkId) },
    { hash: "/profile", callback: () => routesPrivate(profile) },
    { hash: "/apariencia", callback: () => routesPrivate(apariencia) },
    { hash: "/seguridad", callback: () => routesPrivate(seguridad) },
    {
      hash: "/password/change",
      callback: () => routesPrivate(password_change),
    },
    { hash: "/permission", callback: () => routesPrivate(permission) },
    { hash: "/cuenta", callback: () => routesPrivate(cuenta) },
    { hash: "/avatar", callback: () => routesPrivate(avatar) },
    { hash: "/catalogo", callback: () => routesPrivate(catalogo) },
    { hash: "/catalogo/youtube", callback: () => routesPrivate(youtube) },
    { hash: "/catalogo/youtube/:id", callback: () => routesPrivate(youtubeId) },
    { hash: "/catalogo/pelicula", callback: () => routesPrivate(pelicula) },
    {
      hash: "/catalogo/pelicula/:id",
      callback: () => routesPrivate(peliculaId),
    },
    { hash: "/catalogo/serie", callback: () => routesPrivate(serie) },
    { hash: "/catalogo/serie/:id", callback: () => routesPrivate(serieId) },
    { hash: "/catalogo/anime", callback: () => routesPrivate(anime) },
    { hash: "/catalogo/anime/:id", callback: () => routesPrivate(animeId) },
    { hash: "/catalogo/search/:type", callback: searchType },
    { hash: "/catalogo/search/:type/:result", callback: searchTypeResult },
  ];

  useApp.routes.set(routes);

  addEventListener("hashchange", () => {
    useApp.elements.meta.color.setAttribute("content", "#000000");

    $element.innerHTML = "";
    $element.append(useApp.routes.get() ?? "");

    if (document.fullscreenElement) document.exitFullscreen();
  });

  return $element;
};

var eleAlert = ()=>{

    const $element = createNodeElement(`
        <div class="div_4To3WRE"></div>
    `);

    const Color = [
        { color : '#82C9AC', name : 'success' },
        { color : '#E79B9B', name : 'danger' },
        { color : '#AEC8E8', name : 'info' },
        { color : '#F7D08A', name : 'warning' },
        { color : '#343A40', name : 'dark' }
    ];

    addEventListener('_notification', e => {
        const detail    = e.detail;
        const color     = (Color.find( color => color.name == detail.name ) ?? {} ).color ?? '#343A40';
        const duration  = detail.duration ?? 2000;
        const remove    = detail.remove ?? true;

        $element.insertAdjacentHTML('afterbegin', `
            <div class="div_d3zFZTz" style="background: ${ color }; --time-bar:${ duration / 1000 }s" data-item>
                <div class="div_mUJ1ZKX8wrXPI7B">
                    <span>${ detail.message }</span>
                    <button>
                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512"><path d="M18,6h0a1,1,0,0,0-1.414,0L12,10.586,7.414,6A1,1,0,0,0,6,6H6A1,1,0,0,0,6,7.414L10.586,12,6,16.586A1,1,0,0,0,6,18H6a1,1,0,0,0,1.414,0L12,13.414,16.586,18A1,1,0,0,0,18,18h0a1,1,0,0,0,0-1.414L13.414,12,18,7.414A1,1,0,0,0,18,6Z"></path></svg>
                    </button>
                </div>
                ${ remove ? '<hr>' : '' }
            </div>
        `);

        const element = $element.children[0];
        if( remove ) setTimeout(()=> element.remove(), duration);
    });

    $element.addEventListener('click', e => {
        if( e.target.closest('button') ) e.target.closest('[ data-item ]').remove();
    });

    $element.append(createNodeElement(`
        <style>
        .div_4To3WRE {
            position: fixed;
            inset: 0;
            bottom: initial;
            max-height: 50%;
            z-index: 9999;
            
            padding: 10px;
            padding-right: 0;
            gap: 5px;
            
            display: grid;
            justify-items: right;
            
            pointer-events: none;
            
            overflow-y: auto;
            scrollbar-width: none;
        }
        
        .div_d3zFZTz {
            --time-bar: 3s;
            position: relative;
            
            background: #82c9ac;
            color: #ffffff;
            
            width: min(100%, 425px);
            height: 60px;
            
            border-radius: 15px 0 0 15px;
            
            display: grid;
            
            pointer-events: initial;
            
            animation: up_notification 0.3s ease-in-out;
            overflow: hidden;
            
            & hr {
                background: rgb(0 0 0 / 0.3);
                border: none;
                animation: bar_notification var(--time-bar) linear;
                border-radius: 3px;
                width: 0;
                height: 3px;
            
                position: absolute;
                left: 0;
                bottom: 0;
            }
        }
        
        .div_mUJ1ZKX8wrXPI7B {
            display: grid;
            grid-template-columns: 1fr 60px;
        
            & span {
                word-break: break-word;
                margin: auto 20px;
            
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            
            & button {
                background: none;
                width: 60px;
                height: 60px;
                color: inherit;
            }
        
            & svg {
                fill: #ffffff;
            }
        }
        
        @keyframes up_notification {
            0% {
                top: -500px;
                height: 0;
            }
            100% {
                height: 60px;
                top: 0;
            }
        }
        
        @keyframes bar_notification {
            0% {
                width: 100%;
            }
            100% {
                width: 0;
            }
        }
        </style>
    `));

    return $element
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

var videoDraw = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
  };

  const socket = useApp.socket.server;

  const $element = createNodeElement(`
      <div class="div_Dt0AINW">

          <div class="div_ak1IaKv">
              <div id="canvasBox" class="div_HPp5z9l">
                  <canvas id="canvas"></canvas>
              </div>
          </div>
          <div class="div_Aqa0wxW">
              <div id="divButtons" class="div_9NDis1G">
                  <button id="closeButton" class="label_tYO6nSf">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-cross"><path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"></path></svg>
                  </button>

                  <hr class="hr_ZMZWNsx">

                  <button id="clearButton" class="label_tYO6nSf">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-broom"><path d="M23.715,2.285a1.013,1.013,0,0,0-1.43,0L17.521,7.049l-.32-.313a5.008,5.008,0,0,0-6.429-.479A16.618,16.618,0,0,1,6.224,8.685L4.15,9.293a5.036,5.036,0,0,0-3.113,2.635A4.973,4.973,0,0,0,.9,15.947a12.95,12.95,0,0,0,12.112,8.064h.924a1.011,1.011,0,0,0,.578-.182A15.288,15.288,0,0,0,21.224,13.62a5.029,5.029,0,0,0-1.453-4.374l-.8-.784,4.747-4.747A1.013,1.013,0,0,0,23.715,2.285Zm-10.107,19.7h-.6A11.3,11.3,0,0,1,8.7,21.138l.011-.006a11.546,11.546,0,0,0,4.351-3.8l.518-.761a1.01,1.01,0,0,0-1.67-1.138l-.518.761A9.535,9.535,0,0,1,7.8,19.327l-1.251.63a10.757,10.757,0,0,1-2.583-2.57,11.625,11.625,0,0,0,4.377-2.664,1.011,1.011,0,0,0-1.414-1.446,9.617,9.617,0,0,1-3.98,2.32c-.061-.135-.127-.267-.182-.406a2.906,2.906,0,0,1,.085-2.381,3.023,3.023,0,0,1,1.864-1.578l2.073-.608a15.364,15.364,0,0,0,3.426-1.588l7.915,7.712A14.192,14.192,0,0,1,13.608,21.989Zm5.62-8.683a12.421,12.421,0,0,1-.309,1.387L11.948,7.9l0,0a3.011,3.011,0,0,1,1.755-.566,2.973,2.973,0,0,1,2.084.849l2.569,2.509A3.01,3.01,0,0,1,19.228,13.306Z"></path></svg>
                  </button>
                  
                  <label class="label_tYO6nSf">
                      <input id="color" type="color" value="#ffffff">
                      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-svg-name="fi fi-rr-fill"><path d="m22.327 18.422c.728 1.034 1.673 2.229 1.673 3.078a2.5 2.5 0 0 1 -5 0c0-.775.961-2.008 1.692-3.069a1 1 0 0 1 1.635-.009zm-.877-4.558-8.672 8.672a5.006 5.006 0 0 1 -7.071 0l-4.242-4.243a5 5 0 0 1 0-7.071l5.709-5.71-2.856-2.89a1 1 0 0 1 1.422-1.406l2.848 2.884 1.548-1.55-.843-.843a1 1 0 0 1 1.414-1.414l13 13a1 1 0 1 1 -1.414 1.414zm-1.414-1.414-8.486-8.486-1.557 1.558 4.718 4.778a1 1 0 1 1 -1.422 1.4l-4.709-4.765-5.7 5.7a3 3 0 0 0 0 4.243l4.242 4.243a3.005 3.005 0 0 0 4.243 0z"></path></svg>
                  </label>
                  
                  <button id="undoButton" class="label_tYO6nSf" style="display:none">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-undo-alt"><path d="M22.535,8.46A4.965,4.965,0,0,0,19,7h0L2.8,7,7.1,2.7A1,1,0,0,0,5.682,1.288L.732,6.237a2.5,2.5,0,0,0,0,3.535l4.95,4.951A1,1,0,1,0,7.1,13.309L2.788,9,19,9h0a3,3,0,0,1,3,3v7a3,3,0,0,1-3,3H5a1,1,0,0,0,0,2H19a5.006,5.006,0,0,0,5-5V12A4.969,4.969,0,0,0,22.535,8.46Z"></path></svg>
                  </button>
                  
                  <select id="range" class="select_Z1abqn2">
                      ${Array(50)
                        .fill(null)
                        .map(
                          (_, index) =>
                            `<option value="${index + 1}" ${
                              index == 2 ? "selected" : ""
                            }>${index + 1}</option>`
                        )
                        .join("")}
                  </select>
                  <hr class="hr_ZMZWNsx">
                  <button id="sendButton" class="label_tYO6nSf">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-paper-plane-top"><path d="m21.916,8.727L3.965.282C2.951-.211,1.756-.041.917.713.076,1.47-.216,2.646.172,3.708c.017.043,4.411,8.296,4.411,8.296,0,0-4.313,8.251-4.328,8.293-.387,1.063-.092,2.237.749,2.993.521.467,1.179.708,1.841.708.409,0,.819-.092,1.201-.279l17.872-8.438c1.285-.603,2.083-1.859,2.082-3.278,0-1.42-.801-2.675-2.084-3.275ZM2.032,2.967c-.122-.415.138-.69.223-.768.089-.079.414-.324.838-.116.005.002,17.974,8.455,17.974,8.455.239.112.438.27.591.462H6.315L2.032,2.967Zm19.034,10.504L3.178,21.917c-.425.209-.749-.035-.838-.116-.086-.076-.346-.353-.223-.769l4.202-8.032h15.345c-.153.195-.355.357-.597.471Z"></path></svg>
                  </button>
              </div>
          </div>
              

          
      </div>
    `);
  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  new RenderObjectElement($elements);
  const ctx = $elements.canvas.getContext("2d");

  let painting = false;
  let paths = []; // Array para almacenar los trazos
  let currentPath = []; // Array para almacenar el trazo actual

  const resizeCanvas = () => {
    $elements.canvas.width = $elements.canvasBox.clientWidth;
    $elements.canvas.height = $elements.canvasBox.clientHeight;
  };

  setTimeout(resizeCanvas);
  addEventListener("resize", resizeCanvas);

  const startPosition = (e) => {
    $elements.divButtons.style.display = "none";

    painting = true;
    currentPath = []; // Inicia un nuevo trazo
    draw(e);
    if (e.type.startsWith("touch")) {
      e.preventDefault(); // Prevenir comportamiento predeterminado en touchstart
    }
  };

  const endPosition = (e) => {
    $elements.divButtons.style.display = "";

    painting = false;
    ctx.beginPath();
    if (currentPath.length > 0) {
      paths.push(currentPath); // Guarda el trazo al finalizar
    }
    if (e.type.startsWith("touch")) {
      e.preventDefault(); // Prevenir comportamiento predeterminado en touchend y touchcancel
    }
  };

  const draw = (e) => {
    if (!painting) return;

    ctx.strokeStyle = $elements.color.value;
    ctx.lineWidth = $elements.range.value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    let x, y;
    if (e.type.startsWith("touch")) {
      const touch = e.touches[0] || e.changedTouches[0];
      x = touch.clientX - $elements.canvas.offsetLeft;
      y = touch.clientY - $elements.canvas.offsetTop;
      e.preventDefault(); // Prevenir comportamiento predeterminado en touchmove
    } else {
      x = e.offsetX;
      y = e.offsetY;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    currentPath.push({ x, y }); // Guarda las coordenadas del trazo actual
  };

  const undoLastPath = () => {
    if (paths.length > 0) {
      paths.pop(); // Elimina el último trazo
      redrawCanvas(); // Redibuja el canvas sin el último trazo
      sendCanvas();
    }
  };

  const clearCanvas = () => {
    ctx.clearRect(0, 0, $elements.canvas.width, $elements.canvas.height); // Limpia el canvas
    paths = []; // Limpia el historial de trazos

    sendCanvas();
  };

  const redrawCanvas = () => {
    ctx.clearRect(0, 0, $elements.canvas.width, $elements.canvas.height); // Limpia el canvas
    ctx.beginPath();
    paths.forEach((path) => {
      ctx.beginPath();
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach((point) => {
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
      });
    });
    ctx.beginPath();
  };

  // Eventos del ratón
  $elements.canvas.addEventListener("mousedown", startPosition);
  $elements.canvas.addEventListener("mouseup", endPosition);
  $elements.canvas.addEventListener("mouseleave", endPosition);
  $elements.canvas.addEventListener("mousemove", draw);

  // Eventos táctiles
  $elements.canvas.addEventListener("touchstart", startPosition, {
    passive: false,
  });
  $elements.canvas.addEventListener("touchend", endPosition, {
    passive: false,
  });
  $elements.canvas.addEventListener("touchcancel", endPosition, {
    passive: false,
  });
  $elements.canvas.addEventListener("touchmove", draw, { passive: false });

  // Botón de deshacer
  $elements.undoButton.addEventListener("click", undoLastPath);

  // Botón de borrar
  $elements.clearButton.addEventListener("click", clearCanvas);

  // Enviar el canvas a través de Socket.IO
  const sendCanvas = () => {
    const emit = {
      header: {
        id: useThis.params.id,
        from: "paiting",
        datetime: Date.now(),
        message: `${useApp.user.data.fullname} ha dibujado sobre el video`,
      },
      body: {
        user: useApp.user.data,
        socket: {
          id: socket.id,
        },
        draw: {
          base64: $elements.canvas.toDataURL("image/webp"),
        },
      },
    };
    // const dataURL = $elements.canvas.toDataURL("image/png"); // Convierte el canvas a una imagen base64
    socket.emit("video", emit); // Envía la imagen base64 a través de Socket.IO
  };

  $elements.canvas.addEventListener("mouseup", sendCanvas);
  $elements.canvas.addEventListener("touchend", sendCanvas);

  $elements.closeButton.addEventListener("click", () => {
    $element.style.display = "none";
    // clearCanvas()
  });

  $elements.sendButton.addEventListener("click", () => {
    const sendMessageStreaming = () => {
      const uploadImageStreaming = new Promise((resolve) => {
        $elements.canvas.toBlob((blob) => {
          const formData = new FormData();
          formData.append(
            "file",
            new File([blob], "image.webp", { type: "image/webp" })
          );

          fetch(
            useApp.url.img.default(
              "/set.php?folder=A1JR7-SN3AR-1NT8W-U8YB5-GX4OS-3LA3D-U4HW2-QJ6FK"
            ),
            {
              method: "POST",
              body: formData,
            }
          )
            .then((res) => res.json())
            .then(resolve);
        }, "image/webp");
      });

      uploadImageStreaming.then((files) => {
        const datetime = Date.now();

        const encodeQueryString = encodeQueryObject({
          route: "/room/chat",
          token: useApp.user.token,
        });

        const body = {
          id_room: useThis.params.id,
          id_chat_reply: null,
          body: "",
          files: JSON.stringify({ image: files }),
          datetime_add: datetime,
          datetime_update: datetime,
          type: 4,
          status: 1,
        };

        fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
          method: "POST",
          headers: {
            "Token-Auth": Cookie.get(useApp.auth),
          },
          body: JSON.stringify(body),
        })
          .then((res) => res.json())
          .then((res) => {
            if (res && res.status) {
              dispatchEvent(
                new CustomEvent("_chat", {
                  detail: {
                    from: "sendMessage",
                    data: res.data,
                  },
                })
              );
            }
          });
      });
    };

    sendMessageStreaming();
  });

  return $element;
};

var videoChatFormStiker = () => {
  const useApp = window.dataApp;
  const useThis = {
    reactivity: {
      dataHeaderNull: defineVal(true),
      dataHeaderTrue: defineVal([]),
      dataBodyNull: defineVal(false),
      dataBodyTrue: defineVal([]),
    },
    values: {
      dataBody: [],
    },
    functions: {},
  };

  const $element = replaceNodeChildren(
    createNodeElement(`
      <div class="div_ZN5Ybv0 pointer-on">
          <div class="div_YAtoTi scroll-y">
              <button data-collection="search" class="button_zqe7IA5" style="display:none;"></button>
              <div id="itemHeaderTrue" class="div_i5CDBDa" data-index="0"></div>
          </div>
          <div class="div_mpULqA3 scroll-y">
              <div id="itemBodyNull" class="loader-i" style="--color:var(--color-letter); display:none;"></div>
              <div id="itemBodyFalse" class="div_wzrmqKS">
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M2768 4990 c-70 -12 -166 -46 -225 -80 -62 -35 -159 -124 -198 -179 -90 -131 -6 -302 147 -301 65 1 117 29 166 92 52 67 101 103 165 119 41 10 58 9 114 -6 122 -33 187 -132 162 -244 -14 -62 -31 -91 -82 -138 -53 -49 -78 -63 -200 -109 -182 -69 -235 -116 -274 -243 l-17 -54 -90 7 c-49 3 -190 6 -313 6 l-224 0 44 58 c78 101 107 179 107 289 0 203 -136 369 -342 418 -118 28 -241 11 -367 -51 -161 -79 -280 -262 -281 -429 0 -67 26 -114 80 -142 53 -28 82 -29 136 -3 55 27 72 55 88 143 21 118 54 163 140 187 62 17 112 6 152 -34 67 -67 67 -171 1 -267 -49 -72 -102 -151 -119 -179 -14 -23 -26 -27 -119 -39 -337 -41 -709 -150 -917 -268 -96 -54 -201 -146 -237 -207 -47 -80 -49 -115 -25 -338 85 -803 236 -1502 448 -2085 74 -202 166 -416 201 -467 67 -97 188 -170 347 -210 585 -147 1203 -150 1798 -10 136 32 218 69 285 130 73 66 108 121 167 264 l51 125 104 6 c128 7 171 22 328 111 386 220 659 523 827 917 74 171 97 273 97 431 2 213 -47 348 -175 485 -156 167 -386 217 -601 130 l-60 -24 7 62 c3 34 9 135 12 224 l7 162 -28 58 c-89 183 -399 347 -845 447 -64 14 -150 31 -193 38 -42 6 -74 15 -70 18 5 4 51 21 103 39 172 59 248 101 326 183 167 177 202 410 93 625 -117 231 -429 379 -701 333z m248 -100 c120 -31 192 -69 273 -145 102 -97 144 -183 149 -311 4 -74 0 -107 -17 -162 -22 -74 -83 -166 -142 -216 -44 -38 -152 -88 -286 -132 -160 -53 -185 -70 -219 -149 -44 -106 -98 -132 -155 -76 -35 36 -36 46 -3 143 45 135 77 164 257 228 211 76 317 199 317 368 0 167 -139 294 -322 294 -101 0 -169 -35 -261 -133 -66 -71 -77 -79 -111 -79 -48 0 -82 23 -96 65 -15 46 4 89 73 158 144 144 343 198 543 147z m-1244 -378 c77 -38 130 -92 166 -171 21 -45 26 -71 26 -136 0 -104 -23 -154 -138 -300 -47 -60 -89 -123 -92 -140 -3 -16 -1 -50 5 -74 12 -54 0 -88 -33 -97 -54 -13 -81 29 -93 147 -6 64 5 91 72 179 23 30 55 80 71 110 25 48 29 66 29 140 0 69 -5 93 -22 127 -57 106 -175 148 -302 106 -102 -33 -162 -114 -180 -244 -9 -68 -26 -89 -73 -89 -15 0 -37 9 -49 21 -18 18 -20 28 -14 77 17 139 103 265 225 327 79 41 142 55 240 52 85 -2 103 -6 162 -35z m738 -802 c40 -119 162 -164 261 -97 28 19 69 74 82 110 4 13 256 -31 422 -73 408 -104 661 -250 714 -411 12 -36 4 -208 -19 -439 -9 -90 -2 -120 28 -120 9 0 53 18 97 40 120 60 233 75 348 45 80 -21 125 -46 188 -103 108 -99 168 -237 176 -403 9 -172 -26 -315 -127 -524 -84 -173 -158 -282 -293 -435 -158 -177 -446 -379 -628 -440 -66 -23 -180 -31 -231 -17 -18 5 -31 2 -41 -7 -8 -8 -38 -75 -67 -148 -63 -157 -102 -222 -161 -270 -63 -51 -113 -74 -225 -102 -255 -64 -497 -96 -789 -103 -323 -8 -605 19 -905 87 -157 35 -227 62 -289 108 -91 69 -110 102 -206 346 -251 642 -387 1200 -490 2011 -46 364 -52 450 -32 497 86 204 527 384 1154 472 46 7 43 11 69 -99 19 -82 68 -125 144 -125 96 0 147 66 135 176 -3 35 -4 68 0 74 4 7 116 9 336 8 l330 -3 19 -55z"></path><path d="M2408 3520 c-98 -52 -154 -213 -105 -306 84 -161 306 -163 390 -4 25 49 28 63 25 127 -3 61 -8 78 -35 115 -43 60 -100 88 -177 88 -40 -1 -73 -7 -98 -20z m172 -89 c33 -24 50 -58 50 -104 0 -44 -12 -70 -48 -109 -48 -51 -128 -45 -178 15 -23 27 -26 38 -22 89 3 44 10 64 29 84 50 54 114 64 169 25z"></path><path d="M1705 3436 c-43 -18 -93 -79 -101 -121 -23 -125 56 -227 176 -227 81 0 149 53 171 134 21 80 -36 188 -114 217 -38 15 -95 13 -132 -3z m123 -91 c57 -48 48 -138 -17 -164 -52 -22 -104 7 -120 66 -13 44 3 89 38 108 38 21 66 18 99 -10z"></path><path d="M4165 2527 c-139 -46 -255 -166 -288 -299 -9 -34 -26 -117 -37 -183 -44 -255 -133 -574 -241 -863 -21 -57 -22 -63 -7 -79 22 -21 105 -28 167 -13 153 37 465 294 601 495 152 225 237 493 209 663 -19 120 -88 225 -177 268 -47 23 -171 29 -227 11z m211 -109 c122 -82 144 -255 62 -488 -93 -267 -275 -494 -534 -666 -102 -68 -197 -114 -210 -101 -3 3 17 71 45 152 85 245 180 627 206 825 13 100 71 196 151 253 61 43 98 55 170 56 54 1 68 -3 110 -31z"></path><path d="M1065 2012 c-87 -41 -145 -143 -131 -234 20 -129 153 -221 274 -189 97 27 161 103 169 202 4 57 2 70 -24 119 -39 74 -101 113 -187 117 -44 3 -72 -2 -101 -15z"></path><path d="M2655 1920 c-83 -26 -145 -117 -145 -214 0 -230 305 -307 415 -105 24 44 27 59 23 118 -7 122 -85 203 -202 208 -33 1 -74 -2 -91 -7z"></path><path d="M1468 1260 c-25 -26 -29 -36 -24 -63 14 -68 9 -67 428 -114 468 -52 489 -52 517 -17 33 43 24 101 -19 124 -17 9 -793 100 -852 100 -11 0 -33 -14 -50 -30z"></path></g></svg>
              </div>
              <div id="itemBodyTrue" data-type="favorite" class="div_51SCKbV" style="display:none;"></div>
          </div>
      </div>
    `)
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  useThis.functions.dataHeaderTrue = () => {
    fetch(useApp.url.sticker("/api.php?route=category"))
      .then((res) => res.json())
      .then((data) => {
        $elements.itemHeaderTrue.innerHTML = data
          .map((name, index) => {
            return `
                    <button data-collection="favorite" class="button_zqe7IA5 pointer" data-index="${index}" data-id="${
              name.id
            }">
                        <img src="${useApp.url.sticker(
                          `/get.php?id=${name.id_stiker}`
                        )}">
                    </button>
                `;
          })
          .join("");
      });
  };

  useThis.functions.dataBodyTrue = () => {
    const encodeQueryString = encodeQueryObject({
      route: "category",
      id: $elements.itemHeaderTrue.getAttribute("data-id"),
    });

    fetch(useApp.url.sticker(`/api.php?${encodeQueryString}`))
      .then((res) => res.json())
      .then((data) => {
        useThis.reactivity.dataBodyNull.value = true;
        useThis.values.dataBody = useThis.values.dataBody.concat(data);
        useThis.reactivity.dataBodyNull.value = false;

        const fragment = document.createDocumentFragment();
        fragment.append(
          ...data.map((data) => {
            const src = useApp.url.sticker(`/get.php?id=${data}`);
            const element = createNodeElement(`
              <div class="div_Dkuyep3" data-stiker="${data}" data-src="${src}">
                  <img data-src="${src}">
              </div>
            `);

            IntersectionObserverImage.load(element.querySelector("img"), true);

            return element;
          })
        );

        $elements.itemBodyTrue.append(fragment);
      });
  };

  $elements.itemHeaderTrue.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      $elements.itemHeaderTrue.setAttribute(
        "data-id",
        button.getAttribute("data-id")
      );
      $elements.itemBodyTrue.innerHTML = "";

      useThis.values.dataBody = [];
      useThis.reactivity.dataBodyNull.value = true;

      useThis.functions.dataBodyTrue();
    }
  });

  $elements.itemBodyTrue.addEventListener("click", (e) => {
    const stiker = e.target.closest("[data-stiker]");

    if (stiker) {
      $element.dispatchEvent(
        new CustomEvent("_click", {
          detail: {
            from: "default",
            src: stiker.getAttribute("data-src"),
            id: stiker.getAttribute("data-stiker"),
          },
        })
      );
    }
  });

  useThis.reactivity.dataBodyNull.observe((value) => {
    const render = {
      itemBodyNull: value,
      itemBodyFalse: !value && !Object.keys(useThis.values.dataBody).length,
      itemBodyTrue: !value && !!Object.keys(useThis.values.dataBody).length,
    };

    Object.entries(render).forEach((keyvalue) => {
      $elements[keyvalue[0]].style.display = keyvalue[1] ? "" : "none";
    });
  });

  useThis.functions.dataHeaderTrue();

  return $element;
};

var elementEmoji = () => {
  const useThis = {
    reactivity: {
      dataHeaderNull: defineVal(true),
      dataHeaderTrue: defineVal([]),
      dataBodyNull: defineVal(false),
      dataBodyTrue: defineVal([]),
    },
    values: {
      dataBody: [],
    },
    functions: {},
  };

  const $element = createNodeElement(`
        <div id="emoji" class="div_sfCXF2A">
            <header id="itemHeaderTrue" class="div_tzHi5ub scroll-y" data-index="0"></header>
            <div class="div_SQO7xs9 scroll-y">
                <div id="itemBodyTrue" class="div_R8fT9mw"></div>
            </div>
        </div>
    `);
  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  useThis.functions.dataHeaderTrue = () => {
    fetch("./json/Emoji.json")
      .then((res) => res.json())
      .then((data) => {
        $elements.itemHeaderTrue.innerHTML = data
          .map((data, index) => {
            return `<button data-index="${index}">${data[0]}</button>`;
          })
          .join("");
      });
  };

  useThis.functions.dataBodyTrue = () => {
    fetch("./json/Emoji.json")
      .then((res) => res.json())
      .then((data) => {
        $elements.itemBodyTrue.innerHTML = data[
          $elements.itemHeaderTrue.getAttribute("data-index")
        ]
          .map((data) => {
            return `<button>${data}</button>`;
          })
          .join("");
      });
  };

  $elements.itemHeaderTrue.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      $elements.itemHeaderTrue.setAttribute(
        "data-index",
        button.getAttribute("data-index")
      );

      $elements.itemBodyTrue.innerHTML = "";

      useThis.functions.dataBodyTrue();
      //   $elements.body.innerHTML = "";

      //   bodyLoad.value = true;
      //   getBody();
    }
  });

  $elements.itemBodyTrue.addEventListener("click", (e) => {
    const button = e.target.closest("button");
    if (button) {
      $element.dispatchEvent(
        new CustomEvent("_click", {
          detail: {
            from: "emojiDefault",
            message: button.innerHTML,
          },
        })
      );
    }
  });

  useThis.functions.dataHeaderTrue();
  useThis.functions.dataBodyTrue();
  return $element;
};

var stikerFlaticon = () => {
  const useThis = {
    values: {
      newCustomEventClick: new CustomEvent("click"),
      page: 1,
    },
  };

  const $element = createNodeElement(`
      <div class="div_7u7uDuK22AARFa7 pointer-on">
          <div class="div_N3JhFUGIZtAwheX">
              <form id="form" class="form_irez1prGJikGF4s" autocomplete="off">
                  <input type="text" class="input_ATx4jEMmtmjmlB" name="search" value="" placeholder="Buscar...">
                  <button type="submit" class="button_fJu8SFcQUqbC9y"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-search"><path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z"></path></svg></button>
              </form>
          </div>

          <div class="div_vJx5mgySExHM5pC">
              <div id="itemNull" class="div_KcvbkweIXKOg7Lt" style="display: none;">
                  <div class="loader-i" style="--color: #fff;"></div>
              </div>
              <div id="itemFalse" class="div_KcvbkweIXKOg7Lt">
                  <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="512.000000pt" height="512.000000pt" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" stroke="none"><path d="M2768 4990 c-70 -12 -166 -46 -225 -80 -62 -35 -159 -124 -198 -179 -90 -131 -6 -302 147 -301 65 1 117 29 166 92 52 67 101 103 165 119 41 10 58 9 114 -6 122 -33 187 -132 162 -244 -14 -62 -31 -91 -82 -138 -53 -49 -78 -63 -200 -109 -182 -69 -235 -116 -274 -243 l-17 -54 -90 7 c-49 3 -190 6 -313 6 l-224 0 44 58 c78 101 107 179 107 289 0 203 -136 369 -342 418 -118 28 -241 11 -367 -51 -161 -79 -280 -262 -281 -429 0 -67 26 -114 80 -142 53 -28 82 -29 136 -3 55 27 72 55 88 143 21 118 54 163 140 187 62 17 112 6 152 -34 67 -67 67 -171 1 -267 -49 -72 -102 -151 -119 -179 -14 -23 -26 -27 -119 -39 -337 -41 -709 -150 -917 -268 -96 -54 -201 -146 -237 -207 -47 -80 -49 -115 -25 -338 85 -803 236 -1502 448 -2085 74 -202 166 -416 201 -467 67 -97 188 -170 347 -210 585 -147 1203 -150 1798 -10 136 32 218 69 285 130 73 66 108 121 167 264 l51 125 104 6 c128 7 171 22 328 111 386 220 659 523 827 917 74 171 97 273 97 431 2 213 -47 348 -175 485 -156 167 -386 217 -601 130 l-60 -24 7 62 c3 34 9 135 12 224 l7 162 -28 58 c-89 183 -399 347 -845 447 -64 14 -150 31 -193 38 -42 6 -74 15 -70 18 5 4 51 21 103 39 172 59 248 101 326 183 167 177 202 410 93 625 -117 231 -429 379 -701 333z m248 -100 c120 -31 192 -69 273 -145 102 -97 144 -183 149 -311 4 -74 0 -107 -17 -162 -22 -74 -83 -166 -142 -216 -44 -38 -152 -88 -286 -132 -160 -53 -185 -70 -219 -149 -44 -106 -98 -132 -155 -76 -35 36 -36 46 -3 143 45 135 77 164 257 228 211 76 317 199 317 368 0 167 -139 294 -322 294 -101 0 -169 -35 -261 -133 -66 -71 -77 -79 -111 -79 -48 0 -82 23 -96 65 -15 46 4 89 73 158 144 144 343 198 543 147z m-1244 -378 c77 -38 130 -92 166 -171 21 -45 26 -71 26 -136 0 -104 -23 -154 -138 -300 -47 -60 -89 -123 -92 -140 -3 -16 -1 -50 5 -74 12 -54 0 -88 -33 -97 -54 -13 -81 29 -93 147 -6 64 5 91 72 179 23 30 55 80 71 110 25 48 29 66 29 140 0 69 -5 93 -22 127 -57 106 -175 148 -302 106 -102 -33 -162 -114 -180 -244 -9 -68 -26 -89 -73 -89 -15 0 -37 9 -49 21 -18 18 -20 28 -14 77 17 139 103 265 225 327 79 41 142 55 240 52 85 -2 103 -6 162 -35z m738 -802 c40 -119 162 -164 261 -97 28 19 69 74 82 110 4 13 256 -31 422 -73 408 -104 661 -250 714 -411 12 -36 4 -208 -19 -439 -9 -90 -2 -120 28 -120 9 0 53 18 97 40 120 60 233 75 348 45 80 -21 125 -46 188 -103 108 -99 168 -237 176 -403 9 -172 -26 -315 -127 -524 -84 -173 -158 -282 -293 -435 -158 -177 -446 -379 -628 -440 -66 -23 -180 -31 -231 -17 -18 5 -31 2 -41 -7 -8 -8 -38 -75 -67 -148 -63 -157 -102 -222 -161 -270 -63 -51 -113 -74 -225 -102 -255 -64 -497 -96 -789 -103 -323 -8 -605 19 -905 87 -157 35 -227 62 -289 108 -91 69 -110 102 -206 346 -251 642 -387 1200 -490 2011 -46 364 -52 450 -32 497 86 204 527 384 1154 472 46 7 43 11 69 -99 19 -82 68 -125 144 -125 96 0 147 66 135 176 -3 35 -4 68 0 74 4 7 116 9 336 8 l330 -3 19 -55z"></path><path d="M2408 3520 c-98 -52 -154 -213 -105 -306 84 -161 306 -163 390 -4 25 49 28 63 25 127 -3 61 -8 78 -35 115 -43 60 -100 88 -177 88 -40 -1 -73 -7 -98 -20z m172 -89 c33 -24 50 -58 50 -104 0 -44 -12 -70 -48 -109 -48 -51 -128 -45 -178 15 -23 27 -26 38 -22 89 3 44 10 64 29 84 50 54 114 64 169 25z"></path><path d="M1705 3436 c-43 -18 -93 -79 -101 -121 -23 -125 56 -227 176 -227 81 0 149 53 171 134 21 80 -36 188 -114 217 -38 15 -95 13 -132 -3z m123 -91 c57 -48 48 -138 -17 -164 -52 -22 -104 7 -120 66 -13 44 3 89 38 108 38 21 66 18 99 -10z"></path><path d="M4165 2527 c-139 -46 -255 -166 -288 -299 -9 -34 -26 -117 -37 -183 -44 -255 -133 -574 -241 -863 -21 -57 -22 -63 -7 -79 22 -21 105 -28 167 -13 153 37 465 294 601 495 152 225 237 493 209 663 -19 120 -88 225 -177 268 -47 23 -171 29 -227 11z m211 -109 c122 -82 144 -255 62 -488 -93 -267 -275 -494 -534 -666 -102 -68 -197 -114 -210 -101 -3 3 17 71 45 152 85 245 180 627 206 825 13 100 71 196 151 253 61 43 98 55 170 56 54 1 68 -3 110 -31z"></path><path d="M1065 2012 c-87 -41 -145 -143 -131 -234 20 -129 153 -221 274 -189 97 27 161 103 169 202 4 57 2 70 -24 119 -39 74 -101 113 -187 117 -44 3 -72 -2 -101 -15z"></path><path d="M2655 1920 c-83 -26 -145 -117 -145 -214 0 -230 305 -307 415 -105 24 44 27 59 23 118 -7 122 -85 203 -202 208 -33 1 -74 -2 -91 -7z"></path><path d="M1468 1260 c-25 -26 -29 -36 -24 -63 14 -68 9 -67 428 -114 468 -52 489 -52 517 -17 33 43 24 101 -19 124 -17 9 -793 100 -852 100 -11 0 -33 -14 -50 -30z"></path></g></svg>
              </div>
              <div id="itemTrue" class="div_1BzX6vAr5OLx5h4" style="display:none;">
                  <div class="div_QtKdIvTuPzQKASa">
                      <button id="itemTrueNull" class="button_WWXyxcvLFe93Rfi">Cargar mas</button>
                  </div>
              </div>
          </div>
      </div>  
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    useThis.values.page = 1;
    $elements.itemTrue.innerHTML = "";

    $elements.itemNull.style.display = "";
    $elements.itemFalse.style.display = "none";
    $elements.itemTrue.style.display = "none";
    $elements.itemTrueNull.dispatchEvent(useThis.values.newCustomEventClick);
  });

  $elements.itemTrue.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (img) {
      $element.dispatchEvent(
        new CustomEvent("_click", { detail: { src: img.getAttribute("src") } })
      );
    }
  });

  $elements.itemTrueNull.addEventListener("click", () => {
    $elements.itemTrueNull.parentElement.remove();
    fetch(
      `https://www.flaticon.es/resultados/${useThis.values
        .page++}?word=${encodeURIComponent(
        $elements.form.search.value.trim() || "hola"
      )}&type=sticker`
    )
      .then((res) => res.text())
      .then((text) => {
        const $text = document.createElement("div");
        $text.innerHTML = text;

        const elementData = Array.from(
          $text.querySelectorAll("ul.icons.big li")
        )
          .map((li) => {
            return li.querySelector("img");
          })
          .filter((img) => img);

        const fragment = document.createDocumentFragment();
        fragment.append(
          ...elementData.map((img) => {
            const element = createNodeElement(`
                <div class="div_XSTcT5R1moHtQqs">
                    <img data-src="${img.getAttribute("src")}">
                </div>
            `);
            IntersectionObserverImage.load(element.querySelector("img"), true);
            return element;
          })
        );

        $elements.itemNull.style.display = "none";
        $elements.itemFalse.style.display = "none";
        $elements.itemTrue.style.display = "";

        $elements.itemTrue.append(fragment);
        $elements.itemTrueNull.parentElement.remove();

        if (elementData.length >= 96) {
          $elements.itemTrue.append($elements.itemTrueNull.parentElement);
        }

        if (
          elementData.length == 0 &&
          $elements.itemTrue.children.length == 0
        ) {
          $elements.itemFalse.style.display = "";
        }
      });
  });

  return $element;
};

var videoReaction = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    elements: {
      emoji: elementEmoji(),
      stiker: videoChatFormStiker(),
      stikerFlaticon: stikerFlaticon(),
    },
    functions: {},
  };

  const socket = useApp.socket.server;

  const $element = createNodeElement(`
        <div class="div_k18zG4h">
            <div id="closeThis" style="position:inherit; inset:inherit"></div>
            <div class="div_afk9ASo">
                <div class="div_GG49gGd">
                  <select id="selectMode">
                    <option value="1">Emoji</option>
                    <option value="2">Sticker</option>
                    <option value="3">Sticker II</option>
                  </select>
                </div>
                <div id="divContent" class="div_p274j6r"></div>
                <form id="form" class="form_aun2HjT" autocomplete="off">
                    <input type="text" name="text" placeholder="text">
                    <div class="div_iZh9L4r">
                        <button type="submit" class="button_FOo3Ort pointer" style="display:none">${useApp.icon.get(
                          "fi fi-rr-paper-plane-top"
                        )}</button>
                    </div>
                </div>
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      type: "text",
      message: $elements.form.text.value.trim(),
    };

    if (data.message == "") return;

    $elements.form.text.value = "";
    useThis.functions.eventCustomElement(data);
  });

  $elements.closeThis.addEventListener("click", () => {
    $element.style.display = "none";
  });

  useThis.functions.eventCustomElement = (detail) => {
    detail = {
      ...detail,
      style: {
        left: rand(1),
        position: rand(75),
        text: rand(30, 60),
        image: rand(50, 100),
      },
    };

    dispatchEvent(
      new CustomEvent("_reaction", {
        detail: { ...detail, socket: true },
      })
    );

    const emit = {
      header: {
        id: useThis.params.id,
        from: "emoji",
        datetime: Date.now(),
        message: "",
      },
      body: {
        user: useApp.user.data,
        socket: {
          id: socket.id,
        },
        emoji: detail,
      },
    };

    socket.emit("reaction", emit);
  };

  $elements.form.text.addEventListener("input", () => {
    $elements.form
      .querySelector("button[type=submit]")
      .setAttribute(
        "style",
        $elements.form.text.value.trim() == "" ? "display:none" : ""
      );
  });

  $elements.selectMode.addEventListener("change", (e) => {
    const value = e.target.value;

    $elements.divContent.innerHTML = "";

    if (value == 1) {
      $elements.divContent.append(useThis.elements.emoji);
    } else if (value == 2) {
      $elements.divContent.append(useThis.elements.stiker);
    } else if (value == 3) {
      $elements.divContent.append(useThis.elements.stikerFlaticon);
    }
  });

  useThis.elements.emoji.addEventListener("_click", (e) => {
    console.log(e.detail);
    const data = {
      type: "emoji",
      message: e.detail.message,
    };

    console.log(data);

    useThis.functions.eventCustomElement(data);
  });

  useThis.elements.stiker.addEventListener("_click", (e) => {
    console.log(e.detail);
    const data = {
      type: "stiker",
      message: `<img src="${e.detail.src}">`,
    };

    useThis.functions.eventCustomElement(data);
  });

  useThis.elements.stikerFlaticon.addEventListener("_click", (e) => {
    console.log(e.detail);
    const data = {
      type: "stiker",
      message: `<img src="${e.detail.src}">`,
    };

    useThis.functions.eventCustomElement(data);
  });

  $elements.selectMode.dispatchEvent(new CustomEvent("change"));
  return $element;
};

var videoUser = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    functions: {},
  };

  const $element = createNodeElement(`
        <div class="div_ytEL4fz">
            <div id="closeThis" class="div_FG8f1fQ"></div>
            <div class="div_QJvvbe6">
                <div class="div_7u66WUf">
                    <button id="close" class="button_0530xdO"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-angle-left"><path d="M17.17,24a1,1,0,0,1-.71-.29L8.29,15.54a5,5,0,0,1,0-7.08L16.46.29a1,1,0,1,1,1.42,1.42L9.71,9.88a3,3,0,0,0,0,4.24l8.17,8.17a1,1,0,0,1,0,1.42A1,1,0,0,1,17.17,24Z"></path></svg></button>
                    <h3>Tiempo</h3>
                </div>
                <div class="div_9MhXKH2">
                    <div id="itemTrue" class="div_0Yb8zCJ"></div>
                </div>
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const abortController = new AbortController();
  const signal = abortController.signal;

  useApp.reactivity.users.observe((Data) => {
    $elements.itemTrue.innerHTML = Data.map((data) => {
      return `
                <div class="div_Web3Ek" data-id="id-${null}" data-current-time="${
        data.video.currentTime
      }">
                    <div class="div_Fxol8YY">
                        <span>${data.user.fullname[0].toUpperCase()}</span>
                        <img src="https://img.vniox.com/get.php?id=${
                          data.user.file_avatar
                        }&index=3" style="display:none">
                    </div>
                    <div class="div_m95RzaN">
                        <span>${data.user.fullname}</span>
                        <p>-</p>
                    </div>
                </div>
            `;
    }).join("");

    Array.from($elements.itemTrue.querySelectorAll("img")).forEach((img) => {
      img.onload = () => {
        img.style.display = "";
      };
    });
  });

  useThis.functions.getDurationTimeText = (seconds) => {
    const Time = [];

    const time = {
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };

    if (!!time.hours) Time.push(time.hours);
    Time.push(time.minutes);
    Time.push(time.seconds);

    return Time.map((n) => `0${n}`.slice(-2)).join(":");
  };

  $elements.closeThis.addEventListener("click", () => {
    $element.style.display = "none";
  });

  $elements.close.addEventListener("click", () => {
    $element.remove();
  });

  $element.addEventListener("_timeupdate", (e) => {
    Array.from($elements.itemTrue.children).forEach((element) => {
      const currentTime = parseInt(element.getAttribute("data-current-time"));

      // element.querySelector('p').textContent = useThis.functions.getDurationTimeText(parseInt(e.detail.duration) - currentTime)
      // element.setAttribute('data-current-time', currentTime + 1)

      if (currentTime == -1) {
        element.querySelector("p").textContent =
          useThis.functions.getDurationTimeText(
            parseInt(e.detail.duration) - parseInt(e.detail.currentTime)
          );
      } else {
        element.querySelector("p").textContent =
          useThis.functions.getDurationTimeText(
            parseInt(e.detail.duration) - currentTime
          );
        element.setAttribute("data-current-time", currentTime + 1);
      }
    });
  });

  $element.addEventListener("_seeking", () => {
    Array.from($elements.itemTrue.children).forEach((element) => {
      element.setAttribute("data-current-time", -1);
    });
  });

  $elements.itemTrue.addEventListener("click", (e) => {
    const item = e.target.closest("[data-id]");

    if (item) {
      const currentTime = parseInt(item.getAttribute("data-current-time"));
      if (currentTime != -1) {
        $element.dispatchEvent(
          new CustomEvent("_click", {
            detail: {
              currentTime,
            },
          })
        );
      }
    }
  });

  addEventListener(
    "socketIO",
    (e) => {
      const from = e.detail.from;
      const data = e.detail.data;

      if (!data) return;

      if (data.header.id == useThis.params.id) {
        if (from == "video_time_set") {
          useApp.reactivity.users.value = [
            ...useApp.reactivity.users.value,
            data.body,
          ];
        }
      }
    },
    { signal }
  );

  addEventListener(
    "_hashchange",
    () => {
      abortController.abort();
      //observer.disconnect();
    },
    { once: true }
  );

  return $element;
};

var videoPlayer = (parameters = {}) => {
  console.log(parameters);

  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    functions: {
      exeCallback: (callback, ...params) => {
        try {
          return callback(...params);
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    },
    values: {
      videoAction: {
        loadedmetadata: false,
        play: false,
        seeking: true,
        timeupdate: true,
      },
      videoEvents: {
        seeking: null,
        play: null,
        pause: null,
      },
    },
  };

  const socket = useApp.socket.server;

  const $element = replaceNodeChildren(
    createNodeElement(`
        <div class="div_yBLaloBmujDGJW">
            <div class="div_Gj3xZ">
                <video id="video" class="video_01Mr1 mode-1" name="media" data-mode="0" data-action="off" preload="auto" src="" data-data="null"></video>
                <img id="imgDraw" src="" class="img_EoiPBLr">
            </div>
            <div class="div_Mbdqf">
                <label class="div_WadKKlN"><input id="controlTap" type="checkbox" checked></label>
                <div id="controlLoad" class="div_ANxxwLdwYw"><div class="loader-i" style="--color:#ffffff"></div></div>
                <div class="div_bv4AHcNmXj">
                    <div id="itemMessage" class="div_apUpJcE"></div>
                </div>
                <div id="controlView" class="div_RUHMR9U" style="display:flex">
                    <div class="div_6u0fO" style="background:none">
                        <div class="div_nQLWoUY5mw">
                            <span id="title"></span>
                            <p id="description"></p>
                        </div>
                        <div class="div_SZc9KK6">
                            
                            
                            <button id="buttonHistory" class="button_kE4rD9m" data-hide>${useApp.icon.get(
                              "fi fi-rr-time-fast"
                            )}</button>
                            <button id="buttonReaction" class="button_kE4rD9m" data-hide>${useApp.icon.get(
                              "fi fi-rr-smile"
                            )}</button>
                            
                            
                        </div>
                    </div>
                    <div class="div_ETUVd9w">
                        <button id="buttonBackward" class="button_4P1Dopv" data-value="-5" data-hide>${useApp.icon.get(
                          "fi fi-rr-time-past"
                        )}</button>
                        <button id="buttonPlay" class="button_4P1Dopv middle" data-hide style="visibility:hidden"></button>
                        <button id="buttonForward" class="button_4P1Dopv" data-value="+5" data-hide>${useApp.icon.get(
                          "fi fi-rr-time-forward"
                        )}</button>
                    </div>
                    <div class="div_XjdZ8"  >
                        
                        <div class="div_vUFIyp0" style="justify-content: space-between;">
                          <div class="div_2gFcfPT"><span id="durationText">99:99:99</span><p id="messageText" class="text-ellipsis"></p></div>
                          <div class="div_vUFIyp0" style="width: auto;">
                            <label id="buttonToggleVolumen" class="label_6PPWDkv p-relative" style="background:none;">
                              <input id="inputToggleVolumen" type="checkbox" checked>
                              <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-volume-slash"><path d="m15.004,20.004v2.812c0,.297-.132.579-.36.769-.181.151-.407.231-.64.231-.061,0-.121-.005-.181-.017-2.999-.551-5.752-2.299-7.554-4.794h-1.27C2.242,19.004-.002,16.761-.002,14.002v-4.001C-.002,8.885.359,7.828,1.043,6.944c.34-.437.966-.516,1.403-.179.437.338.517.966.179,1.403-.41.529-.627,1.163-.627,1.832v4.001c0,1.655,1.347,3.002,3.002,3.002h1.78c.321,0,.622.154.811.414l.3.415c1.263,1.749,3.083,3.057,5.113,3.703v-1.532c0-.552.447-1,1-1s1,.448,1,1Zm8.703,3.703c-.195.195-.451.293-.707.293s-.512-.098-.707-.293L.293,1.707C-.098,1.316-.098.684.293.293S1.316-.098,1.707.293l4.623,4.623C8.131,2.468,10.855.753,13.822.205c.293-.053.594.025.821.215.229.19.36.472.36.769v12.402l1.686,1.686c.846-.887,1.31-2.046,1.31-3.276,0-1.269-.494-2.461-1.392-3.359-.391-.39-.391-1.023,0-1.414s1.023-.391,1.414,0c1.275,1.275,1.978,2.97,1.978,4.773,0,1.764-.673,3.425-1.896,4.69l1.415,1.415c3.33-3.418,3.304-8.908-.081-12.292-.391-.391-.391-1.023,0-1.414.391-.391,1.023-.391,1.414,0,4.164,4.164,4.191,10.922.081,15.12l2.774,2.774c.391.391.391,1.023,0,1.414ZM7.762,6.348l5.242,5.242V2.468c-2.032.647-3.854,1.955-5.114,3.702l-.128.178Z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-volume"><path d="M20.807,4.29a1,1,0,0,0-1.415,1.415,8.913,8.913,0,0,1,0,12.59,1,1,0,0,0,1.415,1.415A10.916,10.916,0,0,0,20.807,4.29Z"></path><path d="M18.1,7.291A1,1,0,0,0,16.68,8.706a4.662,4.662,0,0,1,0,6.588A1,1,0,0,0,18.1,16.709,6.666,6.666,0,0,0,18.1,7.291Z"></path><path d="M13.82.2A12.054,12.054,0,0,0,6.266,5H5a5.008,5.008,0,0,0-5,5v4a5.008,5.008,0,0,0,5,5H6.266A12.059,12.059,0,0,0,13.82,23.8a.917.917,0,0,0,.181.017,1,1,0,0,0,1-1V1.186A1,1,0,0,0,13.82.2ZM13,21.535a10.083,10.083,0,0,1-5.371-4.08A1,1,0,0,0,6.792,17H5a3,3,0,0,1-3-3V10A3,3,0,0,1,5,7h1.8a1,1,0,0,0,.837-.453A10.079,10.079,0,0,1,13,2.465Z"></path></svg>
                              </span>
                            </label>
                            <button id="buttonChangeScreen" class="button_kE4rD9m aspect-ratio" data-hide data-index="0">${useApp.icon.get(
                              "fi fi-rr-tool-crop"
                            )}</button>
                          <button id="buttonFullscreen" class="button_kE4rD9m" data-hide>${useApp.icon.get(
                            "fi fi-rr-expand"
                          )}</button>
                          </div>
                        </div>
                        <div id="duration" class="div_3hBg2" data-hide>
                            <div id="durationBar" class="div_Ve01l"><span></span></div>
                            <input type="range" id="durationInput" class="input_908X1" data-value="0" value="50" min="0" max="0">
                        </div>
                        
                    </div>
                    <div id="divButtonFullscreen" class="div_G8uFm9L" style="display:none">
                    
                      <div class="div_ThWcoM2 pointer-on">
                        <button id="buttonOpenChat" class="button_hdZNr" data-hide="ignore">${useApp.icon.get(
                          "fi fi-rr-messages"
                        )}</button>
                        <button id="buttonOpenDraw" class="button_hdZNr" data-hide="ignore"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-drawer-alt"><path d="m23.005,19l-.375-.002h-.011c-.998,0-1.994-.121-2.961-.36l-.901-.224c-1.125-.278-2.284-.419-3.443-.419h-.013l-4.66.005h-.003c-.8,0-1.494-.535-1.614-1.245-.07-.415.024-.826.267-1.158.23-.316.565-.526.947-.597h5.763c.552,0,1-.447,1-1s-.448-1-1-1h-1.002l4.932-5.487,2.747,1.211c.623.275,1.323-.181,1.323-.862,0-.368-.214-.703-.549-.856l-2.18-1.002c1.009-1.2.962-2.991-.166-4.12-1.192-1.192-3.131-1.192-4.368.047l-1.591,1.812-7.189,2.8c-1.61.627-3.03,1.661-4.122,3L.513,13.618c-.75.937-.669,2.289.186,3.131.005.005.011.004.016.008.183.201.44.332.734.332.552,0,1-.448,1-1,0-.307-.147-.572-.365-.756.006-.003.019-.009.018-.01-.125-.123-.137-.32-.039-.443l3.695-4.532c.638-.782,1.462-1.391,2.398-1.77l4.259-1.726L3.242,17.299c-.801.913-1.242,2.085-1.242,3.299v1.402c0,.553.448,1,1,1h1.054c1.474,0,2.865-.646,3.816-1.77l1.305-1.542c.452.194.944.311,1.461.311h.006l4.66-.005c1.012,0,2.002.12,2.973.36l.901.224c1.125.278,2.283.419,3.436.419h.013l.369.002h.005c.55,0,.997-.444,1-.995.003-.552-.442-1.002-.995-1.005Zm-4.81-15.702c.412-.412,1.083-.412,1.495,0s.412,1.083-.037,1.534l-7.345,8.168s-2.246.003-2.293.01c-.152.022-.296.068-.442.109L18.195,3.298ZM6.344,19.938c-.57.675-1.405,1.062-2.29,1.062h-.054v-.402c0-.729.265-1.432.746-1.979l2.306-2.626c-.051.36-.063.727,0,1.097.083.494.289.944.568,1.343l-1.275,1.507Z"></path></svg></button>
                        
                        <button id="buttonFormLink" class="button_kE4rD9m" style="display:none" data-hide="ignore">${useApp.icon.get(
                          "fi fi-rr-plus"
                        )}</button>
                          <label class="button_kE4rD9m">

                            <input id="buttonLock" type="checkbox" style="display:none">
                            <span>${useApp.icon.get("fi fi-rr-lock")}</span>

                          </label>
                      </div>    

                    </div>
                </div>
            </div>
            
            <div id="elementVS" style="display:none"></div>
            <div id="reactionAppend" class="div_ETEQpP9"></div>
            <div data-node-children="videoDraw" id="videoDraw" style="display:none"></div>
            <div data-node-children="videoReaction" id="videoReaction" style="display:none"></div>
            <div data-node-children="videoUser" id="videoUser" style="display:none"></div>
        </div>
    `),
    {
      videoDraw: videoDraw(),
      videoReaction: videoReaction(),
      videoUser: videoUser(),
    },
    true
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const buttonPlay = useApp.icon.get("fi fi-rr-play");
  const buttonPause = useApp.icon.get("fi fi-rr-pause");

  const abortController = new AbortController();
  const signal = abortController.signal;

  useThis.functions.getDurationTimeText = (seconds) => {
    const Time = [];

    const time = {
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };

    if (!!time.hours) Time.push(time.hours);
    Time.push(time.minutes);
    Time.push(time.seconds);

    return Time.map((n) => `0${n}`.slice(-2)).join(":");
  };

  useThis.functions.loadedmetadataHls = (url, $video) => {
    var videoSrc = url;
    if (window.Hls.isSupported()) {
      var hls = new window.Hls();

      hls.loadSource(videoSrc);
      hls.attachMedia($video);
      hls.on(window.Hls.Events.MANIFEST_PARSED, function () {
        $video.play();
      });
    } else if ($video.canPlayType("application/vnd.apple.mpegurl")) {
      $video.src = videoSrc;
      $video.addEventListener("loadedmetadata", function () {
        $video.play();
      });
    }
  };

  useThis.functions.server = (data) => {
    return new Promise((resolve, reject) => {
      if (!data) resolve({ status: false, url: null });

      if (["streamwish"].includes(data.server)) {
        console.log(data);
        MediaWebUrl.streamwish({ url: data.url }).then((result) => {
          console.log(result);
          resolve(result);
        });
      } else if (["doodstream"].includes(data.server)) {
        // MediaWebUrl.doodstream({ url: data.url }).then(resolve);

        fetch(
          dataApp.url.rr(
            `/request.php?${encodeQueryObject({
              from: "doodstream",
              url: data.url,
            })}`
          )
        )
          .then((res) => res.json())
          .then((res) => {
            resolve(res);
          });
      } else if (["voe"].includes(data.server)) {
        MediaWebUrl.voesx({ url: data.url }).then(resolve);
      } else if (["yourupload"].includes(data.server)) {
        fetch(
          dataApp.url.rr(
            `/request.php?${encodeQueryObject({
              from: "yourupload",
              url: data.url,
            })}`
          )
        )
          .then((res) => res.json())
          .then((res) => {
            resolve(res);
          });
      } else {
        resolve({ status: true, url: data.url });
      }

      // MediaWeb.yourupload({ url: url }).then(res => {
      //   if(res.body.status) mediaPlayer.open({ url : res.body.url });
      //     else alert('Video no disponible')
      // })
    });
  };

  useThis.functions.dataLoad = (data) => {
    useThis.functions.server(data.detail.video).then((result) => {
      if (result.status) {
        $elements.title.textContent = data.detail.title;
        $elements.description.textContent = data.detail.description;

        dispatchEvent(
          new CustomEvent("customFooterPlayerVideo", {
            detail: {
              video: null,
              title: data.detail.title,
              description: data.detail.description,
            },
          })
        );

        useThis.values.videoEvents.seeking =
          useThis.functions.addEventListenerSocketSeeking(
            useThis.values.videoEvents.seeking
          );
        useThis.values.videoEvents.play =
          useThis.functions.addEventListenerSocketPlayPause(
            useThis.values.videoEvents.play
          );

        $elements.video.currentTime = data.video.currentTime;

        if (result.url.includes(".m3u8")) {
          useThis.functions.loadedmetadataHls(result.url, $elements.video);
        } else {
          $elements.video.src = result.url;
          $elements.video.src =
            "https://xdcf.nmnm.store/tunnel?id=O4vDk7FIMpiHpCbKu1A2y&exp=1731705667519&sig=RC0_bZY2pJTz1HZT_413cGQYAnXhSsj2DDypQ3bbsCE&sec=52v_ab9_zxloEFVj14u45z-C0gHre_Fs6gEV3cxDV5E&iv=v_DzWD9NHJ7D5-HSTJPw9A";
          $elements.video.play();
        }
      }
    });
  };

  useThis.functions.addEventListenerSocketSeeking = (_function) => {
    if (typeof _function == "function") _function();

    const callback = () => {
      console.log("enviar socket de seeking");

      const emit = {
        header: {
          id: useThis.params.id,
          from: "seeking",
          datetime: Date.now(),
          message: `${useApp.user.data.fullname} ha cambiando la posicion del video`,
        },
        body: {
          user: useApp.user.data,
          socket: {
            id: socket.id,
          },
          video: {
            play: $elements.video.paused ? 0 : 1,
            currentTime: parseInt($elements.video.currentTime.toFixed(0)),
          },
          mediaSession: {},
        },
      };

      socket.emit("video", emit);

      const encodeQueryString = encodeQueryObject({
        route: "/room",
        token: useApp.user.token,
        id: useThis.params.id,
      });

      const body = {
        detail: JSON.stringify({
          play: $elements.video.paused ? 0 : 1,
          currentTime: $elements.video.currentTime,
          url: parameters.data.detail.url,
        }),
        // detail_video: JSON.stringify({}),
      };

      fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
        method: "PATCH",
        headers: {
          "Token-Auth": Cookie.get(useApp.auth),
        },
        // credentials: "include",
        body: JSON.stringify(body),
      });
    };

    const add = () => $elements.video.addEventListener("seeking", callback);
    const remove = () =>
      $elements.video.removeEventListener("seeking", callback);

    $elements.video.addEventListener("seeking", add, { once: true });

    return remove;
  };

  useThis.functions.addEventListenerSocketPlayPause = (_function) => {
    if (typeof _function == "function") _function();

    let active = true;

    const callback = () => {
      console.log("enviar play/pause de video");

      const emit = {
        header: {
          id: useThis.params.id,
          from: "play",
          datetime: Date.now(),
          message: `${useApp.user.data.fullname} ha ${
            $elements.video.paused ? "pausado" : "reanudado"
          } el video`,
        },
        body: {
          user: useApp.user.data,
          socket: {
            id: socket.id,
          },
          video: {
            play: $elements.video.paused ? 0 : 1,
            currentTime: parseInt($elements.video.currentTime.toFixed(0)),
          },
          mediaSession: {},
        },
      };

      socket.emit("video", emit);
    };

    const add = () => {
      if (active) {
        active = false;
        $elements.video.addEventListener("play", callback);
        $elements.video.addEventListener("pause", callback);
      }
    };
    const remove = () => {
      // console.log("evento desactivados");
      $elements.video.removeEventListener("play", callback);
      $elements.video.removeEventListener("pause", callback);
    };

    $elements.video.addEventListener("play", add, { once: true });
    $elements.video.addEventListener("pause", add, { once: true });

    return remove;
  };

  //callback -> video events
  useThis.functions.exeCallback(() => {
    $elements.video.addEventListener("error", () => {
      if ($elements.video.getAttribute("src") != "") {
        $elements.buttonPlay.innerHTML = useApp.icon.get(
          "fi fi-rr-exclamation"
        );
      }
    });

    $elements.video.addEventListener("loadstart", () => {
      // console.log("desactivar el play y todo lo demas");
      useThis.values.videoAction.loadedmetadata = false;
      useThis.values.videoAction.play = false;
    });

    $elements.video.addEventListener("waiting", () => {
      styleElement($elements.controlLoad, { visibility: "initial" });
      styleElement($elements.buttonPlay, { visibility: "hidden" });
    });

    $elements.video.addEventListener("playing", () => {
      styleElement($elements.controlLoad, { visibility: "hidden" });
      styleElement($elements.buttonPlay, { visibility: "initial" });
    });

    $elements.video.addEventListener("loadedmetadata", () => {
      // console.log("el video cargo");
      useThis.values.videoAction.loadedmetadata = true;
      if ($elements.video.currentTime.toFixed(0) == 0)
        $elements.video.currentTime = 0;

      styleElement($elements.controlLoad, { visibility: "hidden" });
      styleElement($elements.buttonPlay, { visibility: "initial" });
      //buttonPlay
    });

    $elements.video.addEventListener("durationchange", (e) => {
      useThis.values.videoAction[e.type] = true;
      $elements.durationInput.setAttribute(
        "max",
        $elements.video.duration.toFixed(0)
      );
      $elements.durationText.textContent =
        useThis.functions.getDurationTimeText(
          parseInt($elements.durationInput.max)
        );
    });

    $elements.video.addEventListener("timeupdate", () => {
      if (!useThis.values.videoAction.timeupdate) return;

      $elements.durationInput.value = $elements.video.currentTime.toFixed(0);

      if (
        $elements.durationInput.value != $elements.durationInput.dataset.value
      ) {
        $elements.durationInput.dataset.value = $elements.durationInput.value;
        $elements.durationText.textContent =
          useThis.functions.getDurationTimeText(
            parseInt($elements.durationInput.max) -
              parseInt($elements.durationInput.value)
          );
        $elements.durationBar.setAttribute(
          "style",
          `--w:${(
            (parseInt($elements.durationInput.value) /
              parseInt($elements.durationInput.max)) *
            100
          ).toFixed(2)}%`
        );
        $elements.video.setAttribute(
          "data-time-text",
          (
            (parseInt($elements.durationInput.value) /
              parseInt($elements.durationInput.max)) *
            100
          ).toFixed(2)
        );

        if ($elements.videoUser.parentElement) {
          $elements.videoUser.dispatchEvent(
            new CustomEvent("_timeupdate", {
              detail: {
                currentTime: $elements.durationInput.value,
                duration: $elements.durationInput.max,
              },
            })
          );
        }
      }
    });

    $elements.video.addEventListener("seeking", () => {
      styleElement($elements.controlLoad, { visibility: "initial" });
      styleElement($elements.buttonPlay, { visibility: "hidden" });

      $elements.buttonPlay.classList.add("not-allow");

      useThis.values.videoAction.play = false;

      $elements.durationText.textContent =
        useThis.functions.getDurationTimeText(
          parseInt($elements.durationInput.max) -
            parseInt($elements.video.currentTime.toFixed(0))
        );
      $elements.durationBar.setAttribute(
        "style",
        `--w:${(
          (parseInt($elements.video.currentTime.toFixed(0)) /
            parseInt($elements.durationInput.max)) *
          100
        ).toFixed(2)}%`
      );
    });
    $elements.video.addEventListener("seeked", (e) => {
      $elements.buttonPlay.classList.remove("not-allow");
      $elements.buttonPlay.innerHTML = $elements.video.paused
        ? buttonPlay
        : buttonPause;
      useThis.values.videoAction.play = true;

      styleElement($elements.controlLoad, { visibility: "hidden" });
      styleElement($elements.buttonPlay, { visibility: "initial" });
    });

    $elements.video.addEventListener("playing", function () {
      $elements.buttonPlay.innerHTML = useApp.icon.get("fi fi-rr-pause");
    });

    $elements.video.addEventListener("play", function () {
      $elements.buttonPlay.innerHTML = useApp.icon.get("fi fi-rr-pause");
    });

    $elements.video.addEventListener("pause", function () {
      $elements.buttonPlay.innerHTML = useApp.icon.get("fi fi-rr-play");
    });
  });

  //callback -> video controls
  useThis.functions.exeCallback(() => {
    $elements.buttonPlay.addEventListener("click", () => {
      if (sessionStorage.getItem("click") == "false") return;
      if (!useThis.values.videoAction.play) return;

      if ($elements.video.paused) $elements.video.play();
      else $elements.video.pause();
    });

    $elements.durationInput.addEventListener("input", () => {
      // if( timeHideControl !== null ) clearTimeout( timeHideControl )

      useThis.values.videoAction.timeupdate = false;
      $elements.durationText.textContent =
        useThis.functions.getDurationTimeText(
          parseInt($elements.durationInput.max) -
            parseInt($elements.durationInput.value)
        );
      $elements.durationBar.setAttribute(
        "style",
        `--w:${(
          (parseInt($elements.durationInput.value) /
            parseInt($elements.durationInput.max)) *
          100
        ).toFixed(2)}%`
      );
    });

    $elements.durationInput.addEventListener("change", (e) => {
      useThis.values.videoAction.timeupdate = true;
      $elements.durationInput.setAttribute("data-continue", true);
      $elements.video.currentTime = parseInt($elements.durationInput.value);
    });

    Array.from([$elements.buttonForward, $elements.buttonBackward]).forEach(
      (element) => {
        let seeked = true;
        element.addEventListener("click", () => {
          if (!seeked) return;
          $elements.video.currentTime =
            parseInt($elements.video.currentTime.toFixed(0)) +
            parseInt(element.getAttribute("data-value"));

          seeked = false;
          setTimeout(() => (seeked = true), 250);
        });
      }
    );

    $elements.controlTap.addEventListener("change", () => {
      styleElement($elements.controlView, {
        display: $elements.controlTap.checked ? "" : "none",
      });
    });

    $elements.buttonReaction.addEventListener("click", () => {
      // $element.append(elements.reaction);
      $elements.videoReaction.style.display = "";
    });

    $elements.buttonHistory.addEventListener("click", () => {
      const emit = {
        header: {
          id: useThis.params.id,
          from: "video_time_get",
          datetime: Date.now(),
          message: `${useApp.user.data.fullname} ha solicitado la posicion del video`,
        },
        body: {
          user: useApp.user.data,
          socket: {
            id: socket.id,
          },
          video: {
            play: $elements.video.paused ? 0 : 1,
            currentTime: -1,
          },
          mediaSession: {},
        },
      };

      useApp.reactivity.users.value = [emit.body];

      socket.emit("video_time_get", emit);
      // $element.append($elements.videoUser);
      $elements.videoUser.style.display = "";
    });

    $elements.buttonLock.addEventListener("change", () => {
      const elementsHidden = Array.from([
        "buttonPlay",
        "buttonBackward",
        "buttonForward",
      ]);

      const elementsNone = Array.from(["buttonFullscreen"]);

      if (!$elements.buttonLock.checked) {
        $elements.buttonLock.nextElementSibling.innerHTML =
          useApp.icon.get("fi fi-rr-lock");

        elementsHidden.concat(elementsNone).forEach((element) => {
          $elements[element].setAttribute("style", "");
          $elements[element].setAttribute("data-hide", "");
        });

        $elements.durationInput.setAttribute("style", "");
      } else {
        $elements.buttonLock.nextElementSibling.innerHTML =
          useApp.icon.get("fi fi-rr-unlock");

        elementsHidden.forEach((element) => {
          $elements[element].setAttribute("style", "visibility:hidden");
          $elements[element].setAttribute("data-hide", "ignore");
        });

        elementsNone.forEach((element) => {
          $elements[element].setAttribute("style", "display:none");
          $elements[element].setAttribute("data-hide", "ignore");
        });

        $elements.durationInput.setAttribute("style", "pointer-events:none");
      }
    });

    $elements.buttonChangeScreen.addEventListener("click", () => {
      const formats = ["contain", "cover", "initial"];

      const index = parseInt(
        $elements.buttonChangeScreen.getAttribute("data-index")
      );
      const isIndex = formats[index + 1] ? index + 1 : 0;

      $elements.buttonChangeScreen.setAttribute("data-index", isIndex);
      styleElement($elements.video, { objectFit: formats[isIndex] });
    });

    $elements.buttonOpenChat.addEventListener("click", () => {
      document.fullscreenElement.classList.toggle("message");
    });

    $elements.buttonOpenDraw.addEventListener("click", () => {
      $elements.controlTap.click();

      styleElement($elements.videoDraw, {
        display: "",
      });

      dispatchEvent(new CustomEvent("resize"));
    });

    $elements.buttonFullscreen.addEventListener("click", () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else parameters.element.requestFullscreen();
    });

    $elements.inputToggleVolumen.addEventListener("change", (e) => {
      console.log(e.target.checked);
      $elements.video.muted = !e.target.checked;
    });
  });

  //callback -> other events
  useThis.functions.exeCallback(() => {
    parameters.element.addEventListener(
      "fullscreenchange",
      () => {
        if (document.fullscreenElement) {
          document.fullscreenElement.classList.add("fullscreen");
          document.fullscreenElement.classList.add("message");

          $elements.divButtonFullscreen.style.display = "";

          if (window.screen.orientation && window.screen.orientation.lock) {
            window.screen.orientation.lock("landscape");
          }
        } else {
          parameters.element.classList.remove("fullscreen");
          parameters.element.classList.remove("message");

          $elements.divButtonFullscreen.style.display = "none";

          $elements.buttonLock.checked = false;
          $elements.buttonLock.dispatchEvent(new CustomEvent("change"));

          $elements.videoDraw.style.display = "none";

          if (window.screen.orientation && window.screen.orientation.unlock) {
            window.screen.orientation.unlock();
          }
        }
      },
      { signal }
    );

    $elements.videoUser.addEventListener("_click", (e) => {
      useThis.values.videoEvents.seeking =
        useThis.functions.addEventListenerSocketSeeking(
          useThis.values.videoEvents.seeking
        );
      $elements.video.currentTime = e.detail.currentTime;
    });

    addEventListener(
      "_reaction",
      (e) => {
        const detail = e.detail;

        if (detail.socket) {
          const style = [
            `${detail.style.left ? "left" : "right"}:${detail.style.position}%`,
            "color: #ffffff",
            `--size-font:${detail.style.text}px`,
            `--size-img:${detail.style.image}px;`,
          ].join("; ");

          const element = document.createElement("span");
          element.setAttribute("style", style);
          $elements.reactionAppend.append(element);

          if (["text", "emoji"].includes(detail.type)) {
            element.textContent = detail.message;
          } else if (["stiker"].includes(detail.type)) {
            element.innerHTML = detail.message;
          }

          setTimeout(() => element.remove(), 2000);
        }
      },
      { signal }
    );

    addEventListener(
      "_video",
      (e) => {
        const detail = e.detail;

        if (detail.header.from == "loadedmetadata") {
          dispatchEvent(
            new CustomEvent("_notification", {
              detail: {
                message: "Video obtenido",
                name: "success",
                duration: 1500,
              },
            })
          );

          useThis.functions.dataLoad({
            from: "loadedmetadata",
            video: {
              url: detail.body.video.url, //parameters.data.link,
              currentTime: 0,
              play: 0,
            },
            mediaSession: {
              // title : e.detail.detail.title,
              // artist: 'Álbum',
              // poster: e.detail.detail.poster
            },
            detail: detail.body.detail,
          });

          //callback -> emit socket
          useThis.functions.exeCallback(() => {
            const emit = {
              header: {
                id: useThis.params.id,
                from: "loadedmetadata",
                datetime: Date.now(),
                message: `${useApp.user.data.fullname} cambio el video`,
              },
              body: {
                user: useApp.user.data,
                socket: {
                  id: socket.id,
                },
                video: {
                  url: detail.body.video.url,
                  play: $elements.video.paused ? 0 : 1,
                  currentTime: 0,
                },
                // server: {},
                detail_video: detail.body.detail,
                mediaSession: {},
              },
            };

            socket.emit("video", emit);
          });

          //callback -> update server data
          useThis.functions.exeCallback(() => {
            const encodeQueryString = encodeQueryObject({
              route: "/room",
              token: useApp.user.token,
              id: useThis.params.id,
            });

            const body = {
              detail: JSON.stringify({
                play: 0,
                currentTime: 0,
                url: detail.body.video.url,
              }),
              detail_video: JSON.stringify(detail.body.detail),
            };

            fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
              method: "PATCH",
              headers: {
                "Token-Auth": Cookie.get(useApp.auth),
              },
              // credentials: "include",
              body: JSON.stringify(body),
            });
          });

          //callback -> save message to the server
          useThis.functions.exeCallback(() => {
            if (e.detail.body.body_chat) {
              const uploadImageStreaming = new Promise((resolve) => {
                imageUrlToCanvas(detail.body.detail.poster).then((canvas) => {
                  canvas.toBlob((blob) => {
                    const formData = new FormData();
                    formData.append(
                      "file",
                      new File([blob], "image.webp", { type: blob.type })
                    );

                    fetch(
                      useApp.url.img.default(
                        "/set.php?folder=A1BL7-CN3SO-1IU7B-I8OX9-TH9XP-6SB3W-O3HA9-KB5NS"
                      ),
                      { method: "POST", body: formData }
                    )
                      .then((res) => res.json())
                      .then(resolve);
                  }, "image/webp");
                });
              });

              uploadImageStreaming.then((files) => {
                const datetime = Date.now();

                const encodeQueryString = encodeQueryObject({
                  route: "/room/chat",
                  token: useApp.user.token,
                });

                const body = {
                  id_room: useThis.params.id,
                  id_chat_reply: null,
                  body: JSON.stringify(e.detail.body.body_chat.body),
                  files: JSON.stringify({ image: files }),
                  datetime_add: datetime,
                  datetime_update: datetime,
                  type: 3,
                  status: 1,
                  detail: JSON.stringify({}),
                };

                fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
                  method: "POST",
                  headers: {
                    "Token-Auth": Cookie.get(useApp.auth),
                  },
                  // credentials: "include",
                  body: JSON.stringify(body),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res && res.status) {
                      dispatchEvent(
                        new CustomEvent("_chat", {
                          detail: {
                            from: "sendMessage",
                            data: res.data,
                          },
                        })
                      );
                    }
                  });
              });
            }
          });
        }
      },
      { signal }
    );

    addEventListener(
      "_message",
      (e) => {
        const data = e.detail.data;
        const user_data = e.detail.user_data;

        if (document.fullscreenElement) {
          if (document.fullscreenElement.classList.contains("message")) {
            const message = createNodeElement(
              `<div><span>${encodeTextarea(
                `${user_data.fullname} : ${
                  data.type == 2 ? "STIKER" : data.body
                }`
              )}</span></div>`
            );
            $elements.itemMessage.append(message);
            setTimeout(() => message.remove(), 2000);
          }
        }
      },
      { signal }
    );

    addEventListener(
      "_hashchange",
      () => {
        abortController.abort();

        $elements.video.setAttribute("src", "");
        $elements.video.innerHTML = "";
      },
      { once: true }
    );

    addEventListener(
      "socketIO",
      (e) => {
        const from = e.detail.from;
        const data = e.detail.data;

        // console.log(data);
        if (!data) return;

        if (data.header.id == useThis.params.id) {
          if (from == "video_time_get") {
            const emit = {
              header: {
                id: useThis.params.id,
                from: "video_time_set",
                datetime: Date.now(),
                message: `${useApp.user.data.fullname} ha pedido la posicion del video`,
              },
              body: {
                user: useApp.user.data,
                socket: {
                  id: socket.id,
                },
                video: {
                  play: $elements.video.paused ? 0 : 1,
                  currentTime: parseInt($elements.video.currentTime.toFixed(0)),
                },
                mediaSession: {},
              },
            };

            socket.emit("video_time_set", emit);
          }

          if (from == "reaction") {
            dispatchEvent(
              new CustomEvent("_reaction", {
                detail: { ...data.body.emoji, socket: true },
              })
            );
          }

          if (from == "video") {
            if (useThis.values.videoAction.loadedmetadata) {
              if (data.header.from == "play") {
                if (Boolean(data.body.video.play) != !$elements.video.paused) {
                  useThis.values.videoEvents.play =
                    useThis.functions.addEventListenerSocketPlayPause(
                      useThis.values.videoEvents.play
                    );
                  if (Boolean(data.body.video.play)) $elements.video.play();
                  else $elements.video.pause();
                  const message = createNodeElement(
                    `<div><span>${encodeTextarea(
                      data.header.message
                    )}</span></div>`
                  );
                  $elements.itemMessage.append(message);
                  setTimeout(() => message.remove(), 2000);
                }
              } else if (data.header.from == "seeking") {
                useThis.values.videoEvents.seeking =
                  useThis.functions.addEventListenerSocketSeeking(
                    useThis.values.videoEvents.seeking
                  );
                $elements.video.currentTime = data.body.video.currentTime;
              } else if (data.header.from == "loadedmetadata") {
                useThis.functions.dataLoad({
                  from: data.header.from,
                  video: data.body.video,
                  detail: data.body.detail_video,
                });
              }
            }

            if (data.header.from == "paiting") {
              $elements.imgDraw.src = data.body.draw.base64;
            }
          }
        }
      },
      { signal }
    );

    addEventListener(
      "click",
      () => {
        // return;
        useThis.functions.dataLoad({
          from: "loadedmetadata",
          video: {
            url: parameters.data.detail.url,
            currentTime: parameters.data.detail.currentTime,
          },
          detail: parameters.data.detail_video,
        });
      },
      { once: true }
    );
  });

  if (sessionStorage.getItem("click") == "true") {
    dispatchEvent(new CustomEvent("click"));
  }

  dispatchEvent(
    new CustomEvent("customFooterPlayerVideo", {
      detail: {
        video: $elements.video,
        title: parameters.data.detail_video.title,
        description: parameters.data.detail_video.description,
      },
    })
  );

  return $element;
};

var eleImage = (link) => {
  const icon = window.dataApp.icon;
  const useThis = {
    functions: {
      exeCallback: (callback) => callback(),
    },
  };

  const $element = createNodeElement(`
        <div class="div_pHeC8jyxnS0IB8p">
            <div class="div_gDqvA2InPbXUZ4O">
                <header class="header_1XKl0euNM0fAQT">
                    <button id="close">${icon.get(
                      "fi fi-rr-cross-small"
                    )}</button>
                </header>
                <div id="imageContainer" class="div_NCGvY1766oL42a">
                    <img id="image" src="${link}">
                </div>
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.close.addEventListener("click", () => {
    $element.remove();
  });

  useThis.functions.exeCallback(() => {
    const elementMakeDrag = new ElementMakeDrag($element);
    const draggable = $elements.image;

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
              parseInt(draggable.style.width) == 1500) ||
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
              1500
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
    });

    draggable.addEventListener(
      "wheel",
      (e) => {
        const draggablegetBoundingClientRect =
          draggable.getBoundingClientRect();

        draggable.style.width = `${Math.max(
          150,
          Math.min(draggable.offsetWidth - (e.deltaY > 0 ? 10 : -10), 1500)
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
      { passive: true }
    );

    addEventListener("resize", () => {
      if (draggable.style.left != "" || draggable.style.top != "") {
        draggable.style.top = "";
        draggable.style.left = "";
        draggable.style.right = "20px";
        draggable.style.bottom = "20px";
      }
    });

    $elements.imageContainer.addEventListener("dblclick", () => {
      Object.assign(datapinch, {
        allow: false,
        startdistance: 0,
        lastdistance: 0,
        scale: 1,
      });

      Object.assign(datamove, {
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
      });

      $elements.image.style = "";
    });

    elementMakeDrag.start();
  });

  return $element;
};

var eleOption = (parameters = {}) => {
  parameters.includes = parameters.includes ?? [];

  const icon = window.dataApp.icon;

  const $element = createNodeElement(`
        <div class="div_wkrHC4T">
            <div id="closeElement" class="div_AbT09mv"></div>
            <div class="div_l19q36Q">
                <div id="itemData" class="div_612u8u1"></div>
            </div>
        </div>
    `);

  const { closeElement, itemData } = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  //<i class=""></i>
  const Option = [
    {
      from: ["videoId"],
      icon: icon.get("fi fi-rr-user-add"),
      name: "Invitar",
      action: "invite",
    },
    {
      from: ["videoId"],
      icon: icon.get("fi fi-rr-users"),
      name: "Miembros",
      action: "members",
    },
    {
      from: ["videoId"],
      icon: icon.get("fi fi-rr-popcorn"),
      name: "Peliculas / Series",
      action: "catalogue",
    },
    {
      from: ["chat"],
      icon: icon.get("fi fi-rr-copy"),
      name: "Copiar",
      action: "copy",
    },
    {
      from: ["chat"],
      icon: icon.get("fi fi-rr-reply-all"),
      name: "Responder",
      action: "reply",
    },
    {
      from: ["videoId", "chat"],
      icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-url"><path d="m15.388,9.221l-.314-3.659c-.026-.302.212-.562.515-.562.27,0,.494.207.516.477l.212,2.681.75-1.443c.193-.372.725-.372.918,0l.75,1.443.21-2.681c.021-.269.246-.477.516-.477h.002c.303,0,.541.26.515.562l-.314,3.659c-.031.44-.337.779-.706.779-.244,0-.471-.151-.601-.4l-.831-1.6-.831,1.6c-.129.249-.356.4-.601.4-.368,0-.675-.339-.706-.779Zm-4.774.779c.244,0,.471-.151.601-.4l.831-1.6.831,1.6c.129.249.356.4.601.4.368,0,.675-.339.706-.779l.314-3.659c.026-.302-.212-.562-.515-.562h-.002c-.27,0-.495.208-.516.477l-.21,2.681-.75-1.443c-.193-.372-.725-.372-.918,0l-.75,1.443-.212-2.681c-.021-.269-.246-.477-.516-.477-.303,0-.541.26-.515.562l.314,3.659c.031.44.337.779.706.779Zm-2.657,0c.368,0,.675-.339.706-.779l.314-3.659c.026-.302-.212-.562-.515-.562h-.002c-.27,0-.495.208-.516.477l-.21,2.681-.75-1.443c-.193-.372-.725-.372-.918,0l-.75,1.443-.212-2.681c-.021-.269-.246-.477-.516-.477-.303,0-.541.26-.515.562l.314,3.659c.031.44.337.779.706.779.244,0,.471-.151.601-.4l.831-1.6.831,1.6c.129.249.356.4.601.4ZM19,0H5C2.243,0,0,2.243,0,5v5c0,2.757,2.243,5,5,5,.553,0,1-.448,1-1s-.447-1-1-1c-1.654,0-3-1.346-3-3v-5c0-1.654,1.346-3,3-3h14c1.654,0,3,1.346,3,3v5c0,1.654-1.346,3-3,3-.553,0-1,.448-1,1s.447,1,1,1c2.757,0,5-2.243,5-5v-5c0-2.757-2.243-5-5-5Zm-.293,22.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.537-2.537c-.791.524-1.738.83-2.756.83-2.757,0-5-2.243-5-5s2.243-5,5-5,5,2.243,5,5c0,1.018-.306,1.965-.83,2.756l2.537,2.537Zm-6.707-2.293c1.654,0,3-1.346,3-3s-1.346-3-3-3-3,1.346-3,3,1.346,3,3,3Z"></path></svg>',
      name: "Link",
      action: "edit_url",
    },
    {
      from: ["videoId", "chat"],
      icon: icon.get("fi fi-rr-pencil"),
      name: "Editar",
      action: "edit",
    },
    {
      from: ["videoId", "chat"],
      icon: icon.get("fi fi-rr-trash"),
      name: "Eliminar",
      action: "delete",
    },
    {
      from: ["avatar"],
      icon: icon.get("fi fi-rr-camera"),
      name: "avatar",
      action: "avatar",
    },
    {
      from: ["avatar"],
      icon: icon.get("fi fi-rr-picture"),
      name: "wallpaper",
      action: "wallpaper",
    },
  ];

  itemData.innerHTML = Option.filter((option) => {
    if (option.from.includes(parameters.from)) {
      if (parameters.includes.includes("*")) return true;
      else if (parameters.includes.includes(option.action)) return true;
    }
    return false;
  })
    .map((option) => {
      return `
            <button class="button_4M96y3v" data-action="${option.action}">
                ${option.icon}
                <span>${option.name}</span>
            </button>
        `;
    })
    .join("");

  itemData.addEventListener("click", (e) => {
    const button = e.target.closest("[ data-action ]");
    if (button) {
      $element.dispatchEvent(
        new CustomEvent("_click", {
          detail: { action: button.getAttribute("data-action") },
        })
      );

      $element.remove();
    }
  });

  $element.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) e.target.remove();
  });

  // closeElement.addEventListener("click", () => $element.remove());

  return $element;
};

var videoChatList = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      dataNull: defineVal(true),
      dataTrue: defineVal([]),
    },
    values: {
      dataTrue: [],
    },
    functions: {
      exeCallback: (callback, ...params) => {
        try {
          return callback(...params);
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    },
    elements: {
      option: "",
      confirm: "",
    },
  };

  const $element = createNodeElement(`
        <div class="div_ba6yZXE scroll-y" style="position:relative; z-index:1">
            <div id="itemNull" class="loader-i" style="--color:var(--color-letter); padding:20px"></div>
            <div id="itemFalse" class="div_b14S3dH">
                ${useApp.icon.get("fi fi-rr-comments")}
            </div>
            <div id="itemTrue" class="div_C178CH8"></div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  const renderObjectElement = new RenderObjectElement($elements, "display");

  const abortController = new AbortController();
  const signal = abortController.signal;

  const fragment = document.createDocumentFragment();

  useThis.reactivity.dataNull.observe((value) => {
    renderObjectElement.set({
      itemNull: value,
      itemFalse: !value && !Object.keys(useThis.values.dataTrue).length,
      itemTrue: !value && !!Object.keys(useThis.values.dataTrue).length,
    });
  });

  useThis.reactivity.dataTrue.observe((Data) => {
    Data.forEach((data) => fragment.prepend(useThis.functions.itemChat(data)));
    $elements.itemTrue.prepend(fragment);
  });

  useThis.functions.itemChat = (data) => {
    const data_chat = JSONparse(data.data_chat);
    const files = JSONparse(data.files);
    JSONparse(data.detail || {});

    const className = {
      right: data.id_user == useApp.user.data.id ? "right" : "",
      type: "type_" + data.type,
      files: !!Object.keys(files || {}).length ? "files" : "",
    };

    const datetime_add = new Date(data.datetime_add);

    const $elementChat = createNodeElement(`
            <div class="div_LHVH539 ${className.right} ${
      className.type
    }" data-id="id-${data.id}" data-item data-delete="delete-${data.id}">
                <span style="display:none" >${EncodeTemplateString.toTextarea(
                  JSON.stringify(data)
                )}</span>
                <div class="div_39Qa3U7 ${className.right} ${className.type} ${
      className.files
    }" style="">

                    ${
                      data_chat.id
                        ? `
                        <div data-id-chat-reply="${
                          data_chat.id
                        }" class="div_02SD88p scroll-h" data-delete="delete-${
                            data_chat.id
                          }">
                            ${
                              data_chat.type == 1
                                ? `<p data-update="update-${
                                    data_chat.id
                                  }">${EncodeTemplateString.toTextarea(
                                    data_chat.body
                                  )}</p>`
                                : ""
                            }
                            ${
                              data_chat.type == 2
                                ? useThis.functions.exeCallback((body) => {
                                    if (body.type == 1) {
                                      return `<img src="${useApp.url.sticker(
                                        `/get.php?id=${body.id}`
                                      )}">`;
                                    }

                                    if (body.type == 2) {
                                      return `<img src="${body.src}">`;
                                    }

                                    return "";
                                  }, JSON.parse(data_chat.body))
                                : ""
                            }
                            ${
                              data_chat.type == 3
                                ? useThis.functions.exeCallback((body) => {
                                    const types = [
                                      "anime",
                                      "pelicula",
                                      "serie",
                                      "youtube",
                                    ];

                                    return `<p data-update="update-${
                                      data_chat.id
                                    }"> 
                                    ${[
                                      `<span style="font-style: italic; font-weight: bold;">${
                                        types[body.type]
                                      }</span>`,
                                      `<span style="font-size: 15px;">${body.title}</span>`,
                                      `<span style="font-size: 13px;">${body.genres}</span>`,
                                    ].join("<br>")}</p>`;
                                  }, JSONparse(data_chat.body))
                                : ""
                            }
                        </div>
                    `
                        : ""
                    }

                    <div id="files" class="div_8d6132r">
                        ${
                          data.type === 1
                            ? Object.entries(files)
                                .map((entries) => {
                                  if (entries[0] == "image") {
                                    return entries[1]
                                      .map((file) => {
                                        //console.log(file);
                                        //return `<a href="#/catalogo${detail.path}" class="div_Il97Uyj ${className.right} ${className.type}" data-files=""><img src="https://img.vniox.com/get.php?id=${file}"></a>`;
                                        return `<div class="div_Il97Uyj ${
                                          className.right
                                        }" data-file="${file}"><img src="${useApp.url.img.default(
                                          `/get.php?id=${file}&index=1`
                                        )}"></div>`;
                                      })
                                      .join("");
                                  } else if (entries[0] == "audio") {
                                    return entries[1]
                                      .map((file) => {
                                        return `<div class="div_Il97Uyj ${
                                          className.right
                                        }" data-file="${file}">
                                        <audio src="${useApp.url.audio(
                                          `/get.php?id=${file}`
                                        )}" style="width:100%;" controls></audio>
                                           </div>`;
                                      })
                                      .join("");
                                  }
                                  return "";
                                })
                                .join("")
                            : ""
                        }

                        ${
                          data.type === 3
                            ? Object.entries(files)
                                .map((entries) => {
                                  if (entries[0] == "image") {
                                    const types = [
                                      "anime",
                                      "pelicula",
                                      "serie",
                                      "youtube",
                                    ];

                                    const dataBody = JSONparse(data.body);

                                    return entries[1]
                                      .map((file) => {
                                        return `<a href="${[
                                          "#",
                                          "catalogo",
                                          types[dataBody.type],
                                          dataBody.id,
                                        ].join("/")}" class="div_Il97Uyj ${
                                          className.right
                                        } ${
                                          className.type
                                        }" data-files=""><img src="${useApp.url.img.default(
                                          `/get.php?id=${file}`
                                        )}"></a>`;
                                      })
                                      .join("");
                                  }
                                  return "";
                                })
                                .join("")
                            : ""
                        }

                        ${
                          data.type === 4
                            ? Object.entries(files)
                                .map((entries) => {
                                  if (entries[0] == "image") {
                                    return entries[1]
                                      .map((file) => {
                                        return `<div class="div_Il97Uyj ${
                                          className.right
                                        } ${
                                          className.type
                                        }" data-files=""><img src="${useApp.url.img.default(
                                          `/get.php?id=${file}`
                                        )}" style="object-fit:contain"></div>`;
                                      })
                                      .join("");
                                  }
                                  return "";
                                })
                                .join("")
                            : ""
                        }
                    </div>

                    <div id="message" class="div_lWjK31o">
                        ${
                          data.type === 1
                            ? `<p data-update="update-${
                                data.id
                              }">${EncodeTemplateString.toTextarea(
                                data.body
                              )}</p>`
                            : ""
                        }
                        ${
                          data.type === 2
                            ? useThis.functions.exeCallback(() => {
                                const databody = JSONparse(data.body);
                                if (databody.type == 1) {
                                  return `<img src="${useApp.url.sticker(
                                    `/get.php?id=${databody.id}`
                                  )}">`;
                                }
                                if (databody.type == 2) {
                                  return `<img src="${databody.src}">`;
                                }

                                return "";
                              })
                            : ""
                        }
                        ${
                          data.type === 3
                            ? useThis.functions.exeCallback((dataBody) => {
                                const types = [
                                  "Anime",
                                  "Pelicula",
                                  "Serie",
                                  "Youtube",
                                ];

                                return `<p data-update="update-${data.id}">
                                  <div style="display:grid;">
                                    <span style="all:unset; font-style: italic; font-weight: bold;">${
                                      types[dataBody.type]
                                    }</span>
                                  <span style="all:unset;font-size: 15px;">${
                                    dataBody.title
                                  }</span>
                                  <span style="all:unset;font-size: 13px;">${
                                    dataBody.genres
                                  }</span>
                                  </div>
                                </p>`;
                              }, JSON.parse(data.body))
                            : ""
                        }
                        <span>${datetime_add.getHours()}:${datetime_add.getMinutes()}</span>
                    </div>

                </div>
            </div>
        `);

    const $elementsChat = createObjectElement(
      $elementChat.querySelectorAll("[id]"),
      "id",
      true
    );
    const renderObjectElement = new RenderObjectElement($elementsChat);

    renderObjectElement.set({
      files: Boolean(Object.keys(files).length),
    });

    $elementsChat.files.addEventListener("click", (e) => {
      if (data.type == 1) {
        const item = e.target.closest("[data-file]");
        if (item) {
          if (item.getAttribute("data-file") != "") {
            item.setAttribute(
              "data-url",
              useApp.url.img.default(
                `/get.php?id=${item.getAttribute("data-file")}`
              )
            );

            item.setAttribute("data-file", "");

            item.innerHTML = `<img src="${item.getAttribute(
              "data-url"
            )}&index=3">`;

            return;
          }

          $element.append(eleImage(`${item.getAttribute("data-url")}&index=4`));
        }
      }
    });

    return $elementChat;
  };

  useThis.functions.getMessage = async (id) => {
    const encodeQueryString = encodeQueryObject({
      route: "/room/chat",
      query: 1,
      query_limit: "one",
      query_where: JSON.stringify([
        [0, 0, 0, id],
        [0, 2, 0, useThis.params.id],
      ]),
    });

    return await fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "GET",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      // credentials: "include",
    }).then((res) => res.json());
  };

  useThis.functions.sendMessage = (id, userEmit, user_data) => {
    useThis.functions.getMessage(id).then((data) => {
      if (!!Object.keys(data ?? {}).length) {
        const $message = useThis.functions.itemChat(data);
        $elements.itemTrue.append($message);

        if (userEmit || $element.scrollTop > -150) {
          $message.scrollIntoView({
            behavior: "smooth", // hace que el desplazamiento sea suave
            block: "start", // alinea el elemento al principio del área visible
          });
        }

        if (!userEmit) {
          dispatchEvent(
            new CustomEvent("_message", {
              detail: {
                data: data,
                user_data: user_data,
              },
            })
          );
        }
      }
    });
  };

  useThis.functions.editMessage = (id) => {
    useThis.functions.getMessage(id).then((data) => {
      if (!!Object.keys(data ?? {}).length) {
        Array.from(
          $elements.itemTrue.querySelectorAll(`[data-update="update-${id}"]`)
        ).forEach((element) => {
          element.textContent = data.body;
        });
      }
    });
  };

  useThis.functions.dropMessage = (id) => {
    Array.from(
      $elements.itemTrue.querySelectorAll(`[data-delete="delete-${id}"]`)
    ).forEach((element) => {
      element.remove();
    });
  };

  useThis.functions.dataLoad = () => {
    const encodeQueryString = encodeQueryObject({
      route: "/room/chat",
      query: 1,
      query_limit: 50,
      query_order: [3, 1].join(","),
      query_where: JSON.stringify([[0, 2, 0, useThis.params.id]]),
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "GET",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const array = Array.isArray(data) ? data : [];
        useThis.values.dataTrue = useThis.values.dataTrue.concat(array);

        useThis.reactivity.dataNull.value = true;
        useThis.reactivity.dataTrue.value = array;
        useThis.reactivity.dataNull.value = false;

        console.log(array);
      });
  };

  useThis.functions.handleSwipeRight = (element) => {
    let startX = 0;
    let isSwiping = false;
    let limit = 0;
    let move = 0;

    let elementChat = false;
    let activeScroll = false;

    let data = null;
    let activeEdit = false;

    const handleSwipeStart = (e) => {
      activeScroll = false;
      elementChat = e.target.closest("[data-item]");

      if (elementChat) {
        isSwiping = true;
        startX = e.touches[0].clientX;
        elementChat.style.transition = "none";
        limit = 0;
        move = 0;

        data = JSONparse(elementChat.children[0].textContent);
        activeEdit = data.type == 1 && data.id_user == useApp.user.data.id;
      }
    };

    const handleSwipeMove = (e) => {
      if (elementChat) {
        if (activeScroll) return;
        if (isSwiping) {
          const currentX = e.touches[0].clientX;
          const deltaX = currentX - startX;
          if (++move <= 2) return;
          if (!activeEdit && deltaX < 0) return;
          if (deltaX < -80) return;
          if (deltaX > 100) return;

          limit = deltaX;
          elementChat.style.transform = `translateX(${deltaX}px)`;
        }
      }
    };

    // Función para manejar el final del deslizamiento
    const handleSwipeEnd = () => {
      if (elementChat) {
        if (isSwiping) {
          isSwiping = false;

          elementChat.style.transition = "transform 0.3s"; // Restablecer la transición
          elementChat.style.transform = "translateX(0)";

          if (limit >= 60 || -60 > limit) {
            dispatchEvent(
              new CustomEvent("_chat", {
                detail: {
                  from: limit < 0 ? "activeEditMessage" : "activeReplyMessage",
                  data: data,
                },
              })
            );
          }

          limit = 0;
          move = 0;

          element.removeAttribute("style");
        }
      }
    };

    // Agregar eventos de escucha para el deslizamiento
    element.addEventListener("touchstart", handleSwipeStart, { passive: true });
    element.addEventListener("touchmove", handleSwipeMove, { passive: true });
    element.addEventListener("touchend", handleSwipeEnd);

    element.addEventListener("scroll", () => (activeScroll = true));
  };

  $elements.itemTrue.addEventListener("click", (e) => {
    const itemIdChatReply = e.target.closest("[data-id-chat-reply]");
    if (itemIdChatReply) {
      const itemScrollIntoView = $elements.itemTrue.querySelector(
        `[data-id=id-${itemIdChatReply.getAttribute("data-id-chat-reply")}]`
      );
      if (itemScrollIntoView) {
        itemScrollIntoView.scrollIntoView({
          behavior: "smooth", // hace que el desplazamiento sea suave
          block: "center", // alinea el elemento al principio del área visible
        });
      }
    }
  });

  $elements.itemTrue.addEventListener("contextmenu", (e) => {
    const item = e.target.closest("[data-item]");
    if (item) {
      const data = JSONparse(item.children[0].textContent);
      const options = {
        copy: data.type == 1,
        reply: true,
        edit: data.uid_user == useApp.user.data.uid && data.type == 1,
        delete: data.uid_user == useApp.user.data.uid,
      };

      useThis.elements.option = eleOption({
        from: "chat",
        includes: Object.keys(options).filter((key) => options[key]),
      });
      useThis.elements.option.addEventListener(
        "_click",
        (e) => {
          const action = e.detail.action;

          if (action == "delete") {
            useThis.elements.confirm = eleConfirm({
              title: "Eliminar",
              message: "¿ Eliminar mensaje ?",
            });
            useThis.elements.confirm.addEventListener(
              "_click",
              (e) => {
                if (e.detail.status) {
                  const encodeQueryString = encodeQueryObject({
                    route: "/room/chat",
                    token: useApp.user.token,
                    id: data.id,
                  });

                  fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
                    method: "DELETE",
                    headers: {
                      "Token-Auth": Cookie.get(useApp.auth),
                    },
                    // credentials: "include",
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      if (res && res.status) {
                        dispatchEvent(
                          new CustomEvent("_chat", {
                            detail: {
                              from: "dropMessage",
                              data: data,
                            },
                          })
                        );
                      }
                    });
                }
              },
              { once: true }
            );
            $element.append(useThis.elements.confirm);
          }
          if (["edit", "reply"].includes(action)) {
            dispatchEvent(
              new CustomEvent("_chat", {
                detail: {
                  from:
                    action == "edit"
                      ? "activeEditMessage"
                      : "activeReplyMessage",
                  data: data,
                },
              })
            );
          }
        },
        { once: true }
      );

      $element.append(useThis.elements.option);
    }
  });

  addEventListener(
    "socketIO",
    (e) => {
      const from = e.detail.from;
      const data = e.detail.data;

      if (!data) return;

      if (data.header.id != useThis.params.id) return;

      if (from == "chat") {
        if (data.body.message.from == "sendMessage")
          useThis.functions.sendMessage(
            data.body.message.id,
            false,
            data.body.user
          );
        else if (data.body.message.from == "editMessage")
          useThis.functions.editMessage(data.body.message.id, false);
        else if (data.body.message.from == "dropMessage")
          useThis.functions.dropMessage(data.body.message.id, false);
      }

      // if (data.id != useThis.params.id) return;

      // if (from == "chat") {
      //   if (data.information.from == "sendMessage")
      //     useThis.functions.sendMessage(data.message.id, false, data.user_data);
      //   else if (data.information.from == "editMessage")
      //     useThis.functions.editMessage(data.message.id, false);
      //   else if (data.information.from == "dropMessage")
      //     useThis.functions.dropMessage(data.message.id, false);
      // }
    },
    { signal }
  );

  addEventListener(
    "_reaction",
    (e) => {
      const detail = e.detail;
      if (detail.type == "text") {
        $elements.itemTrue.append(
          createNodeElement(`
                <div class="div_lPCK21h">
                    <div class="div_87UCn9w">
                        <p>${detail.message}</p>
                    </div>
                </div>
            `)
        );
      }
    },
    { signal }
  );

  addEventListener(
    "_chat",
    (e) => {
      const detail = e.detail;

      if (["sendMessage", "editMessage", "dropMessage"].includes(detail.from)) {
        if (detail.from == "sendMessage")
          useThis.functions.sendMessage(detail.data.id, true, {});
        else if (detail.from == "editMessage")
          useThis.functions.editMessage(detail.data.id, true);
        else if (detail.from == "dropMessage")
          useThis.functions.dropMessage(detail.data.id, true);

        const emit = {
          header: {
            id: useThis.params.id,
          },
          body: {
            user: useApp.user.data,
            message: {
              from: detail.from,
              id: detail.data.id,
            },
          },
        };

        useApp.socket.server.emit("chat", emit);
      }
    },
    { signal }
  );

  addEventListener(
    "_hashchange",
    () => {
      abortController.abort();
    },
    { once: true }
  );

  useThis.functions.handleSwipeRight($element);
  useThis.functions.dataLoad();

  // $element.append(
  //   eleImage(
  //     "http://192.168.1.10/img/get.php?id=A1WZ7-EY3YK-1MZ6Q-V9GS0-LT3LU-6AE9D-P5XF6-EZ6LT&index=0"
  //   )
  // );
  return $element;
};

var videoChatFormFile = () => {
  const useApp = window.dataApp;
  const useThis = {
    values: {
      files: [],
    },
  };

  const $element = createNodeElement(`
        <div class="div_5A18QNL">
            <div id="closeThis" class="position-inset-inherit"></div>
            <div class="div_klRb1dG">
                <header class="header_sdLBh4G">
                    <label class="label_dYXwK5M">
                        <input id="image" type="file" type="file" accept="image/*" multiple>
                        ${useApp.icon.get("fi fi-rr-plus")}
                    </label>
                    <button id="close">${useApp.icon.get(
                      "fi fi-rr-cross"
                    )}</button>
                </header>
                <div class="div_JWXqFZm">

                    <div id="itemFalse" class="div_b14S3dH">
                        ${useApp.icon.get("fi fi-rr-picture")}
                    </div>
                    <div id="itemTrue" class="div_qGeWOZ5"></div>

                </div>
                <footer class="footer_GOEzcL">
                    <form id="form" class="form_Ia2pYVO">
                        <label class="div_eq6f2mp">
                            <textarea name="body" placeholder="mensaje"></textarea>
                        </label>
                        <button type="submit" name="submit" class="button_rnTxy3">${useApp.icon.get(
                          "fi fi-rr-paper-plane-top"
                        )}</button>
                    </form>
                </footer>
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );
  const renderObjectElement = new RenderObjectElement($elements, "display");

  const mutationObserver = new MutationObserver((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.type == "childList") {
        renderObjectElement.set({
          itemFalse: !$elements.itemTrue.children.length,
          itemTrue: !!$elements.itemTrue.children.length,
        });
      }
    }
  });

  mutationObserver.observe($elements.itemTrue, { childList: true });

  $elements.itemTrue.append(document.createTextNode(""));

  $elements.closeThis.addEventListener("click", () => {
    $element.remove();
  });

  $elements.close.addEventListener("click", () => {
    $element.remove();
  });

  $elements.itemTrue.addEventListener("click", (e) => {
    const button = e.target.closest("button");

    if (button) {
      const index = Array.from(
        $elements.itemTrue.querySelectorAll("button")
      ).findIndex((btn) => btn === button);

      if (index != -1) {
        const item = button.closest("[ data-item ]");
        item.remove();

        useThis.values.files.splice(index, 1);
      }
    }
  });

  $elements.image.addEventListener("input", (e) => {
    const files = Array.from(e.target.files);

    if (files.length) {
      const fragment = document.createDocumentFragment();
      fragment.append(
        ...files.map((file, index) => {
          const $element = createNodeElement(`
                    <div class="div_4y9J7rr" data-item>
                        <img src="${URL.createObjectURL(file)}">
                        <button>
                            ${useApp.icon.get("fi fi-rr-cross-small")}
                        </button>
                    </div>
                `);

          const url = URL.createObjectURL(file);
          const image = new Image();
          image.src = url;

          image.addEventListener("load", () => {
            useThis.values.files.push({
              blob: file,
              width: image.width,
              height: image.height,
              url,
            });
            $element.querySelector("img").replaceWith(image);
            if (index == 0)
              $elements.form.body.dispatchEvent(new CustomEvent("input"));
          });

          return $element;
        })
      );

      $elements.itemTrue.append(fragment);
    }
  });

  $elements.form.body.addEventListener("input", (e) => {
    $elements.form.submit.setAttribute(
      "style",
      !$elements.form.body.value.trim() && !useThis.values.files.length
        ? "display:none"
        : ""
    );

    $elements.form.body.style.height = "20px";
    const height = $elements.form.body.scrollHeight;
    $elements.form.body.style.height = height + "px";
  });

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const datasubmit = {
      files: useThis.values.files,
      body: $elements.form.body.value.trim(),
    };

    useThis.values.files = [];
    $elements.form.body.value = "";
    $elements.itemTrue.innerHTML = "";

    $elements.form.body.dispatchEvent(new CustomEvent("input"));

    const uploadImage = new Promise((resolve, reject) => {
      if (!datasubmit.files.length) {
        return resolve({});
      }

      const formData = new FormData();

      Promise.all(
        datasubmit.files.map((blob, index, blobs) => {
          return new Promise((resolve, reject) => {
            const resizes = [50, 100, 500, 1000, 1500, 2000].map((width) => {
              return calculateAspectRatio(
                { width: blob.width, height: blob.height },
                { width }
              );
            });

            resizeCanvasImage(blob.url, resizes).then((response) => {
              Promise.all(
                response.images.map((image) => {
                  return new Promise((resolve, reject) => {
                    image.canvas.toBlob((blob) => {
                      const file = new File([blob], "blob.webp", {
                        type: blob.type,
                      });
                      console.log(file);
                      resolve(file);
                    }, "image/webp");
                  });
                })
              ).then((responses) => resolve([blob.blob, ...responses]));
            });
          });
        })
      ).then((responses) => {
        responses.forEach((response, index) => {
          response.forEach((file) => {
            formData.append(`archivo_${index}[]`, file);
          });
        });

        fetch(
          `http://192.168.1.10/img/set.php?folder=A1FY7-LA3XV-1DV5F-H3BT7-EM4QX-5BS3O-V8SM0-KT0VO`,
          { method: "POST", body: formData }
        )
          .then((res) => res.json())
          .then((files) => {
            resolve(files);
          });
      });
    });

    uploadImage.then((files) => {
      $element.dispatchEvent(
        new CustomEvent("_submit", {
          detail: {
            files: JSON.stringify({
              image: files,
            }),
            body: datasubmit.body.trim(),
          },
        })
      );
    });
  });

  $elements.form.body.dispatchEvent(new CustomEvent("input"));

  return $element;
};

var videoSticker = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    elements: {
      emoji: document.createElement("div"),
      stiker: videoChatFormStiker(),
      stikerFlaticon: stikerFlaticon(),
    },
    functions: {},
  };

  const socket = useApp.socket.server;

  const $element = createNodeElement(`
        <div class="div_k18zG4h" style="padding:10px;">
            <div id="closeThis" style="position:inherit; inset:inherit"></div>
            <div class="div_kdnqP9" >
                <div class="div_GG49gGd">
                  <select id="selectMode">
                    <option value="2">Sticker</option>
                    <option value="3">Sticker II</option>
                  </select>
                </div>
                <div id="divContent" class="div_p274j6r"></div>
                <form id="form" class="form_aun2HjT" autocomplete="off" style="display:none;">
                    <input type="text" name="text" placeholder="text">
                    <div class="div_iZh9L4r">
                        <button type="submit" class="button_FOo3Ort pointer" style="display:none">${useApp.icon.get(
                          "fi fi-rr-paper-plane-top"
                        )}</button>
                    </div>
                </div>
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = {
      type: "text",
      message: $elements.form.text.value.trim(),
    };

    if (data.message == "") return;

    $elements.form.text.value = "";
    useThis.functions.eventCustomElement(data);
  });

  $elements.closeThis.addEventListener("click", () => {
    $element.style.display = "none";
  });

  useThis.functions.eventCustomElement = (detail) => {
    detail = {
      ...detail,
      style: {
        left: rand(1),
        position: rand(75),
        text: rand(30, 60),
        image: rand(50, 100),
      },
    };

    const emit = {
      header: {
        id: useThis.params.id,
        from: "emoji",
        datetime: Date.now(),
        message: "",
      },
      body: {
        user: useApp.user.data,
        socket: {
          id: socket.id,
        },
        emoji: detail,
      },
    };

    dispatchEvent(
      new CustomEvent("_reaction", {
        detail: { ...detail, socket: true },
      })
    );

    socket.emit("reaction", emit);
  };

  $elements.form.text.addEventListener("input", () => {
    $elements.form
      .querySelector("button[type=submit]")
      .setAttribute(
        "style",
        $elements.form.text.value.trim() == "" ? "display:none" : ""
      );
  });

  $elements.selectMode.addEventListener("change", (e) => {
    const value = e.target.value;

    $elements.divContent.innerHTML = "";

    if (value == 1) {
      $elements.divContent.append(useThis.elements.emoji);
    } else if (value == 2) {
      $elements.divContent.append(useThis.elements.stiker);
    } else if (value == 3) {
      $elements.divContent.append(useThis.elements.stikerFlaticon);
    }
  });

  useThis.elements.stiker.addEventListener("_click", (e) => {
    $element.dispatchEvent(
      new CustomEvent("_click", {
        detail: {
          from: "stikerDefault",
          src: e.detail.src,
          id: e.detail.id,
        },
      })
    );
  });

  useThis.elements.stikerFlaticon.addEventListener("_click", (e) => {
    $element.dispatchEvent(
      new CustomEvent("_click", {
        detail: {
          from: "stikerFlaticon",
          src: e.detail.src,
          id: e.detail.id,
        },
      })
    );
  });

  $elements.selectMode.dispatchEvent(new CustomEvent("change"));
  return $element;
};

var videoChatForm = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    functions: {},
    values: {
      interval: null,
      mediaRecorder: null,
      audioChunks: [],
    },
  };

  const $element = replaceNodeChildren(
    createNodeElement(`
        <div class="div_081453P">
         
            <div id="elementReplyEdit" class="div_K52wXjM" style="display:none"></div>
            <form id="form" class="form_V1kz9F1" data-submit="true">
                <input type="hidden" name="id">
                <input type="hidden" name="id_message_reply">
                
                <label id="labelBody" class="label_8F7v541" data-microphone="false">
                    <textarea name="body" placeholder="mensaje"></textarea> 
                </label>

                <div class="div_GEaY2w8">
                  <div class="div_R0zCC9s">
                    <button type="button" id="buttonStiker" data-microphone="false">${useApp.icon.get(
                      "fi fi-rr-sticker"
                    )}</button>
                      <button type="button" id="buttonFile" data-microphone="false">${useApp.icon.get(
                        "fi fi-rr-picture"
                      )}</button>
                      <button type="button" id="buttonMicrophoneStop" data-microphone="true" style="display:none;">${useApp.icon.get(
                        "fi fi-rr-microphone-slash"
                      )}</button>
                  </div>
                  <div class="d-flex-center" data-microphone="true" style="display:none;"><span id="spanMicrophoneRecord" >00:00</span></div>
                  <div class="div_R0zCC9s">
                    <label id="buttonMicrophone" class="label_6PPWDkv p-relative">
                      <input id="inputMicrophone" type="checkbox">
                      <span>
                        ${useApp.icon.get("fi fi-rr-microphone")}
                        ${useApp.icon.get("fi fi-rr-paper-plane-top")}
                      </span>
                    </label>
                    <button type="button" id="buttonMicrophoneBlock" class="button_0530xdO submit"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-block-microphone"><path d="M6.349,17.703c-1.515-1.532-2.349-3.557-2.349-5.703v-4C4,3.589,7.589,0,12,0s8,3.589,8,8c0,.552-.447,1-1,1h-4c-.553,0-1-.448-1-1s.447-1,1-1h2.917c-.478-2.834-2.949-5-5.917-5s-5.431,2.167-5.91,5h2.91c.552,0,1,.448,1,1s-.448,1-1,1h-3v2h3c.552,0,1,.448,1,1s-.448,1-1,1h-2.912c.204,1.238,.78,2.384,1.683,3.297,.388,.393,.385,1.026-.008,1.414-.195,.193-.449,.289-.703,.289-.258,0-.516-.099-.711-.297Zm2.85,4.117c-4.171-.847-7.199-4.556-7.199-8.82,0-.552-.448-1-1-1s-1,.448-1,1c0,5.211,3.701,9.745,8.801,10.78,.067,.014,.134,.02,.2,.02,.466,0,.883-.327,.979-.801,.11-.541-.24-1.069-.781-1.179Zm14.801-4.82c0,3.866-3.134,7-7,7s-7-3.134-7-7,3.134-7,7-7,7,3.134,7,7Zm-4.247,4.167l-6.92-6.92c-.524,.791-.833,1.736-.833,2.753,0,2.757,2.243,5,5,5,1.017,0,1.962-.309,2.753-.833Zm2.247-4.167c0-2.757-2.243-5-5-5-1.017,0-1.962,.309-2.753,.833l6.919,6.92c.524-.791,.833-1.736,.833-2.753Z"></path></svg></button>
                    <button type="submit" id="buttonSubmit" class="button_0530xdO submit" style="display:none;">${useApp.icon.get(
                      "fi fi-rr-paper-plane-top"
                    )}</button>
                  </div>
                  
              </div>
            </form>
            
            <div replace-node-children="videoSticker" id="videoSticker" style="display:none;"></div>
            <div replace-node-children="videoChatFormFile" id="videoChatFormFile" style="display:none;"></div>
        </div>
    `),
    {
      videoSticker: videoSticker(),
      videoChatFormFile: videoChatFormFile(),
    }
  );

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const renderObjectElement = new RenderObjectElement($elements);

  const abortController = new AbortController();
  const signal = abortController.signal;

  useThis.functions.getDurationTimeText = (seconds) => {
    const Time = [];

    const time = {
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };

    if (!!time.hours) Time.push(time.hours);
    Time.push(time.minutes);
    Time.push(time.seconds);

    return Time.map((n) => `0${n}`.slice(-2)).join(":");
  };

  $elements.buttonStiker.addEventListener("click", () => {
    $elements.videoSticker.style.display = "";
  });

  $elements.buttonFile.addEventListener("click", () => {
    $elements.videoChatFormFile.style.display = "";
  });

  $elements.elementReplyEdit.addEventListener("click", (e) => {
    if (e.target.closest("button")) {
      if ($elements.form.id.value != "") {
        $elements.form.body.value = "";
      }

      $elements.elementReplyEdit.innerHTML = "";

      $elements.elementReplyEdit.setAttribute("style", "display:none");
      $elements.form.id_message_reply.value = "";
      $elements.form.id.value = "";

      Array.from([$elements.buttonStiker, $elements.buttonFile]).forEach(
        (element) => {
          element.setAttribute("style", "");
        }
      );

      $elements.form.body.dispatchEvent(new CustomEvent("input"));
    }
  });

  $elements.form.body.addEventListener("input", (e) => {
    const value = e.target.value.trim();

    if ($elements.form.id.value) {
      $elements.buttonMicrophone.style.display = "none";
      $elements.buttonSubmit.style.display = "";
      $elements.buttonSubmit.style.visibility = value ? "" : "hidden";
    } else {
      $elements.buttonMicrophone.style.display = value ? "none" : "";
      $elements.buttonMicrophoneBlock.style.display = value ? "none" : "";
      $elements.buttonSubmit.style.display = value ? "" : "none";
    }

    e.target.style.height = "20px";
    const height = e.target.scrollHeight;
    e.target.style.height = height + "px";
  });

  $elements.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const datetime = Date.now();

    const encodeQueryString = encodeQueryObject({
      route: "/room/chat",
      token: useApp.user.token,
      id: $elements.form.id.value || null,
    });

    const body = {
      id_room: useThis.params.id,
      id_chat_reply: $elements.form.id_message_reply.value || null,
      body: $elements.form.body.value,
      files: JSON.stringify([]),
      datetime_add: datetime,
      datetime_update: datetime,
      type: 1,
      status: 1,
    };

    const id = $elements.form.id.value || null;

    $elements.elementReplyEdit.setAttribute("style", "display:none");
    $elements.elementReplyEdit.innerHTML = "";

    $elements.form.id.value = "";
    $elements.form.id_message_reply.value = "";
    $elements.form.body.value = "";
    $elements.form.body.focus();

    $elements.form.body.dispatchEvent(new CustomEvent("input"));

    if (id == null) {
      fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
        method: "POST",
        headers: {
          "Token-Auth": Cookie.get(useApp.auth),
        },
        // credentials: "include",
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res && res.status) {
            dispatchEvent(
              new CustomEvent("_chat", {
                detail: {
                  from: "sendMessage",
                  data: res.data,
                },
              })
            );
          }

          const encodeQueryString = encodeQueryObject({
            route: "/notification",
            token: useApp.user.token,
            id_room: useThis.params.id,
            data: JSON.stringify({
              user: useApp.user.data,
              message: {
                file: {},
                body: body.body,
              },
              other: {
                url: `${location.origin}${location.pathname}#/video/${useThis.params.id}`,
                image: null,
              },
            }),
          });

          fetch(useApp.url.api(`/api.php?${encodeQueryString}`));
        });
    } else {
      fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
        method: "PATCH",
        headers: {
          "Token-Auth": Cookie.get(useApp.auth),
        },
        // credentials: "include",
        body: JSON.stringify(body),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res && res.status) {
            dispatchEvent(
              new CustomEvent("_chat", {
                detail: {
                  from: "editMessage",
                  data: { ...res.data, id },
                },
              })
            );
          }
        });
    }
  });

  $elements.videoChatFormFile.addEventListener("_submit", (e) => {
    const datetime = Date.now();

    const encodeQueryString = encodeQueryObject({
      route: "room.chat",
    });

    const body = {
      id_room: useThis.params.id,
      id_chat_reply: $elements.form.id_message_reply.value || null,
      body: e.detail.body,
      files: e.detail.files,
      datetime_add: datetime,
      datetime_update: datetime,
      type: 1,
      status: 1,
    };

    $elements.elementReplyEdit.setAttribute("style", "display:none");
    $elements.elementReplyEdit.innerHTML = "";
    $elements.form.id_message_reply.value = "";

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "POST",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          dispatchEvent(
            new CustomEvent("_chat", {
              detail: {
                from: "sendMessage",
                data: data.data,
              },
            })
          );
        }
      });
  });

  $elements.videoSticker.addEventListener("_click", (e) => {
    const bodyData = () => {
      if (e.detail.from == "stikerDefault") {
        return {
          type: 1,
          id: e.detail.id,
        };
      }
      if (e.detail.from == "stikerFlaticon") {
        return {
          type: 2,
          src: e.detail.src,
        };
      }
    };

    const datetime = Date.now();

    const encodeQueryString = encodeQueryObject({
      route: "room.chat",
      id: $elements.form.id.value || null,
    });

    const body = {
      id_room: useThis.params.id,
      id_chat_reply: $elements.form.id_message_reply.value || null,
      body: JSON.stringify(bodyData()),
      files: JSON.stringify({}),
      datetime_add: datetime,
      datetime_update: datetime,
      type: 2,
      status: 1,
    };

    $elements.elementReplyEdit.setAttribute("style", "display:none");
    $elements.elementReplyEdit.innerHTML = "";
    $elements.form.id_message_reply.value = "";

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "POST",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.status) {
          dispatchEvent(
            new CustomEvent("_chat", {
              detail: {
                from: "sendMessage",
                data: data.data,
              },
            })
          );
        }
      });
  });

  addEventListener(
    "_chat",
    (e) => {
      const detail = e.detail;

      if (!["activeEditMessage", "activeReplyMessage"].includes(detail.from))
        return;

      $elements.elementReplyEdit.setAttribute("style", "");
      $elements.elementReplyEdit.innerHTML = `
            <span class="button_0530xdO wh-40px d-flex-center">${useApp.icon.get(
              detail.from == "activeEditMessage"
                ? "fi fi-rr-pencil"
                : "fi fi-rr-undo"
            )}</span>
            <p class="text-ellipsis">${encodeTextarea(detail.data.body)}</p>
            <button  class="button_0530xdO pointer">${useApp.icon.get(
              "fi fi-rr-cross-small"
            )}</button>
        `;

      Array.from([$elements.buttonStiker, $elements.buttonFile]).forEach(
        (element) => {
          element.setAttribute(
            "style",
            detail.from == "activeEditMessage" ? "display:none" : ""
          );
        }
      );

      $elements.form.id_message_reply.value =
        detail.from != "activeEditMessage" ? detail.data.id : "";
      $elements.form.id.value =
        detail.from == "activeEditMessage" ? detail.data.id : "";

      $elements.form.body.value =
        detail.from == "activeEditMessage"
          ? detail.data.body
          : $elements.form.body.value;
      $elements.form.body.dispatchEvent(new CustomEvent("input"));
      $elements.form.body.focus();
    },
    { signal }
  );

  $elements.inputMicrophone.addEventListener("change", (e) => {
    Array.from($element.querySelectorAll("[data-microphone")).forEach(
      (child) => {
        child.style.display =
          child.getAttribute("data-microphone") === e.target.checked.toString()
            ? ""
            : "none";
      }
    );

    if (e.target.checked) {
      console.log("grabar");
      let index = 0;
      $elements.spanMicrophoneRecord.textContent =
        useThis.functions.getDurationTimeText(index);
      useThis.values.interval = setInterval(() => {
        $elements.spanMicrophoneRecord.textContent =
          useThis.functions.getDurationTimeText(++index);
      }, 1000);

      navigator.permissions.query({ name: "microphone" }).then((response) => {
        if (response.state == "granted") {
          const timestop = setTimeout(() => {
            $elements.inputMicrophone.checked = false;
            $elements.inputMicrophone.dispatchEvent(
              new CustomEvent("change", { detail: { status: true } })
            );
          }, 1000 * 60 * 3);

          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              useThis.values.mediaRecorder = new MediaRecorder(stream, {
                mimeType: "audio/webm;codecs=opus",
                audioBitsPerSecond: 128000, // 128 kbps para audio de mayor calidad
              });

              useThis.values.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                  useThis.values.audioChunks.push(event.data);
                }
              };

              useThis.values.mediaRecorder.onstop = (e) => {
                stream.getTracks().forEach((track) => track.stop());

                useThis.values.mediaRecorder.dispatchEvent(
                  new CustomEvent("_stop", {
                    detail: {
                      blob: new Blob(useThis.values.audioChunks, {
                        type: "audio/webm;codecs=opus",
                      }),
                    },
                  })
                );

                useThis.values.audioChunks = [];
                clearTimeout(timestop);
              };
              useThis.values.mediaRecorder.start(250); // Captura datos cada 250ms
            });
        }
      });
    } else {
      if (useThis.values.interval) clearInterval(useThis.values.interval);

      if (useThis.values.mediaRecorder) {
        // $elements.iconMicrophone.innerHTML =
        //   '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-inner-svg-get="fi fi-rr-microphone"><path d="M12,20a8.009,8.009,0,0,0,8-8V8A8,8,0,0,0,4,8v4A8.009,8.009,0,0,0,12,20ZM12,2a6.006,6.006,0,0,1,5.91,5H15a1,1,0,0,0,0,2h3v2H15a1,1,0,0,0,0,2h2.91A5.993,5.993,0,0,1,6.09,13H9a1,1,0,0,0,0-2H6V9H9A1,1,0,0,0,9,7H6.09A6.006,6.006,0,0,1,12,2Z"></path><path d="M23,12a1,1,0,0,0-1,1,9.01,9.01,0,0,1-9,9H11a9.011,9.011,0,0,1-9-9,1,1,0,0,0-2,0A11.013,11.013,0,0,0,11,24h2A11.013,11.013,0,0,0,24,13,1,1,0,0,0,23,12Z"></path></svg>';

        if (e instanceof CustomEvent ? e?.detail?.status : true) {
          useThis.values.mediaRecorder.addEventListener(
            "_stop",
            (e) => {
              const formData = new FormData();
              formData.append(
                "file",
                new File([e.detail.blob], "file.webm", {
                  type: e.detail.blob.type,
                })
              );

              fetch(
                "http://localhost/audio/set.php?folder=A1FY7-LA3XV-1DV5F-H3BT7-EM4QX-5BS3O-V8SM0-KT0VO",
                {
                  method: "POST",
                  body: formData,
                }
              )
                .then((res) => res.json())
                .then((data) => {
                  $elements.videoChatFormFile.dispatchEvent(
                    new CustomEvent("_submit", {
                      detail: {
                        body: "",
                        files: JSON.stringify({
                          audio: data,
                        }),
                      },
                    })
                  );
                });

              console.log(e.detail);
            },
            { once: true }
          );
        }

        useThis.values.mediaRecorder.stop("uno");
      }
    }
  });

  $elements.buttonMicrophoneStop.addEventListener("click", () => {
    $elements.inputMicrophone.checked = false;
    $elements.inputMicrophone.dispatchEvent(
      new CustomEvent("change", { detail: { status: false } })
    );
  });

  navigator.permissions.query({ name: "microphone" }).then((response) => {
    console.log(response);
    renderObjectElement.set({
      buttonMicrophone:
        response.state == "granted" || response.state == "prompt",
      buttonMicrophoneBlock: response.state == "denied",
    });
    response.onchange = () => {
      renderObjectElement.set({
        buttonMicrophone:
          response.state == "granted" || response.state == "prompt",
        buttonMicrophoneBlock: response.state == "denied",
      });
    };
  });

  return $element;
};

var videoIdFooter = () => {
  const useApp = window.dataApp;
  const useThis = {
    params: useApp.routes.params(),
    reactivity: {
      dataNull: defineVal(true),
      dataTrue: defineVal({}),
    },
    values: {
      dataTrue: [],
      mediaRecorder: null,
      audioChunks: [],
    },
    functions: {},
    elements: {},
  };

  const $element = createNodeElement(`
        <div class="div_sUQTlMzJWysnrlN div_1TgYFMj div_VdB1JCs">
            <audio id="audio" style="display:none"></audio>
            <header class="header_hbN5Ha3C9tx2pG4 header_oMr76Fi header_kEwI3as">
                <div class="div_n64i96I" style="flex:1;">
                    <a href="#/video" class="button_Ygi1XTBzBs4wCXV button-icon">${useApp.icon.get(
                      "fi fi-rr-angle-small-left"
                    )}</a>
                    <h3 id="textTitle" class="text-ellipsis"></h3>
                </div>
                <div id="buttons" class="div_n64i96I">
                    
                    <label id="btnMicrophone" class="button_Ygi1XTBzBs4wCXV button-icon">
                        <span id="iconMicrophone" style="display: flex; justify-content: center; align-items: center;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-inner-svg-get="fi fi-rr-microphone"><path d="M12,20a8.009,8.009,0,0,0,8-8V8A8,8,0,0,0,4,8v4A8.009,8.009,0,0,0,12,20ZM12,2a6.006,6.006,0,0,1,5.91,5H15a1,1,0,0,0,0,2h3v2H15a1,1,0,0,0,0,2h2.91A5.993,5.993,0,0,1,6.09,13H9a1,1,0,0,0,0-2H6V9H9A1,1,0,0,0,9,7H6.09A6.006,6.006,0,0,1,12,2Z"></path><path d="M23,12a1,1,0,0,0-1,1,9.01,9.01,0,0,1-9,9H11a9.011,9.011,0,0,1-9-9,1,1,0,0,0-2,0A11.013,11.013,0,0,0,11,24h2A11.013,11.013,0,0,0,24,13,1,1,0,0,0,23,12Z"></path></svg></span>
                        <input id="inputMicrophone" type="checkbox" style="display:none">
                    </label>
                    <label id="buttonMicrophone" class="label_6PPWDkv button_Ygi1XTBzBs4wCXV" style="background:none;">
                      <input id="inputHideVideo" type="checkbox" checked>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-display-slash"><path d="m24,14v-6c0-2.757-2.243-5-5-5H5c-.187,0-.37.014-.552.034L1.707.293C1.316-.098.684-.098.293.293S-.098,1.316.293,1.707l22,22c.195.195.451.293.707.293s.512-.098.707-.293c.391-.391.391-1.023,0-1.414l-3.467-3.467c2.156-.555,3.76-2.499,3.76-4.826Zm-2,0c0,1.654-1.346,3-3,3h-.5c-.025,0-.047.013-.071.014L6.414,5h12.586c1.654,0,3,1.346,3,3v6Zm-5.5,7c0,.552-.448,1-1,1h-7.5c-.552,0-1-.448-1-1s.448-1,1-1h3v-1h-6c-2.757,0-5-2.243-5-5v-6c0-.421.053-.841.157-1.249.137-.535.68-.859,1.217-.72.535.137.857.682.72,1.217-.063.245-.095.498-.095.751v6c0,1.654,1.346,3,3,3h7c.552,0,1,.448,1,1v2h2.5c.552,0,1,.448,1,1Z"></path></svg>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-screen"><path d="M19,3H5A5.006,5.006,0,0,0,0,8v6a5.006,5.006,0,0,0,5,5h6v1H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2H13V19h6a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3Zm3,11a3,3,0,0,1-3,3H5a3,3,0,0,1-3-3V8A3,3,0,0,1,5,5H19a3,3,0,0,1,3,3Z"></path></svg>
                      </span>
                    </label>
                    <button id="btnOpenOption" class="button_Ygi1XTBzBs4wCXV button-icon">${useApp.icon.get(
                      "fi fi-rr-menu-dots-vertical"
                    )}</button>
                </div>
            </header>
            <div class="div_nUAQnHkhCrVhFEk" >

                <div id="itemNull" class="loader-i" style="--pixel:60px;"></div>

                <div id="itemFalse" class="div_uLpB1pckiSEJgCU">

                    <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
                        <path
                            d="M19.949,5.536,16.465,2.05A6.958,6.958,0,0,0,11.515,0H7A5.006,5.006,0,0,0,2,5V19a5.006,5.006,0,0,0,5,5H17a5.006,5.006,0,0,0,5-5V10.485A6.951,6.951,0,0,0,19.949,5.536ZM18.535,6.95A4.983,4.983,0,0,1,19.316,8H15a1,1,0,0,1-1-1V2.684a5.01,5.01,0,0,1,1.051.78ZM20,19a3,3,0,0,1-3,3H7a3,3,0,0,1-3-3V5A3,3,0,0,1,7,2h4.515c.164,0,.323.032.485.047V7a3,3,0,0,0,3,3h4.953c.015.162.047.32.047.485Z" />
                    </svg>
                    <h3>ID no encontrado</h3>

                </div>

                <div id="itemTrue" class="div_nUyJk1x">
                    <div id="elementVideo" class="div_lwSWNUI"></div>
                    <div id="elementChat" class="div_v9hOz2U"></div>
                </div>

            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const renderObjectElement = new RenderObjectElement($elements, "display");

  useThis.reactivity.dataNull.observe((load) => {
    renderObjectElement.set({
      itemNull: load,
      itemFalse: !load && !Object.keys(useThis.values.dataTrue).length,
      itemTrue: !load && !!Object.keys(useThis.values.dataTrue).length,
      buttons: !load && !!Object.keys(useThis.values.dataTrue).length,
    });
  });

  useThis.reactivity.dataTrue.observe((data) => {
    if (Object.keys(data ?? {}).length) {
      data.data_room = JSONparse(data.data_room);
      data.data_room.detail = JSONparse(data.data_room.detail);
      data.data_room.detail_video = JSONparse(data.data_room.detail_video);

      $elements.textTitle.textContent = data.data_room.name;

      $elements.elementVideo.append(
        videoPlayer({ element: $elements.itemTrue, data: data.data_room })
      );
      $elements.elementChat.append(videoChatList(), videoChatForm());

      const options = {
        // invite: data.data_room.uid_user == useApp.user.data.uid,
        members: true,
        edit: true,
        // delete: data.data_room.uid_user == useApp.user.data.uid,
        catalogue: true,
        edit_url: true,
      };

      if (!useThis.elements.option) {
        useThis.elements.option = eleOption({
          from: "videoId",
          includes: Object.keys(options).filter((key) => options[key]),
        });
        useThis.elements.option.addEventListener("_click", (e) => {
          const actions = {
            catalogue: useThis.elements.catalogo,
            edit_url: useThis.elements.formEdit,
            delete: useThis.elements.confirm,
            members: useThis.elements.members,
            invite: useThis.elements.formGenerate,
          };

          if (e.detail.action == "catalogue") {
            location.hash = "/catalogo";
            return;
          }
          if (e.detail.action == "edit") {
            location.hash = `/video/${useThis.params.id}/edit`;
            return;
          }
          if (e.detail.action == "members") {
            location.hash = `/video/${useThis.params.id}/users`;
            return;
          }

          if (e.detail.action == "edit_url") {
            $element.append(actions[e.detail.action] ?? "");
            actions[e.detail.action].showPopover();
            return;
          } else {
            $element.append(actions[e.detail.action] ?? "");
          }
        });
      }

      if (!useThis.elements.formEdit) {
        useThis.elements.formEdit = formVideo({
          from: "edit",
          inputs: [
            {
              title: "Link",
              key: "url",
              value: data.data_room.detail.url || "",
            },
          ],
        });
      }
    }
  });

  useThis.functions.dataLoad = () => {
    const encodeQueryString = encodeQueryObject({
      route: "/room/user",
      query: 1,
      query_limit: "one",
      query_where: JSON.stringify([
        [0, 1, 0, useApp.user.data.id],
        [0, 2, 0, useThis.params.id],
      ]),
    });

    fetch(useApp.url.api(`/api.php?${encodeQueryString}`), {
      method: "GET",
      headers: {
        "Token-Auth": Cookie.get(useApp.auth),
      },
      // credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        useThis.values.dataTrue = useThis.values.dataTrue.concat(data);

        useThis.reactivity.dataNull.value = true;
        useThis.reactivity.dataTrue.value = data;
        useThis.reactivity.dataNull.value = false;
      });
  };

  $elements.btnOpenOption.addEventListener("click", () => {
    $element.append(useThis.elements.option);
  });

  $elements.inputHideVideo.addEventListener("change", (e) => {
    $elements.elementVideo.style.display = e.target.checked ? "" : "none";
    $elements.elementChat.classList.toggle("width-full", !e.target.checked);
  });

  $elements.inputMicrophone.addEventListener("change", (e) => {
    if ($elements.inputMicrophone.checked) {
      navigator.permissions.query({ name: "microphone" }).then((response) => {
        if (response.state == "granted") {
          $elements.iconMicrophone.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-inner-svg-get="fi fi-rr-microphone-slash"><path d="m6,11v1c0,3.309,2.691,6,6,6,.286,0,.575-.021.859-.061.551-.079,1.053.303,1.131.85.078.547-.303,1.053-.85,1.131-.377.053-.761.081-1.141.081-4.411,0-8-3.589-8-8v-1c0-.552.448-1,1-1s1,.448,1,1Zm17.707,11.293c.391.391.391,1.023,0,1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293L.293,1.707C-.098,1.316-.098.684.293.293S1.316-.098,1.707.293l3.49,3.49c1.44-2.335,3.984-3.783,6.803-3.783,4.411,0,8,3.589,8,8v4c0,1.797-.591,3.508-1.68,4.906l1.423,1.423c1.46-1.783,2.257-4.004,2.257-6.329,0-.552.448-1,1-1s1,.448,1,1c0,2.857-1.003,5.583-2.837,7.748l2.544,2.544ZM6.665,5.25l10.226,10.226c.527-.739.877-1.583,1.026-2.477h-2.917c-.552,0-1-.448-1-1s.448-1,1-1h3v-2h-3c-.552,0-1-.448-1-1s.448-1,1-1h2.916c-.477-2.834-2.948-5-5.916-5-2.275,0-4.313,1.259-5.335,3.25Zm9.507,15.841c-1.312.603-2.715.909-4.171.909-5.514,0-10-4.486-10-10,0-.552-.448-1-1-1s-1,.448-1,1c0,6.617,5.383,12,12,12,1.747,0,3.431-.367,5.006-1.091.502-.231.722-.825.491-1.326-.23-.502-.825-.723-1.326-.491Z"></path></svg>';

          const timestop = setTimeout(() => {
            $elements.inputMicrophone.checked = false;
            $elements.inputMicrophone.dispatchEvent(new CustomEvent("change"));
          }, 150000);

          navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
              useThis.values.mediaRecorder = new MediaRecorder(stream);

              useThis.values.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                  useThis.values.audioChunks.push(event.data);
                }
              };

              useThis.values.mediaRecorder.onstop = () => {
                stream.getTracks().forEach((track) => track.stop());

                const blob = new Blob(useThis.values.audioChunks, {
                  type: "audio/webm;codecs=opus",
                });
                useThis.values.audioChunks = [];

                const emit = {
                  header: {
                    id: useThis.params.id,
                    from: "audio",
                    datetime: Date.now(),
                    message: `${useApp.user.data.fullname} ha enviado un audio`,
                  },
                  body: {
                    user: useApp.user.data,
                    socket: {
                      //id  : socket.id
                    },
                    video: {},
                    mediaSession: {},
                    audio: {
                      blob,
                    },
                  },
                };

                useApp.socket.server.emit("video", emit);
                clearTimeout(timestop);
              };
              //
              useThis.values.mediaRecorder.start(250); // Captura datos cada 250ms
            });
        }
      });
    } else {
      if (useThis.values.mediaRecorder) {
        $elements.iconMicrophone.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-inner-svg-get="fi fi-rr-microphone"><path d="M12,20a8.009,8.009,0,0,0,8-8V8A8,8,0,0,0,4,8v4A8.009,8.009,0,0,0,12,20ZM12,2a6.006,6.006,0,0,1,5.91,5H15a1,1,0,0,0,0,2h3v2H15a1,1,0,0,0,0,2h2.91A5.993,5.993,0,0,1,6.09,13H9a1,1,0,0,0,0-2H6V9H9A1,1,0,0,0,9,7H6.09A6.006,6.006,0,0,1,12,2Z"></path><path d="M23,12a1,1,0,0,0-1,1,9.01,9.01,0,0,1-9,9H11a9.011,9.011,0,0,1-9-9,1,1,0,0,0-2,0A11.013,11.013,0,0,0,11,24h2A11.013,11.013,0,0,0,24,13,1,1,0,0,0,23,12Z"></path></svg>';
        useThis.values.mediaRecorder.stop();
      }
    }
  });

  navigator.permissions.query({ name: "microphone" }).then((response) => {
    renderObjectElement.set({
      btnMicrophone: response.state == "granted",
    });

    response.onchange = () =>
      renderObjectElement.set({
        btnMicrophone: response.state == "granted",
      });
  });

  addEventListener("socketIO", (e) => {
    const from = e.detail.from;
    const data = e.detail.data;

    if (!data) return;
    if (!data.header) return;
    if (data.header.id == useThis.params.id) {
      if (from == "video") {
        if (data.header.from == "audio") {
          const blob = new Blob([data.body.audio.blob], {
            type: "audio/webm;codecs=opus",
          });

          $elements.audio.src = URL.createObjectURL(blob);
          $elements.audio.play();
        }
      }
    }
  });

  useThis.functions.dataLoad();
  return $element;
};

var footerVideoPlayer = () => {
  const useApp = window.dataApp;
  const useThis = {
    elements: {
      videoId: document.createElement("div"),
      video: document.createElement("video"),
    },
    val: {
      hash: null,
    },
    functions: {
      exeCallback: (callback, ...params) => {
        try {
          return callback(...params);
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    },
  };

  const $element = createNodeElement(`
        <footer class="footer_Ik8bcDR">
            <div id="divPrueba" class="div_MJ5Ba2C" style="pointer-events:none;">
              <div id="divPreview" class="div_wPiZgS6" style="display:none;">
                  <div id="divPreviewContent" class="d-grid">
                    <a href="#" id="popupOpen" class="a_eOBTYZC"><canvas id="canvasVideo" style="aspect-ratio: 16/9;"></canvas></a>
                    <div class="div_OZ6oAgh"><span id="spanBar"></span></div>
                    <div class="div_lq8dhAa">
                        <button id="buttonPlayPause"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-play"><path d="M20.494,7.968l-9.54-7A5,5,0,0,0,3,5V19a5,5,0,0,0,7.957,4.031l9.54-7a5,5,0,0,0,0-8.064Zm-1.184,6.45-9.54,7A3,3,0,0,1,5,19V5A2.948,2.948,0,0,1,6.641,2.328,3.018,3.018,0,0,1,8.006,2a2.97,2.97,0,0,1,1.764.589l9.54,7a3,3,0,0,1,0,4.836Z"></path></svg></button>
                        <button id="buttonPIP"><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-svg-name="fi fi-rr-resize"><path d="m19 0h-8a5.006 5.006 0 0 0 -5 5v6h-1a5.006 5.006 0 0 0 -5 5v3a5.006 5.006 0 0 0 5 5h3a5.006 5.006 0 0 0 5-5v-1h6a5.006 5.006 0 0 0 5-5v-8a5.006 5.006 0 0 0 -5-5zm-8 16a3 3 0 0 1 -3-3 3 3 0 0 1 3 3zm0 3a3 3 0 0 1 -3 3h-3a3 3 0 0 1 -3-3v-3a3 3 0 0 1 3-3h1a5.006 5.006 0 0 0 5 5zm11-6a3 3 0 0 1 -3 3h-6a4.969 4.969 0 0 0 -.833-2.753l5.833-5.833v2.586a1 1 0 0 0 2 0v-3a3 3 0 0 0 -3-3h-3a1 1 0 0 0 0 2h2.586l-5.833 5.833a4.969 4.969 0 0 0 -2.753-.833v-6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3z"></path></svg></button>
                        <button id="buttonCloseVideo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-cross"><path d="M23.707.293h0a1,1,0,0,0-1.414,0L12,10.586,1.707.293a1,1,0,0,0-1.414,0h0a1,1,0,0,0,0,1.414L10.586,12,.293,22.293a1,1,0,0,0,0,1.414h0a1,1,0,0,0,1.414,0L12,13.414,22.293,23.707a1,1,0,0,0,1.414,0h0a1,1,0,0,0,0-1.414L13.414,12,23.707,1.707A1,1,0,0,0,23.707.293Z"></path></svg></button>
                    </div>
                  </div>
              </div>
            </div>
        </footer>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  const context = $elements.canvasVideo.getContext("2d");

  $elements.buttonPlayPause.addEventListener("click", () => {
    if (useThis.elements.video.tagName == "VIDEO") {
      if (useThis.elements.video.paused) useThis.elements.video.play();
      else useThis.elements.video.pause();
    }
  });

  $elements.buttonCloseVideo.addEventListener("click", () => {
    useThis.val.hash = null;
    useThis.elements.videoId.remove();

    dispatchEvent(new CustomEvent("_hashchange"));
    styleElement($elements.divPreview, { display: "none" });
  });

  $elements.popupOpen.addEventListener("click", () => {
    // $elements.divPreview.style.display = "none";
  });

  $elements.buttonPIP.addEventListener("click", () => {
    useThis.elements.video.requestPictureInPicture();
  });

  addEventListener("customFooterVideoPlayer", () => {
    useThis.elements.videoId = videoIdFooter();
    useThis.val.hash = location.hash;

    $elements.popupOpen.setAttribute("href", useThis.val.hash);
    $element.append(useThis.elements.videoId);

    $elements.divPreview.style.display = "";
  });

  addEventListener("customFooterPlayerVideo", (e) => {
    if (!e.detail.video) return;

    const video = e.detail.video;
    const canvas = $elements.canvasVideo;

    useThis.elements.video = video;

    if (video) {
      const draw = () => {
        if (!video.paused && !video.ended) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          requestAnimationFrame(draw); // Llamar a draw de nuevo en el siguiente cuadro de animación
        }
      };

      video.addEventListener("loadedmetadata", (e) => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.style.aspectRatio = "";
      });

      video.addEventListener("timeupdate", () => {
        if (video.getAttribute("data-time-text")) {
          $elements.spanBar.setAttribute(
            "style",
            `width:${video.getAttribute("data-time-text")}%`
          );
        }
      });

      video.addEventListener("play", () => {
        $elements.buttonPlayPause.innerHTML = useApp.icon.get("fi fi-rr-pause");
        draw();
      });

      video.addEventListener("pause", () => {
        $elements.buttonPlayPause.innerHTML = useApp.icon.get("fi fi-rr-play");
      });

      video.addEventListener("enterpictureinpicture", () => {
        $elements.divPreview.style.display = "none";
      });

      video.addEventListener("leavepictureinpicture", () => {
        if (document.fullscreenElement) document.exitFullscreen();
        $elements.divPreview.style.display = "";
      });
    }
  });

  addEventListener("hashchange", () => {
    styleElement(useThis.elements.videoId, {
      display: useThis.val.hash == location.hash ? "" : "none",
    });
  });

  addEventListener("_auth", (e) => {
    useApp.user.data = e.detail.data;

    if (!useApp.user.data) {
      $elements.buttonCloseVideo.dispatchEvent(new CustomEvent("click"));
    }
  });

  useThis.functions.exeCallback(() => {
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
      target.style.zIndex = "999";

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
      target.style.zIndex = "";
      $elements.divPreviewContent.style.pointerEvents = "";
    });

    draggable.addEventListener(
      "wheel",
      (e) => {
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
      { passive: true }
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
  });

  return $element;
};

var navigateBottom = () => {
  const useApp = window.dataApp;
  const useThis = {
    routes: new RouteHashCallback(),
  };

  const $element = createNodeElement(`
        <div class="div_U1rCCk1" style="display:none">
            <div id="links" class="div_ZnL3gfK">
                <a id="inicio" href="#/" class="active"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-house-blank"><path d="M19,24H5c-2.757,0-5-2.243-5-5V9.724c0-1.665,.824-3.215,2.204-4.145L9.203,.855c1.699-1.146,3.895-1.146,5.594,0l7,4.724c1.379,.93,2.203,2.479,2.203,4.145v9.276c0,2.757-2.243,5-5,5ZM12,1.997c-.584,0-1.168,.172-1.678,.517L3.322,7.237c-.828,.558-1.322,1.487-1.322,2.486v9.276c0,1.654,1.346,3,3,3h14c1.654,0,3-1.346,3-3V9.724c0-.999-.494-1.929-1.321-2.486L13.678,2.514c-.51-.345-1.094-.517-1.678-.517Z"></path></svg></a>
                <a id="catalogo" href="#/catalogo"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-svg-name="fi fi-rr-popcorn"><path d="M11,6a1,1,0,0,1-1,1A1,1,0,0,0,9,8,1,1,0,0,1,7,8a3,3,0,0,1,3-3A1,1,0,0,1,11,6Zm3,1a1,1,0,0,0,0,2,1,1,0,0,1,1,1,1,1,0,0,0,2,0A3,3,0,0,0,14,7Zm7.923,6.486-1.3,6.5A5.013,5.013,0,0,1,15.721,24H8.279a5.013,5.013,0,0,1-4.9-4.019l-1.3-6.5a4.007,4.007,0,0,1-.05-6.953A4.007,4.007,0,0,1,5.311,3.06a3.456,3.456,0,0,1,3.7-2.016A3.517,3.517,0,0,1,14.66,2a3.479,3.479,0,0,1,2.392,1.115,4.011,4.011,0,0,1,4.921,3.414A4.007,4.007,0,0,1,21.923,13.486ZM8.484,22,8,16.062A2.019,2.019,0,0,0,6,14H4.22l1.117,5.588A3.029,3.029,0,0,0,8.484,22Zm4.972,0L14,15.978A2,2,0,0,0,10,16l.487,6Zm6.324-8H18a2,2,0,0,0-2,2l-.537,6a3.038,3.038,0,0,0,3.2-2.412ZM22,10a2,2,0,0,0-1.335-1.874A1,1,0,0,1,20,7.184a2.012,2.012,0,0,0-2.872-1.972,1,1,0,0,1-1.318-.42A1.5,1.5,0,0,0,14.5,4a1.13,1.13,0,0,1-1.529-.762,1.5,1.5,0,0,0-2.739-.526C9.788,3.43,9.122,3.1,8.5,3A1.5,1.5,0,0,0,7.03,4.2,1,1,0,0,1,5.958,5,2,2,0,0,0,4,7a1.047,1.047,0,0,1-.665,1.126A2,2,0,0,0,4,12H6a3.975,3.975,0,0,1,3,1.382,3.994,3.994,0,0,1,5.994-.007A4.008,4.008,0,0,1,18,12h2A2,2,0,0,0,22,10Z"></path></svg></a>
                <a id="video" href="#/video"><img class="img_bAVjzSy" src="./img/icons/icon-video.png"></a>
                <a id="itemProfile" href="#/profile" class="a_1OKAZpH">
                    <span id="spanAvatar"></span>
                    <img id="imgAvatar" src="" class="img_lyvLR4C" style="display:none">
                </a>
            </div>
        </div>
    `);

  const $elements = createObjectElement(
    $element.querySelectorAll("[id]"),
    "id",
    true
  );

  useThis.routes.set([
    { hash: "/", callback: () => $elements.inicio },
    { hash: "/catalogo/*", callback: () => $elements.catalogo },
    { hash: "/video/*", callback: () => $elements.video },
  ]);

  addEventListener("_auth", (e) => {
    useApp.user.data = e.detail.data;
    if (useApp.user.data) {
      $element.style.display = "";

      $elements.spanAvatar.textContent =
        useApp.user.data.fullname[0].toUpperCase();
      $elements.imgAvatar.src = `https://img.vniox.com/get.php?id=${useApp.user.data.file_avatar}&index=2`;

      $elements.imgAvatar.onload = () => {
        $elements.imgAvatar.style.display = "";
      };

      $elements.imgAvatar.onerror = () => {
        $elements.imgAvatar.style.display = "none";
      };
    } else {
      $element.style.display = "none";
    }
  });

  addEventListener("hashchange", () => {
    Array.from($elements.links.querySelectorAll("a.active")).forEach((a) =>
      a.classList.remove("active")
    );
    (useThis.routes.get() || document.createElement("a")).classList.add(
      "active"
    );
  });

  return $element;
};

var config = () => {
  //https://api.victor01sp.com/nivi/api.php

  const config = {
    routes: new RouteHashCallback(),
    auth: "auth_kWpyN2R",
    url: {
      api: (path = "") => "https://api.vniox.com/nivi" + path,
      storage: (path = "") => "https://storage.victor01sp.com" + path,
      storageApi: (path = "") =>
        "https://api-storage.victor01sp.com/api" + path,
      //`https://img.vniox.com/index.php?url=${encodeURIComponent(url)}`
      img: {
        default: (path) =>
          `https://img.vniox.com/${trimString(path).left("/")}`,
        index: (url) =>
          `https://img.vniox.com/index.php?url=${encodeURIComponent(url)}`,
      },
      audio: (path) =>
        `https://files.vniox.com/audio/${trimString(path).left("/")}`,
      rr: (path = "") => `https://app.victor01sp.com/rr` + path,
      fetch: (url) =>
        `https://fetch.vniox.com/get.php?url=${encodeURIComponent(url)}`,
      sticker: (path = "") => {
        return `https://api.vniox.com/stiker/${trimString(path).left("/")}`;
      },
    },
    user: {},
    icon: new IconSVG(),
    val: {
      videoId: null,
    },
    data: {
      token: {
        youtube: null,
      },
    },
    socket: {
      server:
        socketIO("https://xpr42s2c-5000.brs.devtunnels.ms/", "socketIO", [
        "video",
        "reaction",
        "video_time_get",
        "video_time_set",
        "chat",
      ]),
    },
    elements: {
      meta: {
        color: document.getElementById("meta-theme-color"),
      },
      style: {
        app: document.getElementById("style-app"),
      },
      video: {
        player: null,
      },
    },
    permissions: {
      microphone: null,
    },
    reactivity: {
      users: defineVal([]),
    },
  };

  navigator.permissions.query({ name: "microphone" }).then((response) => {
    config.permissions.microphone = response.state == "granted";
  });

  return config;
};

addEventListener("contextmenu", (e) => {
  if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
  e.preventDefault();
});

addEventListener("DOMContentLoaded", () => {
  if (navigator.serviceWorker) navigator.serviceWorker.register("./sw.js");

  storageObject(
    localStorage,
    {
      favorite_pelicula: JSON.stringify([]),
      favorite_serie: JSON.stringify([]),
      favorite_yt_video: JSON.stringify([]),
      favorite_anime: JSON.stringify([]),
      search_history: JSON.stringify([]),
      episodes_direction: 0,
    },
    false
  );

  window.dataApp = config();
  theme();

  document.getElementById("app").append(
    replaceNodeChildren(
      createNodeElement(`
        <template>
            <div class="container">
                <div replace-node-children="navigate"></div>
                <div replace-node-children="routes"></div>
            </div>
            <div replace-node-children="footerVideoPlayer"></div>
            <div replace-node-children="navigateBottom"></div>
            <div replace-node-children="notification"></div>
        </template>
    `),
      {
        navigate: navigate(),
        header: header(),
        routes: routes(),
        notification: eleAlert(),
        footerVideoPlayer: footerVideoPlayer(),
        navigateBottom: navigateBottom(),
      },
      false
    )
  );

  // document.getElementById("app").append(videoReaction());

  dispatchEvent(new CustomEvent("popstate"));
  dispatchEvent(new CustomEvent("_theme"));
  dispatchEvent(new CustomEvent("hashchange"));

  addEventListener("click", () => sessionStorage.setItem("click", true), {
    once: true,
  });
});
