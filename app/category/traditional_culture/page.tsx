"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const traditional_culture = [
    { id: 1, question: "春节是农历新年。", answer: true, explanation: "春节就是中国的农历新年，是中国最重要的传统节日。" },
    { id: 2, question: "中秋节一定在9月。", answer: false, explanation: "中秋节在农历八月十五，在公历有时是9月，有时是10月。" },
    { id: 3, question: "中国的国旗是红色的。", answer: true, explanation: "中国国旗叫五星红旗，背景是红色。" },
    { id: 4, question: "龙是中国真实存在的动物。", answer: false, explanation: "龙是中国神话中的动物，不是真实存在的。" },
    { id: 5, question: "中国有56个民族。", answer: true, explanation: "中国共有56个民族，包括汉族和55个少数民族。" },
    { id: 6, question: "“十二生肖”一共有10种动物。", answer: false, explanation: "十二生肖一共有12种动物。" },
    { id: 7, question: "龙在十二生肖里。", answer: true, explanation: "龙是十二生肖之一。" },
    { id: 8, question: "中国古代四大发明包括火药。", answer: true, explanation: "中国四大发明包括造纸术、指南针、火药和印刷术。" },
    { id: 9, question: "中国人名字是“名在前，姓在后”。", answer: false, explanation: "中国人的名字通常是姓在前，名在后。" },
    { id: 10, question: "过年要给红包。", answer: true, explanation: "春节时长辈会给晚辈红包，代表祝福和好运。" },
    { id: 11, question: "红色在中国代表不吉利。", answer: false, explanation: "红色在中国代表好运、喜庆和幸福。" },
    { id: 12, question: "见面时要鞠躬是中国的传统。", answer: false, explanation: "中国一般是握手或点头问好，鞠躬更多见于日本文化。" },
];

export default function TraditionalCulturePage() {

    const router = useRouter()

    const [userAnswers, setUserAnswers] = useState(
        traditional_culture.map(({ id }) => ({
            id,
            answer: null as boolean | null
        }))
    )

    const [userScore, setUserScore] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    function updateAnswer(id: number, answer: boolean) {
        setUserAnswers(prev =>
            prev.map(q => q.id === id ? { ...q, answer } : q)
        )
    }

    function checkAnswer(event: React.SyntheticEvent) {

        event.preventDefault()

        const score = traditional_culture.filter(q => {
            const userAnswer = userAnswers.find(a => a.id === q.id)
            return userAnswer?.answer === q.answer
        }).length

        setUserScore(score)
        setSubmitted(true)

    }

    function resetQuiz() {

        setUserAnswers(
            traditional_culture.map(({ id }) => ({
                id,
                answer: null
            }))
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
                    请回答以下判断题
                </h1>

                {submitted && (
                    <div className="bg-blue-50 p-4 rounded-md text-center font-semibold text-lg text-blue-700">
                        你的分数: {userScore} / {traditional_culture.length}
                    </div>
                )}

                {traditional_culture.map(({ question, id, answer, explanation }) => {

                    const userAnswer = userAnswers.find(a => a.id === id)?.answer
                    const isCorrect = submitted ? userAnswer === answer : null

                    return (

                        <div key={id} className="flex flex-col gap-2">

                            <div className="flex items-center gap-4">

                                {submitted && (
                                    <span
                                        className={`w-4 h-4 rounded-full ${isCorrect ? "bg-green-500" : "bg-red-500"
                                            }`}
                                    />
                                )}

                                <p className="text-lg font-semibold flex-1">
                                    {id}. {question}
                                </p>

                                <select
                                    value={userAnswer === null ? "" : userAnswer?.toString()}
                                    onChange={(e) => updateAnswer(id, e.target.value === "true")}
                                    className="border cursor-pointer border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                                    disabled={submitted}
                                >

                                    <option value="">请选择你的答案</option>
                                    <option value="true">对</option>
                                    <option value="false">错</option>

                                </select>

                            </div>

                            {submitted && !isCorrect && (
                                <p className="text-sm text-red-600 ml-8">
                                    正确答案: {answer ? "对" : "错"} <br />
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
                            className="bg-gray-500 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600 transition"
                        >
                            回首页
                        </button>

                        <button
                            type="button"
                            onClick={resetQuiz}
                            className="bg-blue-500 cursor-pointer text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition"
                        >
                            再答一次
                        </button>

                    </div>
                )}

            </form>

        </section>

    )

}