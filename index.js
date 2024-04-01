const bcrypt = require('bcrypt');
const readlineSync = require('readline-sync');

let users = [];

function registerUser() {
    const username = readlineSync.question('Enter username: ');
    const password = readlineSync.question('Enter password: ', { hideEchoBack: true });


    const hashedPassword = bcrypt.hashSync(password, 10);


    users.push({ username, password: hashedPassword });
    console.log('User registered successfully!');
}


function loginUser() {
    const username = readlineSync.question('Enter username: ');
    const password = readlineSync.question('Enter password: ', { hideEchoBack: true });

 
    const user = users.find(user => user.username === username);

    if (!user) {
        console.log('User not found. Please register.');
        return;
    }


    if (bcrypt.compareSync(password, user.password)) {
        console.log('Login successful! Welcome, ' + username + '!');

    } else {
        console.log('Incorrect password. Please try again.');
    }
}


function securedPage() {
    console.log('This is a secured page.');
}


function mainMenu() {
    console.log('1. Register');
    console.log('2. Login');
    console.log('3. Exit');
    const choice = readlineSync.questionInt('Enter your choice: ');

    switch (choice) {
        case 1:
            registerUser();
            break;
        case 2:
            loginUser();
            break;
        case 3:
            console.log('Exiting...');
            process.exit();
        default:
            console.log('Invalid choice. Please try again.');
            mainMenu();
    }
}


console.log('Welcome to Basic Login Authentication System');
while (true) {
    mainMenu();
}
