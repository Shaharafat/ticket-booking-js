let warningElement = document.querySelector('#warning');
let successElement = document.querySelector('#success-message');
let totalChargeElement = document.querySelector('#total');
let vatElement = document.querySelector("#vat");
let subTotalElement = document.querySelector("#subtotal");
let successDetailsElement = document.querySelector('#success-details');

// this function updates subtotal value
function updateSubtotal() {
  // destructure returned value
  let [firstClassTicketCount, economyTicketCount] = totalTicketCount();
  let firstClassTicketPrice = firstClassTicketCount * 150;
  let economyTicketPrice = economyTicketCount * 100;

  // add first class and economoy class ticket to make subtotal.
  let subtotal = firstClassTicketPrice + economyTicketPrice;
  subTotalElement.innerHTML = subtotal;

  return subtotal;
}

// this function updates vat value
function updateVat() {
  let subtotal = subTotalElement.innerHTML;
  subtotal = parseInt(subtotal, 10);

  // vat is 10% according to subtotal
  let vat = subtotal * (10 / 100);
  vatElement.innerHTML = vat;

  return vat;
}

// this function updates total value.
function updateTotal(subtotal, vat) {
  let total = subtotal + vat;
  totalChargeElement.innerHTML = total;
}

// this function gives total ticket count.
function totalTicketCount() {
  let allTicketCount = document.querySelectorAll("#ticket-count");
  // convert allTicketCount from nodelist to array and destructure it.
  let [firstClassTicket, economyClassTicket] = Array.from(allTicketCount);

  return [parseInt(firstClassTicket.value) , parseInt(economyClassTicket.value)];
}

// this function runs when ticket count changes.
function updateTicketQuantity(event, newQuantity) {
  let parentElement = event.target.closest("#ticket-input");
  let previousQuantity = parentElement.querySelector("#ticket-count").value;
  // convert quantity from string to integer
  previousQuantity = parseInt(previousQuantity, 10);
  let updatedQuantity = previousQuantity + newQuantity;

  // if quantity value is zero. stop decreasing.
  if (updatedQuantity < 0) {
    return;
  }

  parentElement.querySelector("#ticket-count").value = updatedQuantity;

  // update subtotal, vat and total values
  let subtotal = updateSubtotal();
  let vat = updateVat();
  updateTotal(subtotal, vat);
}

let isWarningHide = warningElement.classList.contains('hide');
let isSuccessHide = successElement.classList.contains('hide');

// this function runs when book now button pressed
function handleBooking() {
  let total = totalChargeElement.innerHTML;
  total = parseInt(total, 10);
  
  let [firstClassTickets, economyClassTickets] = totalTicketCount();
  let totalTickets = firstClassTickets + economyClassTickets;

  // if total price is not zero, then show the success message.
  // otherwise, show warning message.
  if (total) {
    successElement.classList.remove("hide");
    isSuccessHide = !isSuccessHide;
    // show this message on successful message.
    successDetailsElement.innerHTML = `You have successfully booked ${totalTickets} tickets.`;

    if (!isWarningHide) {
      warningElement.classList.add('hide');
      isWarningHide = !isWarningHide;
    }

    return;
  }

  if (isWarningHide) {
    warningElement.classList.remove('hide');
    isWarningHide = !isWarningHide;

    if (!isSuccessHide) {
      successElement.classList.add('hide');
      isSuccessHide = !isSuccessHide;
    }
  }
}

// this function hides success message
function closeSuccessSection() {
  successElement.classList.add('hide');
}