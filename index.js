// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8]
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9]
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6]
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5]
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6]

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5]
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3]
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4]
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5]
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4]

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4]
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9]
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3]
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3]
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]
const mystery6 = [7, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3]

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5, mystery6]

//performs Luhn algorithm on an array and returns the sum of all the elements of the array
function getLuhnSum ( cardArray ) {
    //variable to keep track of sum of all the new digits
    let sum = 0;
    //iterate to the left starting at the last element
    for (let i = cardArray.length - 1; i >= 0; i--){
        let digit = cardArray[i];
        //if the element index is an odd number away from the last element, double the digit
        if( (cardArray.length - 1 - i) % 2 !== 0 ) {
            digit *= 2;
            if(digit > 9){ //if the result is greater than 9, subtract 9
                digit -= 9;
            }
        }
        //add digit to sum
        sum += digit;
    }

    return sum;
}

//returns true when array contains valid credit card digits and false otherwise
function isValid( cardArray ) {

    let luhnSum = getLuhnSum(cardArray);
    //if the sum modulo 10 is 0, then the number is valid, otherwise its invalid
    if (luhnSum % 10 === 0) return true;
    return false;
    
}

//checks nested arrays of credit card numbers, and returns another nested array of invalid cards
function findInvalidCards ( cardsArray ) {
    let invalidCardsArray = [];

    for (cardArray of cardsArray){
        if (! isValid( cardArray )){ //if card is invalid, push it to array of invalid cards
            invalidCardsArray.push(cardArray);
        }
    }

    return invalidCardsArray;
}

//takes a nested array of invalid numbers and returns an array of companies
function idInvalidCardCompanies ( invalidCardsArray ) {
    //array to store companies that have issues invalid numbers
    let companies = [];
    //iterate through all the invalid card arrays
    for ( invalidCardArray of invalidCardsArray ){
        let company;
        if (invalidCardArray[0] === 3){  //First digit 3 means Amex
            company = 'Amex';
        } else if (invalidCardArray[0] === 4) { //First digit 4 means Visa
            company = 'Visa';
        } else if (invalidCardArray[0] === 5) { //First digit 5 means Mastercard
            company = 'Mastercard';
        } else if (invalidCardArray[0] === 6) { //First digit 6 means Discover
            company = 'Discover';
        } else { //otherwise, invalid, skip to next card
            console.log("Company not found");
            continue;
        }
        //if the companies array doesn't include the company already, add it 
        if ( ! companies.includes(company)){ 
            companies.push(company);
        }
    }

    return companies;
}

//accepts a credit card number string and returns it in number array form
function strToNumArr ( cardStr ){
    let numArray = [];
    for( char of cardStr ){ //for each digit, convert to integer and push to the number array
        numArray.push ( parseInt(char));
    }

    return numArray;
}

//takes an array of numbers that represents an invalid credit card number and returns a valid array of numbers
function invalidToValid ( invalidCardArray ) {
    //make a copy of the invalidCardArray
    let cardArray = Array.from(invalidCardArray);
    //get the Luhn Sum of the credit card number
    const luhnSum = getLuhnSum(invalidCardArray);
    //get the remainder after dividing sum by 10
    let remainder = luhnSum % 10;

    //if we 'can' subtract the remainder from the last number of the array, do it
    if (cardArray[cardArray.length - 1] - remainder >= 0){
        cardArray[cardArray.length - 1] -= remainder;
    } else { //otherwise, we add the amount that needs to be added so that the luhnSum % 10 = 0;
        let needAdd = 10 - remainder;
        cardArray[cardArray.length - 1] += needAdd;
    }

    return cardArray;

}

const invalidArray = strToNumArr('53874556771');
console.log(isValid(invalidArray)); //should return false
//converting the invalid array to a valid one
const validArray = invalidToValid(invalidArray);
console.log(validArray);
console.log(isValid(validArray)); //should return true
