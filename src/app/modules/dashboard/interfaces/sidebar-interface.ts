export interface ResetInterface {
    reset: boolean;
  };

export interface FilterRequestBodyInterface {
  event: string;
  nodes: SelectedNodeInterface;
  edges?: SelectedEdgeInterface;
}

export interface SelectedNodeInterface { 
  type: string;
  value: Array<string>;
}

export interface SelectedEdgeInterface {
  type: string;
}