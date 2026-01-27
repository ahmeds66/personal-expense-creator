let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const expenseList = document.getElementById("expenseList");
const totalDisplay = document.getElementById("total");

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const category = document.getElementById("category").value;

  if (!title || !amount || !category) {
    alert("Please fill all fields");
    return;
  }

  const expense = {
    id: Date.now(),
    title,
    amount: Number(amount),
    category
  };

  expenses.push(expense);
  saveAndRender();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("category").value = "";
}

function deleteExpense(id) {
  expenses = expenses.filter(exp => exp.id !== id);
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach(exp => {
    total += exp.amount;

    const div = document.createElement("div");
    div.className = "glass expense";

    div.innerHTML = `
      <span>${exp.title} (${exp.category})</span>
      <span>₹${exp.amount}</span>
      <button onclick="deleteExpense(${exp.id})">X</button>
    `;

    expenseList.appendChild(div);
  });

  totalDisplay.textContent = `₹${total}`;
}

renderExpenses();
