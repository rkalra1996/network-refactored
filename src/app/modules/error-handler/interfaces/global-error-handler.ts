export interface GlobalErrorHandlerInterFace {
    error: string;
    errorName: string;
    message: string;
    status?: string | number;
    statusText?: string | null;
    url?: string;
    timestamp: {date: string, time: string};
    stack?: any;
    type?: any;
}
