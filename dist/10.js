const admins = [
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' }
];
const users = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' }
];
export function promisify(fn) {
    return () => new Promise((resolve, reject) => {
        fn((response) => {
            if (response.status === 'success') {
                resolve(response.data);
            }
            else {
                reject(new Error(response.error));
            }
        });
    });
}
export function promisifyAll(obj) {
    const result = {};
    for (const key of Object.keys(obj)) {
        result[key] = promisify(obj[key]);
    }
    return result;
}
const oldApi = {
    requestAdmins(callback) {
        callback({
            status: 'success',
            data: admins
        });
    },
    requestUsers(callback) {
        callback({
            status: 'success',
            data: users
        });
    },
    requestCurrentServerTime(callback) {
        callback({
            status: 'success',
            data: Date.now()
        });
    },
    requestCoffeeMachineQueueLength(callback) {
        callback({
            status: 'error',
            error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.'
        });
    }
};
export const api = promisifyAll(oldApi);
function logPerson(person) {
    console.log(` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`);
}
async function startTheApp() {
    console.log('Admins:');
    (await api.requestAdmins()).forEach(logPerson);
    console.log();
    console.log('Users:');
    (await api.requestUsers()).forEach(logPerson);
    console.log();
    console.log('Server time:');
    console.log(`   ${new Date(await api.requestCurrentServerTime()).toLocaleString()}`);
    console.log();
    console.log('Coffee machine queue length:');
    console.log(`   ${await api.requestCoffeeMachineQueueLength()}`);
}
startTheApp().then(() => {
    console.log('Success!');
}, (e) => {
    console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`);
});
