function for1() {
    for (var i = 1; i < 100; i++) {
        if (i % 5 === 0) {
            console.log(i);
        }
    }
}

function for2() {
    for (var i = 5; i < 100; i += 5) {
        console.log(i);
    }
}

// A break es continue utasitasokat a for, a while es a do-while ciklusokban lehet hasznalni.
function bAndC() {
    for (var i = 0; i < 20; i++) {
        if (i === 16) {
            // A break azonnal kilep a ciklusbol, es a ciklus utan levo utasitasokat hajtja vegre.
            break;
        }
        console.log(i);
        if (i % 2 === 0) {
            // A continue az aktualis ciklus futasbol lep ki, de nem allitja le a teljes ciklust. Az tovabb fog menni,
            // de kezdi elolrol a ciklusmag futasat. Tehat ami a ciklusmagban van a continue utan, azok mar nem futnak
            // le az aktualis ciklusban.
            continue;
        }
        console.log('az elozo szam paratlan volt');
    }
}

function funcAsVariable() {
    // JavaScriptben egy valtozo erteke lehet egy function.
    var a = function() {
        // Ezert visszateresi ertek is lehet function.
        console.log('en voltam az elso');
        return function() {
            // Igy meg lehet hivni a meghivott function visszateresi erteket.
            console.log('en voltam a masodik');
            return function() {
                console.log('en meg mar elvesztem');
                return function() {
                    console.log('functioninception')
                }
            }
        }
    };

    // Itt meghivja az a function, mely visszater egy functionnel, amit meghivunk, ami visszater egy functionnel,
    // amit meghivunk.
    // A functioninception azert nem irodik ki, mert az utolso function-t nem hivtuk meg.
    // De ha a()()()(); lenne, akkor mar az is kiirodna.
    a()()();
}

// Egy map tartalmara ket modon hivatkozhatunk:
// 1. map.alma
// 2. map['alma']
function playWithMaps() {
    var map = {
        a: 10,
        b: 20,
        c: 'b',
        30: 'duck'
    };

    console.log('map.a: ', map.a);
    console.log('map.b: ', map.b);
    console.log('map.c: ', map.c);
    console.log('map[\'a\']: ', map['a']);
    console.log('map[map[\'c\']]: ', map[map['c']]);
    // map[ map.a (10) + map.b (20) = 30 ]
    console.log('map[map[\'a\'] + map.b]: ', map[map['a'] + map.b]);
}

function stateExample() {
    var states = {
        green: {
            color: 'green',
            func: function() {
                console.log('Go!');
            },
            next: 'yellow'
        },
        red: {
            color: 'red',
            func: function() {
                console.log('Stop!');
            },
            next: 'green'
        },
        yellow: {
            color: 'yellow',
            func: function() {
                console.log('Hurry!');
            },
            next: 'red'
        }
    };
    var trafficLight = states.red;
    for (var i = 0; i < 5; i++) {
        console.log('My color is ' + trafficLight.color + '. It means:');
        trafficLight.func();
        trafficLight = states[trafficLight.next];
    }
}

// A filter function segitsegevel egy tomb elemeibol kivalogathatjuk a szamunkra szuksegeseket. Ha a parameterkent
// kapott function true ertekkel ter vissza, akkor az adott elem kivalasztasra kerul.
function filterExample() {
    var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // Kivalasztja az 5-nel nagyobb szamokat. A functiont egy valtozo tartalmazza.
    var greaterThanFiveFilter = function(value) {
        return value > 5;
    };

    // Kivalasztja a 2-t, 5-ot es a 9-et. Ez egy anonim function.
    var filtered1 = array.filter(function(value) {
        return value === 2 || value === 5 || value === 9;
    });
    // Atadjuk a greaterThanFiveFilter valtozot parameterkent, amely tartalma egy function. Mivel a
    // greaterThanFiveFilter egy valtozo, ezert azt a ra valo hivatkozas elott deklaralni kell!
    var filtered2 = array.filter(greaterThanFiveFilter);
    // Atadjuk az oddFilter functiont, mint parameter. Mivel az egy function, ezert (majdnem) teljesen mindegy, hogy hol
    // hozzuk letre azt.
    var filtered3 = array.filter(oddFilter);

    console.log(filtered1);
    console.log(filtered2);
    console.log(filtered3);

    // Kivalasztja a paratlan szamokat (a 0 false erteket jelent, ezert ha az osztasi maradek 0, tehat paros szamrol
    // van szo, akkor az nem fog kivalasztasra kerulni).
    function oddFilter(value) {
        return value % 2;
    }
}