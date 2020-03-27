export type Message = {
    _id: any;
    userId: number;
    from: string;
    text: string;
};

export type User = {
    username: string;
    password: string;
};
