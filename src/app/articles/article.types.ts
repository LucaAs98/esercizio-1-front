export interface SmallArticle {
  id: string;
  title: string;
  image: string | null;
  summary?: string;
  author?: string;
  date?: string;
}

export interface Article {
  id?: string;
  title: string;
  subtitle: string;
  summary: string;
  date: string;
  author: string;
  text: string;
  image?: string;
}
