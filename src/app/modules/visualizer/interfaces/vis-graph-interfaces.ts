export interface NodeLimit {
    limit : number;
}

export interface FilterRequestBody {
    edges? : Array<object>,
    nodes? : Array<object>,
    imit? : number;
}