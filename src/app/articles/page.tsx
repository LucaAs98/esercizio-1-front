import Link from "next/link";
import React from "react";

import styles from "./style.module.css";
import ArticleCard from "./components/ArticleCard";
import ErrorMessage from "../components/ErrorMessage";
import { SimpleArticle } from "./article.types";
import SimplePaginator from "../components/SimplePaginator";
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_LIMIT = 10;

const ArticlesList = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    limit: number;
  };
}) => {
  const params = await searchParams;
  const page = params.page ? Number(params.page) : DEFAULT_PAGE;
  const limit = params.limit ? Number(params.limit) : DEFAULT_PAGE_LIMIT;
  try {
    const res = await fetch(
      `${process.env.API_URL}/articles?page=${page}&limit=${limit}`,
      {
        next: {
          revalidate: 60, // Revalidate every minute
          tags: ["articles-list"],
        },
      }
    );

    const response = await res.json();
    if (!res.ok) throw new Error(response.message);

    const articles = response.articles;

    return (
      <div className={styles.articlesContainer}>
        <div className={styles.articlesHeader}>
          <h1 className={styles.articlesTitle}>Latest Articles</h1>

          <SimplePaginator
            page={page}
            limit={limit}
            pageCount={response.pageCount}
          />
        </div>

        {articles && articles.length > 0 ? (
          <>
            <div className={styles.articlesGrid}>
              {articles.map((article: SimpleArticle) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.id}`}
                  className={styles.articleLink}
                >
                  <ArticleCard article={article} />
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.noArticles}>
            <p>No articles available at the moment.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error(`Retrieving ArticleList Error:`, error);
    return (
      <ErrorMessage
        error={{
          title: "Error Loading Articles",
          description: "Unable to fetch articles. Please try again later.",
        }}
      />
    );
  }
};

export default ArticlesList;
