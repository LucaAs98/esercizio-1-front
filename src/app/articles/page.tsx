import Link from 'next/link';
import React from 'react';

interface SmallArticle {
  id: string;
  title: string;
  image: string | null;
}

const ArticlesList = async () => {
  const res = await fetch('http:/localhost:3001/articles');
  const articles: SmallArticle[] = await res.json();

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <h1 className='text-3xl font-bold text-center text-gray-900 mb-6'>List of articles</h1>
      <ul className='space-y-4'>
        {articles.map((article) => (
          <li key={article.id} className='bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300'>
            <Link href={`articles/${article.id}`}>
              <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-gray-800'>{article.title}</h2>
                {article.image && <img src={article.image} alt={article.title} className='w-16 h-16 object-cover rounded-full' />}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticlesList;
