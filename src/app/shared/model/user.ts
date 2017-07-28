export class User {

    static fromJsonList(array): User[] {
        return array.map(User.fromArray);
    }

    static fromArray({ $id, first_name, last_name, email, username, phone_number }): User {
        return new User($id, first_name, last_name, email, username, phone_number);
    }

    constructor(
        public $id: string,
        public first_name: string,
        public last_name: string,
        public email: string,
        public username: string,
        public phone_number: string
    ) {

    }
}
