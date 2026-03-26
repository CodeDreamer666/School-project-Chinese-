"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const foodQuestions = [
    {
        id: 1,
        question: "过年时最常吃，代表“团圆”的食物是？",
        options: ["面条", "饺子", "汉堡", "沙拉"],
        answer: "B",
        explanation: "在中国春节，很多家庭会一起包饺子，象征团圆和幸福。"
    },
    {
        id: 2,
        question: "下面哪一种是用米做成的甜点？",
        options: ["汤圆", "薯条", "鸡排", "披萨"],
        answer: "A",
        explanation: "汤圆是用糯米粉做的，是中国传统甜点。"
    },
    {
        id: 3,
        question: "端午节人们通常会吃什么？",
        options: ["月饼", "粽子", "面包", "冰淇淋"],
        answer: "B",
        explanation: "端午节吃粽子是为了纪念屈原。"
    },
    {
        id: 4,
        question: "哪一种食物代表“长寿”？",
        options: ["米饭", "包子", "长寿面", "饼干"],
        answer: "C",
        explanation: "生日时吃长寿面象征长命百岁。"
    },
    {
        id: 5,
        question: "中秋节吃的月饼通常象征什么？",
        options: ["财富", "团圆", "力量", "速度"],
        answer: "B",
        explanation: "月饼是圆的，象征家人团圆。"
    },
    {
        id: 6,
        question: "下面哪种食物“外面是叶子包着，里面是米和馅料”？",
        options: ["粽子", "汉堡", "饺子", "春卷"],
        answer: "A",
        explanation: "粽子用竹叶包着糯米和馅料。"
    },
    {
        id: 7,
        question: "如果你看到一个“白白的、圆圆的、里面有芝麻或花生”，最有可能是？",
        options: ["鸡蛋", "汤圆", "馒头", "面包"],
        answer: "B",
        explanation: "汤圆里面常见的馅料是芝麻或花生。"
    },
    {
        id: 8,
        question: "为什么有些人过生日会吃长寿面？",
        options: ["因为便宜", "因为好看", "因为象征长命百岁", "因为吃得快"],
        answer: "C",
        explanation: "长寿面象征健康和长寿。"
    },
    {
        id: 9,
        question: "端午节吃粽子，最初是为了纪念谁？",
        options: ["孔子", "屈原", "李白", "孙中山"],
        answer: "B",
        explanation: "粽子是为了纪念爱国诗人屈原。"
    },
    {
        id: 10,
        question: "为什么中秋节的月饼通常是圆形的？",
        options: ["因为比较好做", "因为比较好吃", "因为象征团圆与完整", "因为传统规定必须圆"],
        answer: "C",
        explanation: "圆形象征家庭团圆。"
    }
]

export default function FoodPage() {

    const router = useRouter()

    const [userAnswers, setUserAnswers] = useState(
        foodQuestions.map(({ id }) => ({ id, answer: "" }))
    )

    const [userScore, setUserScore] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    function updateAnswer(id: number, answer: string) {
        setUserAnswers(prev =>
            prev.map(q => q.id === id ? { ...q, answer } : q)
        )
    }

    function checkAnswer(event: React.SyntheticEvent) {

        event.preventDefault()

        let score = 0

        foodQuestions.forEach(q => {
            const userAnswer = userAnswers.find(a => a.id === q.id)?.answer
            if (userAnswer === q.answer) score++
        })

        setUserScore(score)
        setSubmitted(true)

    }

    function resetQuiz() {

        setUserAnswers(
            foodQuestions.map(({ id }) => ({ id, answer: "" }))
        )

        setUserScore(0)
        setSubmitted(false)

    }

    return (

        <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

            <form
                onSubmit={checkAnswer}
                className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8 flex flex-col gap-6"
            >

                <h1 className="text-2xl font-bold text-center">
                    请回答以下选择题
                </h1>

                {submitted && (
                    <div className="bg-blue-50 p-4 rounded-md text-center font-semibold text-lg text-blue-700">
                        你的分数: {userScore} / {foodQuestions.length}
                    </div>
                )}

                {foodQuestions.map(({ question, options, id, answer, explanation }) => {

                    const userAnswer = userAnswers.find(a => a.id === id)?.answer
                    const isCorrect = submitted ? userAnswer === answer : null

                    return (

                        <div key={id} className="flex flex-col gap-2">

                            <div className="flex items-center gap-4">

                                {submitted && (
                                    <span
                                        className={`w-4 h-4 rounded-full ${isCorrect ? "bg-green-500" : "bg-red-500"}`}
                                    />
                                )}

                                <div className="flex-1">

                                    <p className="text-lg font-semibold mb-1">
                                        {id}. {question}
                                    </p>

                                    <select
                                        value={userAnswer}
                                        onChange={(e) => updateAnswer(id, e.target.value)}
                                        className="border cursor-pointer border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 w-full"
                                        disabled={submitted}
                                    >

                                        <option value="">请选择你的答案</option>

                                        {options.map((opt, index) => {

                                            const optionLetter = String.fromCharCode(65 + index)

                                            return (
                                                <option key={optionLetter} value={optionLetter}>
                                                    {optionLetter}. {opt}
                                                </option>
                                            )

                                        })}

                                    </select>

                                </div>

                            </div>

                            {submitted && !isCorrect && (

                                <p className="text-sm text-red-600 ml-8">
                                    正确答案: {answer} <br />
                                    解释: {explanation}
                                </p>

                            )}

                        </div>

                    )

                })}

                {!submitted && (
                    <button
                        type="submit"
                        className="mt-2 bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        提交答案
                    </button>
                )}

                {submitted && (
                    <div className="flex gap-4 mt-4 justify-center">

                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition"
                        >
                            回首页
                        </button>

                        <button
                            type="button"
                            onClick={resetQuiz}
                            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition"
                        >
                            再答一次
                        </button>

                    </div>
                )}

            </form>

        </section>

    )

}