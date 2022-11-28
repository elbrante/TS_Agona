interface User {
    name: string;
    age: number;
    occupation: string;
    type: 'user';
}

interface Admin {
    name: string;
    age: number;
    role: string;
    type: 'admin'
}

export type Person = User | Admin;

export const persons: Person[] = [
    {
        name: 'Max Mustermann',
        age: 25,
        occupation: 'Chimney sweep',
        type: 'user'
    },
    {
        name: 'Jane Doe',
        age: 32,
        role: 'Administrator',
        type: 'admin'
    },
    {
        name: 'Kate Müller',
        age: 23,
        occupation: 'Astronaut',
        type: 'user'

    },
    {
        name: 'Bruce Willis',
        age: 64,
        role: 'World saver',
        type: 'admin'
    }
];

export function logPerson(person: Person) {
    let additionalInformation: string;
    if (person.type === 'admin') {
        additionalInformation = person.role;
    } else {
        additionalInformation = person.occupation;
    }
    console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

persons.forEach(logPerson);
