export interface SimpleArticle {
  id: string;
  title: string;
  image: string | null;
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
