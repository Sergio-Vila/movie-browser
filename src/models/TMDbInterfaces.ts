export interface TMDbSearchResult {
    page: number;
    total_results: number;
    total_pages: number;
    results: TMDbMovie[];
  }
  
export interface TMDbMovie {
    vote_count: number;
    id: number;
    video: boolean;
    vote_average: number;
    title: string;
    popularity: number;
    poster_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    backdrop_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
  }

export interface TMDbCreditsResult {
    id: number;
    cast: TMDbCast[];
    crew: TMDbCrew[];
}

export interface TMDbCrew {
    credit_id: string;
    department: string;
    gender: number;
    id: number;
    job: string;
    name: string;
    profile_path?: string;
}

export interface TMDbCast {
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    name: string;
    order: number;
    profile_path?: string;
}