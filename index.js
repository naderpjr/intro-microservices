import UserService from './services/user.service.js';
import EmailService from './services/email.service.js';
import AuthService from './services/auth.service.js';

async function startApp() {
    await UserService.start();
    await EmailService.start();
    await AuthService.start();

    try {
        //simulate user creation
        const newUser = await UserService.call('user.createUser', {
            username: 'John',
            email: 'john@gmail.com'
        });
        console.log('New User created: ', newUser);
        const users = await UserService.call('user.getUsers');
        console.log('All users: ', users);

        // simulate sending email 

        const emailResult = await EmailService.call('email.sendEmail', {
            recipient: newUser.email,
            subject: 'welcome to our platform',
            content: 'Thank u for signing up.',
        });

        console.log(emailResult);

        // simulate auth 

        const authResult = await AuthService.call('auth.authUser', {
            username: 'admin',
            password: 'password'
        })

        console.log('Auth result: ', authResult)

    } catch (error) {
        console.log('Error: ', error)
    } finally {
        await UserService.stop();
        await EmailService.stop();
        await AuthService.stop();
    }
}

startApp();