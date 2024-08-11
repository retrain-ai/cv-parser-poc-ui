import OpenAI from "openai";

function schema() {
  return {
    type: "object",
    properties: {
      personalData: {
        type: "object",
        properties: {
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          phone: {
            type: "string",
          },
          address: {
            type: "string",
          },
        },
        required: ["email"],
      },
      skills: {
        type: "array",
        items: {
          type: "string",
        },
      },
      workExperience: {
        type: "array",
        items: {
          type: "object",
          properties: {
            title: {
              type: "string",
            },
            companyName: {
              type: "string",
            },
            description: {
              type: "string",
            },
            staringDate: {
              type: "string",
            },
            endDate: {
              type: "string",
            },
          },
        },
      },
      Education: {
        type: "array",
        items: {
          type: "object",
          properties: {
            credentialName: {
              type: "string",
            },
            startingDate: {
              type: "string",
            },
            endDate: {
              type: "string",
            },
            institute: {
              type: "string",
            },
          },
        },
      },
    },
  };
}

const client = new OpenAI();
export function parseCv(content: string) {
  return client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You are an asistant that helps parse resumes. Take the following resume and parse it into a json object accroding to the schema. Extract user skills, both that appear explicitly, and implicitly. Extract personal data, work experience, and education.",
      },
      {
        role: "user",
        content: content,
      },
    ],
    model: "gpt-4o-2024-08-06",
    response_format: {
      json_schema: {
        name: "Resume",
        description:
          "This json is meant to be an accurate description of a person's resume",
        schema: schema(),
        strict: false,
      },
      type: "json_schema",
    },
  });
}
