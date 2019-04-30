var mysql = require("mysql");
var inquirer = require("inquirer")
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "Anita63!",
    database: "bamazoneDB"
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    console.log("---------------------")
    console.log("welcome to bamazone")
    console.log("---------------------")
    queryallproducts();

});

function queryallproducts() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID : " + res[i].id + " | " + "product : " + res[i].product_name + " | " + "price : " + res[i].price);
        }
        console.log("-----------------------------------");
        inq(res)
    });
}
function inq(res) {
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "what is the id of the product you want to buy?"
    },
    {
        name: "quantity",
        type: "input",
        message: "how many you want to buy?"

    }
    ])
        .then(function (answer) {
            for (var i = 0; i < res.length; i++) {
                var product = res[i]
                if (answer.id == product.id) {
                    if (answer.quantity <= product.stock_quantity) {
                        connection.query("UPDATE products SET stock_quantity= stock_quantity-" + answer.quantity + " where id=" + answer.id, function (err, data) {
                            console.log("-------------------------")
                            console.log("your total is $" + (answer.quantity * product.price) + " thank you")
                            console.log("---------------------")
                            console.log("welcome to bamazone")
                            console.log("---------------------")
                            queryallproducts()
                        })


                    } else {
                        console.log("---------------------------------------"),
                            console.log("insufficient quantity"),
                            console.log("--------------------------------------------")
                        console.log("welcome to bamazone")
                        console.log("---------------------")
                        queryallproducts()
                    }

                    break

                }
            }

        })
}
