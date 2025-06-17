function calculateMonthlyPayment(principal, time, annualRate) {
    const months = time * 12
    const monthlyRate = (annualRate / 100) / 12
    const factor = (monthlyRate * (1 + monthlyRate) ** months) / ((1 + monthlyRate) ** months - 1)
    const mortgage = principal * factor

    return mortgage
}

function calculateLoanSummary(principal, years, annualRate) {
    const monthlyPayment = calculateMonthlyPayment(principal, years, annualRate)
    const numberOfPayments = years * 12
    const totalCost = monthlyPayment * numberOfPayments
    const interestPaid = totalCost - principal

    return { monthlyPayment, totalCost, interestPaid }
}


const repaymentAmount = document.getElementById('monthly-payment')
const totalPayment = document.getElementById('total-payment')
const submitBtn = document.getElementById('submit-button')
const clearAll = document.getElementById('clear')
const repaymentRadioBtn = document.getElementById('repayment')
const interestRadioBtn = document.getElementById('interest')

const mortgageAmount = document.getElementById('mortgage-amount')
const mortgageTerm = document.getElementById('term')
const mortgageRate = document.getElementById('rate')

const inputContainer = document.querySelector('.input-container')

const inputs = document.querySelectorAll('input')

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()

    const {monthlyPayment, totalCost, interestPaid} = 
        calculateLoanSummary(
            mortgageAmount.valueAsNumber, 
            mortgageTerm.valueAsNumber, 
            mortgageRate.valueAsNumber)

    repaymentAmount.innerText = `$${monthlyPayment.toFixed(2)}`
    totalPayment.innerText = `$${totalCost.toFixed(2)}`
})

clearAll.addEventListener('click', () => {
    mortgageAmount.value = ''
    mortgageTerm.value = ''
    mortgageRate.value = ''
    repaymentRadioBtn.checked = false
    interestRadioBtn.checked = false
    repaymentAmount.innerText = '$0'
    totalPayment.innerText = '$0'
})

console.log(mortgageAmount)
// inputs.forEach(input => {
//     input.addEventListener('focus', (e) => {
//         e.target.style.border = '1px solid var(--accent-color)'
//     })
// })