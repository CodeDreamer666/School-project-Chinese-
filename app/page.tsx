"use client"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function ChooseCategory() {
  const [category, setCategory] = useState("");
  const router = useRouter();

  return (
    <section className="bg-gray-100 h-screen flex flex-col items-center justify-center">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          router.replace(`/category/${category}`);
        }}
        className="max-w-100 w-full mx-auto flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          id="category"
          name="category"
          className="transition-all duration-300 ease-in-out outline-none cursor-text focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:shadow-md border-gray-300 border w-full rounded-md h-10 px-4 text-sm"
        >
          <option value="">选择你要回答的题目类别</option>
          <option value="china_history">中国历史</option>
          <option value="music">音乐</option>
          <option value="food">食物</option>
          <option value="traditional_culture">中国传统文化</option>
        </select>

        <button
          className="bg-blue-500 mt-2 cursor-pointer text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          开始答题
        </button>

      </form>
    </section>
  )
}