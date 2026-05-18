import { createApp } from 'https://unpkg.com/petite-vue?module';

let appData = {
  app: document.getElementById('app'),
  ui: {
    background: {
      isActive: true,
      options: [50, 100, 150, 200],
      value: 150,
    },
    controls: {
      hideInIsActive: true,
      hideInOptions: [2, 3, 4, 5],
      hideInValue: 3,
    },
    quality: {
      options: [],
      value: -1,
    },
    speed: {
      options: [0.5, 1, 1.5, 2],
      value: 1,
    },
    seek: {
      options: [5, 10, 15, 20],
      value: 10,
    },
  },
  video: { target: document.querySelector('video') },

  volume: 20,
  brightness: 20,
  showRemainingTime: false,

  isFullscreen: false,
  isPaused: false,
  isLoading: true,

  currentTime: 0,
  duration: 0,

  mounted() {
    appData = this;
  },

  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  },

  setIsPaused(isPaused) {
    this.isPaused = isPaused;
  },

  setIsFullscreen(isFullscreen) {
    this.isFullscreen = isFullscreen;
  },

  setCurrentTime(currentTime) {
    this.currentTime = currentTime;
  },

  setDuration(duration) {
    this.duration = duration;
  },

  toggleFulscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else this.app.requestFullscreen();
  },

  togglePlayPause() {
    const video = this.video.target;

    if (video.readyState === 0) return;
    if (video.paused) video.play();
    else video.pause();
  },

  setVolume(input) {
    this.volume = Number(input) || 0;
    window?.Android?.setVolume(this.volume);
  },

  setBrightness(input) {
    this.brightness = Number(input) || 0;
    window?.Android?.setBrightness(this.brightness);
  },

  timer(input) {
    const seconds = parseInt(input);

    return [
      Math.floor(seconds / 3600) || false,
      String(Math.floor((seconds % 3600) / 60)).padStart(2, '0'),
      String(seconds % 60).padStart(2, '0'),
    ]
      .filter(Boolean)
      .join(':');
  },

  percentage(current, total) {
    return (parseFloat(current) / parseFloat(total)) * 100;
  },
};

class MediaPlayer {
  target = null;
  ref = {};

  video = null;
  canvas = null;

  hls = null;
  showRemainingTime = false;
  hideControlsIn = null;

  dblclick = {
    now: 0,
    time: 0,
    allow: false,
    type: null,
  };

  touch = {
    _touchmove: false,
    _touchend: false,
    _pinch: false,
    pinchZoom: false,
    initialDistance: 0,
    objectFit: null,
  };

  constructor(render, storageName = 'media-player-id-5l4yI5jyncpJXZfW') {
    this.init();
  }

  init() {
    this.target = document.getElementById('app');

    this.ref = Array.from(this.target.querySelectorAll('[id]')).reduce((prev, curr) => {
      prev[curr.getAttribute('id')] = curr;
      return prev;
    }, {});

    this._targetEvents();
    this._videoEvents();
    this._controlEvents();
    this._swipeEvents();
  }

  _targetEvents() {
    this.target.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    this.target.addEventListener('fullscreenchange', () => {
      appData.setIsFullscreen(document.fullscreenElement !== null);
    });

    window.addEventListener('keydown', (e) => {
      if (!appData.isFullscreen) return;

      e.preventDefault();

      const code = e.code;

      switch (e.code) {
        case 'Space':
          appData.togglePlayPause();
          break;

        case 'ArrowRight':
          appData.video.target.currentTime += 10;
          break;

        case 'ArrowLeft':
          appData.video.target.currentTime -= 10;
          break;

        default:
          break;
      }
    });
  }

  _swipeEvents() {
    const player = this.target;
    // const brightnessBox = document.getElementById('brightnessBox');
    const leftZone = this.ref.divTap.querySelector('[data-action="event-left"]');
    const rightZone = this.ref.divTap.querySelector('[data-action="event-right"]');
    // const volumeBox = document.getElementById('volumeBox');

    let startX = 0;
    let startY = 0;
    let side = null;
    let active = false;

    let brightness = 0.5;
    let volume = 0.5;
    let startValue = 0.5;

    const clamp = (v) => Math.max(0, Math.min(1, v));

    const startGesture = (e, gestureSide) => {
      const touch = e.touches[0];
      active =
        this.ref['input-event-swipe-left'].checked || this.ref['input-event-swipe-right'].checked;
      //   active = false;

      startX = touch.clientX;
      startY = touch.clientY;
      side = gestureSide;
      startValue = side === 'brightness' ? brightness : volume;

      //   this.ref.controlView.style.display = 'none';
    };

    leftZone.addEventListener('touchstart', (e) => startGesture(e, 'brightness'));
    rightZone.addEventListener('touchstart', (e) => startGesture(e, 'volume'));

    const handleMove = (e) => {
      if (!active) return;
      if (e.touches.length !== 1) return;
      if (this.ref.controlNotificationTouch.style.display === 'flex') return;

      const touch = e.touches[0];
      const delta = (startY - touch.clientY) / 1500;

      if (side === 'brightness' && this.ref['input-event-swipe-left'].checked) {
        brightness = clamp(startValue + delta);
        const value = Math.round(brightness * 100);

        window?.Android?.setBrightness(Math.round(brightness * 100));

        this.ref.controlNotificationTouchVolume.innerHTML = `
            <small class="flex-center">
                <svg width="24" height="24">
                    <use href="#fi fi-rr-brightness-low"></use>
                </svg>
            </small>
            <span>${value}%</span>
        `;

        this.ref.inputToggleControl.checked = false;
        this.ref.controlNotificationTouchVolume.style.display = 'flex';
      }
      if (side === 'volume' && this.ref['input-event-swipe-right'].checked) {
        volume = clamp(startValue + delta);
        const value = Math.round(volume * 100);
        window?.Android?.setVolume(value);

        this.ref.controlNotificationTouchVolume.innerHTML = `
            <small class="flex-center">
                <svg width="24" height="24">
                    <use href="#fi fi-rr-volume"></use>
                </svg>
            </small>
            <span>${value}%</span>
        `;

        this.ref.inputToggleControl.checked = false;
        this.ref.controlNotificationTouchVolume.style.display = 'flex';
      }
    };

    leftZone.addEventListener('touchmove', handleMove);
    rightZone.addEventListener('touchmove', handleMove);

    player.addEventListener('touchend', () => {
      this.ref.controlNotificationTouchVolume.style.display = 'none';
      active = false;
    });
    player.addEventListener('touchcancel', () => {
      this.ref.controlNotificationTouchVolume.style.display = 'none';
      active = false;
    });

    volume = window?.Android?.getVolume() / 100 || volume;
    brightness = window?.Android?.getBrightness() / 100 || brightness;
  }

  _videoEvents() {
    const video = this.ref.video;
    const canvas = this.ref.canvas;
    const context = canvas.getContext('2d');

    video.addEventListener('loadedmetadata', () => {
      appData.setIsLoading(true);

      this.ref.spanError.style.display = 'none';

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      appData.setIsLoading(false);

      video.play().catch(() => {
        this._draw(video, canvas, context);

        appData.setIsLoading(false);
        appData.setIsPaused(true);
      });
    });

    video.addEventListener('playing', () => {
      this._draw(video, canvas, context);

      appData.setIsLoading(false);
    });
    video.addEventListener('durationchange', () => {
      appData.setDuration(video.duration);
      this.ref.durationInput.max = parseInt(video.duration);
    });
    video.addEventListener('timeupdate', () => {
      if (this.ref.durationInput.getAttribute('data-status') == 'true') return;

      appData.setCurrentTime(video.currentTime);

      this.ref.durationInput.value = parseInt(video.currentTime);
    });

    video.addEventListener('play', () => appData.setIsPaused(false));

    video.addEventListener('pause', () => appData.setIsPaused(true));

    video.addEventListener('waiting', () => appData.setIsLoading(true));

    video.addEventListener('seeking', () => appData.setIsLoading(true));

    video.addEventListener('seeked', () => {
      appData.setIsPaused(video.paused);
      appData.setIsLoading(false);
    });

    video.addEventListener('error', (e) => {
      if (this.ref.video.getAttribute('src') == '') {
        return;
      }
      if (e.target.error.code == 4) {
        appData.setIsLoading(false);
        this.ref.spanError.style.display = '';
      }
    });
  }

  _controlEvents() {
    this.ref.seekLeft.addEventListener('click', () => {
      const seek = appData.ui.seek.value;
      this.ref.video.currentTime = parseInt(this.ref.video.currentTime) - seek;
    });

    this.ref.seekRight.addEventListener('click', () => {
      // const skiptime = parseInt(this.ref['jumpTime-input-range'].value);

      const seek = appData.ui.seek.value;
      this.ref.video.currentTime = parseInt(this.ref.video.currentTime) + seek;
    });

    this.ref.durationInput.addEventListener('input', () => {
      this.ref.durationInput.setAttribute('data-status', true);

      appData.setCurrentTime(this.ref.durationInput.value);

      this._hideControls(false);
    });

    this.ref.durationInput.addEventListener('change', () => {
      this.ref.durationInput.setAttribute('data-status', false);
      this.ref.video.currentTime = parseInt(this.ref.durationInput.value);
      this._hideControls(true);
    });

    this.ref.divTap.addEventListener('click', (e) => {
      e.preventDefault();

      this.ref.inputToggleControl.checked = !this.ref.inputToggleControl.checked;

      this.dblclick.type = e.pointerType;
      this.dblclick.now = Date.now();
      this.dblclick.allow = this.dblclick.now - this.dblclick.time;
      this.dblclick.time = this.dblclick.now;
    });

    this.ref.divTap.addEventListener('dblclick', (e) => {
      if (this.ref.inputCheckboxLock.checked) return;
      if (this.dblclick.allow > 200) return;

      const etargetclosest = e.target.closest('[data-action]');

      if (etargetclosest) {
        const number =
          (Math.abs(etargetclosest.innerText) || 0) +
          parseInt(this.ref['jumpTime-input-range'].value);

        const action = etargetclosest.getAttribute('data-action');

        if (action == 'event-left') {
          if (this.ref['input-event-dblclickLeft'].checked) {
            const seek = appData.ui.seek.value;
            this.ref.video.currentTime = parseInt(this.ref.video.currentTime) - seek;

            etargetclosest.innerHTML = `<span>-${seek}</span>`;
          }
        } else if (action == 'event-center') {
          if (this.ref['input-event-dblclickCenter'].checked) {
            appData.toggleFulscreen();
          }
        } else if (action == 'event-right') {
          if (this.ref['input-event-dblclickRight'].checked) {
            const seek = appData.ui.seek.value;
            this.ref.video.currentTime = parseInt(this.ref.video.currentTime) + seek;

            etargetclosest.innerHTML = `<span>+${seek}</span>`;
          }
        }
      }
    });

    this.ref.divTap.addEventListener('pointerdown', (e) => {
      if (this.ref.inputCheckboxLock.checked) return;

      if (
        e.pointerType === 'mouse' &&
        this.ref['input-event-longpress'].checked &&
        !this.ref.video.paused
      ) {
        const timeout = setTimeout(() => {
          mousemove();

          this.ref.controlNotificationTouch.style.display = 'flex';
          this.ref.video.playbackRate = 2;

          this.ref.inputToggleControl.checked = false;
          this.ref.controlView.style.display = 'none';
        }, 350);

        const mousemove = this._event(
          this.ref.divTap,
          'mousemove',
          () => {
            clearTimeout(timeout);
            mouseup();

            this.ref.controlNotificationTouch.style.display = 'none';
            this.ref.video.playbackRate = 1;

            this.ref.controlView.style.display = '';
          },
          {
            once: true,
            passive: true,
          },
        );

        const mouseup = this._event(
          this.ref.divTap,
          'mouseup',
          () => {
            clearTimeout(timeout);
            mousemove();

            this.ref.controlNotificationTouch.style.display = 'none';
            this.ref.video.playbackRate = 1;

            this.ref.controlView.style.display = '';
          },
          {
            once: true,
            passive: true,
          },
        );
      }
    });

    this.ref.divTap.addEventListener(
      'touchstart',
      (e) => {
        if (this.ref.inputCheckboxLock.checked) return;

        if (e.touches.length === 2) {
          this.touch.initialDistance = this._getDistance(e.touches);
        }

        if (e.touches.length === 1) {
          if (this.ref['input-event-longpress'].checked && !this.ref.video.paused) {
            const timeout = setTimeout(() => {
              touchmove();

              this.ref.controlNotificationTouch.style.display = 'flex';
              this.ref.video.playbackRate = 2;

              this.ref.inputToggleControl.checked = false;
              this.ref.controlView.style.display = 'none';
            }, 350);

            const touchstart = this._event(
              this.ref.divTap,
              'touchstart',
              () => {
                clearTimeout(timeout);
                touchmove();
                touchend();

                this.ref.controlNotificationTouch.style.display = 'none';
                this.ref.video.playbackRate = 1;

                this.ref.controlView.style.display = '';
              },
              {
                once: true,
                passive: true,
              },
            );

            const touchmove = this._event(
              this.ref.divTap,
              'touchmove',
              () => {
                clearTimeout(timeout);
                touchstart();
                touchend();

                this.ref.controlNotificationTouch.style.display = 'none';
                this.ref.video.playbackRate = 1;

                this.ref.controlView.style.display = '';
              },
              {
                once: true,
                passive: true,
              },
            );

            const touchend = this._event(
              this.ref.divTap,
              'touchend',
              (e) => {
                clearTimeout(timeout);
                touchstart();
                touchmove();

                this.ref.controlNotificationTouch.style.display = 'none';
                this.ref.video.playbackRate = 1;

                this.ref.controlView.style.display = '';
              },
              {
                once: true,
                passive: true,
              },
            );
          }
        }
      },
      { passive: true },
    );

    this.ref.divTap.addEventListener(
      'touchmove',
      (e) => {
        if (this.ref.inputCheckboxLock.checked) return;

        if (e.touches.length === 2) {
          if (this.ref['input-event-pinch'].checked) {
            const currentDistance = this._getDistance(e.touches);

            if (currentDistance > this.touch.initialDistance) {
              this.touch.objectFit = 'cover';
            } else if (currentDistance < this.touch.initialDistance) {
              this.touch.objectFit = 'contain';
            }

            this.touch.initialDistance = currentDistance;
          }
        }
      },
      { passive: true },
    );

    this.ref.divTap.addEventListener('touchend', () => {
      if (this.ref.inputCheckboxLock.checked) return;

      if (this.touch.objectFit) {
        this.ref.video.style.objectFit = this.touch.objectFit;
        this.touch.objectFit = null;
      }
    });

    this.ref.openOptions.addEventListener('click', () => {
      this._hideControls(false);

      this.ref.inputToggleControl.checked = false;
      // this.ref["div-popover"].showPopover();
      this.ref['div-popover'].style.display = '';
    });

    this.ref['div-popover'].addEventListener('click', (e) => {
      if (e.target == e.currentTarget || e.target.closest('[data-hide-popover]')) {
        // e.currentTarget.hidePopover();
        e.currentTarget.style.display = 'none';
      }
    });

    this.ref['div-popover-2'].addEventListener('click', (e) => {
      if (e.target == e.currentTarget || e.target.closest('[data-hide-popover]')) {
        // e.currentTarget.hidePopover();
        e.currentTarget.style.display = 'none';
      }
    });

    this.ref.divOptionsButtons.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      if (button) {
        const action = button.getAttribute('data-option-action');
        // this.ref["div-popover"].hidePopover();
        this.ref['div-popover'].style.display = 'none';
        // this.ref["div-popover-2"].showPopover();
        this.ref['div-popover-2'].style.display = '';

        Object.entries({
          background: this.ref['option-from-background'],
          qualities: this.ref['option-from-qualities'],
          speed: this.ref['option-from-speed'],
          jumpTime: this.ref['option-from-jumpTime'],
          hideControl: this.ref['option-from-hideControl'],
          events: this.ref['option-from-events'],
        }).filter((entries) => {
          entries[1].style.display = entries[0] == action ? '' : 'none';
          return entries[0] == action;
        });
      }
    });

    this.ref.control.addEventListener('click', () => {
      this._hideControls(true);
    });

    this.ref.control.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'mouse') {
        if (this.ref.durationInput.getAttribute('data-status') === 'false') {
          this.ref.inputToggleControl.checked = true;
          this._hideControls(true);
        }
      }
    });

    this.ref.control.addEventListener('mouseleave', () => {
      if (!this.ref.video.paused) {
        this.ref.inputToggleControl.checked = false;
        this._hideControls(false);
      }
    });
  }

  _hideControls(status = true) {
    // console.log(appData.ui.controls.hideInOption);

    // this.hideControlsIn;

    if (this.hideControlsIn) {
      clearTimeout(this.hideControlsIn);
    }

    if (
      !this.ref['hideControl-input-checkbox'].checked ||
      !appData.ui.controls.hideInIsActive ||
      this.ref.video.paused ||
      !status
    ) {
      return null;
    }

    const setTimeoutTime = Number(appData.ui.controls.hideInValue) * 1000;

    this.hideControlsIn = setTimeout(() => {
      if (!this.ref.video.paused) {
        this.ref.inputToggleControl.checked = false;
      }
    }, setTimeoutTime);

    return this.hideControlsIn;
  }

  _event(target, type, callback, options = {}) {
    target.addEventListener(type, callback, options);
    return () => target.removeEventListener(type, callback, options);
  }

  _fromSecondsToTime(seconds) {
    seconds = parseInt(seconds);

    return {
      hours: Math.floor(seconds / 3600),
      minutes: Math.floor((seconds % 3600) / 60),
      seconds: seconds % 60,
    };
  }

  _getPercentage(current, total) {
    return (parseFloat(current) / parseFloat(total)) * 100;
  }

  _getDistance(touches) {
    let dx = touches[0].clientX - touches[1].clientX;
    let dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  _callbackTryCatch(callbackTry = null, callbackCatch = null, ...parameters) {
    try {
      return callbackTry?.(...parameters) ?? callbackTry;
    } catch (error) {
      return callbackCatch?.(error) ?? callbackCatch;
    }
  }

  _draw(video, canvas, context) {
    if (!video.paused && !video.ended) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      requestAnimationFrame(() => this._draw(video, canvas, context));
    }
  }

  m3u8(url) {
    const video = this.ref.video;

    if (Hls.isSupported()) {
      const hls = new Hls();

      this.hls = hls;

      hls.loadSource(url);

      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });

      hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
        appData.ui.quality.options = [
          {
            label: 'Auto',
            value: -1,
          },
          ...Array.from(data.levels).map((level, index) => {
            return {
              label: level.width + 'p',
              value: index,
            };
          }),
        ];

        appData.ui.quality.value = -1;
        // this.qualities = data.levels;
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Safari
      video.src = url;
      video.addEventListener('loadedmetadata', () => {
        video.play();
      });
    }
  }

  changeQuality(index) {
    this.hls.currentLevel = Number(index);
  }

  requestFullscreen() {
    this.target.requestFullscreen();
  }

  playPause() {
    const video = this.ref.video;
    video.paused ? video.play() : video.pause();
    return video.paused;
  }

  clear() {
    this.ref.video.src = '';
  }
}

const mediaPlayer = new MediaPlayer();
window.mediaPlayer = mediaPlayer;

createApp(appData).mount('#app');
