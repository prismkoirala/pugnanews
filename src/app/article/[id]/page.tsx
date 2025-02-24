import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Article, ArticleDescription, PaginatedArticle } from "@/types";

interface ArticleDetailPageProps {
  params: Promise<{ id: string }>; // Type params as a Promise
  }

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`, {
      mode: "cors",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const article = await response.json() as Article;

    return {
      title: `${article.title} - choto`,
      description: typeof article.desc_list[0].value === 'string' 
      ? article.desc_list[0].value 
      : Array.isArray(article.desc_list[0].value) 
        ? article.desc_list[0].value[0] || "Read the latest news article" 
        : "Read the latest news article",
      keywords: article.keyword_list || ["news", "article", article.category || "general"],
      openGraph: {
        title: article.title,
        description: typeof article.desc_list[0].value === 'string' 
        ? article.desc_list[0].value 
        : Array.isArray(article.desc_list[0].value) 
          ? article.desc_list[0].value[0] || "Read the latest news article" 
          : "Read the latest news article",
        images: [article.image_url || "/default-image.jpg"],
        url: `https://xyznews.com/article/${id}`, // Use your production domain
        type: "article",
        siteName: "chotomedia",
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: typeof article.desc_list[0].value === 'string' 
        ? article.desc_list[0].value 
        : Array.isArray(article.desc_list[0].value) 
          ? article.desc_list[0].value[0] || "Read the latest news article" 
          : "Read the latest news article",
        images: [article.image_url || "/default-image.jpg"],
      },
      // canonical: `https://xyznews.com/article/${params.id}`, // Canonical URL for SEO
    };
  } catch (error) {
    console.log(error)
    return {
      title: "Article Not Found - xyznews",
      description: "The requested article could not be found.",
    };
  }
}

export default async function ArticleDetail({ params }: ArticleDetailPageProps) {
  const resolvedParams = await params; // Await the Promise
  const { id } = resolvedParams;

  try {
    // Fetch the specific article by ID
    const articleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/${id}`, {
      mode: "cors",
      credentials: "include",
    });
    if (!articleResponse.ok) {
      throw new Error(`HTTP error! status: ${articleResponse.status}`);
    }
    const articleData = await articleResponse.json() as Article;
    console.log('articleData:', articleData)
    // Fetch other news (e.g., latest articles, excluding the current article)
    const otherArticleResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post?limit=5`, {
      mode: "cors",
      credentials: "include",
    });
    if (!otherArticleResponse.ok) {
      throw new Error(`HTTP error! status: ${otherArticleResponse.status}`);
    }
    const otherArticleData = await otherArticleResponse.json() as PaginatedArticle;
    const otherArticle: Article[] = otherArticleData.results || [];

    // Filter out the current article from other news
    // const filteredOtherNews = otherNews.filter((news) => news.id !== Number(id)).slice(0, 4); // Limit to 4 for sidebar

    if (!articleData) {
      return (
        <div className="container mx-auto p-4 bg-black text-white min-h-screen">
          <h1 className="text-2xl font-bold text-center">Article Not Found</h1>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Article Not Found - xyznews",
                description: "The requested article could not be found.",
                url: `https://xyznews.com/article/not-found`,
              }),
            }}
          />
        </div>
      );
    }

    return (
      <div className="container mx-auto p-4 bg-white text-white min-h-screen">
        {/* Breadcrumbs with Structured Data */}
        <nav className="mb-6 text-sm text-gray-400" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white">
            Home
          </Link>{" "}
          /{" "}
          {/* <Link href={`/category/${articleData.category || "general"}`} className="hover:text-white">
            {articleData.category || "General"}
          </Link> */}
          {/* {" "}
          /  */}
          {articleData.title}
        </nav>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://xyznews.com" },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: articleData.category || "General",
                  item: `https://xyznews.com/category/${articleData.category || "general"}`,
                },
                { "@type": "ListItem", position: 3, name: articleData.title, item: `https://xyznews.com/article/${id}` },
              ],
            }),
          }}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Details (Left Column, 2/3 on large screens) */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {articleData.category || "General"}
              </span>
            </div>


            {/* Article Title, Content, and Structured Data */}
            <h1 className="text-3xl text-black font-bold mb-4">{articleData.title}</h1>
            <p className="text-sm text-gray-400 italic mb-6">
              Published on: {articleData.formatted_datetime || "Date not available"}
            </p>
            {/* Image with Structured Data */}
            <div className="mb-6 overflow-hidden rounded-lg shadow-md">
              {articleData.image_url ? (
                <Image
                  src={articleData.image_url}
                  alt={articleData.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
                  // loading="lazy"
                  priority // For SEO, load main image quickly
                />
              ) : (
                <div className="w-full h-[400px] bg-gray-700 flex items-center justify-center">
                  No Image Available
                </div>
              )}
            </div>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "ImageObject",
                  url: articleData.image_url || "https://pugnanews.com/default-image.jpg",
                  width: 800,
                  height: 400,
                  caption: articleData.title,
                }),
              }}
            />
            
            <div className="prose prose-invert max-w-4xl text-gray-600 space-y-6" itemProp="articleBody">
              {articleData.formatted_datetime}
              {articleData.desc_list.map((desc: ArticleDescription, index: number) => {
      
                switch (desc.type) {
                  case "paragraph":
                    return (
                      <p key={index} className="text-lg leading-relaxed text-gray-700">
                        {desc.value as string}
                      </p>
                    );
                  case "header":
                    return (
                      <h3 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                        {desc.value as string}
                      </h3>
                    );
                  case "block quote":
                  case "blockquote":
                  case "block quotes":
                    return (
                      <blockquote key={index} className="border-l-4 border-blue-500 pl-6 py-4 italic text-gray-600 bg-gray-100 rounded-md">
                        {desc.value as string}
                      </blockquote>
                    );
                  case "list":
                    if (Array.isArray(desc.value)) {
                      return (
                        <ul key={index} className="list-disc pl-6 space-y-2 text-gray-700">
                          {desc.value.map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="text-lg leading-relaxed">
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={index}>Invalid list format</p>;
                  case "italic":
                    return (
                      <i key={index} className="text-lg text-gray-700 italic">
                        {desc.value as string}
                      </i>
                    );
                  default:
                    return (
                      <p key={index} className="text-lg text-gray-700">
                        No description available. {desc.type}
                      </p>
                    );
                }
              })}
            </div>
            
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "NewsArticle",
                  headline: articleData.title,
                  image: articleData.image_url || "https://pugnanews.com/default-image.jpg",
                  // author: articleData.author ? { "@type": "Person", name: articleData.author } : undefined,
                  datePublished: articleData.formatted_datetime,
                  description: typeof articleData.desc_list[0].value === 'string' 
                  ? articleData.desc_list[0].value 
                  : Array.isArray(articleData.desc_list[0].value) 
                    ? articleData.desc_list[0].value[0] || "Read the latest news article" 
                    : "Read the latest news article",
                  url: `https://pugnanews.com/article/${id}`,
                  publisher: {
                    "@type": "Organization",
                    name: "",
                    logo: {
                      "@type": "ImageObject",
                      url: "https://pugnanews.com/logo.png", // Replace with your logo URL
                      width: 600,
                      height: 60,
                    },
                  },
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `https://pugnanews.com/article/${id}`,
                  },
                  keywords: articleData.keyword_list || ["news", "article", articleData.category || "general"],
                }),
              }}
            />

            {/* Keywords as Tags */}
            {articleData.keyword_list && articleData.keyword_list.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {articleData.keyword_list.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-black px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer"
                    itemProp="keywords"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            )}
            {/* Image Source Attribution */}
            <p className=" pt-4 mb-4 text-sm text-gray-400 italic">
              Image source: {articleData.source || "Unknown Source"}
            </p>
          </div>


          {/* Sidebar for Other News (Right Column, 1/3 on large screens) */}
          <aside className="lg:col-span-1">
            <h2 className="text-2xl font-semibold mb-4 text-black">Other Stories</h2>
            <div className="space-y-4">
              {otherArticle.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.id}`}
                  className="flex items-center gap-4 p-3 bg-gray-100 hover:bg-gray-300 transition-colors group"
                >
                  {article.image_url ? (
                    <Image
                      src={article.image_url}
                      alt={article.title}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-15 h-15 bg-gray-700 rounded flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <span className="text-black group-hover:text-blue-400 transition-colors line-clamp-2">
                    {article.title}
                  </span>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {/* Back to Top Button (Optional Modern Touch) */}
        <div className="mt-8 text-center">
          <Link href="#top" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition-colors">
            Back to Top
          </Link>
        </div>

        {/* Sitemap Link for SEO (Optional) */}
        <link rel="sitemap" href="https://xyznews.com/sitemap.xml" />
      </div>
    );
  } catch (error) {
    console.error("Fetch error:", error);
    return (
      <div className="container mx-auto p-4 bg-black text-black min-h-screen">
        <h1 className="text-2xl font-bold text-center">Error Loading Article</h1>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              name: "Error Loading Article - xyznews",
              description: "An error occurred while loading the article.",
              url: `https://xyznews.com/article/error`,
            }),
          }}
        />
      </div>
    );
  }
}