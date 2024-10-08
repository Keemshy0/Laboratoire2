let API_URL = "http://localhost:5000/api/maths";
let erreur = 0;
Init_UI();


async function Get(id = null) {
    return new Promise(resolve => {
        $.ajax({
            url: API_URL + (id ? "?" + id : ""),
            success: contacts => { resolve(contacts); },
            error: (xhr) => { console.log(xhr); resolve(null); }
        });
    });
}

function Init_UI() {
    renderMaths();
    $('#get').on("click", async function () {
        API_URL = $("#url").val();;
        renderMaths();
    });
}

async function test() {
    let tabRep = [];
    let tabTest = ["op=+&x=-111&y=-244", "op=-&x=1&y=abc", "op=p&n=a", "op=-&x=111&y=244", "op=*&x=11.56&y=244.12345", "op=/&x=99&y=11.06",
        "op=/&x=99&y=0", "op=/&x=0&y=0", "op=%&x=5&y=5", "op=%&x=100&y=13", "op=%&x=100&y=0", "op=%&x=0&y=0", "op=!&n=0", "op=p&n=0", "op=p&n=1",
        "op=p&n=2", "op=p&n=5", "op=p&n=6", "op=p&n=6.5", "op=p&n=113", "op=p&n=114", "op=np&n=1", "op=np&n=30", "op=+&X=111&y=244", "op=+&x=111&Y=244",
        "op=+&x=111&y=244&z=0", "op=!&n=5&z=0", "op=!&n=5.5", "z=0", "op=!&n=-5", "x="
    ];

    for (const math of tabTest) {
        const result = await Get(math);
        tabRep.push(result);
    }

    return tabRep;
}

async function renderMaths() {
    showWaitingGif();
    let Maths = await test();
    console.log(Maths);
    eraseContent();
    if (Maths) {
        Maths.forEach(Math => {
            $("#content").append(renderMath(Math));
        });
        if (erreur > 0) {
            $('#result').append($(
                `
                <div>
                    Nombre d'erreur: ${erreur}
                </div>
                `
            ));
        }else{
            $('#result').append($(
                `
                <div>
                    Bravo! Aucun problème rencontrer.
                </div>
                `
            ));
        }
    } else {
        renderError("Service introuvable");
    }
}
function showWaitingGif() {
    $("#content").empty();
    $("#content").append($("<div class='waitingGifcontainer'><img class='waitingGif' src='Loading_icon.gif' /></div>'"));
}
function eraseContent() {
    $("#content").empty();
}
function renderError(message) {
    eraseContent();
    $("#content").append(
        $(`
            <div class="errorContainer">
                ${message}
            </div>
        `)
    );
}
function renderMath(math) {
    let n = "";
    let x = "";
    let y = "";
    let op = "";
    let answer = "";
    let expected = "";
    let result = '';

    for (const [key, value] of Object.entries(math)) {
        if (key == "op")
            op = value;
        if (key == "x")
            x = value;
        if (key == "y")
            y = value;
        if (key == "n")
            n = value;
        if (key == "value")
            answer = value;
        result += `"${key}":"${value}" `;
    }
    if (answer != "") {
        switch (op) {
            case " ":
                expected = Number(x) + Number(y);
                break;
            case "-":
                expected = x - y;
                break;
            case "*":
                expected = x * y;
                break;
            case "/":
                expected = x / y;
                break;
            case "%":
                expected = x % y;
                break;
            case "!":
                expected = factorial(n);
                break;
            case "p":
                expected = isPrime(n);
                break;
            case "np":
                expected = findPrime(n);
                break;
        }
        if (answer !== expected) {
            erreur++;
            return $(`
                <div>
                    Erreur ---> ${result}
                </div>
            `);
        }
    }
    return $(`
        <div>
            OK ---> ${result}
        </div>
    `);
}

function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
function isPrime(value) {
    for (var i = 2; i < value; i++) {
        if (value % i === 0) {
            return false;
        }
    }
    return value > 1;
}
function findPrime(n) {
    let primeNumber = 0;
    for (let i = 0; i < n; i++) {
        primeNumber++;
        while (!isPrime(primeNumber)) {
            primeNumber++;
        }
    }
    return primeNumber;
}