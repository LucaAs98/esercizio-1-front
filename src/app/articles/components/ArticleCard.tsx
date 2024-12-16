import React from "react";
import Image from "next/image";
import { FileText } from "lucide-react";
import styles from "./ArticleCard.module.css";
import { SimpleArticle } from "../article.types";

const ArticleCard: React.FC<{ article: SimpleArticle }> = ({ article }) => {
  return (
    <div className={styles.articleCard}>
      <div className={styles.articleContent}>
        {article.image ? (
          <div className={styles.articleImageWrapper}>
            <Image
              src={article.image}
              alt={article.title}
              layout="responsive"
              width={1200}
              height={800}
              className={styles.articleImage}
            />
          </div>
        ) : (
          <div className={styles.articlePlaceholder}>
            <FileText className={styles.placeholderIcon} size={48} />
          </div>
        )}

        <div className={styles.articleText}>
          <h2 className={styles.articleTitle}>{article.title}</h2>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
