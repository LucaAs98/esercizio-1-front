import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import ErrorMessage from '../../components/ErrorMessage';
import { Article } from '../article.types';
import styles from './style.module.css';

const SpecificArticle = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  try {
    const { id } = params;

    const res = await fetch(`${process.env.API_URL}articles/${id}`, {
      next: {
        revalidate: 60,
      },
    });

    if (!res.ok)
      return (
        <ErrorMessage error={{ title: 'Article Not Found', description: 'The article you are looking for does not exist or has been removed.' }} />
      );

    const article: Article = await res.json();

    return (
      <div className={styles.articleContainer}>
        <Link href='/articles' className={styles.backLink}>
          <ArrowLeft size={20} />
          Back to List
        </Link>

        <article>
          {article.image && (
            <div className={styles.articleImageWrapper}>
              <Image src={article.image} alt={article.title} layout='responsive' width={1200} height={800} className={styles.articleImage} />
            </div>
          )}

          <div className={styles.articleContent}>
            <h1 className={styles.articleTitle}>{article.title}</h1>
            <h2 className={styles.articleSubtitle}>{article.subtitle}</h2>

            <div className={styles.articleMeta}>
              <div className={styles.metaItem}>
                <User size={18} className={styles.icon} />
                <span className={styles.metaText}>{article.author}</span>
              </div>
              <div className={styles.metaItem}>
                <Calendar size={18} className={styles.icon} />
                <time dateTime={article.date} className={styles.metaText}>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>

            <div className={styles.articleBody}>
              <p className={styles.articleSummary}>{article.summary}</p>
              <span className={styles.articleText}>{article.text}</span>
            </div>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    return <ErrorMessage error={{ title: 'Error Loading Article', description: 'An unexpected error occurred. Please try again later.' }} />;
  }
};

export default SpecificArticle;
