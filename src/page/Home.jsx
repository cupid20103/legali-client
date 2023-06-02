import React, { useEffect, useState } from "react";

import { Card, FormField, Loader } from "../components";

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => (
      <Card
        key={post._id}
        name={post.name}
        prompt={post.prompt}
        generatedDocument={post.generatedDocument}
      />
    ));
  }

  return (
    <h2 className="mt-5 font-bold text-[#6469ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        import.meta.env.VITE_REACT_APP_SERVER_URL + "/api/v1/post",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <span className="box-decoration-slice bg-gradient-to-r from-indigo-600 to-blue-500 text-[35px] text-white font-extrabold font-mono hover:font-serif hover:from-green-600 hover:to-yellow-500  px-20">
          Hello World
          <br />
        </span>

        <h1 className="font-extrabold font-mono hover:font-serif dark:text-dark  text-[#222328] text-[35px]">
          The Community Showcase
        </h1>
        <p className="font-bold font-mono mt-2 dark:text-dark  text-[#222328] text-[15px] max-w-[500px]">
          Peruse a trove of lawful manuscripts engendered by *Legalì AI
        </p>

        <span className="box-decoration-slice bg-gradient-to-r from-indigo-900 to-blue-500 text-[25px] text-white font-extrabold font-mono hover:font-serif hover:from-green-500 hover:to-yellow-500  px-5 py-0">
          Contracts
          <br />
        </span>

        <span className="box-decoration-slice bg-gradient-to-r from-indigo-900 to-blue-500 text-[25px] text-white font-extrabold font-mono hover:font-serif hover:from-green-500 hover:to-yellow-500  px-5 rounded-md">
          Power of attorney
          <br />
        </span>

        <span className="box-decoration-slice bg-gradient-to-r from-indigo-900 to-blue-500 text-[25px] text-white font-extrabold font-mono hover:font-serif hover:from-green-600 hover:to-yellow-500 px-5 ">
          Wills
          <br />
        </span>

        <span className="box-decoration-slice bg-gradient-to-r from-indigo-900 to-blue-500 text-[25px] text-white font-extrabold font-mono hover:font-serif hover:from-green-600 hover:to-yellow-500 px-5 rounded-md">
          Articles of Incorporation
          <br />
        </span>

        <span className="box-decoration-slice bg-gradient-to-r from-indigo-700 to-blue-500 text-[25px] text-white font-extrabold font-mono hover:font-serif hover:from-green-600 hover:to-yellow-500 px-5 ">
          NDAs
          <br />
        </span>

        <span className="box-decoration-slice bg-gradient-to-r from-indigo-600 to-blue-500 text-[25px] text-white font-extrabold font-mono hover:font-serif hover:from-green-600 hover:to-yellow-500 px-5 rounded-md">
          Intellectual Property Assignment Agreement
          <br />
        </span>

        <p className="font-bold font-mono hover:font-serif mt-2 dark:text-dark  text-[#222328] text-[16px]  max-w-[500px]">
          to name only a few examples
        </p>
      </div>

      <div className="mt-16">
        <FormField
          labelName="Search posts"
          type="text"
          name="text"
          placeholder="Search something..."
          value={searchText}
          handleChange={handleSearchChange}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <div className="flex justify-center items-center">
            <Loader />
          </div>
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Resuls for{" "}
                <span className="text-[#222328]">{searchText}</span>:
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={searchedResults}
                  title="No Search Results Found"
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts Yet" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
