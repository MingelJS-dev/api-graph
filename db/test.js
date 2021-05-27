function sortRoman(names) {
    // Write your code here
    let result;
    const romanValues = {
        'I': 1,
        'V': 5,
        'X': 10,
        'L': 50
    }


    let array = []

    result = names.map(item => {

        const [name, number] = item.split(" ")
        let int = 0
        for (let i = 0; i < number.length; i++) {
            current = romanValues[number.charAt(i)]
            prev = romanValues[number.charAt(i - 1)]

            if (current > prev) {
                int += current - prev*2
            } else {
                int += current
            }
 
        }
        array.push({ name, int, number })
    })
    result = array.sort(function (x, y) { return x.name.localeCompare(y.name) || x.int - y.int; }).map(result => result.name + ' ' + result.number);

    return result

}

function superStack(operations) {
    let arrayResult = []

    let functions = {
        push: (int, array, int2) => {
            array.push(int)
        },
        pop: (int, array, int2) => {
            array.pop(int)
        },
        inc: (int, array, int2) => {
            for (let i = int2 - 1; i < int2; i++) {
                array[i] = parseInt(array[i]) + parseInt(int)
            }
        }
    }
    operations.map(ope => {
        const [action, int, int2] = ope.split(" ")
        functions[action](int,arrayResult, int2)
    })
}

