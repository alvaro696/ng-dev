export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}

export interface MenuOption {
  label: string
  icon?: string
  type: "route" | "action"
  route?: string
  action?: any
  class?: string
}
