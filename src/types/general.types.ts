type FilterOperator = '=' | '>' | '<' | '>=' | '<=' | '!=';

export interface UpdateFilter {
    key: string;
    operator: FilterOperator; // You can expand this later
    value: any;
}

export interface UpdateRequest {
    filter: UpdateFilter[];
    joinType?: 'AND' | 'OR'; // Default to AND
}