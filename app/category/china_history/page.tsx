"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const chinaHistory = [
    { id: 1, question: "中国的首都是北京。", answer: true },
    { id: 2, question: "秦始皇是中国第一个皇帝。", answer: true },
    { id: 3, question: "长城在中国。", answer: true },
    { id: 4, question: "孔子是一个很有名的中国老师。", answer: true },
    { id: 5, question: "唐朝在清朝后面。", answer: false, explanation: "正确顺序是唐朝在前，清朝在后。" },
    { id: 6, question: "明朝是中国最后一个朝代。", answer: false, explanation: "最后一个朝代是清朝。" },
    { id: 7, question: "三国有四个国家。", answer: false, explanation: "三国只有魏、蜀、吴三个国家。" },
    { id: 8, question: "秦始皇统一了中国。", answer: true },
    { id: 9, question: "长城是清朝开始建的。", answer: false, explanation: "长城在战国时期已经开始建，秦始皇后来把它们连起来。" },
    { id: 10, question: "唐朝的首都是长安。", answer: true },
]

export default function ChinaHistoryPage() {
    const router = useRouter()

    const [userAnswers, setUserAnswers] = useState(
        chinaHistory.map(({ id }) => ({
            id,
            answer: null as boolean | null
        }))
    )

    const [score, setScore] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    function updateAnswer(id: number, answer: boolean) {
        setUserAnswers(prev =>
            prev.map(q => q.id === id ? { ...q, answer } : q)
        )
    }

    function checkAnswer(e: React.SyntheticEvent) {
        e.preventDefault()

        const correct = chinaHistory.filter(q => {
            const user = userAnswers.find(a => a.id === q.id)
            return user?.answer === q.answer
        }).length

        setScore(correct)
        setSubmitted(true)
    }

    function resetQuiz() {
        setUserAnswers(
            chinaHistory.map(({ id }) => ({
                id,
                answer: null
            }))
        )
        setScore(0)
        setSubmitted(false)
    }

    return (
        <section className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <form
                onSubmit={checkAnswer}
                className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-8 flex flex-col gap-6"
            >

                <h1 className="text-2xl font-bold text-center">
                    中国历史判断题
                </h1>

                {submitted && (
                    <div className="bg-blue-50 p-4 rounded-md text-center font-semibold text-lg text-blue-700">
                        你的分数: {score} / {chinaHistory.length}
                    </div>
                )}

                {chinaHistory.map(({ id, question, answer, explanation }) => {

                    const userAnswer = userAnswers.find(a => a.id === id)?.answer
                    const correct = userAnswer === answer

                    return (
                        <div key={id} className="flex flex-col gap-2">

                            <div className="flex items-center gap-4">
                                {submitted && (
                                    <span
                                        className={`w-4 h-4 rounded-full ${correct ? "bg-green-500" : "bg-red-500"}`}
                                    />
                                )}

                                <p className="text-lg font-semibold flex-1">
                                    {id}. {question}
                                </p>

                                <select
                                    disabled={submitted}
                                    value={userAnswer === null ? "" : userAnswer?.toString()}
                                    onChange={(e) => updateAnswer(id, e.target.value === "true")}
                                    className="border cursor-pointer border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <option value="">请选择你的答案</option>
                                    <option value="true">对</option>
                                    <option value="false">错</option>
                                </select>
                            </div>

                            {submitted && !correct && explanation && (
                                <p className="text-sm text-red-600 ml-8">
                                    解释：{explanation}
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
                            className="bg-gray-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-600"
                        >
                            回首页
                        </button>

                        <button
                            type="button"
                            onClick={resetQuiz}
                            className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600"
                        >
                            再答一次
                        </button>
                    </div>
                )}

            </form>
        </section>
    )
}