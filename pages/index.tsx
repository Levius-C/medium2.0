import Head from "next/head";
import Header from "../components/Header";
import { urlFor } from "../sanity";
import { Post } from "../typings";
import { GetStaticProps, NextPage } from "next"
import Link from "next/link";
import { fetchPosts } from "../util/fetchPosts";

interface Props {
  posts: Post[]
}

const Home: NextPage<Props> = ({ posts }: Props) => {
  console.log(posts)
  return (
    < div className="max-w-7xl mx-auto" >
      <Head>
        <title>Medium 2.0</title>
        <link rel="icon" href="https://links.papareact.com/yvf" />
      </Head>

      <Header />

      <div className="flex justify-between items-center border-y bg-amber-400 border-black py-10 lg:py-0">
        <div className="px-10 space-y-8">
          <h1 className="text-6xl md:text-7xl lg:text-8xl max-w-xl font-serif font-medium">
            Stay curious.
          </h1>
          <h2 className="text-xl font-medium">
            Discover stories, thinking, and expertise from writers on any topic.
          </h2>
          <button className="text-white bg-slate-900 px-10 py-2 rounded-full text-xl">
            Start reading
          </button>
        </div>
        <img
          className="hidden md:inline-flex h-64 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png"
          alt="Medium LOGO"
        />
      </div>

      {/* posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-6 p-2 md:p-6">
        {posts?.map(post =>
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="flex-row sm:flex justify-between group border rounded-lg ">
              <div className="p-5 space-y-4">
                <div className="flex items-center space-x-3 ">
                  <img className="h-6 w-6 rounded-full" src={urlFor(post.author.image).url()} alt="" />
                  <p>{post.author.name}</p>
                </div>
                <h1 className="text-xl md:text-2xl font-bold ">{post.title}</h1>
                <div className="inline-flex sm:flex-col">
                  <h3>created at &nbsp;</h3>
                  <h3>{post._createdAt.slice(0, 10)}</h3>
                </div>
              </div>
              <div>
                <img className="w-60 h-full object-cover p-5 group-hover:scale-105 transition-transform duration-200 ease-in-out" src={urlFor(post.mainImage).url()} alt="" />
              </div>
            </div>
          </Link>
        )}
      </div>


    </div>
  );
};

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const posts: Props = await fetchPosts();
  return {
    props: { posts },
  };
};
