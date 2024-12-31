import requests
import json

def get_reference(reference):
    base_url = "https://openscriptureapi.org/api/scriptures/v1/lds/en"

    url = f"{base_url}/referencesParser?reference=" + reference
    response = requests.get(url)
    if response.status_code != 200:
        return None
    parsed_reference = json.loads(response.text)


    if not parsed_reference["valid"]:
        print("Could not get reference")
        return None
    try :
            
        book_id = parsed_reference['references'][0]['book']
        chapter_number = parsed_reference['references'][0]['chapters'][0]['start']
        verse_start = parsed_reference['references'][0]['chapters'][0]['verses'][0]['start']
        verse_end = parsed_reference['references'][0]['chapters'][0]['verses'][0]['end']

        # Step 2: Fetch the chapter data
        chapter_url = f"{base_url}/book/{book_id}/{chapter_number}"
        chapter_response = requests.get(chapter_url)
        chapter_data = chapter_response.json()

        # Step 3: Extract the verse text
        verses = chapter_data['chapter']['verses']
        verse_texts = [
            verse['text'] for verse in verses 
            if verse_start <= verses.index(verse) + 1 <= verse_end
        ]
        print (verse_texts)
        return verse_texts

    except:
        return None
        