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

const mrtAmount = document.getElementById('mortgage-amount')
const mrtTerm = document.getElementById('term')
const mrtRate = document.getElementById('rate')

const { monthlyPayment, totalCost, interestPaid } = 
    calculateLoanSummary(
        mrtAmount.valueAsNumber,
        mrtTerm.valueAsNumber,
        mrtRate.valueAsNumber
    )

const repaymentAmount = document.getElementById('monthly-payment')
repaymentAmount.innerText = `$${monthlyPayment.toFixed(2)}`
const totalPayment = document.getElementById('total-payment')
totalPayment.innerText = `$${totalCost.toFixed(2)}`
console.log(mrtAmount.valueAsNumber, mrtTerm.valueAsNumber, mrtRate.valueAsNumber)

console.log(`Monthly: $${monthlyPayment.toFixed(2)}`)
console.log(`Total Cost: $${totalCost.toFixed(2)}`)
console.log(`Total Interest: $${interestPaid.toFixed(2)}`)