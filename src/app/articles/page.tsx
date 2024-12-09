import Link from 'next/link';
import React from 'react';

import styles from './style.module.css';
import ArticleCard from './components/ArticleCard';
import { SmallArticle } from './article.types';
import ErrorMessage from '../components/ErrorMessage';

const ArticlesList = async () => {
  try {
    const res = await fetch(`${process.env.API_URL}articles`, {
      next: {
        revalidate: 60, // Revalidate every minute
        tags: ['articles-list'],
      },
    });

    if (!res.ok) throw new Error('Failed to fetch articles');

    const articles: SmallArticle[] = await res.json();

    return (
      <div className={styles.articlesContainer}>
        <h1 className={styles.articlesTitle}>Latest Articles</h1>

        {articles.length > 0 ? (
          <div className={styles.articlesGrid}>
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`} className={styles.articleLink}>
                <ArticleCard article={article} />
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noArticles}>
            <p>No articles available at the moment.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return <ErrorMessage error={{ title: 'Error Loading Articles', description: 'Unable to fetch articles. Please try again later.' }} />;
  }
};

export default ArticlesList;
