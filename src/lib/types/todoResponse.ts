declare type TTodoResponse = {
    id: any,
    todoBody: string,
    expireDate: string,
    priority: number,
    status: number,
    finishedAt: Date | null
}