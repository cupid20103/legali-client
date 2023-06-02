import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getRandomPrompt } from "../utils";
import { FormField, Loader } from "../components";

// const { VITE_REACT_APP_SERVER_URL } = process.env;

const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    prompt: "",
    document: "",
  });

  const [generatingText, setGeneratingText] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateText = async () => {
    if (form.prompt) {
      try {
        setGeneratingText(true);

        const response = await fetch(
          import.meta.env.VITE_REACT_APP_SERVER_URL + "/api/v1/dalle",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt: form.prompt }),
          }
        );

        const data = await response.json();
        const generatedText = data.text;

        setForm({ ...form, document: generatedText });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingText(false);
      }
    } else {
      alert("Please provide a proper prompt");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.document) {
      setLoading(true);
      try {
        await fetch(
          import.meta.env.VITE_REACT_APP_SERVER_URL + "/api/v1/post",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
          }
        );
        alert("Success");
        navigate("/");
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please generate a legal document with proper details");
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold font-mono hover:font-serif text-[#222328] text-[32px]">
          Where Law Meets Creativity
        </h1>
        <span className="box-decoration-slice bg-gradient-to-r from-indigo-600 to-blue-400 text-[30px] text-white font-extrabold font-mono hover:font-serif hover:from-dark-400 hover:to-green-200 px-9 ...">
          Unleash your imagination
          <br />
        </span>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex: Doina"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Scenario: Co-Founders with Varying Levels of Investment Founders Agreement: Vesting Agreement"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* Generate button */}
          <div className="flex gap-5">
            <button
              type="button"
              onClick={generateText}
              className="text-white font-mono bg-gradient-to-r from-cyan-600 to-blue-600 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {generatingText ? "Generating..." : "Generate"}
            </button>
          </div>

          {/* Generated document textarea */}
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-3 h-64 flex justify-center items-center">
            {form.document ? (
              <textarea
                className="w-full h-full object-contain"
                name="document"
                value={form.document}
                placeholder="Generated document will appear here"
                onChange={handleChange}
              />
            ) : null}
            {generatingText && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        {/* Share button */}
        <div className="mt-10">
          <button
            type="submit"
            className="mt-3 text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-green-500 hover:to-yellow-300  font-bold font-mono rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the Community"}
          </button>

          <p className="font-bold font-mono hover:font-serif mt-2 dark:text-dark  text-[#222328] text-[16px]">
            **Legalì is currently in beta testing phase
          </p>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
