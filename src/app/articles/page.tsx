import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { FileText } from 'lucide-react';

interface SmallArticle {
  id: string;
  title: string;
  image: string | null;
  summary?: string;
  author?: string;
  date?: string;
}

const ArticlesList = async () => {
  try {
    const res = await fetch('http://localhost:3001/articles', {
      next: {
        revalidate: 60, // Revalidate every minute
        tags: ['articles-list'],
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch articles');
    }

    const articles: SmallArticle[] = await res.json();

    return (
      <div className='max-w-5xl mx-auto px-4 py-8 md:py-12'>
        <h1 className='text-3xl md:text-4xl font-extrabold text-center text-gray-900 mb-8 md:mb-12 tracking-tight'>Latest Articles</h1>

        {articles.length > 0 ? (
          <div className='grid md:grid-cols-1 gap-6'>
            {articles.map((article) => (
              <Link key={article.id} href={`/articles/${article.id}`} className='block'>
                <div className='bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 overflow-hidden'>
                  <div className='flex flex-col md:flex-row items-stretch'>
                    {article.image ? (
                      <div className='relative w-full md:w-48 h-48 md:h-36'>
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          priority
                          className='object-cover'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        />
                      </div>
                    ) : (
                      <div className='w-full md:w-48 h-48 md:h-36 bg-gray-100 flex items-center justify-center'>
                        <FileText className='text-gray-400' size={48} />
                      </div>
                    )}

                    <div className='p-4 md:p-6 flex-grow flex flex-col justify-center'>
                      <h2 className='text-xl font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors'>{article.title}</h2>

                      {article.summary && <p className='text-gray-500 text-sm mb-2 line-clamp-2'>{article.summary}</p>}

                      <div className='flex items-center text-xs text-gray-400 space-x-2'>
                        {article.author && <span>{article.author}</span>}
                        {article.date && (
                          <>
                            {article.author && <span>•</span>}
                            <time dateTime={article.date}>
                              {new Date(article.date).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </time>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className='text-center bg-gray-50 rounded-xl p-8'>
            <p className='text-gray-500 text-lg'>No articles available at the moment.</p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.log('Error while loading articles:', error);
    return (
      <div className='max-w-5xl mx-auto px-4 py-8 text-center'>
        <div className='bg-red-50 border border-red-200 rounded-xl p-8'>
          <h2 className='text-2xl font-bold text-red-600 mb-4'>Error Loading Articles</h2>
          <p className='text-gray-600'>Unable to fetch articles. Please try again later.</p>
        </div>
      </div>
    );
  }
};

export default ArticlesList;
