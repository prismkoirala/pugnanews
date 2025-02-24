// src/types.ts

export interface NewsCategory {
    id: number;
    name: string;       
    slug: string;       
}

export interface ArticleDescription{
    type: string;
    value?: string | string[] | undefined
}

export interface Article {
    id: bigint;
    category: string;
    image_url: string;
    title: string
    desc_list: ArticleDescription[]
    keyword_list: string[]
    source: string
    formatted_datetime: string
    datetime: string
}

export interface PaginatedArticle {
    next: string
    previous: string | null
    page: bigint
    page_size: bigint
    count: bigint
    total_pages: bigint
    results: Article[]
    loading: boolean
    error: boolean | null
}

export interface ArticleState {
    paginated_articles: PaginatedArticle | null
    loading: boolean
    error: string | null
}