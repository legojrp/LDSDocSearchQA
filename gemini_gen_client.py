import google.generativeai as genai

class GeminiGen:
    def __init__(self, key_file_name, model_name) -> None:
        with open(key_file_name, 'r') as f:
            api_key = f.read()
        
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

    def generate_text(self, prompt):
        return self.model.generate_content(prompt)


    

    
    


