const readline = require("readline")


const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout
});


function sub(p1 , p2) {
    return p1 - p2
}
function mult(p1 , p2) {
    return p1 * p2
}
function div(p1 , p2) {
    return p1 / p2
}
rl.question("Chose a number for p1 :",(p1)=>{
    rl.question("Chose a number for p2 :",(p2)=>{
        rl.question("chose an operation (add || sub || mult || div) :",(res)=>{
            switch (res) {
                case "add":
                    console.log(add(p1,p2));
                    break;
                case "sub":
                    console.log(sub(p1,p2));
                    break;
                case "mult":
                    console.log(mult(p1,p2));
                    break;
                case "div":
                    console.log(div(p1,p2));
                    break;   
                default:
                    break;
            }
            rl.close();
        }
        )
    })
}
)