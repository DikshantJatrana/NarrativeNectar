import InputForm from "@/components/InputForm";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import StartupCardType, { StartupTypeCard } from "@/components/StartupCardType";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <div>
      <Navbar />
      <section className="pink_container">
        <h1 className="heading">
          Share Your Stories, <br />
          Connect With Creators
        </h1>
        <p className="sub-heading !max-w-3xl">
          Publish Your Ideas, Engage With Readers, and Grow Your Audience in a
          Vibrant Community of Writers and Bloggers.
        </p>
        <InputForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Result of ${query}` : "All Blogs"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard, index: number) => (
              <StartupCardType key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No Blog Found</p>
          )}
        </ul>
      </section>
      <SanityLive />
    </div>
  );
}
