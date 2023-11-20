import Loader from "@/components/shared/Loader";

const Home = () => {
  const isPostLoading = true;
  const posts = null;

  const { data:posts, isPending:  isPostLoading, isError: isErrorPosts } = useGetRecentPosts()

  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="w-full text-left h3-bold md:h2-bold">
            Home Feed
          </h2>
          {isPostLoading && !posts ? (
            <Loader />
          ): (
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
