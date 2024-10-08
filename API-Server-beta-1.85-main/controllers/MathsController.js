import Model from '../models/model.js';
import Repository from '../models/repository.js';
import Controller from './Controller.js';
import { isPrime, findPrime, factorial } from '../mathUtilities.js';

export default class MathsController extends Controller {
    constructor(HttpContext) {
        super(HttpContext, new Repository(new Model));
    }

    get() {
        let params = this.HttpContext.path.params;
        let value;
        let error = "";
        let data = {};
        if (params["op"] == undefined || params["op"] == "") {
            error = "'op' parameter is missing";
        }
        else {
            if (params["op"] == "+" || params["op"] == " " || params["op"] == "-" || params["op"] == "*" || params["op"] == "/" || params["op"] == "%") {
                if (params["x"] == undefined || params["x"] == "") {
                    error = "x parameter is missing";
                }
                else if (Object.keys(params).length > 3){
                    error = "too many parameters";
                }
                else if (isNaN(params["x"])){
                    error = "x parameter is not a number";
                }
                else if (params["y"] == undefined || params["y"] == "") {
                    error = "y parameter is missing";
                }
                else if (isNaN(params["y"])){
                    error = "y parameter is not a number";
                }
                else {
                    switch (params["op"]) {
                        case "+":
                        case " ":
                            value = Number(params["x"]) + Number(params["y"]);
                            break;
                        case "-":
                            value = params["x"] - params["y"];
                            break;
                        case "*":
                            value = params["x"] * params["y"];
                            break;
                        case "/":
                            value = params["x"] / params["y"];
                            break;
                        case "%":
                            value = params["x"] % params["y"];
                            break;
                    }
                }
            }
            else if (params["op"] == "!" || params["op"] == "p" || params["op"] == "np"){
                if (params["n"] == undefined || params["n"] == "") {
                    error = "n parameter is missing";
                }
                else if (Object.keys(params).length > 2){
                    error = "too many parameters";
                }
                else if (isNaN(params["n"])){
                    error = "n parameter is not a number";
                }
                else if (!Number.isInteger(Number(params["n"])) || params["n"] <= 0) {
                    error = "n parameter must be an integer > 0";
                }
                else {
                    switch (params["op"]) {
                        case "!":
                            value = factorial(params["n"]);
                            break;
                            case "p":
                            value = isPrime(params["n"]);
                            break;
                        case "np":
                            value = findPrime(params["n"]); 
                            break;
                    }
                }
            }
        }
        if(value == undefined){
            data =  {...params, error}
        }
        else{
            data = {...params, value};
        }
        this.HttpContext.response.JSON(data);
    }

    post() {
        this.HttpContext.response.notImplemented(this.repository.model.state.console.errors);
    }

    put() {
        this.HttpContext.response.notImplemented(this.repository.model.state.console.errors);
    }

    remove() {
        this.HttpContext.response.notImplemented(this.repository.model.state.console.errors);
    }
}