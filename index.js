// Нужно создать двумерный массив 10х10 с случайными числами в интервале [-100..100]
// Вывести этот массив в консоль в читаемом виде
// В выведенном массиве:
// - Пометить строку с минимальным числом - звездочкой
// - В каждой строке вывести наименьшее положительное число
// - В каждой строке написать какое минимальное кол-во чисел необходимо заменить чтобы не встречалось 3 положительных или отрицательных числа подряд.

const createMatrix = (rows, cols, minNumber, maxNumber) => {
    const matrix = [];

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            matrix[i][j] = getRandomNumber(minNumber, maxNumber);
        }
    }

    return matrix;
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getMinPositive = (matrix) => {
    const minPositivesArr = [];

    for (let i = 0; i < matrix.length; i++) {
        const positives = matrix[i].filter((item) => item > 0);

        if (positives.length > 0) {
            minPositivesArr.push(Math.min(...positives));
        } else {
            minPositivesArr.push(null)
        }
    }

    return minPositivesArr;
}

const getMinReplacingNumber = (matrix) => {
    const minReplacingNumbers = [];

    for (let i = 0; i < matrix.length; i++) {
        let count = 0;
        const rowCopy = [...matrix[i]];

        for (let j = 0; j < matrix[i].length - 2; j++) {
            if (rowCopy[j] > 0 && rowCopy[j + 1] > 0 && rowCopy[j + 2] > 0 ||
                rowCopy[j] < 0 && rowCopy[j + 1] < 0 && rowCopy[j + 2] < 0) {
                count += 1;
                rowCopy[j + 2] = 0;
            }
        }

        minReplacingNumbers.push(count)
    }

    return minReplacingNumbers;
}

const getMinNumbers = (matrix) => {
    let minNumber = Infinity;

    const minNumberRows = [];

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] < minNumber) {
                minNumber = matrix[i][j];
                minNumberRows.splice(0);
                minNumberRows.push(i);
            } else {
                if (matrix[i][j] === minNumber) {
                    minNumberRows.push(i);
                }
            }
        }
    }

    return minNumberRows;
}

const drawMatrix = ({
    matrix,
    minNumberRows,
    minPositivesArr,
    minReplacingNumbers
}) => {
    const tableData = matrix.map((row, index) => ({
        ...row,
        'Строка с мин. числом': minNumberRows.includes(index) ? '*' : '-',
        'Мин. положительное число': minPositivesArr[index] ? minPositivesArr[index] : '-',
        'Мин. кол-во чисел для замены': minReplacingNumbers[index]

    }));

    console.table(tableData)
}

const main = () => {
    const matrix = createMatrix(10, 10, -100, 100);
    const minNumberRows = getMinNumbers(matrix);
    const minPositivesArr = getMinPositive(matrix);
    const minReplacingNumbers = getMinReplacingNumber(matrix);

    drawMatrix({
        matrix,
        minNumberRows,
        minPositivesArr,
        minReplacingNumbers
    })
}

main();
