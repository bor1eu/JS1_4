// 1) Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, надо получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. Например, для числа 245 надо получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
function task1 () {
    let userNum = +prompt ("Введите число от 0 до 999")
    let resultObj = createObj (userNum)
    console.log
}

function createObj (inputNum) {
    if (inputNum > 999) {
        console.log ("Введено число больше 999")
        return {}
    } else {
        return {
            'единицы': inputNum % 10,
            'десятки': (inputNum % 100 - inputNum % 10) / 10,
            'сотни': (inputNum - inputNum % 100) / 100
        }
    }
}

// 2) Продолжить работу с интернет-магазином:
// В прошлом домашнем задании вы реализовали корзину на базе массивов.
// Какими объектами можно заменить их элементы?
// Реализуйте такие объекты.
// Перенести добавление товара на ОО базу
// Реализовать функционал подсчета корзины на ОО базу.
//ИМИТАЦИЯ РАБОТЫ БАЗЫ ДАННЫХ И СЕРВЕРА

let PRODUCTS_NAMES = ['Processor', 'Display', 'Notebook', 'Mouse', 'Keyboard']
let PRICES = [100, 120, 1000, 15, 18]
let IDS = [0, 1, 2, 3, 4]

let products = [] //массив объектов

let cart = {
    items: [],
//    total: this.totalSum (),
    totalSum () {
        let result = 0
        this.items.forEach (el => {
            result += el.price * el.quantity
        })
        return result
    }
}

function getData () {
    for (let i = 0; i < IDS.length; i++) {
        products.push (createNewProduct (i))
    }
}

function createNewProduct (index) {
    return {
        product_name: PRODUCTS_NAMES [index],
        price: PRICES [index],
        product_id: IDS [index]
    }
}

function addProduct (id) {
    let find = products.find (el => el.product_id === id)
    let find2 = cart.items.find (el => el.product_id === id)
    if (find2 == undefined) {
        cart.items.push (Object.assign ({}, find, {quantity: 1}))
    } else {
        find2.quantity++
    }
}


// 3) * Подумать над глобальными сущностями. К примеру, сущность 
// «Продукт» в интернет-магазине актуальна не только для корзины, 
// но и для каталога. Стремиться нужно к тому, чтобы объект «Продукт» 
// имел единую структуру для различных модулей сайта, но в разных 
// местах давал возможность вызывать разные методы.

// 4) **Переделать реализованные ранее законченные продукты 
// (камень-ножницы, быки-коровы) в объекты

// камень-ножницы в ООП
function stonePaperScissors () {
    let players = {
        comp: 0,
        user: 0,
        match () {
            if ((this.user === 0 && this.comp === 1) || (this.user === 1 && this.comp === 2) || (this.user === 2 && this.comp === 0)) {
                return ('Пользователь победил! ' + this.translate (this.user) +'; ' + this.translate (this.comp))
            } else if (this.comp === this.user) {
                return ('Ничья')
            } else {
                return ('Пользователь проиграл! ' + this.translate (this.user) +'; ' + this.translate (this.comp))
            }
        },
        translate (ch) {
            return ch === 0 ? 'Камень' : (ch === 1 ? 'Ножницы' : 'Бумага')
        }
    }
    players.user = +prompt ("Камень = 0, Ножницы = 1, Бумага = 2, Конец игры = 3")
    players.comp = getPC ()
    if (players.user != 3) {
        console.log (players.match ())
        stonePaperScissors ()
    }
}

function getPC () {
    return Math.floor (Math.random () * 3) // [0 - 2]
}

// быки-коровы в ООП
//игрок пытается отгадать число, загаданное компьютером
// 10 ходов
// цифры не могут повторяться (1234 + ///// 1122 -)

// 1234 было загадано, то
// 0123 - 3 коровы
// 1789 - 1 бык
// 1458 - 1 бык 1 корова

 function bullsCows () {
    let puzzle = {
        number: [],
        user: [],
        rounds: 10,
        match (guess, answer) {
            let bulls = 0;
            let cows = 0;
            guess.forEach (function (num, index) {
                if (+num === answer [index]) {
                    bulls ++
                } else if (answer.indexOf (+num) >= 0) {
                    cows ++
                }
            })
            console.log (`Ваш вариант ${guess}`)
            console.log (`Cows: ${cows}; Bulls: ${bulls}`)

            this.playing = (bulls < 4) ? true : false
        },
        playing: true
    }

    puzzle.number = getNumber ()
    
    while (puzzle.playing) {
        puzzle.user = [...prompt ('Введите число')]
        if (puzzle.rounds >= 1) {
            puzzle.match (puzzle.user, puzzle.number)
            puzzle.playing ? console.log (`Осталось ${--puzzle.rounds} ходов`) : console.log (`You win: ` + puzzle.user)
        } else {
            puzzle.playing = false
            console.log (`You loose: ` + puzzle.number)
        }
    }
}

function getNumber () {
    let arr = []
    while (arr.length < 4) {
        let num = randomize()
        if (arr.indexOf (num) === -1) {
            arr.push (num)
        }
    }
    return arr
}

function randomize () {
    return Math.floor (Math.random () * 10)
}

