export interface IPost {
    id: string,
    text: string,
    createdAt: string,
    updateAt: string,
    attachments: string[],
    author: {
        id: string
    }
}

