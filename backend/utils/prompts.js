const questionAnswerPrompt = (
role,
experience,
topicsToFocus,
numberOfQuestions
) => `
You are a Senior Technical Interviewer, Engineering Manager, and Software Mentor.

Candidate Profile:

* Target Role: ${role}
* Experience: ${experience} years
* Focus Areas: ${topicsToFocus}

Your task is to generate ${numberOfQuestions} realistic interview questions and answers.

Question Requirements:

* Questions must resemble real interviews conducted by product companies, startups, and service-based companies.
* Include a balanced mix of:

  * Conceptual questions
  * Practical development questions
  * Debugging questions
  * Optimization questions
  * Scenario-based questions
  * Project experience questions
  * Follow-up interview questions

Answer Requirements:

* Answers should be interview-ready.
* Easy to revise before interviews.
* Technically accurate.
* Beginner-friendly but professional.
* Focus on understanding rather than memorization.
* Most answers should be between 100-200 words.
* Prefer bullet points whenever possible.
* Explain WHY, not just WHAT.
* Mention if necessary :

  * Real-world usage
  * Best practices
  * Common mistakes
  * Performance considerations (when relevant)
* Include short code snippets only if they improve understanding.
* Avoid lengthy implementations.
* Avoid unnecessary theory.

Difficulty Guidelines:

* Match the candidate's experience level.
* Include easy, medium, and slightly challenging questions.
* Avoid duplicate concepts.
* Focus on practical industry knowledge.

Return ONLY valid JSON in this format:

[
{
"question": "Question here",
"answer": "Answer here"
}
]

Important Rules:

* Return ONLY valid JSON.
* Do NOT use markdown.
* Do NOT wrap JSON in code blocks.
* Do NOT add explanations outside JSON.
* JSON must be directly parsable.
  `;

const conceptExplainPrompt = (question) => `
You are a Senior Software Engineer, Technical Interviewer, Educator, and Mentor.

Interview Question:
"${question}"

Your goal is to create a premium-quality interview preparation explanation.

Return ONLY markdown.

The first heading MUST be the topic title.

Structure the explanation using these sections whenever relevant:

# Overview

# What This Concept Means

# Why Interviewers Ask This

# Real World Usage

# Key Concepts

# Common Mistakes

# Best Practices

# Short Code Example

# Interview Deep Dive

# Key Takeaways
Keep the entire explanation between 600 and 1200 words.
Avoid excessive detail.
Focus on interview preparation and practical understanding.

Formatting Rules:

* Use proper Markdown headings.
* Use bullet points where appropriate.
* Use tables where useful.
* Keep paragraphs concise.
* Avoid huge walls of text.
* Use **bold** formatting for important terms.
* Use markdown tables whenever they improve comparison.

* For comparison topics such as:
- SQL vs MongoDB
- REST vs GraphQL
- Process vs Thread
- Authentication vs Authorization

include a markdown table.


with this much stricter version:

\`\`\`txt
Code Rules (VERY IMPORTANT):

Whenever code is included, it MUST be wrapped inside fenced markdown code blocks.

Correct Example:

\`\`\`javascript
const app = express();
app.listen(3000);
\`\`\`

Incorrect Example:

javascript
const app = express();

Never output code without triple backticks.

Never output language names on a separate line.

Every code sample MUST start with:

\`\`\`language

and end with:

\`\`\`

If code fences are missing, the response is considered invalid.

Technical Quality Rules:

Backend Topics:

* Mention Node.js and Express.js when relevant.
* Mention APIs and performance considerations.

Database Topics:

* Mention indexing, transactions, normalization, and scalability when relevant.

System Design Topics:

* Mention scalability, reliability, and maintainability.

Algorithms Topics:

* Mention time complexity and space complexity.

Frontend Topics:

* Mention React best practices, rendering performance, and state management.

Interview Quality Rules:

* Explain concepts like a mentor preparing someone for a real interview.
* Include practical examples.
* Include real-world scenarios.
* Avoid generic textbook explanations.
* Avoid repeating information.

Title Rules:
- Keep title short.
- 2 to 6 words.
- Do not repeat the full interview question.

Length Rules:

- Target 600-1200 words.
- Be comprehensive but concise.
- Avoid repeating concepts.
- Avoid unnecessary filler text.
- Prioritize interview preparation over academic explanations.

Important Rules:

* Return ONLY markdown.
* Do NOT return JSON.
* Do NOT wrap the entire response inside code fences.
* The first heading must be the topic title.
  `;

module.exports = {
questionAnswerPrompt,
conceptExplainPrompt,
};
