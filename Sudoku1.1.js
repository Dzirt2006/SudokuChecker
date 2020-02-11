//To start, using an empty CodePen or repl.it, write the following functions:
//
//  getRow: This function should accept two arguments: a sudoku grid (represented by an array of arrays) and a row index. The function should return an array containing the numbers in the specified row.
//
//    getColumn: This function should accept a sudoku grid and a column index. The function should return an array containing the numbers in the specified column.
//
//    getGrid: This function should accept three arguments: a sudoku grid, and an x and y coordinate for one of the puzzle's 3x3 subgrids. The function should return an array with all the numbers in the specified subgrid.
//
//Remember that our puzzle is broken into 9 subgrids. In our coordinate system, (0,0) will represent the subgrid in the upper left, (1,0) will represent the upper-middle and so on.


let puzzle = [[8, 9, 5, 7, 4, 2, 1, 3, 6],
    [2, 7, 1, 9, 6, 3, 4, 8, 5],
    [4, 6, 3, 5, 8, 1, 7, 9, 2],
    [9, 3, 4, 6, 1, 7, 2, 5, 8],
    [5, 1, 7, 2, 3, 8, 9, 6, 4],
    [6, 8, 2, 4, 5, 9, 3, 7, 1],
    [1, 5, 9, 8, 7, 4, 6, 2, 3],
    [7, 4, 6, 3, 2, 5, 8, 1, 9],
    [3, 2, 8, 1, 9, 6, 5, 4, 7]];

let puzzleCopy = [[8, 9, 5, 7, 4, 2, 1, 3, 6],
    [2, 7, 1, 9, 6, 3, 4, 8, 5],
    [4, 6, 3, 5, 8, 1, 7, 9, 2],
    [9, 3, 4, 6, 1, 7, 2, 5, 8],
    [5, 1, 7, 2, 3, 8, 9, 6, 4],
    [6, 8, 2, 4, 5, 9, 3, 7, 1],
    [1, 5, 9, 8, 7, 4, 6, 2, 3],
    [7, 4, 6, 3, 2, 5, 8, 1, 9],
    [3, 2, 8, 1, 9, 6, 5, 4, 7]];

let p8zzle = [[8, 9, 5, 7, 4, 2, 1, 3, 6],
    [8, 7, 1, 9, 6, 3, 4, 8, 5],
    [4, 6, 3, 5, 8, 1, 7, 9, 2],
    [9, 3, 4, 6, 1, 7, 2, 5, 8],
    [5, 1, 7, 2, 3, 8, 9, 6, 4],
    [6, 8, 2, 4, 5, 9, 3, 7, 1],
    [1, 5, 9, 8, 7, 4, 6, 2, 3],
    [7, 4, 6, 3, 2, 5, 8, 1, 9],
    [3, 2, 8, 1, 9, 6, 5, 4, 7]];




//console.log(getRow(puzzle, 0));
// -> [ 8,9,5,7,4,2,1,3,6 ]

//console.log(getCol(puzzle, 1));
// -> [ 6,5,2,8,4,1,3,9,7 ]

//console.log(getSection(puzzle, 2, 1));
// -> [ 8,9,5,2,7,1,4,6,3 ]


p1 = getSection(p8zzle, 0, 0);
//p2 = getCol(puzzle, 8);
//myCheck(p1,p2);

console.log(includes1to9(p1));
console.log(isSame(puzzle, p8zzle));
console.log(" " + isValid(puzzle));


function isValid(arr) {
    let booleanResult = true;
    let tempRow = [];
    let tempCol = [];
    let tempSection = [];
    let tempSectionRow, tempSectionCol;
    for (let i = 0; i < arr.length; i++) {
        tempCol = getCol(arr, i);
        tempRow = getRow(arr, i);
        for (let j = 0; j < arr.length; j += 3) {
            tempSectionRow = sectionValid(i);
            tempSectionCol = sectionValid(j);
            tempSection = getSection(arr, tempSectionCol, tempSectionRow);
            if (myCheck(tempRow, tempSection) && myCheck(tempCol, tempSection) && booleanResult === true) {
                booleanResult = true;
            } else {
                booleanResult = false;
                break;
            }
        }
    }
    return booleanResult;
}

function sectionValid(number) {
    if (number >= 0 && number < 3) {
        number = 0;
    } else if (number > 2 && number <= 5) {
        number = 1;
    } else number = 2;
    return number;
}

function isSame(arr1, arr2) {
    let booleanResult = false;
    for (let i = 0; i < arr1.length; i++) {
        booleanResult = myCheck(arr1, arr2);
        if (booleanResult === false) {
            break;
        } else booleanResult = true;
    }
    return booleanResult;
}

/*
Function that accept a subsection and check that it includes the numbers 1-9 (with no repeats).
 */
function includes1to9(arr) {
    let checker = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let booleanRes;
    booleanRes = myCheck(checker, arr);
    return booleanRes;
}

/*
This function compare any 2 integers arrays
 */
function myCheck(arr1, arr2) {
    let booleanRes;
    let arrTemp1 = [...arr1];
    let arrTemp2 = [...arr2];
    arrTemp1.sort();
    arrTemp2.sort();
    booleanRes = JSON.stringify(arrTemp1) === JSON.stringify(arrTemp2);
    return booleanRes;
}

/*
Function return the row
 */
function getRow(array, row) {
    return array[row];
}

/*
Function return the column
 */
function getCol(array, col) {
    let newColArray = [];
    for (let i = 0; i < array.length; i++) {
        newColArray.push(array[i][col])
    }
    return newColArray;
}

/*
Function return the grid
 */
function getSection(array, sectionCol, sectionRow) {
    let newArr;
    let newCol = sectionNumber(sectionCol);//get the correct number of column
    let newRow = sectionNumber(sectionRow);//get the correct number of row
    newArr = returnSection(array, newCol, newRow);
    return newArr;
}

/*This function return correct starting
 index of each section,
 because we can't use regular numbers
 rows and columns-they are equal 9,
 we need only 3.
 */
function sectionNumber(number) {
    if (number === 1) {
        number = 3;//3-5
    } else if (number === 2) {
        number = 6;//6-8
    } else number = 0;//0-2
    return number;
}

/*This function exactly return the necessary
section
 */
function returnSection(array, col, row) {
    let newArr = [];
    let temp = [];
    for (let i = row; i < row + 3; i++) {//section is 3x3 and we need only 3 rows
        temp = array[i];
        temp = temp.slice(col, col + 3);//section is 3x3 and we need only 3 cols
        for (let j = 0; j < temp.length; j++) {
            newArr.push(temp[j]);
        }
    }
    return newArr;
}

