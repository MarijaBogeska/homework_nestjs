export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  stock:number;
  publishedYear: number;
  isBestseller: boolean;
}

export interface BookFilter {
    minPrice: number | null;
    author: string;

}