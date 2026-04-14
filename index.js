const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
class Node {
  constructor(account) {
    this.account = account;
    this.next = null;
  }
}
class LinkedList {
  constructor() {
    this.head = null;
  }

  add(account) {
    const newNode = new Node(account);

    if (!this.head) {
      this.head = newNode;
      return;
    }

    let temp = this.head;
    while (temp.next) {
      temp = temp.next;
    }

    temp.next = newNode;
  }

  find(number) {
    let temp = this.head;

    while (temp) {
      if (temp.account.number == number) return temp.account;
      temp = temp.next;
    }

    return null;
  }
}
class TreeNode {
  constructor(account) {
    this.account = account;
    this.left = null;
    this.right = null;
  }
}
class AccountTree {
  constructor() {
    this.root = null;
  }

  insert(account) {
    const newNode = new TreeNode(account);

    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;

    while (true) {
      if (account.number < current.account.number) {
        if (!current.left) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  search(number) {
    let current = this.root;

    while (current) {
      if (number == current.account.number) return current.account;

      if (number < current.account.number) current = current.left;
      else current = current.right;
    }

    return null;
  }
}
class Bank {
  constructor() {
    this.list = new LinkedList(); // linear
    this.tree = new AccountTree(); // non-linear
  }

  createAccount(number, balance) {
    const account = { number, balance };

    this.list.add(account);
    this.tree.insert(account);

    console.log("Account created:", number);
  }

  getBalance(number) {
    const acc = this.tree.search(number);

    if (acc) console.log("Balance:", acc.balance);
    else console.log(" Account not found");
  }

  transfer(from, to, amount) {
    const acc1 = this.tree.search(from);
    const acc2 = this.tree.search(to);

    if (!acc1 || !acc2) {
      console.log("Invalid account");
      return;
    }

    if (acc1.balance < amount) {
      console.log("Insufficient balance");
      return;
    }

    acc1.balance -= amount;
    acc2.balance += amount;

    console.log("Transfer successful");
  }
}
const bank = new Bank();
function menu() {
  console.log("\n--- BANK MENU ---");
  console.log("1. Create Account");
  console.log("2. Check Balance");
  console.log("3. Transfer Money");
  console.log("4. Exit");

  rl.question("Enter choice: ", (choice) => {

    if (choice == 1) {
      rl.question("Enter account number: ", (num) => {
        rl.question("Enter balance: ", (bal) => {
          bank.createAccount(Number(num), Number(bal));
          menu();
        });
      });
    }

    else if (choice == 2) {
      rl.question("Enter account number: ", (num) => {
        bank.getBalance(Number(num));
        menu();
      });
    }

    else if (choice == 3) {
      rl.question("From account: ", (from) => {
        rl.question("To account: ", (to) => {
          rl.question("Amount: ", (amt) => {
            bank.transfer(Number(from), Number(to), Number(amt));
            menu();
          });
        });
      });
    }

    else {
      console.log("Exiting...");
      rl.close();
    }

  });
}

menu();