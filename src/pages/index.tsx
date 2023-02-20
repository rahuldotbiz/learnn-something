import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import Hero from "../components/partials/Heros/default";
import ResourceCard from "../components/partials/ResourceCard";
import Spinner from "../components/partials/Spinner";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  const { data, error, isLoading } = api.airtable.getTablesHome.useQuery();
  return (
    <>
      <Head>
        <title>Learnn - Resources, Roadmaps, Everything.</title>

        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <meta
          name="description"
          content="Discover a world of resources with Learnn - the ultimate destination for anyone seeking knowledge. Get access to roadmaps and a wealth of information."
        />
        <meta
          property="og:title"
          content="Learnn - Resources, Roadmaps, Everything."
        />
        <meta
          property="og:description"
          content="Discover a world of resources with Learnn - the ultimate destination for anyone seeking knowledge. Get access to roadmaps and a wealth of information."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/rahulism/image/upload/v1675348799/44324ea1-83fc-4e64-bfab-b56808f9f164_nlgzkq.jpg"
        />
        <meta property="og:url" content="https://learnn.cc" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/learnn.svg" />
      </Head>
      <Layout>
        <main>
          <Hero />
          <div className="mt-4">
            <div
              id="learn"
              className="m-4 flex flex-wrap justify-center gap-6 border-t border-b border-t-indigo-100  border-b-indigo-100 pt-2.5 pb-2.5"
            >
              {isLoading && <Spinner />}
              {error && <p>Error: {error.message}</p>}
              {data &&
                data.map((item) => (
                  <ResourceCard
                    key={item.Name}
                    title={item.Name}
                    description={item.Description}
                    imageUrl={item?.Image?.[0]?.url || "/learnn.svg"}
                    url={item.Link}
                  />
                ))}
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
};

export default Home;
