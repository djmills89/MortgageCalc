const repaymentAmount = document.getElementById('monthly-payment') // element displaying monthly payments
const totalPayment = document.getElementById('total-payment') // element displaying total mortgage amount
const submitBtn = document.getElementById('submit-button') // calculate payments button
const clearAll = document.getElementById('clear') // clear all element
const repaymentRadioBtn = document.getElementById('repayment') // repayment radio button option
const interestRadioBtn = document.getElementById('interest') // interest only radio button option

const mortgageAmount = document.getElementById('mortgage-amount') // input for the mortgage amount
const mortgageTerm = document.getElementById('term') // input for the mortgage term
const mortgageRate = document.getElementById('rate') // input for the mortgage rate

const inputContainer = document.querySelectorAll('.input-container') // all the input containers

const inputs = document.querySelectorAll('input') // all the inputs
const radios = document.querySelectorAll('input[type="radio"]') // all the radio inputs

// checks to make sure all the inputs are valid, then does the calculations, updates the DOM
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let allValid = true;
    //Validate number inputs
    inputContainer.forEach(input => {
        if (!validateInputs(input, allValid)) allValid = false
    })
    // Validates Radios
    const oneChecked = Array.from(radios).some(radio => radio.checked)
    if (!oneChecked) {
        //Trigger Browser validation
        const errorMsg = document.getElementById('amount-error')
        errorMsg.textContent = 'This field is required'
        allValid = false
    } else {
        const errorMsg = document.getElementById('amount-error')
        errorMsg.textContent = ''
        allValid = true
    }
    //update the DOM
    if (allValid) {
        updateDOM()
    }
})


clearAll.addEventListener('click', () => {
    resetDOM()
})

//funtions
function calculateMonthlyPayment(principal, time, annualRate) {
    //calculates the mortage
    const months = time * 12
    const monthlyRate = (annualRate / 100) / 12
    const factor = (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1)
    const mortgage = principal * factor

    return mortgage
}

function calculateLoanSummary(principal, years, annualRate) {
    //generates the amounts need for the calulator
    const monthlyPayment = calculateMonthlyPayment(principal, years, annualRate)
    const numberOfPayments = years * 12
    const totalCost = monthlyPayment * numberOfPayments
    const interestPaid = totalCost - principal

    return { monthlyPayment, totalCost, interestPaid }
}

function validateInputs(input, valid) {
        const inputValue = input.querySelector('input') //for the actual input inside the container
        const errorMsg = document.getElementById(`${inputValue.id}-error`)
        if (!input.querySelector('input').value.trim()) {
            //If the input is empty, show the errors, and style them
            errorMsg.textContent = 'This field is required.'
            input.querySelector('span').classList.add('symbol-bg-error')
            input.classList.add('input-container-error')
            return false
        } else {
            //If the input is fine, remove the errors and error styles
            errorMsg.textContent = ''
            input.querySelector('span').classList.remove('symbol-bg-error')
            input.classList.remove('input-container-error')
            return true
        }
    }

function updateDOM() {
    //calculate the summary
        const {monthlyPayment, totalCost, interestPaid} = 
            calculateLoanSummary(
                mortgageAmount.valueAsNumber, 
                mortgageTerm.valueAsNumber, 
                mortgageRate.valueAsNumber)
        
        //Update the dom
        if (repaymentRadioBtn.checked) {
            //gets the h3 inside the results container and sets the text
            document.querySelector('.results-container').querySelector('h3').textContent = 'Your monthly repayments.'
            repaymentAmount.innerText = `$${monthlyPayment.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}`
            totalPayment.innerText = `$${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}`
            document.querySelector('.empty-results').style = 'display: none'
            document.querySelector('.calculated-results').style = 'display: block'
        } else if (interestRadioBtn.checked) {
            const interest = totalCost - interestPaid
            //gets the h3 inside the results container and sets the text
            document.querySelector('.results-container').querySelector('h3').textContent = 'Your total interest payments.'
            repaymentAmount.innerText = `$${interest.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}`
            totalPayment.innerText = `$${totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits:2})}`
            document.querySelector('.empty-results').style = 'display: none'
            document.querySelector('.calculated-results').style = 'display: block'
        }
}

function resetDOM() {
    //clear all the inputs, reset the DOM and styles
    inputContainer.forEach(input => {
        //removes error border
        input.classList.remove('input-container-error') 
        //removes error symbol bg color
        input.querySelector('span').classList.remove('symbol-bg-error') 
        //removes error message text content
        //grabs the element with the id of {inputName}-error -> p#term-error
        document.getElementById(`${input.querySelector('input').id}-error`).textContent = ''
        //clear the radio error message
        document.getElementById('amount-error').textContent = ''
    })
    mortgageAmount.value = ''
    mortgageTerm.value = ''
    mortgageRate.value = ''
    repaymentRadioBtn.checked = false
    interestRadioBtn.checked = false
    repaymentAmount.innerText = '$0'
    totalPayment.innerText = '$0'

    document.querySelector('.empty-results').style = 'display: block'
    document.querySelector('.calculated-results').style = 'display: none'
}