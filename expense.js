const balance_num = document.querySelector(".balance_num");
const income_num = document.querySelector(".income_num");
const expense_num = document.querySelector(".expense_num");
const list = document.querySelector(".list");
const form = document.querySelector("form");

const name = document.querySelector("#name");
const amount = document.querySelector("#amount");
const del_btn=document.querySelector('.delete-btn');

const localData = localStorage.getItem("transactions");

let transactions = localData ? JSON.parse(localData) : [];//لوفيه بانات قديمه تظهر لو لا تبقا فاضى

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const transactionName = name.value;
  const transactionAmount = amount.value;
  let transiction = {
    id: Date.now(),
    text: transactionName,
    amount: transactionAmount,
  };
  if (transactionName!==''&&transactionAmount!==''){
  transactions.push(transiction);
   saveAtLocalStorag()
  readerTransactions();
  console.log(transactions);
  name.value = "";
  amount.value = "";
  name.focus();
}
else{
    window.alert('please enter a values')
}
});
//to convert transictions to ul li item
function readerTransactions() {
  list.innerHTML = "";
  transactions.forEach((transiction) => {
    const li = document.createElement("li");
    li.classList.add("item");
    transiction.amount >= 0? li.classList.add("plus"):li.classList.add("minus");

    li.innerHTML = `
     <p class="item_name"><span class="material-symbols-outlined delete-btn">delete</span>${transiction.text}</p>
     <p>${transiction.amount > 0 ? "+" : ""}${transiction.amount}</p>
    `;
    
    li.querySelector('.delete-btn').addEventListener('click',()=>delet_item(transiction.id));
    list.appendChild(li);
  });
  updateValues()
}


function updateValues() {
  const amounts = transactions.map(e => Number(e.amount));

  const income = amounts
    .filter(e => e > 0)
    .reduce((acc, e) => acc + e, 0);

  const expense = amounts
    .filter(e => e < 0)
    .reduce((acc, e) => acc + e, 0);

  const balanceValue = income + expense;

  // update the UI
  income_num.textContent = `$${income.toFixed(2)}`;
  expense_num.textContent = `$${Math.abs(expense).toFixed(2)}`;
  balance_num.textContent = `$${balanceValue.toFixed(2)}`;
}
function delet_item(id){
  transactions = transactions.filter(
    transiction => transiction.id !== id
  ); 
   saveAtLocalStorag()
   readerTransactions();
  
}
name.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); 
    amount.focus();    
  }
});
//هستخدمها بعد كل تعديل
function saveAtLocalStorag(){
    localStorage.setItem('transactions',JSON.stringify(transactions));
}
readerTransactions();//عشان اول ما الصفحه تفتح كل حاجه تشتغل 
