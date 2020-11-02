//money
let money = 1000;
let moneyshower = document.querySelector('.js-money-shower');
//money per second
let moneyPerSecond = 0;
let moneyshowerPerSecond = document.querySelector('.js-money-per-second');
//cookie
const cookie = document.querySelector('.cookie');
//buildings
const showbuildings = document.querySelector('.js-show-buildings');
const buildings = document.querySelector('.js-buildings');
//factory
const factorydiv = document.querySelector('.js-factory-div');
const factorybuy = document.querySelector('.js-factory-buy');
const factorybuyworkers = document.querySelector('.js-factory-buyworkers');
const factory = document.querySelector('.js-factory');
let factorydescription = document.querySelector('.js-factory-description');
let factoryowned = false;
let factoryworkersmax = 0;
let factorylevel = 0;
let factoryprice = [25, 100, 300, 500];
let workersprice = [0, 10, 50, 100, 400]
let workerasecond = [0, 0.1, 0.5, 1, 4];
let workers = 0;
//casino
const showcasino = document.querySelector('.js-show-casino');
const casino = document.querySelector('.js-casino');


function notification(message) {
    Toastify({
        text: message,
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        backgroundColor: "red",
        className: 'notification',
        stopOnFocus: true, // Prevents dismissing of toast on hover
        onClick: function () { } // Callback after click
    }).showToast();
}

function CreateFactory() {
    if (money >= factoryprice[factorylevel]) {
        money -= factoryprice[factorylevel];
        factorylevel++;
        factoryworkersmax = factoryworkersmax + 15;
        factorydescription.innerHTML = '🏭 upgrade : ' + factoryprice[factorylevel] + '🍪. workers cost ' + workersprice[factorylevel] + '🍪  earns ' + workerasecond[factorylevel] + '🍪 a second';
        factory.innerHTML = '🏭 Level : ' + factorylevel + ' | workers : ' + workers + ' / ' + factoryworkersmax;

        const style = getStyle('.js-factory', 'display');
        if (style === 'none') {
            factory.style.display = 'block';
            factorybuy.innerHTML = 'level up';
            factorybuyworkers.style.display = 'inline-block';
        }
    }
    else {
        notification('You dont have enough money');
    }
}

factorybuy.addEventListener('click', () => {

    if (factorylevel == 0) {
        CreateFactory();
    }
    else if (workers >= factoryworkersmax) {
        CreateFactory();
    } else {
        notification('You dont have max workers yet');
    }
});

factorybuyworkers.addEventListener('click', () => {
    if (factorylevel === factorylevel) {
        if (workers !== factoryworkersmax) {
            if (money >= workersprice[factorylevel]) {
                workers++;
                money -= workersprice[factorylevel];
                factory.innerHTML = '🏭 Level : ' + factorylevel + ' | workers : ' + workers + ' / ' + factoryworkersmax;
                moneyPerSecond = moneyPerSecond + workerasecond[factorylevel];
            }
            else {
                notification('You dont have enough money');

            }

        }
        else {
            notification('You have max workers');
        }
    }
});

cookie.addEventListener('click', () => {
    money++;
    moneyshower.innerHTML = '🍪 : ' + money.toFixed(1);
});

showbuildings.addEventListener('click', () => {
    const style = getStyle('.js-buildings', 'display');
    if (style === 'none') {
        showbuildings.innerHTML = 'hide buildings';
        buildings.style.display = 'block';
    }
    else {
        showbuildings.innerHTML = 'show buildings';
        buildings.style.display = 'none';
    }
});

showcasino.addEventListener('click', () => {
    console.log('click  casino');
    const style = getStyle('.js-casino', 'display');
    if (style === 'none') {
        showcasino.innerHTML = 'hide casino';
        casino.style.display = 'block';
    }
    else {
        showcasino.innerHTML = 'show casino';
        casino.style.display = 'none';
    }
});

setInterval(() => {
    money = money + moneyPerSecond;
    moneyshower.innerHTML = '🍪 : ' + money.toFixed(1);
    moneyshowerPerSecond.innerHTML = '🍪 per second : ' + moneyPerSecond.toFixed(1);
}, 1000);

function getStyle(el, name) {
    const element = document.querySelector(el);
    return element.currentStyle ? element.currentStyle[name] : window.getComputedStyle ? window.getComputedStyle(element, null).getPropertyValue(name) : null;
}
