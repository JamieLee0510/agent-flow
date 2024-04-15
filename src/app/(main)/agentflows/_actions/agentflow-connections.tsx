export const onGetAgentflows = async (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data: any[] = [
                {
                    description: "this is a demo of a agent flow.",
                    id: 1,
                    name: "demo agent flow",
                    publish: true,
                },
            ];
            resolve(data);
        }, 0);
    });
};
