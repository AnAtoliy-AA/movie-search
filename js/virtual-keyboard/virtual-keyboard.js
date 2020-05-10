
import createVirtualKeyboardKeys from './create-virtual-keyboard-keys';

const KEY_CODES = {
  SHIFT_LEFT: '16_1',
  SHIFT_RIGHT: '16_2',
  CAPSLOCK: '20',
  ALT_LEFT: '18_1',
  ALT_RIGHT: '18_2',
  CTRL_LEFT: '17_1',
  CTRL_RIGHT: '17_2',
};

const KEY_VALUES = {
  CAPSLOCK: 'capsLock',
  CHANGE_LANG: 'lang',
  BACKSPACE: 'backspace',
  DELETE: 'del',
  SPACE: 'space',
  TAB: 'tab',
  ENTER: 'enter',
  LEFT_ARROW: 'leftArrow',
  RIGHT_ARROW: 'rightArrow',
};

const NOT_PROCESSED_KEYS = [
  '112', '113', '114', '115', '116', '117',
  '118', '119', '120', '121', '122', '123',
];

function getKeyCodeFromEvent(event) {
  return event.location !== 0 ? `${event.keyCode}_${event.location}` : `${event.keyCode}`;
}
class VirtualKeyboard {
  constructor() {
    this.englishLanguage = sessionStorage.lastSelectedLanguage === 'true';
    this.cssClassNameConfig = {
      keyboardKeyActive: 'keyboard__key_active',
    };
    this.vKeys = createVirtualKeyboardKeys();

    this.domScreen = document.getElementById('search-text');
    this.domKeyboard = this.createDomKeyboard();
    this.domKeys = document.querySelectorAll('.keyboard__key');
    this.addActiveKeyboardKey();
    this.bindPhysicalKeyboardEvents();
    this.capsLockEnabled = false;
    this.shiftPressed = false;
    this.keepPressedButtonsArray = [];
    this.toggleVirtualKeyboard();
  }

  createDomKeyboard() {
    const { body } = document;
    const keyboard = document.createElement('div');
    const keyArr = createVirtualKeyboardKeys();

    body.appendChild(keyboard);
    keyboard.classList.add('virtual-keyboard', 'wrapper', 'hidden');

    for (let i = 1; i < 6; i++) {
      const domKeyboardRow = document.createElement('div');

      domKeyboardRow.id = `row_${i}`;
      domKeyboardRow.classList.add('keyboard__row');
      keyboard.appendChild(domKeyboardRow);
    }

    for (let i = 0; i < keyArr.length; i++) {
      const kKey = keyArr[i];
      const el = document.createElement('div');

      el.innerHTML = this.englishLanguage ? kKey.valueLabel : kKey.rusValueLabel;
      el.style.width = `${kKey.width}px`;
      el.classList.add('keyboard__key');
      el.id = kKey.id;
      document.getElementById(`row_${kKey.row}`).appendChild(el);
    }

    return keyboard;
  }

  addActiveKeyboardKey() {
    this.domKeys.forEach((e) => {
      e.addEventListener('mousedown', (event) => {
        // CAPS LOCK
        if (event.target.id !== KEY_CODES.CAPSLOCK) {
          event.target.classList.add(this.cssClassNameConfig.keyboardKeyActive);
        }
        this.pressKey(event);
      });
      e.addEventListener('mouseup', () => {
        this.domKeys.forEach((el) => this.removeClassKeyActive(el));
        this.domScreen.focus();
      });
    });
  }

  removeClassKeyActive(domKey) {
    domKey.classList.remove(this.cssClassNameConfig.keyboardKeyActive);
  }

  bindPhysicalKeyboardEvents() {
    const domKeys = [...this.domKeys];

    document.addEventListener('keydown', (event) => {
      const isNotProcessedKey = !NOT_PROCESSED_KEYS.some((k) => k === getKeyCodeFromEvent(event));

      if (isNotProcessedKey) {
        const activeKey = domKeys.find((e) => e.id === getKeyCodeFromEvent(event));

        if (activeKey) {
          if (activeKey.id !== KEY_CODES.CAPSLOCK) {
            activeKey.classList.add(this.cssClassNameConfig.keyboardKeyActive);
          }
          this.addKeepPressedButtonsArray(activeKey.id);
          this.pressKey(event);
        }

        event.preventDefault();
      }
    });

    document.addEventListener('keyup', (event) => {
      const activeKey = domKeys.find((e) => e.id === getKeyCodeFromEvent(event));

      if (activeKey) {
        domKeys.forEach((el) => this.removeClassKeyActive(el));
        this.removeKeepPressedButtonsArray(activeKey.id);
      }

      if (`${event.keyCode}` === KEY_CODES.SHIFT_LEFT) {
        this.disableShift();
      }
      this.analysePressedKeys();
    });
  }

  addKeepPressedButtonsArray(id) {
    if (this.keepPressedButtonsArray.indexOf(id) === -1) {
      this.keepPressedButtonsArray.push(id);
    }
  }

  removeKeepPressedButtonsArray(id) {
    const index = this.keepPressedButtonsArray.indexOf(id);

    this.keepPressedButtonsArray.splice(index, 1);
  }

  toggleCapsLock() {
    this.capsLockEnabled = !this.capsLockEnabled;
    document.getElementById(KEY_CODES.CAPSLOCK).classList.toggle('keyboard__caps-lock_active');
  }

  prepareSymbolToShowInScreen(vKey) {
    let result = '';

    if (this.englishLanguage) {
      if (this.capsLockEnabled) {
        if (this.shiftPressed) {
          result = vKey.alternativeValue || vKey.value.toLowerCase();
        } else {
          result = vKey.value.toUpperCase();
        }
      } else if (this.shiftPressed) {
        result = vKey.alternativeValue || vKey.value.toUpperCase();
      } else {
        result = vKey.value.toLowerCase();
      }
    } else if (this.capsLockEnabled) {
      if (this.shiftPressed) {
        result = vKey.alternativeValue || vKey.rusValue.toLowerCase();
      } else {
        result = vKey.rusValue.toUpperCase();
      }
    } else if (this.shiftPressed) {
      result = vKey.rusAlternativeValue || vKey.rusValue.toUpperCase();
    } else {
      result = vKey.rusValue.toLowerCase();
    }

    return result;
  }

  analysePressedKeys() {
    // Alt+Shift
    if (this.keepPressedButtonsArray.filter((e) => e === KEY_CODES.ALT_LEFT
      || e === KEY_CODES.ALT_RIGHT
      || e === KEY_CODES.SHIFT_LEFT || e === KEY_CODES.SHIFT_RIGHT).length === 2) {
      this.toggleEnglishLanguage();
    }
    // Shift pressed
    if (this.keepPressedButtonsArray.filter((e) => e === KEY_CODES.SHIFT_LEFT
      || e === KEY_CODES.SHIFT_RIGHT).length === 1) {
      this.enableShift();
    }
    // Shift unpressed
    if (this.keepPressedButtonsArray.filter((e) => e === KEY_CODES.SHIFT_LEFT
      || e === KEY_CODES.SHIFT_RIGHT).length === 0) {
      this.disableShift();
    }
    this.setVirtualKeyboardKeyCase();
  }

  enableShift() {
    this.shiftPressed = true;
  }

  disableShift() {
    this.shiftPressed = false;
  }

  setVirtualKeyboardKeyCase() {
    const domKeys = [...this.domKeys];

    domKeys
      // filters only letters to change regiter
      .filter((el) => el.innerHTML && el.innerHTML.length === 1)
      .forEach((el) => {
        const domKey = el;

        if ((this.shiftPressed && this.capsLockEnabled)
          || (!this.shiftPressed && !this.capsLockEnabled)) {
          domKey.innerHTML = domKey.innerHTML.toLowerCase();
        } else {
          domKey.innerHTML = domKey.innerHTML.toUpperCase();
        }
      });
  }

  toggleEnglishLanguage() {
    this.englishLanguage = !this.englishLanguage;

    sessionStorage.setItem('lastSelectedLanguage', this.englishLanguage);

    this.domKeys.forEach((el) => {
      const domKey = el;
      const key = this.vKeys.find((e) => e.id === domKey.id);
      const engVal = key.valueLabel;
      const rusVal = key.rusValueLabel;

      domKey.innerHTML = this.englishLanguage ? engVal : rusVal;
    });
  }

  pressKey(event) {
    this.analysePressedKeys();

    const vKey = this.vKeys.find((el) => el.id === event.target.id
      || el.id === getKeyCodeFromEvent(event));

    switch (vKey.value) {
      case KEY_VALUES.CAPSLOCK:
        this.toggleCapsLock();
        break;
      case KEY_VALUES.CHANGE_LANG:
        this.toggleEnglishLanguage();
        break;
      case KEY_VALUES.BACKSPACE:
        this.vScreen.removeLastSymbol();
        break;
      case KEY_VALUES.DELETE:
        this.vScreen.removeRightSymbol();
        break;
      case KEY_VALUES.SPACE:
        this.vScreen.addSpaceToScreen();
        break;
      case KEY_VALUES.TAB:
        this.vScreen.addTabToScreen();
        break;
      case KEY_VALUES.LEFT_ARROW:
        this.vScreen.leftArrowMove();
        break;
      case KEY_VALUES.RIGHT_ARROW:
        this.vScreen.rightArrowMove();
        break;
      case KEY_VALUES.ENTER:
        this.vContainer.clearSwiperContainer();
        this.vContainer.submitTextFromSearchForm();
        break;
      default:
        this.vScreen.addSymbolToScreen(this.prepareSymbolToShowInScreen(vKey));
    }
  }

  toggleVirtualKeyboard() {
    const virtualKeyboardImg = document.querySelector('.keyboard-image');

    virtualKeyboardImg.addEventListener('click', () => {
      this.domKeyboard.classList.toggle('hidden');
    });
  }

  setScreen(screen) {
    this.vScreen = screen;
  }

  setContainer(cardContainer) {
    this.vContainer = cardContainer;
  }
}

export default VirtualKeyboard;
