
from gemini_aqa_client import GeminiAQA, Document

import concurrent.futures

import json
from google import genai
from google.genai import types
# Only run this block for Google AI API
with open("api_key.env", 'r') as f:
            api_key = f.read().strip()
client = genai.Client(api_key=api_key)

aqa = GeminiAQA()
lds = aqa.get_corpus("corpora/lds-3jy6n1g0gn9r")

# Full thing, easier with one click

import time

def answer_question(question):
    start = time.time()


    prompt = """
    I am going to ask a question. Your purpose is to ask an AQA model (a model that will actually get the information, in an accurate collection) various questions. Your entire goal is to provide prompts to get as much information as possible to answer the question.

    Give at least 5 questions to send to AQA model for checking and collecting. Questions should be simple, and prefer, but not depended only on, closed-ended question, given to find facts that will be depended on later to answer the question at hand 

    Also, devote one more question to cite information

    Only provide the questions, in json format

    The Context of this question is an LDS Search, where it is search church documents, especially ones like the Book Of Mormon, the bible, but also church records and stories and such.

    Respond in json format, in an array, with each question being a part of the array

    ONLY MAKE QUESTIONS related to the topic at hand, for example, if the question is 'what is an apple', questions given would be 'what is the genus of the apple', or 'where is an apple from', or 'is an apple a fruit?'

    Each question is independent of each other - the model has no context of previous questions

    the format will have each question in the array be a dict, having the key of 'question'

    Also, grounding in some scriptural context could be great. Further questions can be asked for quotes for applicable scriptures.
    question : 
    """
    response = client.models.generate_content(
        model="gemini-1.5-flash-latest", 
        contents=prompt + question, 
        config=types.GenerateContentConfig(
        response_mime_type= 'application/json'))
    array = json.loads(response.text)
    # print(array)

    print("time taken for first prompt:", time.time() - start)
    start = time.time()
    def get_answer(q):
        try:
            answer = lds.generate_answer(q["question"], "ABSTRACTIVE")
            aqa_answer = answer.answer.content.parts[0].text
        except:
            aqa_answer = "No answer due to not finding anything relevant."

        return f"Answer to {q['question']} is: '{aqa_answer}' With a confidence of: {answer.answerable_probability} \n\n\n"

    def generate_full_answer(array):
        with concurrent.futures.ThreadPoolExecutor() as executor:
            answers = executor.map(get_answer, array)

        full_answer = "".join(answers)
        return full_answer

    # Assuming `array` is your input list
    full_answer = generate_full_answer(array)
    print( "############ \n\n"+full_answer + "############ \n\n")

    print("time taken for fact finding:", time.time() - start)
    start = time.time()

    prompt = """
    You will be given a few paragraphs of information answering the question, with an AI giving additional questions to answer the original one.
    """ + question + """
    Respond in a sentence or two using the information given from reliable sources to answer the question. 

    Avoid responses with lower confidence eg 0.01 to higher ones 0.99

    If you want to go past one or two sentences you can, just have information central to the question availible. 

    For example, you could cite the answer (to the scripture chapter, verse, book title, etc,), or you could provide further context or facts. 

    For example, if in the Book of Mormon, or Bible cite the Book, Chapter, Verse, if in the D&C, cite the section and verse

    If you want to go further, you can give some quotations of scripture if they are given

    Rely ONLY on the q&a unless you are extremely confident you can add more. 

    Assume the person reading your response is a member of the church, and that you are responding to them.

    here is the Q&A:

    Also, respond to the original question, as if you came up with the questions and answers to the Q&A, so like no "based on the provided answers" or anything like that.

    dont add any text effects

    Please put the response in this format, in json.
    {
        "answer": "// the answer to the question"
        "references" :[
            "John 3:16",
            "D&C 64:32",
            "D&C 99",
            "Alma 43",
            "Alma",
            etc...
        ]// add ALL scripture references, do not add them if it is just "the book of mormon" or "the bible", or anything like that, but if it is specific
        }
    """ + full_answer

    response = client.models.generate_content(
        model="gemini-1.5-flash-latest", 
        contents=prompt,
        config=types.GenerateContentConfig(
        response_mime_type= 'application/json')
        )

    # print(lds.generate_answer("Is this correct? If true, say 'true', if false, say 'false'" + response.text, "ABSTRACTIVE"))

    text = json.loads(response.text)

    print("time taken for final summary:", time.time() - start)
    return text
