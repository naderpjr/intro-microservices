import UserService from './services/user.service.js';

async function startApp() {
    await UserService.start();
    try {
        //simulate user creation
        const newUser = await UserService.call('user.createUser', {
            username: 'John',
            email: 'john@gmail.com'
        });
        console.log('New User created: ', newUser);
        const users = await UserService.call('user.getUsers');
        console.log('All users: ', users);
    } catch (error) {
        console.log('Error: ', error)
    } finally {
        await UserService.stop();
    }
}

startApp();