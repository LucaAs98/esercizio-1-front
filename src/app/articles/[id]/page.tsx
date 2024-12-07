import React from 'react';

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

const SpecificArticle = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const res = await fetch(`http:/localhost:3001/articles/${id}`);
  const article: Article = await res.json();

  if (!article) {
    return <div className='text-center text-xl text-red-500'>Article not found</div>;
  }

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-4xl font-bold text-gray-900 mb-4'>{article.title}</h1>
      <h2 className='text-2xl text-gray-700 mb-4'>{article.subtitle}</h2>

      <div className='mb-6'>
        <p className='text-lg text-gray-600'>
          <strong>By:</strong> {article.author}
        </p>
        <p className='text-lg text-gray-600'>
          <strong>Published on:</strong> {article.date}
        </p>
      </div>

      <p className='text-lg text-gray-800 mb-6'>
        <strong>Summary:</strong> {article.summary}
      </p>

      {
        <img
          className='w-full h-auto rounded-lg shadow-lg mb-6'
          src={'https://c.files.bbci.co.uk/f8b8/live/c5f45d80-741b-11ef-9423-ff8d003051c7.jpg'}
          alt={article.title}
        />
      }

      <div>
        <h3 className='text-2xl font-semibold text-gray-800 mb-4'>Article Text</h3>
        <p className='text-lg text-gray-800 leading-relaxed'>{article.text}</p>
      </div>
    </div>
  );
};

export default SpecificArticle;
