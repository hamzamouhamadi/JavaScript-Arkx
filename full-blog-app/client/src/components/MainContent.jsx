import { useState } from "react";
import { Link } from "react-router-dom";


export default function MainContent() {
  const API_URL = '/api/posts';
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }
      const fetchedPosts = await response.json();
      setPosts(fetchedPosts);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-3 gap-4">

{      isLoading ? (
      <p>Loading posts...</p>
    ) : error ? (
      <p>Error: {error}</p>
    ) : 
        (
          <div>
            {posts.map((e,index)=> (
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={index}>
                    <a href="#">
                      <img
                        className="rounded-t-lg"
                        src="./blog1.webp"
                        alt=""
                      />
                    </a>
                    <div className="p-5">
                      <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {e.title}
                        </h5>
                      </a>
                      <p className="mb-3 h-28 font-normal text-gray-700 dark:text-gray-400">
                        {e.content}
                      </p>
                      <div className="flex justify-between ">
                      <button
                        
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg"
                        onClick={()=>setblogs(blogs.filter(x=>x.id !==e.id))}
                      >
                        Delete
                      </button>
                      <Link to= {`/editblog/${e.id}`}>
                      <a
                        href="#"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg"
                      >
                        Edite
                      </a>
                      </Link>
                      </div>
                    </div>
                  </div>
        ))}
          </div>
        )}
      </div>
    </div>
  );
}
