"use client"
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPaginatedArticles } from "@/redux/articleSlice"; // Adjust the import path
import { RootState, AppDispatch } from "@/redux/store";
import Link from "next/link"; // For linking to article details

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { paginated_articles, loading, error } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(fetchPaginatedArticles());
  }, [dispatch]);

  useEffect(() => {
    if (paginated_articles && paginated_articles.results) {
      console.log("Articles:", paginated_articles.results);
    }
  }, [paginated_articles]);

  if (loading) return <div className="text-center text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div>
      <main >
      
      <div className="container mx-auto p-4 bg-white text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-black">Top Stories</h1>
      {paginated_articles?.results && paginated_articles.results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated_articles.results.map((article) => (
            <Link
              key={article.id}
              href={`/article/${article.id}`} // Link to individual article page
              className="block group"
            >
              <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden transform hover:scale-105">
                {/* Category Badge at Top */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {article.category || "General"}
                  </span>
                </div>

                {/* Fixed-Size Image */}
                <div className="w-full h-48 bg-gray-100 overflow-hidden">
                  <Image
                    width={400}
                    height={500}
                    src={article.image_url || "/default-image.jpg"}
                    alt={article.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Article Title Below */}
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-500 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-300 text-center">No articles found.</p>
      )}
      {/* {paginated_articles && (
        <div className="mt-8 text-center">
          <p className="text-gray-300 mb-4">
            Page {paginated_articles.page.toString()} of {paginated_articles.total_pages.toString()} (
            {paginated_articles.count.toString()} total articles)
          </p>
          {paginated_articles.previous && (
            <button
              onClick={() => dispatch(fetchPaginatedArticles(Number(paginated_articles.previous?.split("page=")[1])))}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 mr-4"
            >
              Previous
            </button>
          )}
          {paginated_articles.next && (
            <button
              onClick={() => dispatch(fetchPaginatedArticles(Number(paginated_articles.next?.split("page=")[1])))}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Next
            </button>
          )}
        </div>
      )} */}
    </div>


      </main>
      
    </div>
  );
}
