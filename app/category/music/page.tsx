"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

const musicQuestions = [
    {
        id: 1,
        question: "唱《彩虹小白马》这首歌的歌手的名字是什么？",
        options: ["周杰伦", "大张伟", "田一明"],
        answer: "B",
        explanation: "《彩虹小白马》是大张伟演唱的一首儿童歌曲。"
    },
    {
        id: 2,
        question: "《跳楼机》接歌词：Baby 我們的感情好像跳樓機讓我突然地升空又急速落地你給我一場瘋狂______",
        options: ["劫後餘生好難呼吸", "街后余生好难呼吸", "劫後鱼身好難呼吸"],
        answer: "A",
        explanation: "正确歌词是：劫後餘生好難呼吸。"
    },
    {
        id: 3,
        question: "《小幸运》这首歌是哪一部电影的主题曲？",
        options: ["《月老》", "《不能说的秘密》", "《我的少女时代》"],
        answer: "C",
        explanation: "《小幸运》是电影《我的少女时代》的主题曲。"
    },
    {
        id: 4,
        question: "“你的斑駁與眾不同你的沉默震耳欲聾”这个歌词出自哪首歌？",
        options: ["《倔强》", "《孤勇者》", "《怒放的生命》"],
        answer: "B",
        explanation: "这句歌词来自陈奕迅演唱的《孤勇者》。"
    },
    {
        id: 5,
        question: "《少年》这首歌的歌手是谁？",
        options: ["邓紫棋", "周深", "梦然"],
        answer: "C",
        explanation: "《少年》是歌手梦然演唱的歌曲。"
    },
    {
        id: 6,
        question: "《热爱105°C的你》其实是？",
        options: ["主题曲", "广告曲", "阿肆2021的新专辑《爱你》里面的一首歌"],
        answer: "B",
        explanation: "这首歌其实是广告歌曲，因为旋律洗脑而爆红。"
    },
    {
        id: 7,
        question: "下面哪首歌不是周杰伦作词？",
        options: ["《稻香》", "《青花瓷》", "《星晴》"],
        answer: "B",
        explanation: "《青花瓷》的歌词是方文山写的，不是周杰伦。"
    },
    {
        id: 8,
        question: "以下哪首歌在 YouTube 上有最多的播放量？",
        options: ["BEYOND 的《海阔天空》", "曲婉婷的《在我的歌声里》", "邓紫棋/BEYOND 的《喜欢你》"],
        answer: "B",
        explanation: "曲婉婷的《在我的歌声里》在 YouTube 上有非常高的播放量。"
    },
    {
        id: 9,
        question: "哪一段歌词出现在《听妈妈的话》的 rapping 里面？",
        options: ["因为母亲节到时我还会留着", "因为母亲节到时我要告诉她我还留着", "因为母亲节到了时我要让她看见我还留着"],
        answer: "B",
        explanation: "正确歌词是：因为母亲节到时我要告诉她我还留着。"
    },
    {
        id: 10,
        question: "周杰伦哪一张专辑里面全部歌曲播放量最多？",
        options: ["有《安静》的《范特西》", "有《夜曲》的《11月的肖邦》", "有《不该》的《周杰伦的床边故事》"],
        answer: "C",
        explanation: "《周杰伦的床边故事》整张专辑在多个平台播放量非常高。"
    }
]

export default function MusicQuiz() {

    const router = useRouter()

    const [answers, setAnswers] = useState(
        musicQuestions.map(q => ({ id: q.id, answer: "" }))
    )

    const [score, setScore] = useState(0)
    const [submitted, setSubmitted] = useState(false)

    function updateAnswer(id: number, value: string) {
        setAnswers(prev => prev.map(q => q.id === id ? { ...q, answer: value } : q))
    }

    function checkAnswer(e: React.SyntheticEvent) {
        e.preventDefault()

        let total = 0

        musicQuestions.forEach(q => {
            const user = answers.find(a => a.id === q.id)?.answer
            if (user === q.answer) total++
        })

        setScore(total)
        setSubmitted(true)
    }

    function resetQuiz() {
        setAnswers(musicQuestions.map(q => ({ id: q.id, answer: "" })))
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
                    华语音乐知识测验
                </h1>

                {submitted && (
                    <div className="bg-blue-50 p-4 rounded-md text-center font-semibold text-lg text-blue-700">
                        你的分数: {score} / {musicQuestions.length}
                    </div>
                )}

                {musicQuestions.map(({ id, question, options, answer, explanation }) => {

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