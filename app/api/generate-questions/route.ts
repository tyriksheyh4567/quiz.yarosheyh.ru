import { groq } from "@ai-sdk/groq"
import { generateText } from "ai"
import { NextResponse } from "next/server"

export const maxDuration = 30

export async function POST(req: Request) {
  try {
    const { category, difficulty, language = "en" } = await req.json()

    if (!category || !difficulty) {
      return NextResponse.json(
        { error: language === "ru" ? "Категория и сложность обязательны" : "Category and difficulty are required" },
        { status: 400 },
      )
    }

    // Create a prompt in the selected language
    const prompt =
      language === "ru"
        ? `Создай 5 вопросов для викторины на русском языке по теме "${category}" с уровнем сложности "${difficulty}". 
         Каждый вопрос должен иметь 4 варианта ответа, один из которых правильный.
         Также добавь краткое объяснение для каждого правильного ответа.
         ВАЖНО: Все вопросы, варианты ответов и объяснения должны быть на РУССКОМ языке.
         Верни результат ТОЛЬКО в формате JSON без дополнительного текста:
         [
           {
             "id": 1,
             "question": "Вопрос на русском",
             "options": ["Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4"],
             "correctAnswer": "Правильный вариант",
             "explanation": "Объяснение правильного ответа"
           }
         ]`
        : `Create 5 quiz questions in English about "${category}" with difficulty level "${difficulty}".
         Each question should have 4 options, with one correct answer.
         Also include a brief explanation for each correct answer.
         Return the result ONLY in JSON format without any additional text:
         [
           {
             "id": 1,
             "question": "Question in English",
             "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
             "correctAnswer": "Correct option",
             "explanation": "Explanation for the correct answer"
           }
         ]`

    try {
      const { text } = await generateText({
        model: groq("llama-3.1-8b-instant"),
        prompt,
        temperature: 0.7,
        maxTokens: 2000,
      })

      // Extract JSON from the response
      const jsonMatch = text.match(/\[[\s\S]*\]/)
      if (!jsonMatch) {
        throw new Error(
          language === "ru" ? "Не удалось получить JSON из ответа" : "Failed to parse JSON from the response",
        )
      }

      let questions
      try {
        questions = JSON.parse(jsonMatch[0])

        // Validate questions format
        if (!Array.isArray(questions) || questions.length === 0) {
          throw new Error(language === "ru" ? "Некорректный формат вопросов" : "Invalid questions format")
        }

        // Ensure each question has the required properties
        questions = questions.map((q, index) => ({
          id: q.id || index + 1,
          question: q.question || (language === "ru" ? "Вопрос без содержания" : "Question without content"),
          options:
            Array.isArray(q.options) && q.options.length === 4
              ? q.options
              : [
                  language === "ru" ? "Вариант 1" : "Option 1",
                  language === "ru" ? "Вариант 2" : "Option 2",
                  language === "ru" ? "Вариант 3" : "Option 3",
                  language === "ru" ? "Вариант 4" : "Option 4",
                ],
          correctAnswer: q.correctAnswer || q.options?.[0] || (language === "ru" ? "Вариант 1" : "Option 1"),
          explanation: q.explanation || (language === "ru" ? "Нет объяснения" : "No explanation provided"),
        }))
      } catch (parseError) {
        console.error("Error parsing JSON:", parseError)
        throw new Error(language === "ru" ? "Не удалось обработать ответ от ИИ" : "Failed to process AI response")
      }

      return NextResponse.json({ questions })
    } catch (aiError) {
      console.error("AI generation error:", aiError)
      return NextResponse.json(
        { error: language === "ru" ? "Ошибка при генерации вопросов" : "Error generating questions" },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json({ error: "Failed to generate questions" }, { status: 500 })
  }
}
