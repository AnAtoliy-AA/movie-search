import CardContainer from './js/main-container/card-container';
import Header from './js/header';
import Footer from './js/footer';
import VirtualKeyboard from './js/virtual-keyboard/virtual-keyboard';
import VirtualScreen from './js/main-container/virtual-screen';

const header = new Header();
const screen = new VirtualScreen();
const cardContainer = new CardContainer();
const keyboard = new VirtualKeyboard();
const footer = new Footer();

keyboard.setScreen(screen);
keyboard.setContainer(cardContainer);
