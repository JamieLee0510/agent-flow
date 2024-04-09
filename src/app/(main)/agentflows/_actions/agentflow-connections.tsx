export const onGetAgentflows = async (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data: any[] = [
                { description: "123", id: 1, name: "hihi", publish: true },
            ];
            resolve(data);
        }, 0);
    });
};
