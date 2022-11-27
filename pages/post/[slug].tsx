import { GetStaticProps } from "next";

import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";

interface Props {
    post: Post;
}

const Post = ({ post }: Props) => {
    return (
        <main>
            <Header />

            <img className=" w-full h-40 object-cover" src={urlFor(post.mainImage).url()!} alt="banner" />

            <article className="max-w-3xl mx-auto p-5 sm:p-10 pt-0 sm:pt-5">
                <h1 className="text-2xl sm:text-4xl mt-6 sm:mt-8 mb-2 sm:mb-4 font-bold font-serif">{post.title}</h1>
                <div className="flex items-center space-x-1">
                    <img className="h-6 sm:h-8 w-6 sm:w-8 rounded-full" src={urlFor(post.author.image).url()} alt="" />
                    <span className="text-amber-800 font-bold text-xs sm:text-base">{post.author.name}</span>
                    <p>-</p>
                    <p className="text-slate-500 font-bold text-xs sm:text-base"> posted at {new Date(post._createdAt).toLocaleString()}</p>
                </div>

                <div className="mt-5">
                    <PortableText
                        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                        content={post.body}
                        serializers={
                            {
                                h1: (props: any) => (
                                    <h1 className="text-xl sm:text-2xl font-bold my-2" {...props} />
                                ),
                                h2: (props: any) => (
                                    <h1 className="text-xl font-bold my-2" {...props} />
                                ),
                                normal: (props: any) => (
                                    <p className="text-lg sm:text-xl font-normal my-1" {...props} />
                                ),
                            }
                        }
                    />
                </div>
            </article>
        </main>
    )
}

export default Post

export const getStaticPaths = async () => {
    const query = `*[_type == "post"]{
        _id,
        slug{
          current
        }
      }`;

    const posts = await sanityClient.fetch(query);

    const paths = posts.map((post: Post) => ({
        params: {
            slug: post.slug.current
        }
    }));

    return {
        paths,
        fallback: "blocking",
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const query = `*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author-> {
          name,
          image
        },
        description,
        body,
        mainImage,
        slug
    }`

    const post = await sanityClient.fetch(query, {
        slug: params?.slug
    });

    if (!post) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            post
        },
        revalidate: 60,
    };
};