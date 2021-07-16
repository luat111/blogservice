export class SuccessResponse {
    status: number;
    message: string;
    data: any;

    constructor(props: any) {
        this.status = props.status || 0;
        this.message = props.message || '';
        this.data = props.data || null
    }
}

export class ErrorResponse {
    status: number;
    error: string;
    data: any;

    constructor(props: any) {
        this.status = props.status || 0;
        this.error = props.error || '';
        this.data = props.data || null
    }
}