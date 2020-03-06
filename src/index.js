function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // console.log(expr);
    let expr_out =Array()
    let stack = ''

    expr.split('').forEach(x => {
        if(/[-+/*\(\)]/.test(x)){
            if(stack.length != 0){
                expr_out.push(Number(stack))
                stack = ''
            }
            expr_out.push(x);
        }else if(/[0-9]/.test(x)){
            stack += x;
        }else{

        }
    })
    if(stack.length != 0){
        expr_out.push(Number(stack));
        stack = '';
    }

    expr = expr_out;

    stack = Array();
    let out = Array();

    expr.forEach(x => {
        if(Number.isInteger(x)){
            out.push(x);
        } else if(x == '('){
            stack.push(x);
        } else if(x == ')'){
            for(let i = 0 ;;){
                let el = stack.pop();
                if (el == '('){
                    break
                }
                if(el == undefined){
                    throw Error('ExpressionError: Brackets must be paired')
                } else if(el != '('){
                    out.push(el);
                    continue;
                } else {}
            }
        } else {
            for(;;){
                if (/[-+]/.test(x) && /[*/]/.test(stack[stack.length-1])){
                    out.push(stack.pop());
                } else if(/[*/]/.test(x) && /[*/]/.test(stack[stack.length-1])){
                    out.push(stack.pop());
                } else if(/[-+]/.test(x) && /[-+]/.test(stack[stack.length-1])){
                    out.push(stack.pop());
                } else {
                    break
                }
            }


            if (/[-+]/.test(x) && /[*/]/.test(stack[stack.length-1])){
                out.push(stack.pop());
            } else if(/[*/]/.test(x) && /[*/]/.test(stack[stack.length-1])){
                out.push(stack.pop());
            } else if(/[-+]/.test(x) && /[-+]/.test(stack[stack.length-1])){
                out.push(stack.pop());
            }
            stack.push(x);
        }
    });
    for(;;){
        let el = stack.pop()
        if(el == '('){
            throw Error('ExpressionError: Brackets must be paired')
        }else if(el != undefined){
            out.push(el);
        }else {
            break;
        }
    }

    for(let xx = 0; xx < 100; xx++){  //let i = 0; i< out.length; i++
        if(out.length == 1){
            // console.log('calculate break')
            break;
        }
        for(let i = 0; i< out.length; i++){
            if(/^[-+/*]$/.test(out[i])){
                let res = 0;
                if(out[i] == '-'){
                    res = out[i-2] - out[i-1]
                } else if(out[i] == '+'){
                    res = out[i-2] + out[i-1]
                } else if(out[i] == '/'){
                    if(out[i-1]==0){
                        throw TypeError('TypeError: Division by zero.')
                    } 
                    res = out[i-2] / out[i-1]
                } else if(out[i] == '*'){
                    res = out[i-2] * out[i-1]
                }
                out.splice(i-2, 3, res);
                break;
            }   
        }
    }
    return out[0];
}

module.exports = {
    expressionCalculator
}