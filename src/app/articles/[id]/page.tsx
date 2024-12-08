import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User, ArrowLeft, AlertCircle } from 'lucide-react';

interface Article {
  id?: string;
  title: string;
  subtitle: string;
  summary: string;
  date: string;
  author: string;
  text: string;
  image?: string;
}

// Utilizza il tipo per il componente asincrono con i parametri.
const SpecificArticle = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  try {
    // Parametri passati come props, senza il bisogno di await
    const { id } = params;

    // Fetch dell'articolo dal backend
    const res = await fetch(`http://localhost:3001/articles/${id}`, {
      next: {
        revalidate: 60, // Revalidate ogni minuto
      },
    });

    if (!res.ok) {
      return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4'>
          <div className='text-center bg-white shadow-xl rounded-xl p-6 md:p-8 max-w-md w-full'>
            <div className='flex justify-center mb-4'>
              <AlertCircle className='text-red-500' size={48} />
            </div>
            <h1 className='text-2xl md:text-3xl font-bold text-red-500 mb-4'>Article Not Found</h1>
            <p className='text-gray-600 mb-6'>The article you are looking for does not exist or has been removed.</p>
            <Link
              href='/articles'
              className='inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
            >
              <ArrowLeft className='mr-2' size={20} />
              Back to Articles
            </Link>
          </div>
        </div>
      );
    }

    const article: Article = await res.json();

    return (
      <div className='max-w-2xl mx-auto px-4 py-6 md:py-8 lg:px-8'>
        <Link href='/articles' className='inline-flex items-center text-gray-600 hover:text-blue-600 mb-4 md:mb-6 transition-colors'>
          <ArrowLeft className='mr-2' size={20} />
          Back to List
        </Link>

        <article className='bg-white shadow-lg rounded-xl overflow-hidden'>
          {article.image && (
            <div className='w-full h-48 md:h-72 lg:h-[300px] relative'>
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className='object-cover'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
          )}

          <div className='p-4 md:p-6 lg:p-10'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4'>{article.title}</h1>

            <h2 className='text-base md:text-xl text-gray-600 italic mb-4 md:mb-6'>{article.subtitle}</h2>

            <div className='flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 text-gray-500 mb-4 md:mb-6'>
              <div className='flex items-center space-x-2'>
                <User size={18} className='shrink-0' />
                <span className='text-sm md:text-base'>{article.author}</span>
              </div>
              <div className='flex items-center space-x-2'>
                <Calendar size={18} className='shrink-0' />
                <time dateTime={article.date} className='text-sm md:text-base'>
                  {new Date(article.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
              </div>
            </div>

            <div className='prose prose-sm md:prose-base prose-blue max-w-none'>
              <p className='text-base md:text-lg text-gray-700 mb-4 md:mb-6 font-medium'>{article.summary}</p>

              <div className='prose prose-gray prose-sm md:prose-base' dangerouslySetInnerHTML={{ __html: article.text }} />
            </div>
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.log('Error while loading article:', error);
    return (
      <div className='min-h-screen flex flex-col justify-center items-center bg-gray-50 p-4'>
        <div className='text-center bg-white shadow-xl rounded-xl p-6 md:p-8 max-w-md w-full'>
          <div className='flex justify-center mb-4'>
            <AlertCircle className='text-red-500' size={48} />
          </div>
          <h1 className='text-2xl md:text-3xl font-bold text-red-500 mb-4'>Error Loading Article</h1>
          <p className='text-gray-600 mb-6'>An unexpected error occurred. Please try again later.</p>
          <Link
            href='/articles'
            className='inline-flex items-center justify-center w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
          >
            <ArrowLeft className='mr-2' size={20} />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }
};

export default SpecificArticle;
