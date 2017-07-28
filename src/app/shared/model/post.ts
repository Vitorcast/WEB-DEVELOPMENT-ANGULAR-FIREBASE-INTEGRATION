export class Post {

    static fromJsonList(array): Post[] {
        return array.map(Post.fromArray);
    }

    static fromArray({ $id, post_title, post_body, date, user }): Post {
        return new Post($id, post_title, post_body, date, user);
    }

    /**
     *
     */
    constructor(
        public $id: string,
        public post_title: string,
        public post_body: string,
        public date: string,
        public user: string
    ) {

    }
}
