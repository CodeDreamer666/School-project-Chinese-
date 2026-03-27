"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const novelQuestions = [
    {
        id: 1,
        question: "《三国演义》里面分别是哪三国？",
        options: ["中国，美国，泰国", "魏国，蜀国，吴国", "前燕，西凉，夏国"],
        answer: "B",
        explanation: "《三国演义》讲述的是魏国、蜀国、吴国三国争霸的故事。"
    },
    {
        id: 2,
        question: "《三国演义》里面哪三个人结拜成兄弟？",
        options: ["刘备，赵云，张飞", "吕布，关羽，赵云", "刘备，张飞，关羽"],
        answer: "C",
        explanation: "刘备、关羽、张飞在桃园结义，结拜成为兄弟。"
    },
    {
        id: 3,
        question: "《水浒传》里面讲述着多少个好汉的故事？",
        options: ["1108", "118", "108"],
        answer: "C",
        explanation: "《水浒传》讲述梁山108位好汉的故事。"
    },
    {
        id: 4,
        question: "《红楼梦》的作者是：",
        options: ["罗贯中", "吴承恩", "曹雪芹", "施耐庵"],
        answer: "C",
        explanation: "《红楼梦》的作者是清代作家曹雪芹。"
    },
    {
        id: 5,
        question: "《红楼梦》主要讲的是：",
        options: ["打仗故事", "神话故事", "一个大家族的生活和变化", "科学发明"],
        answer: "C",
        explanation: "《红楼梦》主要描写贾、史、王、薛四大家族的兴衰与生活。"
    },
    {
        id: 6,
        question: "《西游记》中，用来打发、安抚孙悟空的职位是？",
        options: ["弼马温", "蟠桃园主管", "齐天大圣"],
        answer: "A",
        explanation: "玉皇大帝最初给孙悟空的职位是弼马温。"
    },
    {
        id: 7,
        question: "《西游记》里面的金箍棒本来的用途是什么？",
        options: ["稳定东海的大柱子", "稳定西海的大柱子", "一个很重，收缩自如的兵器"],
        answer: "A",
        explanation: "金箍棒原本是东海龙宫用来镇海的定海神针。"
    },
    {
        id: 8,
        question: "以下哪个选项中的梁山好汉，其绰号与人物自身的“外形特征”有关？",
        options: ["及时雨宋江", "鼓上蚤时迁", "九纹龙史进", "智多星吴用"],
        answer: "C",
        explanation: "史进身上有九条龙的纹身，因此绰号叫“九纹龙”。"
    },
    {
        id: 9,
        question: "下列哪一项最能概括《水浒传》的主题思想？",
        options: ["描写帝王将相的宫廷斗争", "讲述才子佳人的浪漫爱情故事", "歌颂官逼民反的英雄抗争", "记录唐代高僧的西行取经之路"],
        answer: "C",
        explanation: "《水浒传》歌颂官逼民反的英雄抗争精神。"
    },
    {
        id: 10,
        question: "谁是《三国演义》里面最大的赢家？",
        options: ["刘备", "孙权", "曹操", "司马懿"],
        answer: "D",
        explanation: "三国最后被司马懿的后代统一，建立晋朝，因此被认为是最大的赢家。"
    }
]

export default function NovelQuiz() {

    const router = useRouter()

    const [answers, setAnswers] = useState(
        novelQuestions.map(q => ({ id: q.id, answer: "" }))
    )

    const [score, setScore] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    function updateAnswer(id: number, value: string) {
        setAnswers(prev => prev.map(q => q.id === id ? { ...q, answer: value } : q))
    }

    function checkAnswer(e: React.SyntheticEvent) {
        e.preventDefault()

        let total = 0

        novelQuestions.forEach(q => {
            const user = answers.find(a => a.id === q.id)?.answer
            if (user === q.answer) total++
        })

        setScore(total)
        setSubmitted(true)
    }

    function resetQuiz() {
        setAnswers(novelQuestions.map(q => ({ id: q.id, answer: "" })))
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
                    四大名著知识测验
                </h1>

                {submitted && (
                    <div className="bg-blue-50 p-4 rounded-md text-center font-semibold text-lg text-blue-700">
                        你的分数: {score} / {novelQuestions.length}
                    </div>
                )}

                {novelQuestions.map(({ id, question, options, answer, explanation }) => {

                    const userAnswer = answers.find(a => a.id === id)?.answer
                    const correct = submitted ? userAnswer === answer : null

                    return (

                        <div key={id} className="flex flex-col gap-2">

                            <div className="flex items-center gap-4">

                                {submitted && (
                                    <span className={`w-4 h-4 rounded-full ${correct ? "bg-green-500" : "bg-red-500"}`} />
                                )}

                                <div className="flex-1">

                                    <p className="font-semibold mb-1">
                                        {id}. {question}
                                    </p>

                                    <select
                                        disabled={submitted}
                                        value={userAnswer}
                                        onChange={(e) => updateAnswer(id, e.target.value)}
                                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                    >

                                        <option value="">请选择答案</option>

                                        {options.map((opt, index) => {

                                            const letter = String.fromCharCode(65 + index)

                                            return (
                                                <option key={letter} value={letter}>
                                                    {letter}. {opt}
                                                </option>
                                            )

                                        })}

                                    </select>

                                </div>

                            </div>

                            {submitted && !correct && (
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
                        className="bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
                    >
                        提交答案
                    </button>
                )}

                {submitted && (
                    <div className="flex gap-4 justify-center">

                        <button
                            type="button"
                            onClick={() => router.push("/")}
                            className="bg-gray-500 text-white py-3 px-6 rounded-lg"
                        >
                            回首页
                        </button>

                        <button
                            type="button"
                            onClick={resetQuiz}
                            className="bg-blue-500 text-white py-3 px-6 rounded-lg"
                        >
                            再答一次
                        </button>

                    </div>
                )}

            </form>

        </section>

    )

}