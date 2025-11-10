HTMLElement.prototype.c_method = function () {
  return {
    style: (styles) => {
      if (styles && typeof styles === "object") {
        // Object.assign(this.style, styles);
        Object.assign(this.style, styles);
      }
      return this;
    },
    event: (type, callback, options = {}) => {
      this.addEventListener(type, callback, options);
      return () => this.removeEventListener(type, callback, options);
    },
  };
};
